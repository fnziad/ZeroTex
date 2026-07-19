import {
  defaultResumeData,
  type PersonalInfo,
  type ResumeData,
  type ResumeSection,
  type SectionType,
} from "./resume-types"

export const RESUME_DOCUMENT_FORMAT = "zerotex-resume"
export const RESUME_DOCUMENT_VERSION = 1
export const RESUME_STORAGE_KEY = "zerotex.resume.v1"
export const LEGACY_RESUME_STORAGE_KEY = "resumeData"
export const RESUME_RECOVERY_STORAGE_KEY = "zerotex.resume.recovery"
export const MAX_RESUME_DOCUMENT_SIZE = 2_000_000

const MAX_SECTIONS = 100
const MAX_JSON_DEPTH = 20
const MAX_COLLECTION_ITEMS = 10_000
const BLOCKED_OBJECT_KEYS = new Set(["__proto__", "constructor", "prototype"])

const sectionTypes = new Set<SectionType>([
  "executive-summary",
  "education",
  "research-interests",
  "research-experience",
  "experience",
  "professional-experience",
  "extracurricular",
  "projects",
  "publications",
  "certifications",
  "skills",
  "awards",
  "interests",
  "languages",
  "custom",
])

const personalInfoKeys = [
  "fullName",
  "location",
  "phone",
  "email",
  "linkedin",
  "github",
  "website",
  "customLinks",
] as const satisfies readonly (keyof PersonalInfo)[]

export interface ResumeDocumentV1 {
  format: typeof RESUME_DOCUMENT_FORMAT
  schemaVersion: typeof RESUME_DOCUMENT_VERSION
  savedAt: string
  data: ResumeData
}

export interface ParsedResumeDocument {
  data: ResumeData
  migratedFromLegacy: boolean
  savedAt: string | null
}

export class ResumeDocumentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ResumeDocumentError"
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function normalizePersonalInfo(value: unknown): PersonalInfo {
  if (!isRecord(value)) {
    throw new ResumeDocumentError("Resume personal information is missing or invalid.")
  }

  const personal = { ...defaultResumeData.personal }

  for (const key of personalInfoKeys) {
    const field = value[key]
    if (field === undefined) continue
    if (typeof field !== "string") {
      throw new ResumeDocumentError(`Personal information field “${key}” must be text.`)
    }
    personal[key] = field
  }

  return personal
}

function sanitizeJsonValue(
  value: unknown,
  depth = 0,
  counter: { count: number } = { count: 0 },
): unknown {
  counter.count += 1
  if (counter.count > MAX_COLLECTION_ITEMS) {
    throw new ResumeDocumentError("Resume data contains too many nested items.")
  }
  if (depth > MAX_JSON_DEPTH) {
    throw new ResumeDocumentError("Resume data is nested too deeply.")
  }

  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return value
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new ResumeDocumentError("Resume data contains an invalid number.")
    }
    return value
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeJsonValue(item, depth + 1, counter))
  }
  if (isRecord(value)) {
    const sanitized: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(value)) {
      if (BLOCKED_OBJECT_KEYS.has(key)) {
        throw new ResumeDocumentError("Resume data contains an unsafe object key.")
      }
      sanitized[key] = sanitizeJsonValue(item, depth + 1, counter)
    }
    return sanitized
  }

  throw new ResumeDocumentError("Resume data contains an unsupported value.")
}

function normalizeSection(value: unknown, index: number): ResumeSection {
  if (!isRecord(value)) {
    throw new ResumeDocumentError(`Resume section ${index + 1} is invalid.`)
  }

  if (typeof value.id !== "string" || value.id.trim() === "") {
    throw new ResumeDocumentError(`Resume section ${index + 1} is missing an ID.`)
  }
  if (typeof value.type !== "string" || !sectionTypes.has(value.type as SectionType)) {
    throw new ResumeDocumentError(`Resume section “${value.id}” has an unsupported type.`)
  }
  if (typeof value.title !== "string") {
    throw new ResumeDocumentError(`Resume section “${value.id}” is missing a title.`)
  }
  if (!("data" in value)) {
    throw new ResumeDocumentError(`Resume section “${value.id}” is missing its content.`)
  }

  return {
    id: value.id,
    type: value.type as SectionType,
    title: value.title,
    order:
      typeof value.order === "number" && Number.isFinite(value.order)
        ? value.order
        : index,
    visible: typeof value.visible === "boolean" ? value.visible : true,
    data: sanitizeJsonValue(value.data),
  }
}

export function normalizeResumeData(value: unknown): ResumeData {
  if (!isRecord(value) || !Array.isArray(value.sections)) {
    throw new ResumeDocumentError("This file does not contain valid ZeroTeX resume data.")
  }
  if (value.sections.length > MAX_SECTIONS) {
    throw new ResumeDocumentError(`A resume cannot contain more than ${MAX_SECTIONS} sections.`)
  }

  const sections = value.sections.map(normalizeSection)
  const sectionIds = new Set<string>()
  for (const section of sections) {
    if (sectionIds.has(section.id)) {
      throw new ResumeDocumentError(`Duplicate resume section ID: “${section.id}”.`)
    }
    sectionIds.add(section.id)
  }

  return {
    personal: normalizePersonalInfo(value.personal),
    sections,
  }
}

export function createResumeDocument(
  data: ResumeData,
  savedAt = new Date().toISOString(),
): ResumeDocumentV1 {
  return {
    format: RESUME_DOCUMENT_FORMAT,
    schemaVersion: RESUME_DOCUMENT_VERSION,
    savedAt,
    data,
  }
}

export function serializeResumeDocument(data: ResumeData): string {
  return JSON.stringify(createResumeDocument(data), null, 2)
}

export function parseResumeDocument(raw: string): ParsedResumeDocument {
  if (raw.length > MAX_RESUME_DOCUMENT_SIZE) {
    throw new ResumeDocumentError("Resume file is larger than the 2 MB limit.")
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new ResumeDocumentError("Resume file is not valid JSON.")
  }

  if (!isRecord(parsed)) {
    throw new ResumeDocumentError("Resume file must contain a JSON object.")
  }

  if ("schemaVersion" in parsed || "format" in parsed) {
    if (parsed.format !== RESUME_DOCUMENT_FORMAT) {
      throw new ResumeDocumentError("This JSON file is not a ZeroTeX resume document.")
    }
    if (parsed.schemaVersion !== RESUME_DOCUMENT_VERSION) {
      throw new ResumeDocumentError(
        `Resume schema version ${String(parsed.schemaVersion)} is not supported.`,
      )
    }

    return {
      data: normalizeResumeData(parsed.data),
      migratedFromLegacy: false,
      savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : null,
    }
  }

  return {
    data: normalizeResumeData(parsed),
    migratedFromLegacy: true,
    savedAt: null,
  }
}

import { describe, expect, it } from "vitest"
import { defaultResumeData, type ResumeData } from "./resume-types"
import {
  RESUME_DOCUMENT_FORMAT,
  RESUME_DOCUMENT_VERSION,
  ResumeDocumentError,
  parseResumeDocument,
  serializeResumeDocument,
} from "./resume-document"

const sampleResume: ResumeData = {
  ...defaultResumeData,
  personal: {
    ...defaultResumeData.personal,
    fullName: "Ada Lovelace",
  },
}

describe("resume documents", () => {
  it("round-trips a versioned ZeroTeX document", () => {
    const serialized = serializeResumeDocument(sampleResume)
    const parsed = parseResumeDocument(serialized)

    expect(JSON.parse(serialized)).toMatchObject({
      format: RESUME_DOCUMENT_FORMAT,
      schemaVersion: RESUME_DOCUMENT_VERSION,
    })
    expect(parsed.data).toEqual(sampleResume)
    expect(parsed.migratedFromLegacy).toBe(false)
    expect(parsed.savedAt).toEqual(expect.any(String))
  })

  it("migrates legacy unwrapped resume data and fills newer personal fields", () => {
    const legacy = {
      personal: {
        fullName: "Grace Hopper",
        location: "New York",
        phone: "",
        email: "grace@example.com",
        linkedin: "",
        github: "",
        website: "",
      },
      sections: defaultResumeData.sections,
    }

    const parsed = parseResumeDocument(JSON.stringify(legacy))

    expect(parsed.migratedFromLegacy).toBe(true)
    expect(parsed.data.personal.customLinks).toBe("")
    expect(parsed.data.personal.fullName).toBe("Grace Hopper")
  })

  it("rejects future schema versions instead of guessing", () => {
    const document = JSON.parse(serializeResumeDocument(sampleResume))
    document.schemaVersion = RESUME_DOCUMENT_VERSION + 1

    expect(() => parseResumeDocument(JSON.stringify(document))).toThrow(
      "Resume schema version 2 is not supported.",
    )
  })

  it("rejects duplicate section IDs", () => {
    const invalid = {
      ...sampleResume,
      sections: [sampleResume.sections[0], sampleResume.sections[0]],
    }

    expect(() => parseResumeDocument(JSON.stringify(invalid))).toThrow(ResumeDocumentError)
    expect(() => parseResumeDocument(JSON.stringify(invalid))).toThrow(
      "Duplicate resume section ID",
    )
  })

  it("rejects malformed JSON with a useful error", () => {
    expect(() => parseResumeDocument("{not-json")).toThrow("Resume file is not valid JSON.")
  })
})

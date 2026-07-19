"use client"

import { useRef, type ChangeEvent } from "react"
import { Database, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  MAX_RESUME_DOCUMENT_SIZE,
  parseResumeDocument,
  serializeResumeDocument,
} from "@/lib/resume-document"
import type { ResumeData } from "@/lib/resume-types"

interface ResumeDataActionsProps {
  data: ResumeData
  onImport: (data: ResumeData) => void
}

function resumeFileName(fullName: string): string {
  const safeName = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

  return `${safeName || "resume"}.zerotex.json`
}

export function ResumeDataActions({ data, onImport }: ResumeDataActionsProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleExport = () => {
    const blob = new Blob([serializeResumeDocument(data)], {
      type: "application/json;charset=utf-8",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = resumeFileName(data.personal.fullName)
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)

    toast({
      title: "Resume backup downloaded",
      description: "Keep this JSON file to restore or transfer your resume later.",
    })
  }

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.value = ""
    if (!file) return

    try {
      if (file.size > MAX_RESUME_DOCUMENT_SIZE) {
        throw new Error("Resume file is larger than the 2 MB limit.")
      }

      const parsed = parseResumeDocument(await file.text())
      onImport(parsed.data)
      toast({
        title: parsed.migratedFromLegacy ? "Legacy resume upgraded" : "Resume restored",
        description: parsed.migratedFromLegacy
          ? "Your older resume was migrated to the current ZeroTeX format."
          : "Your resume backup was loaded and saved locally.",
      })
    } catch (error) {
      toast({
        title: "Could not restore resume",
        description: error instanceof Error ? error.message : "The selected file is invalid.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        aria-label="Restore resume from JSON"
        onChange={handleImport}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost" className="h-8 rounded-md px-2.5 text-xs">
            <Database className="size-3.5" aria-hidden="true" />
            Data
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={handleExport}>
            <Download />
            Back up JSON
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault()
              inputRef.current?.click()
            }}
          >
            <Upload />
            Restore JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

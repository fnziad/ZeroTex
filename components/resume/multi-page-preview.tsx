"use client"

import type { ResumeData } from "@/lib/resume-types"
import ResumePreview from "./resume-preview"

interface MultiPagePreviewProps {
  data: ResumeData
}

export default function MultiPagePreview({ data }: MultiPagePreviewProps) {
  return (
    <div
      className="bg-white relative"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "12mm 18mm",
        fontSize: "10pt",
        lineHeight: "1.2",
        boxSizing: "border-box",
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        textAlign: "justify" as const
      }}
    >
      <ResumePreview data={data} />
    </div>
  )
}

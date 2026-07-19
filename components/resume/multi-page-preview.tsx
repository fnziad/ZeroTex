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
        width: "min(210mm, 100%)",
        aspectRatio: "210 / 297",
        minHeight: "fit-content",
        padding: "clamp(24px, 2vw, 12mm) clamp(28px, 3vw, 18mm)",
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

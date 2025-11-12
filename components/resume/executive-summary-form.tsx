"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ExecutiveSummaryFormProps {
  data: string
  updateData: (data: string) => void
}

export default function ExecutiveSummaryForm({ data, updateData }: ExecutiveSummaryFormProps) {
  const [summary, setSummary] = useState<string>(data)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value)
    updateData(e.target.value)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Executive Summary</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Provide a concise overview of your professional background, key strengths, and career achievements. This section
        is particularly important for executive and senior-level positions.
      </p>

      <div>
        <Label htmlFor="executiveSummary">Summary</Label>
        <Textarea
          id="executiveSummary"
          value={summary}
          onChange={handleChange}
          placeholder="Accomplished executive with over 15 years of experience in technology leadership. Proven track record of driving organizational growth, leading high-performance teams, and implementing strategic initiatives that enhance operational efficiency and market position."
          rows={6}
        />
      </div>
    </div>
  )
}

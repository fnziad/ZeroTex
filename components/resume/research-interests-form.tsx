"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ResearchInterestsFormProps {
  data: string
  updateData: (data: string) => void
}

export default function ResearchInterestsForm({ data, updateData }: ResearchInterestsFormProps) {
  const [formData, setFormData] = useState<string>(data)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setFormData(value)
    updateData(value)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Research Interests</h2>
      <p className="text-sm text-muted-foreground">
        List your research interests separated by commas (e.g., Deep Learning, Machine Learning, Computer Vision)
      </p>

      <div>
        <Label htmlFor="interests">Research Interests</Label>
        <Textarea
          id="interests"
          value={formData}
          onChange={handleChange}
          placeholder="Strategic Operations, Risk Assessment, Team Leadership, Crisis Management, Advanced Combat Techniques"
          rows={4}
          className="resize-none"
        />
      </div>
    </div>
  )
}

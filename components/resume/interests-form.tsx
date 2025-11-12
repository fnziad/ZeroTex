"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface InterestsFormProps {
  data: string
  updateData: (data: string) => void
}

export default function InterestsForm({ data, updateData }: InterestsFormProps) {
  const [formData, setFormData] = useState<string>(data)

  const handleChange = (value: string) => {
    setFormData(value)
    updateData(value)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personal Interests</h2>

      <p className="text-sm text-muted-foreground">
        Share your personal interests and hobbies. This section helps showcase your personality and work-life balance.
      </p>

      <div>
        <Label htmlFor="interests">Interests</Label>
        <Textarea
          id="interests"
          value={formData}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="e.g., Tea brewing, cleaning, tactical training, reading history"
          rows={4}
        />
      </div>
    </div>
  )
}

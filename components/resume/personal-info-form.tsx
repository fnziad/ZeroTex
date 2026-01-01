"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PersonalInfo } from "@/lib/resume-types"

interface PersonalInfoFormProps {
  data: PersonalInfo
  updateData: (data: PersonalInfo) => void
}

export default function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    updateData(updatedData)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personal Information</h2>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Levi Ackerman"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Wall Maria, Paradis Island"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+123 456 7890" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="levi.ackerman@scoutregiment.com"
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/levi-ackerman"
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="github.com/captainlevi"
          />
        </div>

        <div>
          <Label htmlFor="website">Personal Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="leviackerman.dev"
          />
        </div>

        <div>
          <Label htmlFor="customLinks">Other Profile Links (Optional)</Label>
          <Textarea
            id="customLinks"
            name="customLinks"
            value={formData.customLinks}
            onChange={handleChange as any}
            placeholder="LeetCode: leetcode.com/captainlevi&#10;Portfolio: portfolio.com/levi&#10;(One link per line, format: Label: URL)"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}

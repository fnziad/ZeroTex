"use client"

import type { ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PersonalInfo } from "@/lib/resume-types"

interface PersonalInfoFormProps {
  data: PersonalInfo
  updateData: (data: PersonalInfo) => void
}

export default function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateData({ ...data, [name]: value })
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Levi Ackerman"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={data.location}
            onChange={handleChange}
            placeholder="Wall Maria, Paradis Island"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={data.phone} onChange={handleChange} placeholder="+123 456 7890" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="levi.ackerman@scoutregiment.com"
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={data.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/levi-ackerman"
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            name="github"
            value={data.github}
            onChange={handleChange}
            placeholder="github.com/captainlevi"
          />
        </div>

        <div>
          <Label htmlFor="website">Personal Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={data.website}
            onChange={handleChange}
            placeholder="leviackerman.dev"
          />
        </div>

        <div>
          <Label htmlFor="customLinks">Other Profile Links (Optional)</Label>
          <Textarea
            id="customLinks"
            name="customLinks"
            value={data.customLinks}
            onChange={handleChange}
            placeholder="LeetCode: leetcode.com/captainlevi&#10;Portfolio: portfolio.com/levi&#10;(One link per line, format: Label: URL)"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}

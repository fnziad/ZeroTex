"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"
import type { Experience } from "@/lib/resume-types"

interface ExperienceFormProps {
  data: Experience[]
  updateData: (data: Experience[]) => void
}

export default function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(data)

  const handleAddExperience = () => {
    const newExperience: Experience = {
      organization: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    }
    const updatedExperiences = [...experiences, newExperience]
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleRemoveExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleChange = (index: number, field: keyof Experience, value: string | string[]) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    }
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleBulletChange = (expIndex: number, bulletIndex: number, value: string) => {
    const updatedExperiences = [...experiences]
    const bullets = [...updatedExperiences[expIndex].bullets]
    bullets[bulletIndex] = value
    updatedExperiences[expIndex].bullets = bullets
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleAddBullet = (expIndex: number) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[expIndex].bullets.push("")
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleRemoveBullet = (expIndex: number, bulletIndex: number) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[expIndex].bullets = updatedExperiences[expIndex].bullets.filter((_, i) => i !== bulletIndex)
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Work Experience</h2>

      {experiences.map((experience, expIndex) => (
        <Card key={expIndex} className="mb-4">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Experience #{expIndex + 1}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveExperience(expIndex)}
              className="h-8 w-8 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div>
              <Label htmlFor={`position-${expIndex}`}>Position/Role</Label>
              <Input
                id={`position-${expIndex}`}
                value={experience.position}
                onChange={(e) => handleChange(expIndex, "position", e.target.value)}
                placeholder="Captain & Squad Leader"
              />
            </div>

            <div>
              <Label htmlFor={`organization-${expIndex}`}>Organization</Label>
              <Input
                id={`organization-${expIndex}`}
                value={experience.organization}
                onChange={(e) => handleChange(expIndex, "organization", e.target.value)}
                placeholder="Survey Corps Special Operations"
              />
            </div>

            <div>
              <Label htmlFor={`location-${expIndex}`}>Location</Label>
              <Input
                id={`location-${expIndex}`}
                value={experience.location}
                onChange={(e) => handleChange(expIndex, "location", e.target.value)}
                placeholder="Wall Rose, Paradis Island"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`startDate-${expIndex}`}>Start Date</Label>
                <Input
                  id={`startDate-${expIndex}`}
                  value={experience.startDate}
                  onChange={(e) => handleChange(expIndex, "startDate", e.target.value)}
                  placeholder="2022"
                />
              </div>

              <div>
                <Label htmlFor={`endDate-${expIndex}`}>End Date</Label>
                <Input
                  id={`endDate-${expIndex}`}
                  value={experience.endDate}
                  onChange={(e) => handleChange(expIndex, "endDate", e.target.value)}
                  placeholder="2024"
                />
              </div>
            </div>

            <div>
              <Label>Responsibilities & Achievements</Label>
              {experience.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex items-center gap-2 mt-2">
                  <Textarea
                    value={bullet}
                    onChange={(e) => handleBulletChange(expIndex, bulletIndex, e.target.value)}
                    placeholder={`Achievement or responsibility ${bulletIndex + 1}`}
                    rows={2}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveBullet(expIndex, bulletIndex)}
                    className="h-8 w-8 text-red-500 shrink-0"
                    disabled={experience.bullets.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => handleAddBullet(expIndex)} className="mt-2">
                <PlusCircle className="mr-2 h-3 w-3" />
                Add Bullet Point
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAddExperience} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Experience
      </Button>
    </div>
  )
}

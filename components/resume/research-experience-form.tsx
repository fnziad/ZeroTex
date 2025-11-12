"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { ResearchExperience } from "@/lib/resume-types"

interface ResearchExperienceFormProps {
  data: ResearchExperience[]
  updateData: (data: ResearchExperience[]) => void
}

export default function ResearchExperienceForm({ data, updateData }: ResearchExperienceFormProps) {
  const [experiences, setExperiences] = useState<ResearchExperience[]>(
    data.length > 0 ? data : [{ role: "", project: "", status: "", course: "", bullets: [""] }]
  )

  const handleAddExperience = () => {
    const newExperiences = [...experiences, { role: "", project: "", status: "", course: "", bullets: [""] }]
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  const handleRemoveExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  const handleChange = (index: number, field: keyof ResearchExperience, value: string) => {
    const newExperiences = [...experiences]
    if (field === "bullets") {
      return
    }
    newExperiences[index] = { ...newExperiences[index], [field]: value }
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  const handleBulletChange = (expIndex: number, bulletIndex: number, value: string) => {
    const newExperiences = [...experiences]
    newExperiences[expIndex].bullets[bulletIndex] = value
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  const handleAddBullet = (expIndex: number) => {
    const newExperiences = [...experiences]
    newExperiences[expIndex].bullets.push("")
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  const handleRemoveBullet = (expIndex: number, bulletIndex: number) => {
    const newExperiences = [...experiences]
    newExperiences[expIndex].bullets = newExperiences[expIndex].bullets.filter((_, i) => i !== bulletIndex)
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Research & Development Experience</h2>
        <Button onClick={handleAddExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experiences.map((exp, expIndex) => (
        <Card key={expIndex} className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Experience {expIndex + 1}</h3>
              {experiences.length > 1 && (
                <Button variant="destructive" size="sm" onClick={() => handleRemoveExperience(expIndex)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`role-${expIndex}`}>Role/Position</Label>
                <Input
                  id={`role-${expIndex}`}
                  value={exp.role}
                  onChange={(e) => handleChange(expIndex, "role", e.target.value)}
                  placeholder="Project Lead & Primary Researcher"
                />
              </div>

              <div>
                <Label htmlFor={`status-${expIndex}`}>Status/Date</Label>
                <Input
                  id={`status-${expIndex}`}
                  value={exp.status || ""}
                  onChange={(e) => handleChange(expIndex, "status", e.target.value)}
                  placeholder="In Progress"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`project-${expIndex}`}>Project/Research Title</Label>
              <Input
                id={`project-${expIndex}`}
                value={exp.project}
                onChange={(e) => handleChange(expIndex, "project", e.target.value)}
                placeholder="B.Sc. Thesis: Transformer-Based Framework for..."
              />
            </div>

            <div>
              <Label htmlFor={`course-${expIndex}`}>Course (Optional)</Label>
              <Input
                id={`course-${expIndex}`}
                value={exp.course || ""}
                onChange={(e) => handleChange(expIndex, "course", e.target.value)}
                placeholder="CSE427: Machine Learning"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Key Points/Responsibilities</Label>
                <Button size="sm" variant="outline" onClick={() => handleAddBullet(expIndex)}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Point
                </Button>
              </div>

              <div className="space-y-2">
                {exp.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex gap-2">
                    <Textarea
                      value={bullet}
                      onChange={(e) => handleBulletChange(expIndex, bulletIndex, e.target.value)}
                      placeholder="Describe your contribution or achievement"
                      rows={2}
                      className="resize-none"
                    />
                    {exp.bullets.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBullet(expIndex, bulletIndex)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"
import type { EducationEntry } from "@/lib/resume-types"

interface EducationFormProps {
  data: EducationEntry[]
  updateData: (data: EducationEntry[]) => void
}

export default function EducationForm({ data, updateData }: EducationFormProps) {
  const [educations, setEducations] = useState<EducationEntry[]>(data)

  const handleAddEducation = () => {
    const newEducation: EducationEntry = {
      institution: "",
      location: "",
      degree: "",
      startDate: "",
      endDate: "",
      gpa: "",
      coursework: "",
      achievements: "",
    }
    const updatedEducations = [...educations, newEducation]
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const handleRemoveEducation = (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const handleChange = (index: number, field: keyof EducationEntry, value: string) => {
    const updatedEducations = [...educations]
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value,
    }
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Education</h2>

      {educations.map((education, index) => (
        <Card key={index} className="mb-4">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveEducation(index)}
              className="h-8 w-8 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div>
              <Label htmlFor={`institution-${index}`}>Institution</Label>
              <Input
                id={`institution-${index}`}
                value={education.institution}
                onChange={(e) => handleChange(index, "institution", e.target.value)}
                placeholder="Survey Corps Training Academy"
              />
            </div>

            <div>
              <Label htmlFor={`location-${index}`}>Location</Label>
              <Input
                id={`location-${index}`}
                value={education.location}
                onChange={(e) => handleChange(index, "location", e.target.value)}
                placeholder="Trost District, Paradis Island"
              />
            </div>

            <div>
              <Label htmlFor={`degree-${index}`}>Degree</Label>
              <Input
                id={`degree-${index}`}
                value={education.degree}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
                placeholder="Elite Scout Regiment Training"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                <Input
                  id={`startDate-${index}`}
                  value={education.startDate}
                  onChange={(e) => handleChange(index, "startDate", e.target.value)}
                  placeholder="Month Year"
                />
              </div>

              <div>
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <Input
                  id={`endDate-${index}`}
                  value={education.endDate}
                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                  placeholder="Month Year or Present"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`gpa-${index}`}>GPA</Label>
              <Input
                id={`gpa-${index}`}
                value={education.gpa}
                onChange={(e) => handleChange(index, "gpa", e.target.value)}
                placeholder="X.XX/Y.YY or Percentage: XX%"
              />
            </div>

            <div>
              <Label htmlFor={`coursework-${index}`}>Relevant Coursework</Label>
              <Input
                id={`coursework-${index}`}
                value={education.coursework}
                onChange={(e) => handleChange(index, "coursework", e.target.value)}
                placeholder="Course 1, Course 2, Course 3"
              />
            </div>

            <div>
              <Label htmlFor={`achievements-${index}`}>Academic Achievements</Label>
              <Textarea
                id={`achievements-${index}`}
                value={education.achievements}
                onChange={(e) => handleChange(index, "achievements", e.target.value)}
                placeholder="Dean's List, Scholarships, Honors, etc."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAddEducation} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"
import type { Project } from "@/lib/resume-types"

interface ProjectsFormProps {
  data: Project[]
  updateData: (data: Project[]) => void
}

export default function ProjectsForm({ data, updateData }: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>(data)

  const handleAddProject = () => {
    const newProject: Project = {
      name: "",
      technologies: "",
      startDate: "",
      endDate: "",
      description: ["", "", ""],
    }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const handleRemoveProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const handleChange = (index: number, field: keyof Project, value: string | string[]) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    }
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const handleDescriptionChange = (projIndex: number, descIndex: number, value: string) => {
    const updatedProjects = [...projects]
    const description = [...updatedProjects[projIndex].description]
    description[descIndex] = value
    updatedProjects[projIndex].description = description
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const handleAddDescription = (projIndex: number) => {
    const updatedProjects = [...projects]
    updatedProjects[projIndex].description.push("")
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const handleRemoveDescription = (projIndex: number, descIndex: number) => {
    const updatedProjects = [...projects]
    updatedProjects[projIndex].description = updatedProjects[projIndex].description.filter((_, i) => i !== descIndex)
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Projects</h2>

      {projects.map((project, projIndex) => (
        <Card key={projIndex} className="mb-4">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Project #{projIndex + 1}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveProject(projIndex)}
              className="h-8 w-8 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div>
              <Label htmlFor={`name-${projIndex}`}>Project Name</Label>
              <Input
                id={`name-${projIndex}`}
                value={project.name}
                onChange={(e) => handleChange(projIndex, "name", e.target.value)}
                placeholder="Project Name"
              />
            </div>

            <div>
              <Label htmlFor={`technologies-${projIndex}`}>Technologies Used</Label>
              <Input
                id={`technologies-${projIndex}`}
                value={project.technologies}
                onChange={(e) => handleChange(projIndex, "technologies", e.target.value)}
                placeholder="React, Node.js, MongoDB, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`startDate-${projIndex}`}>Start Date</Label>
                <Input
                  id={`startDate-${projIndex}`}
                  value={project.startDate}
                  onChange={(e) => handleChange(projIndex, "startDate", e.target.value)}
                  placeholder="Month Year"
                />
              </div>

              <div>
                <Label htmlFor={`endDate-${projIndex}`}>End Date</Label>
                <Input
                  id={`endDate-${projIndex}`}
                  value={project.endDate}
                  onChange={(e) => handleChange(projIndex, "endDate", e.target.value)}
                  placeholder="Month Year or Present"
                />
              </div>
            </div>

            <div>
              <Label>Project Description</Label>
              {project.description.map((desc, descIndex) => (
                <div key={descIndex} className="flex items-center gap-2 mt-2">
                  <Textarea
                    value={desc}
                    onChange={(e) => handleDescriptionChange(projIndex, descIndex, e.target.value)}
                    placeholder={`Description ${descIndex + 1}`}
                    rows={2}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveDescription(projIndex, descIndex)}
                    className="h-8 w-8 text-red-500 shrink-0"
                    disabled={project.description.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => handleAddDescription(projIndex)} className="mt-2">
                <PlusCircle className="mr-2 h-3 w-3" />
                Add Bullet Point
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAddProject} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GripVertical, Eye, EyeOff, Trash2, Plus } from "lucide-react"
import { ResumeSection, SectionType } from "@/lib/resume-types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface SectionManagerProps {
  sections: ResumeSection[]
  activeSection: string | null
  onSectionClick: (sectionId: string) => void
  onAddSection: (type: SectionType, title: string) => void
  onRemoveSection: (sectionId: string) => void
  onToggleVisibility: (sectionId: string) => void
  onReorder: (sections: ResumeSection[]) => void
}

const sectionTypeLabels: Record<SectionType, string> = {
  "executive-summary": "Executive Summary / Bio",
  education: "Education",
  "research-interests": "Research Interests",
  "research-experience": "Research & Development",
  experience: "Leadership & Experience",
  "professional-experience": "Professional Experience",
  extracurricular: "Extracurricular Activities",
  projects: "Projects",
  publications: "Publications",
  certifications: "Certifications",
  skills: "Technical Skills",
  awards: "Awards & Recognitions",
  interests: "Personal Interests",
  languages: "Languages",
  custom: "Custom Section",
}

export default function SectionManager({
  sections,
  activeSection,
  onSectionClick,
  onAddSection,
  onRemoveSection,
  onToggleVisibility,
  onReorder,
}: SectionManagerProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newSectionType, setNewSectionType] = useState<SectionType>("custom")
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  const handleAddSection = () => {
    if (newSectionType === "custom" && !newSectionTitle.trim()) {
      return
    }

    const title = newSectionType === "custom" ? newSectionTitle : sectionTypeLabels[newSectionType]
    onAddSection(newSectionType, title)
    setNewSectionType("custom")
    setNewSectionTitle("")
    setShowAddDialog(false)
  }

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedItem(sectionId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedItem || draggedItem === targetId) return

    const draggedIndex = sortedSections.findIndex((s) => s.id === draggedItem)
    const targetIndex = sortedSections.findIndex((s) => s.id === targetId)

    const newSections = [...sortedSections]
    const [removed] = newSections.splice(draggedIndex, 1)
    newSections.splice(targetIndex, 0, removed)

    // Update order property
    const reorderedSections = newSections.map((section, index) => ({
      ...section,
      order: index,
    }))

    onReorder(reorderedSections)
    setDraggedItem(null)
  }

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Resume Sections</h3>
        <Button onClick={() => setShowAddDialog(true)} className="w-full" variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      <div className="space-y-2">
        {sortedSections.map((section) => (
          <div
            key={section.id}
            draggable
            onDragStart={(e) => handleDragStart(e, section.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, section.id)}
            className={`
              flex items-center gap-2 p-2 rounded-md border cursor-pointer
              ${activeSection === section.id ? "bg-primary/10 border-primary" : "hover:bg-accent"}
              ${draggedItem === section.id ? "opacity-50" : ""}
            `}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <div className="flex-1" onClick={() => onSectionClick(section.id)}>
              <p className="text-sm font-medium">{section.title}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onToggleVisibility(section.id)
              }}
            >
              {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                setDeleteConfirm(section.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Section Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Section</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Section Type</label>
                <Select value={newSectionType} onValueChange={(value) => setNewSectionType(value as SectionType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive-summary">Executive Summary / Bio</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="research-interests">Research Interests</SelectItem>
                    <SelectItem value="research-experience">Research & Development</SelectItem>
                    <SelectItem value="experience">Leadership & Experience</SelectItem>
                    <SelectItem value="professional-experience">Professional Experience</SelectItem>
                    <SelectItem value="extracurricular">Extracurricular Activities</SelectItem>
                    <SelectItem value="projects">Projects</SelectItem>
                    <SelectItem value="publications">Publications</SelectItem>
                    <SelectItem value="certifications">Certifications</SelectItem>
                    <SelectItem value="skills">Technical Skills</SelectItem>
                    <SelectItem value="awards">Awards & Recognitions</SelectItem>
                    <SelectItem value="interests">Personal Interests</SelectItem>
                    <SelectItem value="languages">Languages</SelectItem>
                    <SelectItem value="custom">Custom Section</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newSectionType === "custom" && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Section Title</label>
                  <input
                    type="text"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter section title"
                  />
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSection} disabled={newSectionType === "custom" && !newSectionTitle.trim()}>
                  Add Section
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this section and all its data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirm) {
                  onRemoveSection(deleteConfirm)
                  setDeleteConfirm(null)
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

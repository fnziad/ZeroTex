"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GripVertical, Eye, EyeOff, Trash2, Plus } from "lucide-react"
import { ResumeSection, SectionType } from "@/lib/resume-types"
import { Input } from "@/components/ui/input"
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
    <div>
      <Button onClick={() => setShowAddDialog(true)} className="mb-4 w-full rounded-lg border-dashed" variant="outline" size="sm">
          <Plus className="size-4" aria-hidden="true" />
          Add Section
      </Button>

      <div className="space-y-2">
        {sortedSections.map((section) => (
          <div
            key={section.id}
            draggable
            onDragStart={(e) => handleDragStart(e, section.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, section.id)}
            className={`group flex items-center gap-1.5 rounded-lg border p-1.5 transition-colors
              ${activeSection === section.id ? "border-primary/50 bg-primary/5" : "hover:bg-muted/60"}
              ${draggedItem === section.id ? "opacity-50" : ""}
            `}
          >
            <GripVertical className="size-4 cursor-grab text-muted-foreground/60" aria-hidden="true" />
            <button
              type="button"
              className="min-w-0 flex-1 px-1.5 py-1 text-left text-sm font-medium outline-none focus-visible:underline"
              onClick={() => onSectionClick(section.id)}
            >
              <span className="block truncate">{section.title}</span>
            </button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
              aria-label={section.visible ? `Hide ${section.title}` : `Show ${section.title}`}
              title={section.visible ? "Hide section" : "Show section"}
              onClick={(e) => {
                e.stopPropagation()
                onToggleVisibility(section.id)
              }}
            >
              {section.visible ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-destructive"
              aria-label={`Delete ${section.title}`}
              title="Delete section"
              onClick={(e) => {
                e.stopPropagation()
                setDeleteConfirm(section.id)
              }}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <AlertDialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add a resume section</AlertDialogTitle>
            <AlertDialogDescription>Choose a structured section or create one of your own.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-1">
            <div>
              <label htmlFor="section-type" className="mb-2 block text-sm font-medium">Section type</label>
              <Select value={newSectionType} onValueChange={(value) => setNewSectionType(value as SectionType)}>
                <SelectTrigger id="section-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sectionTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {newSectionType === "custom" && (
              <div>
                <label htmlFor="section-title" className="mb-2 block text-sm font-medium">Section title</label>
                <Input
                  id="section-title"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  placeholder="e.g. Volunteer work"
                />
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddSection} disabled={newSectionType === "custom" && !newSectionTitle.trim()}>
              Add section
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
    </div>
  )
}

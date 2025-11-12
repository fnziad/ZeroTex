"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { Skills, SkillCategory } from "@/lib/resume-types"

interface SkillsFormProps {
  data: Skills
  updateData: (data: Skills) => void
}

export default function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [formData, setFormData] = useState<Skills>(data)

  const handleCategoryChange = (index: number, field: keyof SkillCategory, value: string) => {
    const updatedCategories = [...formData.categories]
    updatedCategories[index] = { ...updatedCategories[index], [field]: value }
    const updatedData = { ...formData, categories: updatedCategories }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handleAddCategory = () => {
    const updatedData = {
      ...formData,
      categories: [...formData.categories, { name: "", items: "" }],
    }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handleRemoveCategory = (index: number) => {
    const updatedData = {
      ...formData,
      categories: formData.categories.filter((_, i) => i !== index),
    }
    setFormData(updatedData)
    updateData(updatedData)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Technical Skills</h2>
        <Button onClick={handleAddCategory} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Organize your skills into categories. Each category should have a name (e.g., "Languages") and comma-separated
        items.
      </p>

      <div className="space-y-3">
        {formData.categories.map((category, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Category {index + 1}</h3>
                {formData.categories.length > 1 && (
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveCategory(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div>
                <Label htmlFor={`category-name-${index}`}>Category Name</Label>
                <Input
                  id={`category-name-${index}`}
                  value={category.name}
                  onChange={(e) => handleCategoryChange(index, "name", e.target.value)}
                  placeholder="e.g., Languages, AI & Data Science, Web Development"
                />
              </div>

              <div>
                <Label htmlFor={`category-items-${index}`}>Skills (comma-separated)</Label>
                <Input
                  id={`category-items-${index}`}
                  value={category.items}
                  onChange={(e) => handleCategoryChange(index, "items", e.target.value)}
                  placeholder="e.g., Python, JavaScript, TypeScript, C, SQL"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

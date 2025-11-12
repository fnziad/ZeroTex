"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import type { Awards, AwardCategory } from "@/lib/resume-types"

interface AwardsFormProps {
  data: Awards
  updateData: (data: Awards) => void
}

export default function AwardsForm({ data, updateData }: AwardsFormProps) {
  const [formData, setFormData] = useState<Awards>(data)

  const handleCategoryChange = (index: number, field: keyof AwardCategory, value: string | string[]) => {
    const updatedCategories = [...formData.categories]
    updatedCategories[index] = { ...updatedCategories[index], [field]: value }
    const updatedData = { ...formData, categories: updatedCategories }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handleAddCategory = () => {
    const updatedData = {
      ...formData,
      categories: [...formData.categories, { title: "", items: [] }],
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
        <h2 className="text-xl font-semibold">Awards & Honors</h2>
        <Button onClick={handleAddCategory} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Organize your awards and honors into categories (e.g., "Academic Scholarships", "Competition Awards").
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
                <Label htmlFor={`category-title-${index}`}>Category Title</Label>
                <Input
                  id={`category-title-${index}`}
                  value={category.title}
                  onChange={(e) => handleCategoryChange(index, "title", e.target.value)}
                  placeholder="e.g., Humanity's Strongest Soldier, Distinguished Service Medal"
                />
              </div>

              <div>
                <Label htmlFor={`category-items-${index}`}>Awards</Label>
                <Textarea
                  id={`category-items-${index}`}
                  value={category.items || ""}
                  onChange={(e) => handleCategoryChange(index, "items", e.target.value)}
                  placeholder="Enter your awards in any format (comma-separated, line-separated, or free text)"
                  rows={5}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter awards in any format you prefer. The system will format them appropriately.
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

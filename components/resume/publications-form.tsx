"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"
import type { Publication } from "@/lib/resume-types"

interface PublicationsFormProps {
  data: Publication[]
  updateData: (data: Publication[]) => void
}

export default function PublicationsForm({ data, updateData }: PublicationsFormProps) {
  const [publications, setPublications] = useState<Publication[]>(data)

  const handleAddPublication = () => {
    const newPublication: Publication = {
      title: "",
      journal: "",
      date: "",
      authors: "",
      description: "",
    }
    const updatedPublications = [...publications, newPublication]
    setPublications(updatedPublications)
    updateData(updatedPublications)
  }

  const handleRemovePublication = (index: number) => {
    const updatedPublications = publications.filter((_, i) => i !== index)
    setPublications(updatedPublications)
    updateData(updatedPublications)
  }

  const handleChange = (index: number, field: keyof Publication, value: string) => {
    const updatedPublications = [...publications]
    updatedPublications[index] = {
      ...updatedPublications[index],
      [field]: value,
    }
    setPublications(updatedPublications)
    updateData(updatedPublications)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Publications</h2>

      {publications.map((publication, index) => (
        <Card key={index} className="mb-4">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Publication #{index + 1}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemovePublication(index)}
              className="h-8 w-8 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div>
              <Label htmlFor={`title-${index}`}>Publication Title</Label>
              <Input
                id={`title-${index}`}
                value={publication.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                placeholder="Machine Learning Applications in Natural Language Processing"
              />
            </div>

            <div>
              <Label htmlFor={`journal-${index}`}>Journal/Conference</Label>
              <Input
                id={`journal-${index}`}
                value={publication.journal}
                onChange={(e) => handleChange(index, "journal", e.target.value)}
                placeholder="Journal of Computer Science"
              />
            </div>

            <div>
              <Label htmlFor={`date-${index}`}>Publication Date</Label>
              <Input
                id={`date-${index}`}
                value={publication.date}
                onChange={(e) => handleChange(index, "date", e.target.value)}
                placeholder="Month Year"
              />
            </div>

            <div>
              <Label htmlFor={`authors-${index}`}>Authors</Label>
              <Input
                id={`authors-${index}`}
                value={publication.authors}
                onChange={(e) => handleChange(index, "authors", e.target.value)}
                placeholder="John Doe, Jane Smith, et al."
              />
            </div>

            <div>
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                value={publication.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                placeholder="Brief description of the publication and its significance"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAddPublication} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Publication
      </Button>
    </div>
  )
}

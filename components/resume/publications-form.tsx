"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
      authors: "",
      venue: "",
      year: "",
      doi: "",
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
              <Label htmlFor={`venue-${index}`}>Journal/Conference</Label>
              <Input
                id={`venue-${index}`}
                value={publication.venue}
                onChange={(e) => handleChange(index, "venue", e.target.value)}
                placeholder="Journal of Computer Science"
              />
            </div>

            <div>
              <Label htmlFor={`year-${index}`}>Publication Year</Label>
              <Input
                id={`year-${index}`}
                value={publication.year}
                onChange={(e) => handleChange(index, "year", e.target.value)}
                placeholder="2025"
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
              <Label htmlFor={`doi-${index}`}>DOI</Label>
              <Input
                id={`doi-${index}`}
                value={publication.doi}
                onChange={(e) => handleChange(index, "doi", e.target.value)}
                placeholder="10.1000/example"
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

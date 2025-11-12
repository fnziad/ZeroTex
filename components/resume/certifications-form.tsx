"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"

interface Certification {
  name: string
  issuer: string
  date: string
}

interface CertificationsFormProps {
  data: Certification[]
  updateData: (data: Certification[]) => void
}

export default function CertificationsForm({ data, updateData }: CertificationsFormProps) {
  const [certifications, setCertifications] = useState<Certification[]>(data)

  const handleAddCertification = () => {
    const newCertification: Certification = {
      name: "",
      issuer: "",
      date: "",
    }
    const updatedCertifications = [...certifications, newCertification]
    setCertifications(updatedCertifications)
    updateData(updatedCertifications)
  }

  const handleRemoveCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index)
    setCertifications(updatedCertifications)
    updateData(updatedCertifications)
  }

  const handleChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = [...certifications]
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    }
    setCertifications(updatedCertifications)
    updateData(updatedCertifications)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Certifications</h2>

      {certifications.map((certification, index) => (
        <Card key={index} className="mb-4">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Certification #{index + 1}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveCertification(index)}
              className="h-8 w-8 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div>
              <Label htmlFor={`name-${index}`}>Certification Name</Label>
              <Input
                id={`name-${index}`}
                value={certification.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div>
              <Label htmlFor={`issuer-${index}`}>Issuing Organization</Label>
              <Input
                id={`issuer-${index}`}
                value={certification.issuer}
                onChange={(e) => handleChange(index, "issuer", e.target.value)}
                placeholder="Survey Corps High Command"
              />
            </div>

            <div>
              <Label htmlFor={`date-${index}`}>Date</Label>
              <Input
                id={`date-${index}`}
                value={certification.date}
                onChange={(e) => handleChange(index, "date", e.target.value)}
                placeholder="Month Year"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAddCertification} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Certification
      </Button>
    </div>
  )
}

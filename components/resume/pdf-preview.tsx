"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { jsPDF } from "jspdf"
import type { ResumeData } from "@/lib/resume-types"

interface PDFPreviewProps {
  data: ResumeData
}

export default function PDFPreview({ data }: PDFPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDFInBrowser = async () => {
    setIsGenerating(true)

    try {
      // Create a new PDF document
      const doc = new jsPDF()

      // Add a title
      doc.setFontSize(18)
      doc.text(data.personal.fullName || "Resume", 105, 20, { align: "center" })

      // Add contact information with clickable links
      doc.setFontSize(10)
      let contactY = 30
      const contactParts: string[] = []
      
      if (data.personal.email) contactParts.push(`Email: ${data.personal.email}`)
      if (data.personal.phone) contactParts.push(`Phone: ${data.personal.phone}`)
      if (data.personal.location) contactParts.push(data.personal.location)
      
      if (contactParts.length > 0) {
        doc.text(contactParts.join(" | "), 105, contactY, { align: "center" })
        contactY += 6
      }
      
      // Add profile links
      const linkParts: string[] = []
      if (data.personal.website) linkParts.push(`Website: ${data.personal.website}`)
      if (data.personal.linkedin) linkParts.push(`LinkedIn: ${data.personal.linkedin}`)
      if (data.personal.github) linkParts.push(`GitHub: ${data.personal.github}`)
      
      // Add custom links
      if (data.personal.customLinks) {
        const customLinks = data.personal.customLinks.split('\n').filter(l => l.trim())
        customLinks.forEach(link => {
          const match = link.match(/^([^:]+):\s*(.+)$/)
          if (match) {
            const [, label] = match
            linkParts.push(label.trim())
          }
        })
      }
      
      if (linkParts.length > 0) {
        doc.text(linkParts.join(" | "), 105, contactY, { align: "center" })
        contactY += 4
      }

      // Add sections
      let yPosition = contactY + 6

      // Education section
      if (data.education.length > 0) {
        doc.setFontSize(14)
        doc.text("Education", 20, yPosition)
        yPosition += 10

        data.education.forEach((edu) => {
          doc.setFontSize(12)
          doc.text(`${edu.institution}`, 20, yPosition)
          doc.text(`${edu.startDate} - ${edu.endDate}`, 190, yPosition, { align: "right" })
          yPosition += 5

          doc.setFontSize(10)
          doc.text(`${edu.degree}`, 20, yPosition)
          doc.text(`${edu.location}`, 190, yPosition, { align: "right" })
          yPosition += 5

          if (edu.gpa) {
            doc.text(`GPA: ${edu.gpa}`, 20, yPosition)
            yPosition += 5
          }

          yPosition += 5
        })
      }

      // Experience section
      if (data.experience.length > 0) {
        doc.setFontSize(14)
        doc.text("Experience", 20, yPosition)
        yPosition += 10

        data.experience.forEach((exp) => {
          doc.setFontSize(12)
          doc.text(`${exp.title}`, 20, yPosition)
          doc.text(`${exp.startDate} - ${exp.endDate}`, 190, yPosition, { align: "right" })
          yPosition += 5

          doc.setFontSize(10)
          doc.text(`${exp.company}`, 20, yPosition)
          doc.text(`${exp.location}`, 190, yPosition, { align: "right" })
          yPosition += 5

          exp.responsibilities.forEach((resp) => {
            if (resp) {
              doc.text(`• ${resp}`, 25, yPosition)
              yPosition += 5
            }
          })

          yPosition += 5
        })
      }

      // Save the PDF
      doc.save(`${data.personal.fullName || "resume"}.pdf`)
    } catch (error) {
      console.error("Error generating PDF in browser:", error)
      alert("There was an error generating the PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="mb-4">Generate a simple PDF preview directly in your browser</p>
        <Button onClick={generatePDFInBrowser} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Browser PDF"
          )}
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          Note: This generates a simplified PDF directly in the browser. For a LaTeX-quality PDF, you would need a
          server with LaTeX installed.
        </p>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import type { ResumeData } from "@/lib/resume-types"
import { generateBrowserPDF } from "@/lib/browser-pdf-generator"

interface PDFPreviewProps {
  data: ResumeData
}

export default function PDFPreview({ data }: PDFPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDFInBrowser = async () => {
    setIsGenerating(true)

    try {
      generateBrowserPDF(data)
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

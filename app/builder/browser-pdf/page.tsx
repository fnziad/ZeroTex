"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import PDFPreview from "@/components/resume/pdf-preview"
import ResumePreview from "@/components/resume/resume-preview"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from "@/lib/resume-types"

export default function BrowserPDFPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Try to load resume data from localStorage
    try {
      const savedData = localStorage.getItem("resumeData")
      if (savedData) {
        setResumeData(JSON.parse(savedData))
      } else {
        toast({
          title: "No Resume Data Found",
          description: "Please create a resume first in the builder.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading resume data:", error)
      toast({
        title: "Error Loading Data",
        description: "There was an error loading your resume data.",
        variant: "destructive",
      })
    }
  }, [toast])

  if (!resumeData) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Browser PDF Generator</h1>
        <p className="mb-4">No resume data found. Please create a resume first.</p>
        <Button asChild>
          <a href="/builder">Go to Resume Builder</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Browser PDF Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
          <div className="border rounded-lg p-4 bg-white h-[600px] overflow-auto">
            <ResumePreview data={resumeData} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">PDF Generation</h2>
          <PDFPreview data={resumeData} />

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">Alternative PDF Generation Options</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Client-side PDF generation</strong> - Uses libraries like jsPDF to create PDFs directly in the
                browser
              </li>
              <li>
                <strong>Server-side LaTeX compilation</strong> - Sends LaTeX code to a server with pdflatex installed
              </li>
              <li>
                <strong>Third-party LaTeX APIs</strong> - Uses services like Overleaf API to compile LaTeX remotely
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button asChild>
          <a href="/builder">Back to Resume Builder</a>
        </Button>
      </div>
    </div>
  )
}

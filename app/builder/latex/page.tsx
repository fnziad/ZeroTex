"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LatexCodeDisplay from "@/components/resume/latex-code-display"
import ResumePreview from "@/components/resume/resume-preview"
import { useToast } from "@/hooks/use-toast"
import { generateLatex } from "@/lib/latex-generator"
import type { ResumeData } from "@/lib/resume-types"
import { ExternalLink } from "lucide-react"

export default function LatexPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [latex, setLatex] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    // Try to load resume data from localStorage
    try {
      const savedData = localStorage.getItem("resumeData")
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setResumeData(parsedData)
        setLatex(generateLatex(parsedData))
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

  const handleOpenInOverleaf = () => {
    try {
      // Create a blob with the LaTeX content
      const blob = new Blob([latex], { type: "text/plain" })

      // Create a form to submit to Overleaf
      const form = document.createElement("form")
      form.action = "https://www.overleaf.com/docs"
      form.method = "post"
      form.target = "_blank"

      // Create a hidden input for the snip parameter
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = "snip"

      // Read the blob as text
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          input.value = reader.result

          // Append the input to the form
          form.appendChild(input)

          // Append the form to the body
          document.body.appendChild(form)

          // Submit the form
          form.submit()

          // Clean up
          document.body.removeChild(form)
        }
      }
      reader.readAsText(blob)

      toast({
        title: "Opening in Overleaf",
        description: "Your resume is being opened in Overleaf for LaTeX compilation.",
      })
    } catch (error) {
      console.error("Error opening in Overleaf:", error)
      toast({
        title: "Error Opening in Overleaf",
        description: "There was an error opening your resume in Overleaf. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!resumeData) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">LaTeX Preview</h1>
        <p className="mb-4">No resume data found. Please create a resume first.</p>
        <Button asChild>
          <a href="/builder">Go to Resume Builder</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">LaTeX Preview</h1>

      <div className="mb-6 text-center">
        <Button onClick={handleOpenInOverleaf} className="mx-auto">
          <ExternalLink className="mr-2 h-4 w-4" />
          Open in Overleaf
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Overleaf will compile your LaTeX code into a professional PDF
        </p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="preview">Resume Preview</TabsTrigger>
          <TabsTrigger value="latex">LaTeX Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="border rounded-lg p-4 bg-white min-h-[800px]">
            <ResumePreview data={resumeData} />
          </div>
        </TabsContent>

        <TabsContent value="latex">
          <LatexCodeDisplay latex={latex} />
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center">
        <Button asChild>
          <a href="/builder">Back to Resume Builder</a>
        </Button>
      </div>
    </div>
  )
}

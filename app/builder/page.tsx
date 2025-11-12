"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Download, FileText, ExternalLink, Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import PersonalInfoForm from "@/components/resume/personal-info-form"
import EducationForm from "@/components/resume/education-form"
import ResearchInterestsForm from "@/components/resume/research-interests-form"
import ResearchExperienceForm from "@/components/resume/research-experience-form"
import ExperienceForm from "@/components/resume/experience-form"
import SkillsForm from "@/components/resume/skills-form"
import AwardsForm from "@/components/resume/awards-form"
import InterestsForm from "@/components/resume/interests-form"
import CustomSectionForm from "@/components/resume/custom-section-form"
import ProjectsForm from "@/components/resume/projects-form"
import CertificationsForm from "@/components/resume/certifications-form"
import PublicationsForm from "@/components/resume/publications-form"
import ExecutiveSummaryForm from "@/components/resume/executive-summary-form"
import SectionManager from "@/components/resume/section-manager"
import ResumePreview from "@/components/resume/resume-preview"
import MultiPagePreview from "@/components/resume/multi-page-preview"
import PrintResume from "@/components/resume/print-resume"
import { generateLatex } from "@/lib/latex-generator"
import { generateBrowserPDF } from "@/lib/browser-pdf-generator"
import { type ResumeData, type ResumeSection, type SectionType, defaultResumeData } from "@/lib/resume-types"
import { exampleResumeData } from "@/lib/example-data"
import { ZeroTexIcon } from "@/components/zerotex-logo"

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingLatex, setIsGeneratingLatex] = useState(false)
  const [showPrintView, setShowPrintView] = useState(false)
  const { toast } = useToast()

  // Load saved data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setResumeData(parsed)
        toast({
          title: "Resume Data Loaded",
          description: "Your previously saved resume data has been loaded.",
        })
      } catch (error) {
        console.error("Error parsing saved data:", error)
      }
    }
  }, [toast])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  // Update personal info
  const updatePersonalInfo = (data: any) => {
    setResumeData((prev) => ({
      ...prev,
      personal: data,
    }))
  }

  // Update section data
  const updateSectionData = (sectionId: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, data } : section
      ),
    }))
  }

  // Section manager handlers
  const handleAddSection = (type: SectionType, title: string) => {
    // Determine initial data based on type
    let initialData: any = ""
    
    if (type === "skills") {
      initialData = { categories: [] }
    } else if (type === "awards") {
      initialData = { categories: [] }
    } else if (["education", "research-experience", "experience", "professional-experience", "extracurricular", "projects", "publications", "certifications"].includes(type)) {
      initialData = []
    }
    
    const newSection: ResumeSection = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      order: resumeData.sections.length,
      visible: true,
      data: initialData,
    }
    setResumeData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
    setSelectedSectionId(newSection.id)
  }

  const handleRemoveSection = (sectionId: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }))
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null)
    }
  }

  const handleToggleVisibility = (sectionId: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      ),
    }))
  }

  const handleReorder = (sections: ResumeSection[]) => {
    setResumeData((prev) => ({
      ...prev,
      sections,
    }))
  }

  const handleGeneratePDF = () => {
    // Use browser's native print-to-PDF for perfect output
    setShowPrintView(true)
    toast({
      title: "Opening Print Dialog",
      description: "Use 'Save as PDF' in the print dialog to download your resume.",
    })
  }

  const handleLegacyPDF = async () => {
    // Fallback jsPDF method (lower quality)
    setIsGenerating(true)

    try {
      console.log("Starting PDF generation with data:", resumeData)
      await generateBrowserPDF(resumeData, "classic")

      toast({
        title: "PDF Generated Successfully",
        description: "Your resume PDF has been generated and downloaded.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      console.error("Error details:", error instanceof Error ? error.message : String(error))
      toast({
        title: "Error Generating PDF",
        description: error instanceof Error ? error.message : "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateLatex = () => {
    setIsGeneratingLatex(true)

    try {
      const latex = generateLatex(resumeData, "classic")

      // Create a blob with the LaTeX content
      const blob = new Blob([latex], { type: "text/plain" })

      // Create a download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${resumeData.personal.fullName || "resume"}.tex`

      // Trigger the download
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "LaTeX Generated Successfully",
        description: "Your LaTeX file has been downloaded. You can compile it with a LaTeX compiler.",
      })
    } catch (error) {
      console.error("Error generating LaTeX:", error)
      toast({
        title: "Error Generating LaTeX",
        description: "There was an error generating your LaTeX file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingLatex(false)
    }
  }

  const handleOpenInOverleaf = () => {
    try {
      const latex = generateLatex(resumeData, "classic")

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
  const handleLoadExample = () => {
    try {
      // Deep clone to avoid reference issues
      const exampleDataCopy = JSON.parse(JSON.stringify(exampleResumeData))
      setResumeData(exampleDataCopy)
      setSelectedSectionId(null)
      
      toast({
        title: "✅ Example Loaded!",
        description: "Levi Ackerman's resume loaded successfully. Feel free to edit!",
      })
    } catch (error) {
      console.error("Error loading example:", error)
      toast({
        title: "Error Loading Example",
        description: "There was an error loading the example resume. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Get the selected section
  const selectedSection = selectedSectionId
    ? resumeData.sections.find((s) => s.id === selectedSectionId)
    : null

  // Render form based on section type
  const renderForm = () => {
    if (!selectedSection) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>Select a section from the left to edit its content.</p>
          <p className="text-sm mt-2">Or add a new section to get started.</p>
        </div>
      )
    }

    const commonProps = {
      data: selectedSection.data,
      updateData: (data: any) => updateSectionData(selectedSection.id, data),
    }

    switch (selectedSection.type) {
      case "executive-summary":
        return <ExecutiveSummaryForm {...commonProps} />
      case "education":
        return <EducationForm {...commonProps} />
      case "research-interests":
        return <ResearchInterestsForm {...commonProps} />
      case "research-experience":
        return <ResearchExperienceForm {...commonProps} />
      case "experience":
      case "professional-experience":
      case "extracurricular":
        return <ExperienceForm {...commonProps} />
      case "projects":
        return <ProjectsForm {...commonProps} />
      case "publications":
        return <PublicationsForm {...commonProps} />
      case "certifications":
        return <CertificationsForm {...commonProps} />
      case "skills":
        return <SkillsForm {...commonProps} />
      case "awards":
        return <AwardsForm {...commonProps} />
      case "interests":
      case "languages":
        return <InterestsForm {...commonProps} />
      case "custom":
        return <CustomSectionForm {...commonProps} />
      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <p>Form for "{selectedSection.type}" is not yet implemented.</p>
          </div>
        )
    }
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left side - Scrollable workspace */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          {/* Header with logo and actions */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ZeroTexIcon size={28} />
              <span className="text-sm font-semibold">ZeroTex</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button 
                onClick={handleLoadExample} 
                size="sm" 
                variant="secondary"
                className="text-xs"
              >
                <FileText className="mr-1 h-3 w-3" />
                Load Example
              </Button>
              <Button 
                onClick={handleOpenInOverleaf} 
                size="sm" 
                variant="outline"
                className="text-xs"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                Overleaf
              </Button>
              <Button 
                onClick={handleGenerateLatex} 
                size="sm" 
                variant="outline"
                disabled={isGenerating}
                className="text-xs"
              >
                <FileText className="mr-1 h-3 w-3" />
                .tex
              </Button>
              <Button 
                onClick={handleGeneratePDF} 
                size="sm"
                className="text-xs bg-blue-600 hover:bg-blue-700"
                title="Print to PDF (Perfect Quality)"
              >
                <Printer className="mr-1 h-3 w-3" />
                PDF
              </Button>
            </div>
          </div>

          {/* Personal Info - Always shown */}
          <Card className="p-4">
            <h2 className="text-base font-semibold mb-3">Personal Information</h2>
            <PersonalInfoForm data={resumeData.personal} updateData={updatePersonalInfo} />
          </Card>

          {/* Section Manager */}
          <Card className="p-4">
            <h2 className="text-base font-semibold mb-3">Sections</h2>
            <SectionManager
              sections={resumeData.sections}
              activeSection={selectedSectionId}
              onSectionClick={setSelectedSectionId}
              onAddSection={handleAddSection}
              onRemoveSection={handleRemoveSection}
              onToggleVisibility={handleToggleVisibility}
              onReorder={handleReorder}
            />
          </Card>

          {/* Selected Section Form */}
          {selectedSection && (
            <Card className="p-4">
              <h2 className="text-base font-semibold mb-3">{selectedSection.title}</h2>
              {renderForm()}
            </Card>
          )}
        </motion.div>
        </div>
      </div>

      {/* Right side - Scrollable preview (Overleaf style) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:flex flex-col bg-gray-900"
        style={{ width: "50%", height: "100vh" }}
      >
        {/* Minimal header */}
        <div className="px-3 py-2 bg-gray-950 border-b border-gray-800">
          <h2 className="text-xs font-medium text-gray-400">PDF Preview</h2>
        </div>
        
        {/* Scrollable preview container - Overleaf style with real multi-page rendering */}
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ 
            background: '#525659',
            scrollbarWidth: 'thin',
            scrollbarColor: '#4B5563 #1F2937'
          }}
        >
          <div className="flex flex-col items-center gap-3 py-4 px-3">
            <MultiPagePreview data={resumeData} />
          </div>
        </div>
      </motion.div>

      {/* Print View Modal */}
      {showPrintView && (
        <PrintResume 
          data={resumeData} 
          onClose={() => setShowPrintView(false)} 
        />
      )}
    </div>
  )
}

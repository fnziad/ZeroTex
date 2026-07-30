"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ExternalLink, FileText, Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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
import MultiPagePreview from "@/components/resume/multi-page-preview"
import PrintResume from "@/components/resume/print-resume"
import { ResumeDataActions } from "@/components/resume/resume-data-actions"
import { generateLatex } from "@/lib/latex-generator"
import {
  LEGACY_RESUME_STORAGE_KEY,
  RESUME_RECOVERY_STORAGE_KEY,
  RESUME_STORAGE_KEY,
  parseResumeDocument,
  serializeResumeDocument,
} from "@/lib/resume-document"
import { type ResumeData, type ResumeSection, type SectionType, defaultResumeData } from "@/lib/resume-types"
import { exampleResumeData } from "@/lib/example-data"
import { ZeroTexIcon } from "@/components/zerotex-logo"

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [isGeneratingLatex, setIsGeneratingLatex] = useState(false)
  const [showPrintView, setShowPrintView] = useState(false)
  const [isStorageReady, setIsStorageReady] = useState(false)
  const { toast } = useToast()

  // Hydrate once before enabling autosave so defaults cannot overwrite stored data.
  useEffect(() => {
    const currentDocument = localStorage.getItem(RESUME_STORAGE_KEY)
    const legacyDocument = localStorage.getItem(LEGACY_RESUME_STORAGE_KEY)
    const savedDocument = currentDocument ?? legacyDocument
    let canEnableAutosave = true

    if (savedDocument) {
      try {
        const parsed = parseResumeDocument(savedDocument)
        setResumeData(parsed.data)

        if (legacyDocument || parsed.migratedFromLegacy) {
          localStorage.setItem(RESUME_STORAGE_KEY, serializeResumeDocument(parsed.data))
          localStorage.removeItem(LEGACY_RESUME_STORAGE_KEY)
        }

        toast({
          title: parsed.migratedFromLegacy ? "Resume data upgraded" : "Resume data loaded",
          description: parsed.migratedFromLegacy
            ? "Your saved resume was migrated to the current format."
            : "Your locally saved resume has been restored.",
        })
      } catch (error) {
        console.error("Error parsing saved data:", error)
        try {
          localStorage.setItem(RESUME_RECOVERY_STORAGE_KEY, savedDocument)
        } catch (recoveryError) {
          console.error("Error preserving invalid resume data:", recoveryError)
          canEnableAutosave = false
        }
        toast({
          title: "Saved resume could not be loaded",
          description: `${
            error instanceof Error ? error.message : "The saved data is invalid."
          } ${
            canEnableAutosave
              ? "A recovery copy was preserved locally."
              : "Autosave was disabled to avoid overwriting it."
          }`,
          variant: "destructive",
        })
      }
    }

    setIsStorageReady(canEnableAutosave)
  }, [toast])

  // Persist a versioned document only after hydration has completed.
  useEffect(() => {
    if (!isStorageReady) return

    try {
      localStorage.setItem(RESUME_STORAGE_KEY, serializeResumeDocument(resumeData))
    } catch (error) {
      console.error("Error saving resume data:", error)
    }
  }, [isStorageReady, resumeData])

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

  const handleImportResume = (data: ResumeData) => {
    setResumeData(data)
    setSelectedSectionId(null)
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
      key: selectedSection.id,
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
            <p>Form for &ldquo;{selectedSection.type}&rdquo; is not yet implemented.</p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <section className="flex min-w-0 flex-1 flex-col bg-background lg:w-1/2" aria-label="Resume editor">
        <header className="shrink-0 border-b bg-background/95 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Return to ZeroTeX home">
              <span className="flex size-8 items-center justify-center rounded-lg border bg-muted/40 transition-colors group-hover:bg-muted">
                <ZeroTexIcon size={20} />
              </span>
              <span>
                <span className="block text-sm font-semibold tracking-[-0.02em]">ZeroTeX</span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <CheckCircle2 className="size-2.5 text-emerald-500" aria-hidden="true" />
                  {isStorageReady ? "Saved locally" : "Local draft"}
                </span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              <ResumeDataActions data={resumeData} onImport={handleImportResume} />
              <Button
                onClick={handleLoadExample}
                size="sm"
                variant="ghost"
                className="h-8 rounded-md px-2.5 text-xs"
              >
                <FileText className="size-3.5" aria-hidden="true" />
                Example
              </Button>
              <Button
                onClick={handleOpenInOverleaf}
                size="sm"
                variant="outline"
                className="h-8 rounded-md px-2.5 text-xs"
              >
                <ExternalLink className="size-3.5" aria-hidden="true" />
                Overleaf
              </Button>
              <Button
                onClick={handleGenerateLatex}
                size="sm"
                variant="outline"
                disabled={isGeneratingLatex}
                className="h-8 rounded-md px-2.5 font-mono text-xs"
              >
                <FileText className="size-3.5" aria-hidden="true" />
                .tex
              </Button>
              <Button
                onClick={handleGeneratePDF}
                size="sm"
                className="h-8 rounded-md px-2.5 text-xs shadow-sm"
                title="Print or save as PDF"
              >
                <Printer className="size-3.5" aria-hidden="true" />
                PDF
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-muted/25">
          <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
            <Card className="rounded-2xl border-border/70 bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-primary">Profile</p>
                <h1 className="mt-1.5 text-lg font-medium tracking-tight">Personal information</h1>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">The contact details shown at the top of your resume.</p>
              </div>
              <PersonalInfoForm data={resumeData.personal} updateData={updatePersonalInfo} />
            </Card>

            <Card className="rounded-2xl border-border/70 bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-primary">Structure</p>
                <h2 className="mt-1.5 text-lg font-medium tracking-tight">Resume sections</h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Choose what to show and arrange the reading order.</p>
              </div>
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

            {selectedSection && (
              <Card className="rounded-2xl border-border/70 bg-card p-5 shadow-sm sm:p-6">
                <div className="mb-5">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-primary">Editing</p>
                  <h2 className="mt-1.5 text-lg font-medium tracking-tight">{selectedSection.title}</h2>
                </div>
                {renderForm()}
              </Card>
            )}
          </div>
        </div>
      </section>

      <aside className="hidden min-w-0 flex-1 flex-col bg-[#2f3237] lg:flex" aria-label="Live PDF preview">
        <div className="flex h-[57px] shrink-0 items-center justify-between border-b border-white/10 bg-[#17191d] px-4">
          <div>
            <h2 className="text-xs font-medium text-white/85">Live preview</h2>
            <p className="mt-0.5 text-[10px] text-white/40">Updates as you edit</p>
          </div>
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/55">A4 · scrollable</span>
        </div>
        <div className="flex-1 overflow-x-hidden overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#5b6068 #2f3237" }}>
          <div className="flex flex-col items-center gap-4 px-5 py-7">
            <MultiPagePreview data={resumeData} />
          </div>
        </div>
      </aside>

      {showPrintView && (
        <PrintResume data={resumeData} onClose={() => setShowPrintView(false)} />
      )}
    </div>
  )
}

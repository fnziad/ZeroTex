"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Download, FileText, ExternalLink, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import PersonalInfoForm from "@/components/resume/personal-info-form"
import EducationForm from "@/components/resume/education-form"
import ExperienceForm from "@/components/resume/experience-form"
import ProjectsForm from "@/components/resume/projects-form"
import SkillsForm from "@/components/resume/skills-form"
import CertificationsForm from "@/components/resume/certifications-form"
import PublicationsForm from "@/components/resume/publications-form"
import ExecutiveSummaryForm from "@/components/resume/executive-summary-form"
import TemplateSelector from "@/components/resume/template-selector"
import ResumePreview from "@/components/resume/resume-preview"
import { generateLatex } from "@/lib/latex-generator"
import { generateBrowserPDF } from "@/lib/browser-pdf-generator"
import { type ResumeData, defaultResumeData } from "@/lib/resume-types"
import { templates } from "@/lib/templates"

export default function BuilderPage() {
  const searchParams = useSearchParams()
  const templateParam = searchParams.get("template")

  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [activeTab, setActiveTab] = useState("personal")
  const [selectedTemplate, setSelectedTemplate] = useState(templateParam || "classic")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingLatex, setIsGeneratingLatex] = useState(false)
  const [latexCode, setLatexCode] = useState<string | null>(null)
  const { toast } = useToast()

  // Load saved data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData))
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

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)

    try {
      await generateBrowserPDF(resumeData, selectedTemplate)

      toast({
        title: "PDF Generated Successfully",
        description: "Your resume PDF has been generated and downloaded.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error Generating PDF",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateLatex = () => {
    setIsGeneratingLatex(true)

    try {
      const latex = generateLatex(resumeData, selectedTemplate)
      setLatexCode(latex)

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
      const latex = generateLatex(resumeData, selectedTemplate)

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

  const nextTab = () => {
    const tabs = [
      "personal",
      "education",
      "experience",
      "projects",
      "skills",
      "certifications",
      "publications",
      "executive",
      "template",
      "preview",
    ]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const prevTab = () => {
    const tabs = [
      "personal",
      "education",
      "experience",
      "projects",
      "skills",
      "certifications",
      "publications",
      "executive",
      "template",
      "preview",
    ]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  // Determine if we should show the publications tab based on template
  const showPublications = selectedTemplate === "academic"

  // Determine if we should show the executive summary tab based on template
  const showExecutiveSummary = selectedTemplate === "executive"

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-center dark:cyber-glow"
      >
        Build Your Resume
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="certifications">Certs</TabsTrigger>
              {showPublications && <TabsTrigger value="publications">Publications</TabsTrigger>}
              {showExecutiveSummary && <TabsTrigger value="executive">Executive</TabsTrigger>}
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <Card className="p-4 dark:cyber-border">
              <TabsContent value="personal">
                <PersonalInfoForm
                  data={resumeData.personal}
                  updateData={(data) => updateResumeData("personal", data)}
                />
              </TabsContent>

              <TabsContent value="education">
                <EducationForm data={resumeData.education} updateData={(data) => updateResumeData("education", data)} />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceForm
                  data={resumeData.experience}
                  updateData={(data) => updateResumeData("experience", data)}
                />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsForm data={resumeData.projects} updateData={(data) => updateResumeData("projects", data)} />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsForm data={resumeData.skills} updateData={(data) => updateResumeData("skills", data)} />
              </TabsContent>

              <TabsContent value="certifications">
                <CertificationsForm
                  data={resumeData.certifications}
                  updateData={(data) => updateResumeData("certifications", data)}
                />
              </TabsContent>

              <TabsContent value="publications">
                <PublicationsForm
                  data={resumeData.publications}
                  updateData={(data) => updateResumeData("publications", data)}
                />
              </TabsContent>

              <TabsContent value="executive">
                <ExecutiveSummaryForm
                  data={resumeData.executiveSummary}
                  updateData={(data) => updateResumeData("executiveSummary", data)}
                />
              </TabsContent>

              <TabsContent value="template">
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                  templates={Object.values(templates)}
                />
              </TabsContent>

              <TabsContent value="preview">
                <div className="text-center space-y-4">
                  <p className="mb-4">Review your resume before generating files</p>

                  <div className="grid grid-cols-1 gap-2">
                    <Button onClick={handleOpenInOverleaf} className="w-full dark:cyber-button">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in Overleaf (LaTeX PDF)
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={handleGeneratePDF} disabled={isGenerating} variant="outline" className="w-full">
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            PDF Preview
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={handleGenerateLatex}
                        disabled={isGeneratingLatex}
                        variant="outline"
                        className="w-full"
                      >
                        {isGeneratingLatex ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Download LaTeX
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-md text-left">
                    <h3 className="font-medium text-sm mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-primary" />
                      LaTeX for Professional Excellence
                    </h3>
                    <ol className="text-xs text-muted-foreground list-decimal pl-4 space-y-1">
                      <li>Click "Open in Overleaf" to open your resume in Overleaf (a LaTeX editor)</li>
                      <li>Overleaf will automatically compile your LaTeX code into a professional PDF</li>
                      <li>Download the PDF from Overleaf when you're satisfied with the result</li>
                      <li>
                        LaTeX is the preferred format for academic and professional documents due to its superior
                        typography
                      </li>
                    </ol>
                  </div>
                </div>
              </TabsContent>

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={prevTab} disabled={activeTab === "personal"}>
                  Previous
                </Button>
                <Button onClick={nextTab} disabled={activeTab === "preview"} className="dark:cyber-button">
                  Next
                </Button>
              </div>
            </Card>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block"
        >
          <h2 className="text-xl font-semibold mb-4 dark:cyber-glow">Live Preview</h2>
          <div className="border rounded-lg p-4 bg-background h-[800px] overflow-auto resume-preview transition-all duration-300">
            <ResumePreview data={resumeData} templateId={selectedTemplate} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Tabs,
  Tab,
  Box,
  Container,
  Paper,
  Button,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import PersonalInfoForm from "./components/forms/PersonalInfoForm"
import EducationForm from "./components/forms/EducationForm"
import ExperienceForm from "./components/forms/ExperienceForm"
import SkillsForm from "./components/forms/SkillsForm"
import ProjectsForm from "./components/forms/ProjectsForm"
import CertificationsForm from "./components/forms/CertificationsForm"
import PublicationsForm from "./components/forms/PublicationsForm"
import ExecutiveSummaryForm from "./components/forms/ExecutiveSummaryForm"
import TemplateSelector from "./components/TemplateSelector"
import ResumePreview from "./components/ResumePreview"
import { defaultResumeData } from "./data/resumeData"
import { generatePDF } from "./utils/pdfGenerator"
import "./App.css"

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const [activeTab, setActiveTab] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState("simple")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // Load saved data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error parsing saved data:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const updateResumeData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generatePDF(resumeData, selectedTemplate)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className="app-container">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Resume Builder
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          {/* Form Section */}
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3 }}
              >
                <Tab label="Personal" />
                <Tab label="Education" />
                <Tab label="Experience" />
                <Tab label="Skills" />
                <Tab label="Projects" />
                <Tab label="Certifications" />
                <Tab label="Publications" />
                <Tab label="Executive" />
                <Tab label="Template" />
              </Tabs>

              {activeTab === 0 && (
                <PersonalInfoForm
                  data={resumeData.personal}
                  updateData={(data) => updateResumeData("personal", data)}
                />
              )}
              {activeTab === 1 && (
                <EducationForm data={resumeData.education} updateData={(data) => updateResumeData("education", data)} />
              )}
              {activeTab === 2 && (
                <ExperienceForm
                  data={resumeData.experience}
                  updateData={(data) => updateResumeData("experience", data)}
                />
              )}
              {activeTab === 3 && (
                <SkillsForm data={resumeData.skills} updateData={(data) => updateResumeData("skills", data)} />
              )}
              {activeTab === 4 && (
                <ProjectsForm data={resumeData.projects} updateData={(data) => updateResumeData("projects", data)} />
              )}
              {activeTab === 5 && (
                <CertificationsForm
                  data={resumeData.certifications}
                  updateData={(data) => updateResumeData("certifications", data)}
                />
              )}
              {activeTab === 6 && (
                <PublicationsForm
                  data={resumeData.publications}
                  updateData={(data) => updateResumeData("publications", data)}
                />
              )}
              {activeTab === 7 && (
                <ExecutiveSummaryForm
                  data={resumeData.executiveSummary}
                  updateData={(data) => updateResumeData("executiveSummary", data)}
                />
              )}
              {activeTab === 8 && (
                <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
              )}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                  disabled={activeTab === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setActiveTab((prev) => Math.min(8, prev + 1))}
                  disabled={activeTab === 8}
                >
                  Next
                </Button>
              </Box>
            </Paper>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
            </Button>
          </Box>

          {/* Preview Section */}
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Paper elevation={3} sx={{ p: 3, height: "800px", overflow: "auto" }}>
              <Typography variant="h6" gutterBottom>
                Live Preview
              </Typography>
              <ResumePreview data={resumeData} templateId={selectedTemplate} />
            </Paper>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App

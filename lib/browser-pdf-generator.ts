"use client"

import { jsPDF } from "jspdf"
import type { ResumeData, ResumeSection } from "./resume-types"

export async function generateBrowserPDF(data: ResumeData, templateId = "classic"): Promise<void> {
  try {
    const doc = new jsPDF()
    
    // Page setup (matching LaTeX generator)
    const pageWidth = doc.internal.pageSize.width
    const margin = 15
    const contentWidth = pageWidth - margin * 2
    
    doc.setFont("times")
    let yPosition = 15

    // Header - Centered name
    doc.setFontSize(16)
    doc.setFont("times", "bold")
    doc.text(data.personal.fullName || "Your Name", pageWidth / 2, yPosition, { align: "center" })
    yPosition += 5

    // Contact info on one line
    doc.setFontSize(10)
    doc.setFont("times", "normal")
    const contactParts = []
    if (data.personal.email) contactParts.push(data.personal.email)
    if (data.personal.phone) contactParts.push(data.personal.phone)
    if (data.personal.location) contactParts.push(data.personal.location)
    if (data.personal.linkedin) contactParts.push(data.personal.linkedin)
    if (data.personal.github) contactParts.push(data.personal.github)
    if (data.personal.website) contactParts.push(data.personal.website)

    const contactLine = contactParts.join(" | ")
    doc.text(contactLine, pageWidth / 2, yPosition, { align: "center" })
    yPosition += 8

    // Horizontal line
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8

    // Render visible sections in order
    const visibleSections = data.sections
      .filter(section => section.visible)
      .sort((a, b) => a.order - b.order)

    // Handle executive summary separately (without section header)
    const execSummary = visibleSections.find(s => s.type === "executive-summary")
    const otherSections = visibleSections.filter(s => s.type !== "executive-summary")

    if (execSummary) {
      doc.setFontSize(10)
      doc.setFont("times", "italic")
      const summaryText = typeof execSummary.data === 'object' && execSummary.data.content 
        ? execSummary.data.content 
        : execSummary.data
      const lines = doc.splitTextToSize(summaryText || "", contentWidth)
      doc.text(lines, margin, yPosition)
      yPosition += lines.length * 5 + 5
    }

    for (const section of otherSections) {
      yPosition = renderSection(doc, section, yPosition, margin, contentWidth, pageWidth)
    }

    // Save the PDF
    doc.save(`${data.personal.fullName || "resume"}.pdf`)
  } catch (error) {
    console.error("Error generating PDF in browser:", error)
    throw new Error("Failed to generate PDF. Please try again.")
  }
}

function checkPageBreak(doc: jsPDF, yPosition: number, spaceNeeded: number, margin: number): number {
  const pageHeight = doc.internal.pageSize.height
  const bottomMargin = 20 // Reasonable margin to avoid cutting off content
  
  if (yPosition + spaceNeeded > pageHeight - bottomMargin) {
    doc.addPage()
    return margin + 15 // Return to top of new page with consistent top margin
  }
  return yPosition
}

function renderSection(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number,
  pageWidth: number
): number {
  // Check if we need a new page for section header
  yPosition = checkPageBreak(doc, yPosition, 12, margin)
  
  // Section header
  doc.setFontSize(12)
  doc.setFont("times", "bold")
  doc.text(section.title, margin, yPosition)
  yPosition += 2

  // Underline
  doc.setLineWidth(0.3)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 6

  doc.setFontSize(10)
  doc.setFont("times", "normal")

  switch (section.type) {
    case "education":
      yPosition = renderEducation(doc, section, yPosition, margin, contentWidth, pageWidth)
      break
    case "research-interests":
      yPosition = renderResearchInterests(doc, section, yPosition, margin, contentWidth)
      break
    case "research-experience":
      yPosition = renderResearchExperience(doc, section, yPosition, margin, contentWidth, pageWidth)
      break
    case "experience":
    case "professional-experience":
    case "extracurricular":
      yPosition = renderExperience(doc, section, yPosition, margin, contentWidth, pageWidth)
      break
    case "projects":
      yPosition = renderProjects(doc, section, yPosition, margin, contentWidth, pageWidth)
      break
    case "publications":
      yPosition = renderPublications(doc, section, yPosition, margin, contentWidth, pageWidth)
      break
    case "certifications":
      yPosition = renderCertifications(doc, section, yPosition, margin, contentWidth, pageWidth)
      break
    case "skills":
      yPosition = renderSkills(doc, section, yPosition, margin, contentWidth)
      break
    case "awards":
      yPosition = renderAwards(doc, section, yPosition, margin, contentWidth)
      break
    case "interests":
    case "languages":
      yPosition = renderInterests(doc, section, yPosition, margin, contentWidth)
      break
    case "custom":
      yPosition = renderCustom(doc, section, yPosition, margin, contentWidth)
      break
  }

  yPosition += 3 // Reduced space between sections from 5 to 3
  return yPosition
}

function renderEducation(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number,
  pageWidth: number
): number {
  const education = section.data as any[]
  
  for (const edu of education) {
    // Check if we need a new page
    yPosition = checkPageBreak(doc, yPosition, 12, margin)
    
    // Institution and date
    doc.setFont("times", "bold")
    doc.text(edu.institution || "", margin, yPosition)
    
    const dateText = `${edu.startDate || ""} - ${edu.endDate || ""}`
    doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
    yPosition += 5

    // Degree and location
    doc.setFont("times", "italic")
    doc.text(edu.degree || "", margin, yPosition)
    
    if (edu.location) {
      doc.text(edu.location, pageWidth - margin, yPosition, { align: "right" })
    }
    yPosition += 5

    if (edu.gpa) {
      doc.setFont("times", "normal")
      doc.text(`GPA: ${edu.gpa}`, margin, yPosition)
      yPosition += 5
    }

    // Relevant coursework
    if (edu.coursework) {
      doc.setFont("times", "normal")
      doc.text(edu.coursework, margin, yPosition)
      yPosition += 5
    }

    // Academic achievements
    if (edu.achievements) {
      doc.setFont("times", "normal")
      doc.text(edu.achievements, margin, yPosition)
      yPosition += 5
    }

    yPosition += 2 // Reduced spacing between entries
  }
  
  return yPosition
}

function renderResearchInterests(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number
): number {
  const data = section.data
  const content = typeof data === 'string' ? data : (data as any).content || ''
  
  if (content) {
    doc.setFont("times", "normal")
    const lines = doc.splitTextToSize(content, contentWidth)
    
    // Render line by line with page break checks
    for (let i = 0; i < lines.length; i++) {
      yPosition = checkPageBreak(doc, yPosition, 5, margin)
      doc.text(lines[i], margin, yPosition)
      yPosition += 5
    }
  }
  
  return yPosition
}

function renderResearchExperience(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number,
  pageWidth: number
): number {
  const projects = section.data as any[]
  
  for (const project of projects) {
    // Check if we need a new page
    yPosition = checkPageBreak(doc, yPosition, 15, margin) // Reduced from 25 to 15
    
    // Project title and date
    doc.setFont("times", "bold")
    doc.text(project.title || "", margin, yPosition)
    
    const dateText = `${project.startDate || ""} - ${project.endDate || ""}`
    doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
    yPosition += 5

    // Institution
    if (project.institution) {
      doc.setFont("times", "italic")
      doc.text(project.institution, margin, yPosition)
      yPosition += 5
    }

    // Course (optional)
    if (project.course) {
      doc.setFont("times", "italic")
      doc.text(project.course, margin, yPosition)
      yPosition += 5
    }

    // Bullets
    doc.setFont("times", "normal")
    for (const bullet of project.bullets || []) {
      if (bullet) {
        const lines = doc.splitTextToSize(bullet, contentWidth - 5)
        
        // Render bullet point and text line by line
        for (let i = 0; i < lines.length; i++) {
          yPosition = checkPageBreak(doc, yPosition, 5, margin)
          
          // Only draw bullet circle on first line
          if (i === 0) {
            doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
          }
          
          doc.text(lines[i], margin + 5, yPosition)
          yPosition += 5
        }
      }
    }

    yPosition += 3
  }
  
  return yPosition
}

function renderExperience(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number,
  pageWidth: number
): number {
  const experiences = section.data as any[]
  
  for (const exp of experiences) {
    // Check if we need a new page
    yPosition = checkPageBreak(doc, yPosition, 15, margin) // Reduced from 25 to 15
    
    // Position and date
    doc.setFont("times", "bold")
    doc.text(exp.position || "", margin, yPosition)
    
    const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
    doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
    yPosition += 5

    // Organization
    if (exp.organization) {
      doc.setFont("times", "italic")
      doc.text(exp.organization, margin, yPosition)
      yPosition += 5
    }

    // Bullets
    doc.setFont("times", "normal")
    for (const bullet of exp.bullets || []) {
      if (bullet) {
        const lines = doc.splitTextToSize(bullet, contentWidth - 5)
        
        // Render bullet point and text line by line
        for (let i = 0; i < lines.length; i++) {
          yPosition = checkPageBreak(doc, yPosition, 5, margin)
          
          // Only draw bullet circle on first line
          if (i === 0) {
            doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
          }
          
          doc.text(lines[i], margin + 5, yPosition)
          yPosition += 5
        }
      }
    }

    yPosition += 3
  }
  
  return yPosition
}

function renderSkills(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number
): number {
  const data = section.data as any
  const categories = data.categories || []
  
  if (!Array.isArray(categories)) {
    return yPosition
  }
  
  for (const category of categories) {
    yPosition = checkPageBreak(doc, yPosition, 10, margin)
    
    doc.setFont("times", "bold")
    const categoryLabel = `${category.name || category.category}: `
    const categoryWidth = doc.getTextWidth(categoryLabel)
    doc.text(categoryLabel, margin, yPosition)
    
    doc.setFont("times", "normal")
    const skillsLines = doc.splitTextToSize(category.items || category.skills, contentWidth - categoryWidth)
    doc.text(skillsLines, margin + categoryWidth, yPosition)
    yPosition += skillsLines.length * 5 + 2
  }
  
  return yPosition
}

function renderAwards(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number
): number {
  const data = section.data as any
  const categories = data.categories || []
  
  if (!Array.isArray(categories)) {
    return yPosition
  }
  
  for (const category of categories) {
    yPosition = checkPageBreak(doc, yPosition, 15, margin)
    
    // Category title
    doc.setFont("times", "bold")
    doc.text(category.category || category.title, margin, yPosition)
    yPosition += 5

    // Items - should already be an array from the form
    doc.setFont("times", "normal")
    const items = Array.isArray(category.items) ? category.items : []
    
    for (const item of items) {
      yPosition = checkPageBreak(doc, yPosition, 8, margin)
      
      if (item && typeof item === 'string') {
        // Simple string item
        doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
        const lines = doc.splitTextToSize(item, contentWidth - 5)
        doc.text(lines, margin + 5, yPosition)
        yPosition += lines.length * 5
      } else if (item.title) {
        // Object with title and date
        doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
        const text = item.date ? `${item.title} (${item.date})` : item.title
        const lines = doc.splitTextToSize(text, contentWidth - 5)
        doc.text(lines, margin + 5, yPosition)
        yPosition += lines.length * 5
      }
    }

    yPosition += 3
  }
  
  return yPosition
}

function renderInterests(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number
): number {
  const data = section.data
  const content = typeof data === 'string' ? data : (data as any).content || ''
  
  if (content) {
    doc.setFont("times", "normal")
    const lines = doc.splitTextToSize(content, contentWidth)
    
    // Render line by line with page break checks
    for (let i = 0; i < lines.length; i++) {
      yPosition = checkPageBreak(doc, yPosition, 5, margin)
      doc.text(lines[i], margin, yPosition)
      yPosition += 5
    }
  }
  
  return yPosition
}

function renderCustom(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number
): number {
  const data = section.data
  const content = typeof data === 'string' ? data : (data as any).content || ''
  
  if (content) {
    const lines = content.split('\n')
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      // Skip empty lines but add spacing
      if (!trimmed) {
        yPosition += 3
        continue
      }
      
      // Check for page break
      yPosition = checkPageBreak(doc, yPosition, 10, margin)
      
      // Bullet point
      if (trimmed.startsWith('- ')) {
        doc.setFont("times", "normal")
        const bulletLines = doc.splitTextToSize(trimmed.substring(2), contentWidth - 5)
        
        // Render bullet point and text line by line
        for (let i = 0; i < bulletLines.length; i++) {
          yPosition = checkPageBreak(doc, yPosition, 5, margin)
          
          // Only draw bullet circle on first line
          if (i === 0) {
            doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
          }
          
          doc.text(bulletLines[i], margin + 5, yPosition)
          yPosition += 5
        }
      }
      // Subsection title (ends with :)
      else if (trimmed.endsWith(':')) {
        doc.setFont("times", "bold")
        doc.text(trimmed, margin, yPosition)
        yPosition += 6
      }
      // Regular paragraph
      else {
        doc.setFont("times", "normal")
        const textLines = doc.splitTextToSize(trimmed, contentWidth)
        doc.text(textLines, margin, yPosition)
        yPosition += textLines.length * 5
      }
    }
  }
  
  return yPosition
}

function renderProjects(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number,
  pageWidth: number
): number {
  const projects = section.data
  
  if (!Array.isArray(projects)) {
    return yPosition
  }
  
  for (const project of projects) {
    yPosition = checkPageBreak(doc, yPosition, 15, margin)
    
    // Project name and dates
    doc.setFont("times", "bold")
    doc.text(project.name || "", margin, yPosition)
    
    if (project.startDate || project.endDate) {
      const dateText = `${project.startDate || ""} - ${project.endDate || ""}`
      doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
    }
    yPosition += 5

    // Technologies
    if (project.technologies) {
      doc.setFont("times", "italic")
      const techText = `Technologies: ${project.technologies}`
      const techLines = doc.splitTextToSize(techText, contentWidth)
      doc.text(techLines, margin, yPosition)
      yPosition += techLines.length * 5
    }

    // Description bullets
    if (project.bullets && Array.isArray(project.bullets)) {
      doc.setFont("times", "normal")
      for (const bullet of project.bullets) {
        yPosition = checkPageBreak(doc, yPosition, 8, margin)
        doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
        const lines = doc.splitTextToSize(bullet, contentWidth - 5)
        doc.text(lines, margin + 5, yPosition)
        yPosition += lines.length * 5
      }
    }

    yPosition += 3
  }
  
  return yPosition
}

function renderPublications(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number,
  pageWidth: number
): number {
  const publications = section.data
  
  if (!Array.isArray(publications)) {
    return yPosition
  }
  
  for (const pub of publications) {
    yPosition = checkPageBreak(doc, yPosition, 12, margin)
    
    // Title
    doc.setFont("times", "bold")
    const titleLines = doc.splitTextToSize(pub.title || "", contentWidth)
    doc.text(titleLines, margin, yPosition)
    yPosition += titleLines.length * 5

    // Authors and date
    doc.setFont("times", "italic")
    let authorsText = pub.authors || ""
    if (pub.date) {
      authorsText += ` (${pub.date})`
    }
    const authorLines = doc.splitTextToSize(authorsText, contentWidth)
    doc.text(authorLines, margin, yPosition)
    yPosition += authorLines.length * 5

    // Venue
    if (pub.venue) {
      doc.setFont("times", "normal")
      const venueLines = doc.splitTextToSize(pub.venue, contentWidth)
      doc.text(venueLines, margin, yPosition)
      yPosition += venueLines.length * 5
    }

    yPosition += 3
  }
  
  return yPosition
}

function renderCertifications(
  doc: jsPDF,
  section: ResumeSection,
  yPosition: number,
  margin: number,
  contentWidth: number,
  pageWidth: number
): number {
  const data = section.data
  
  // Handle both array and object with items property
  const items = Array.isArray(data) ? data : (data?.items || [])
  
  if (!Array.isArray(items) || items.length === 0) {
    return yPosition
  }
  
  doc.setFont("times", "normal")
  
  for (const item of items) {
    yPosition = checkPageBreak(doc, yPosition, 8, margin)
    
    // Check if item is a string or object
    if (typeof item === 'string') {
      // Bullet point for string items
      doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
      const lines = doc.splitTextToSize(item, contentWidth - 5)
      doc.text(lines, margin + 5, yPosition)
      yPosition += lines.length * 5
    } else if (item.name) {
      // Object format with name, issuer, date
      doc.setFont("times", "bold")
      doc.text(item.name || "", margin, yPosition)
      
      if (item.date) {
        doc.text(item.date, pageWidth - margin, yPosition, { align: "right" })
      }
      yPosition += 5

      if (item.issuer) {
        doc.setFont("times", "italic")
        const issuerLines = doc.splitTextToSize(item.issuer, contentWidth)
        doc.text(issuerLines, margin, yPosition)
        yPosition += issuerLines.length * 5
      }
      
      doc.setFont("times", "normal")
      yPosition += 3
    }
  }
  
  return yPosition
}

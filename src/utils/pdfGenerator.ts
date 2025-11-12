import { jsPDF } from "jspdf"
import type { ResumeData } from "../data/resumeData"
import { getTemplateConfig } from "../data/templates"

export async function generatePDF(data: ResumeData, templateId: string): Promise<void> {
  try {
    const template = getTemplateConfig(templateId)

    // Create a new PDF document
    const doc = new jsPDF()

    // Set default font
    doc.setFont("helvetica")

    // Page dimensions
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    // Parse colors
    const primaryColor = hexToRgb(template.colorScheme.primary)
    const secondaryColor = hexToRgb(template.colorScheme.secondary)

    // Start position
    let yPosition = 20

    // Add header
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    if (primaryColor) {
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b)
    }
    doc.text(data.personal.fullName || "Resume", pageWidth / 2, yPosition, { align: "center" })

    yPosition += 10

    // Add contact information
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    if (secondaryColor) {
      doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b)
    }

    // Build contact info line
    const contactParts = []
    if (data.personal.email) contactParts.push(`Email: ${data.personal.email}`)
    if (data.personal.phone) contactParts.push(`Phone: ${data.personal.phone}`)
    if (data.personal.linkedin) contactParts.push(`LinkedIn: ${data.personal.linkedin}`)
    if (data.personal.github) contactParts.push(`GitHub: ${data.personal.github}`)
    if (data.personal.website) contactParts.push(`Website: ${data.personal.website}`)

    const contactInfo = contactParts.join(" | ")
    doc.text(contactInfo, pageWidth / 2, yPosition, { align: "center" })

    yPosition += 15

    // Helper function to add section headers
    const addSectionHeader = (title: string, y: number): number => {
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")

      if (primaryColor) {
        doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b)
      }

      doc.text(title, margin, y)

      // Add horizontal line
      y += 2
      if (primaryColor) {
        doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b)
      } else {
        doc.setDrawColor(0, 0, 0)
      }
      doc.setLineWidth(0.5)
      doc.line(margin, y, pageWidth - margin, y)

      // Reset text color
      doc.setTextColor(0, 0, 0)

      return y + 8
    }

    // Executive Summary
    if (data.executiveSummary) {
      yPosition = addSectionHeader("Executive Summary", yPosition)

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      const summaryLines = doc.splitTextToSize(data.executiveSummary, contentWidth)
      doc.text(summaryLines, margin, yPosition)

      yPosition += summaryLines.length * 5 + 10
    }

    // Education section
    if (data.education.length > 0 && data.education[0].institution) {
      yPosition = addSectionHeader("Education", yPosition)

      data.education.forEach((edu) => {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text(edu.institution || "", margin, yPosition)

        // Right-aligned date
        if (edu.startDate || edu.endDate) {
          const dateText = `${edu.startDate || ""} - ${edu.endDate || ""}`
          doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
        }

        yPosition += 5

        doc.setFontSize(11)
        doc.setFont("helvetica", "italic")
        doc.text(edu.degree || "", margin, yPosition)

        // Right-aligned location
        if (edu.location) {
          doc.text(edu.location, pageWidth - margin, yPosition, { align: "right" })
        }

        yPosition += 5

        doc.setFont("helvetica", "normal")
        if (edu.gpa) {
          doc.text(`GPA: ${edu.gpa}`, margin, yPosition)
          yPosition += 5
        }

        if (edu.coursework) {
          const courseworkText = `Relevant Coursework: ${edu.coursework}`
          const courseworkLines = doc.splitTextToSize(courseworkText, contentWidth)
          doc.text(courseworkLines, margin, yPosition)
          yPosition += courseworkLines.length * 5
        }

        if (edu.achievements) {
          const achievementsText = `Achievements: ${edu.achievements}\`;st achievementsText = \`Achievements: ${edu.achievements}`
          const achievementsLines = doc.splitTextToSize(achievementsText, contentWidth)
          doc.text(achievementsLines, margin, yPosition)
          yPosition += achievementsLines.length * 5
        }

        yPosition += 5
      })
    }

    // Experience section
    if (data.experience.length > 0 && data.experience[0].company) {
      yPosition = addSectionHeader("Experience", yPosition)

      data.experience.forEach((exp) => {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text(exp.title || "", margin, yPosition)

        // Right-aligned date
        if (exp.startDate || exp.endDate) {
          const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
          doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
        }

        yPosition += 5

        doc.setFontSize(11)
        doc.setFont("helvetica", "italic")
        doc.text(exp.company || "", margin, yPosition)

        // Right-aligned location
        if (exp.location) {
          doc.text(exp.location, pageWidth - margin, yPosition, { align: "right" })
        }

        yPosition += 5

        doc.setFont("helvetica", "normal")
        exp.responsibilities.forEach((resp) => {
          if (resp) {
            // Draw bullet point
            doc.setDrawColor(0)
            doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")

            // Handle text wrapping for responsibilities
            const respLines = doc.splitTextToSize(resp, contentWidth - 10)
            doc.text(respLines, margin + 5, yPosition)
            yPosition += respLines.length * 5
          }
        })

        yPosition += 5
      })
    }

    // Projects section
    if (data.projects.length > 0 && data.projects[0].name) {
      yPosition = addSectionHeader("Projects", yPosition)

      data.projects.forEach((project) => {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text(project.name || "", margin, yPosition)

        // Right-aligned date
        if (project.startDate || project.endDate) {
          const dateText = `${project.startDate || ""} - ${project.endDate || ""}`
          doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
        }

        yPosition += 5

        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        if (project.technologies) {
          doc.text(`Technologies: ${project.technologies}`, margin, yPosition)
          yPosition += 5
        }

        project.description.forEach((desc) => {
          if (desc) {
            // Draw bullet point
            doc.setDrawColor(0)
            doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")

            // Handle text wrapping for descriptions
            const descLines = doc.splitTextToSize(desc, contentWidth - 10)
            doc.text(descLines, margin + 5, yPosition)
            yPosition += descLines.length * 5
          }
        })

        yPosition += 5
      })
    }

    // Skills section
    if (data.skills.languages || data.skills.frameworks || data.skills.databases || data.skills.other) {
      yPosition = addSectionHeader("Skills", yPosition)

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")

      if (data.skills.languages) {
        doc.setFont("helvetica", "bold")
        doc.text("Languages:", margin, yPosition)
        doc.setFont("helvetica", "normal")
        const languagesWidth = doc.getTextWidth("Languages: ")
        const languagesText = data.skills.languages
        const languagesLines = doc.splitTextToSize(languagesText, contentWidth - languagesWidth)
        doc.text(languagesLines, margin + languagesWidth, yPosition)
        yPosition += languagesLines.length * 5
      }

      if (data.skills.frameworks) {
        doc.setFont("helvetica", "bold")
        doc.text("Frameworks & Tools:", margin, yPosition)
        doc.setFont("helvetica", "normal")
        const frameworksWidth = doc.getTextWidth("Frameworks & Tools: ")
        const frameworksText = data.skills.frameworks
        const frameworksLines = doc.splitTextToSize(frameworksText, contentWidth - frameworksWidth)
        doc.text(frameworksLines, margin + frameworksWidth, yPosition)
        yPosition += frameworksLines.length * 5
      }

      if (data.skills.databases) {
        doc.setFont("helvetica", "bold")
        doc.text("Database Systems:", margin, yPosition)
        doc.setFont("helvetica", "normal")
        const databasesWidth = doc.getTextWidth("Database Systems: ")
        const databasesText = data.skills.databases
        const databasesLines = doc.splitTextToSize(databasesText, contentWidth - databasesWidth)
        doc.text(databasesLines, margin + databasesWidth, yPosition)
        yPosition += databasesLines.length * 5
      }

      if (data.skills.other) {
        doc.setFont("helvetica", "bold")
        doc.text("Other Skills:", margin, yPosition)
        doc.setFont("helvetica", "normal")
        const otherWidth = doc.getTextWidth("Other Skills: ")
        const otherText = data.skills.other
        const otherLines = doc.splitTextToSize(otherText, contentWidth - otherWidth)
        doc.text(otherLines, margin + otherWidth, yPosition)
        yPosition += otherLines.length * 5
      }

      yPosition += 5
    }

    // Certifications section
    if (data.certifications.length > 0 && data.certifications[0].name) {
      yPosition = addSectionHeader("Certifications", yPosition)

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")

      data.certifications.forEach((cert) => {
        // Draw bullet point
        doc.setDrawColor(0)
        doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")

        const certText = `${cert.name} (${cert.issuer}, ${cert.date})`
        const certLines = doc.splitTextToSize(certText, contentWidth - 10)
        doc.text(certLines, margin + 5, yPosition)
        yPosition += certLines.length * 5
      })

      yPosition += 5
    }

    // Publications section
    if (data.publications.length > 0 && data.publications[0].title) {
      yPosition = addSectionHeader("Publications", yPosition)

      data.publications.forEach((pub) => {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")

        const titleLines = doc.splitTextToSize(pub.title, contentWidth)
        doc.text(titleLines, margin, yPosition)
        yPosition += titleLines.length * 5

        doc.setFontSize(11)
        doc.setFont("helvetica", "italic")
        doc.text(`${pub.journal}, ${pub.date}`, margin, yPosition)
        yPosition += 5

        doc.setFont("helvetica", "normal")
        if (pub.authors) {
          doc.text(`Authors: ${pub.authors}`, margin, yPosition)
          yPosition += 5
        }

        if (pub.description) {
          const descLines = doc.splitTextToSize(pub.description, contentWidth)
          doc.text(descLines, margin, yPosition)
          yPosition += descLines.length * 5
        }

        yPosition += 5
      })
    }

    // Save the PDF
    doc.save(`${data.personal.fullName || "resume"}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw new Error("Failed to generate PDF. Please try again.")
  }
}

// Helper function to convert hex color to RGB
function hexToRgb(hex: string) {
  if (!hex) return null

  // Remove # if present
  hex = hex.replace(/^#/, "")

  // Handle both 3-digit and 6-digit formats
  let r, g, b
  if (hex.length === 3) {
    r = Number.parseInt(hex[0] + hex[0], 16)
    g = Number.parseInt(hex[1] + hex[1], 16)
    b = Number.parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    r = Number.parseInt(hex.substring(0, 2), 16)
    g = Number.parseInt(hex.substring(2, 4), 16)
    b = Number.parseInt(hex.substring(4, 6), 16)
  } else {
    return null
  }

  return { r, g, b }
}

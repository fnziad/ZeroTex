"use client"

import { jsPDF } from "jspdf"
import type { ResumeData } from "./resume-types"
import { getTemplateConfig } from "./templates"

export async function generateBrowserPDF(data: ResumeData, templateId = "classic"): Promise<void> {
  try {
    const template = getTemplateConfig(templateId)

    // Create a new PDF document
    const doc = new jsPDF()

    // Set default font - Note: jsPDF doesn't support all web fonts
    // We'll use standard fonts available in jsPDF for the PDF
    // This is a limitation of client-side PDF generation
    const fontMap = {
      "font-modern": "helvetica",
      "font-classic": "times",
      "font-technical": "helvetica",
      "font-creative": "helvetica",
      "font-code": "courier",
    }

    const selectedFont = fontMap[template.fontClass as keyof typeof fontMap] || "helvetica"
    doc.setFont(selectedFont)

    // Page dimensions
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    // Parse color from hex to RGB
    const primaryColorRGB = hexToRgb(template.colorScheme.primary)
    const secondaryColorRGB = hexToRgb(template.colorScheme.secondary)

    // Determine layout type
    const isTwoColumn = template.layout === "two-column"
    const isSidebar = template.layout === "sidebar"
    const isCompact = template.layout === "compact"
    const isExpanded = template.layout === "expanded"

    // Add content based on layout type
    if (isTwoColumn) {
      generateTwoColumnLayout(doc, data, template, margin, pageWidth, primaryColorRGB, secondaryColorRGB, selectedFont)
    } else if (isSidebar) {
      generateSidebarLayout(doc, data, template, margin, pageWidth, primaryColorRGB, secondaryColorRGB, selectedFont)
    } else if (isCompact) {
      generateCompactLayout(doc, data, template, margin, pageWidth, primaryColorRGB, secondaryColorRGB, selectedFont)
    } else if (isExpanded) {
      generateExpandedLayout(doc, data, template, margin, pageWidth, primaryColorRGB, secondaryColorRGB, selectedFont)
    } else {
      generateStandardLayout(doc, data, template, margin, pageWidth, primaryColorRGB, secondaryColorRGB, selectedFont)
    }

    // Add a footer
    doc.setFontSize(8)
    if (secondaryColorRGB) {
      doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
    }
    doc.text("Generated with Resume Builder", 105, 285, { align: "center" })

    // Save the PDF
    doc.save(`${data.personal.fullName || "resume"}.pdf`)
  } catch (error) {
    console.error("Error generating PDF in browser:", error)
    throw new Error("Failed to generate PDF. Please try again.")
  }
}

function generateTwoColumnLayout(
  doc: jsPDF,
  data: ResumeData,
  template: any,
  margin: number,
  pageWidth: number,
  primaryColorRGB: any,
  secondaryColorRGB: any,
  selectedFont: string,
) {
  // Set up column widths
  const leftColumnWidth = (pageWidth - margin * 2) * 0.33
  const rightColumnWidth = (pageWidth - margin * 2) * 0.67
  const rightColumnStart = margin + leftColumnWidth + 10

  let leftY = 20
  let rightY = 20

  // Header in left column
  doc.setFontSize(16)
  doc.setFont(selectedFont, "bold")
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.text(data.personal.fullName || "Resume", margin + leftColumnWidth / 2, leftY, { align: "center" })
  leftY += 10

  // Contact info
  doc.setFontSize(9)
  doc.setFont(selectedFont, "normal")
  if (secondaryColorRGB) {
    doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
  }

  if (data.personal.email) {
    doc.text(data.personal.email, margin + leftColumnWidth / 2, leftY, { align: "center" })
    leftY += 5
  }
  if (data.personal.phone) {
    doc.text(data.personal.phone, margin + leftColumnWidth / 2, leftY, { align: "center" })
    leftY += 5
  }
  if (data.personal.linkedin) {
    doc.text(`LinkedIn: ${data.personal.linkedin}`, margin + leftColumnWidth / 2, leftY, { align: "center" })
    leftY += 5
  }
  if (data.personal.github) {
    doc.text(`GitHub: ${data.personal.github}`, margin + leftColumnWidth / 2, leftY, { align: "center" })
    leftY += 5
  }
  if (data.personal.website) {
    doc.text(data.personal.website, margin + leftColumnWidth / 2, leftY, { align: "center" })
    leftY += 5
  }

  leftY += 10

  // Skills section in left column
  if (data.skills.languages || data.skills.frameworks || data.skills.databases || data.skills.other) {
    // Section header
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("Technical Skills", margin, leftY)
    leftY += 5

    // Add colored background
    if (primaryColorRGB) {
      doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.1)
      doc.rect(margin, leftY - 10, leftColumnWidth, 15, "F")
    }

    leftY += 5

    // Skills content
    doc.setFontSize(10)
    doc.setFont(selectedFont, "normal")
    doc.setTextColor(0, 0, 0)

    if (data.skills.languages) {
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("Languages:", margin, leftY)
      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const languagesWidth = doc.getTextWidth("Languages: ")
      doc.text(data.skills.languages, margin + languagesWidth, leftY)
      leftY += 7
    }

    if (data.skills.frameworks) {
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("Frameworks:", margin, leftY)
      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const frameworksWidth = doc.getTextWidth("Frameworks: ")
      doc.text(data.skills.frameworks, margin + frameworksWidth, leftY)
      leftY += 7
    }

    if (data.skills.databases) {
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("Databases:", margin, leftY)
      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const databasesWidth = doc.getTextWidth("Databases: ")
      doc.text(data.skills.databases, margin + databasesWidth, leftY)
      leftY += 7
    }

    if (data.skills.other) {
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("Other:", margin, leftY)
      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const otherWidth = doc.getTextWidth("Other: ")
      doc.text(data.skills.other, margin + otherWidth, leftY)
      leftY += 7
    }

    leftY += 10
  }

  // Education section in left column
  if (data.education.length > 0) {
    // Section header
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("Education", margin, leftY)
    leftY += 5

    // Add colored background
    if (primaryColorRGB) {
      doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.1)
      doc.rect(margin, leftY - 10, leftColumnWidth, 15, "F")
    }

    leftY += 5

    // Education content
    doc.setTextColor(0, 0, 0)
    data.education.forEach((edu) => {
      doc.setFontSize(10)
      doc.setFont(selectedFont, "bold")
      doc.text(edu.institution || "", margin, leftY)
      leftY += 5

      doc.setFont(selectedFont, "italic")
      doc.text(edu.degree || "", margin, leftY)
      leftY += 5

      doc.setFont(selectedFont, "normal")
      doc.text(`${edu.startDate || ""} - ${edu.endDate || ""}`, margin, leftY)
      leftY += 5

      if (edu.gpa) {
        doc.text(`GPA: ${edu.gpa}`, margin, leftY)
        leftY += 5
      }

      leftY += 5
    })
  }

  // Experience section in right column
  if (data.experience.length > 0) {
    // Section header
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("Experience", rightColumnStart, rightY)
    rightY += 5

    // Add colored background
    if (primaryColorRGB) {
      doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.1)
      doc.rect(rightColumnStart, rightY - 10, rightColumnWidth, 15, "F")
    }

    rightY += 5

    // Experience content
    doc.setTextColor(0, 0, 0)
    data.experience.forEach((exp) => {
      doc.setFontSize(11)
      doc.setFont(selectedFont, "bold")
      doc.text(exp.title || "", rightColumnStart, rightY)

      // Right-aligned date
      if (exp.startDate || exp.endDate) {
        const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
        doc.text(dateText, pageWidth - margin, rightY, { align: "right" })
      }

      rightY += 5

      doc.setFontSize(10)
      doc.setFont(selectedFont, "italic")
      doc.text(exp.company || "", rightColumnStart, rightY)

      // Right-aligned location
      if (exp.location) {
        doc.text(exp.location, pageWidth - margin, rightY, { align: "right" })
      }

      rightY += 7

      doc.setFont(selectedFont, "normal")
      exp.responsibilities.forEach((resp) => {
        if (resp) {
          // Draw bullet point
          doc.setDrawColor(0)
          doc.circle(rightColumnStart + 2, rightY - 1.5, 0.7, "F")

          // Handle text wrapping for responsibilities
          const textLines = doc.splitTextToSize(resp, rightColumnWidth - 10)
          doc.text(textLines, rightColumnStart + 5, rightY)
          rightY += 5 * textLines.length
        }
      })

      rightY += 7
    })
  }

  // Projects section in right column
  if (data.projects.length > 0) {
    // Section header
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("Projects", rightColumnStart, rightY)
    rightY += 5

    // Add colored background
    if (primaryColorRGB) {
      doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.1)
      doc.rect(rightColumnStart, rightY - 10, rightColumnWidth, 15, "F")
    }

    rightY += 5

    // Projects content
    doc.setTextColor(0, 0, 0)
    data.projects.forEach((project) => {
      doc.setFontSize(11)
      doc.setFont(selectedFont, "bold")
      doc.text(project.name || "", rightColumnStart, rightY)

      // Right-aligned date
      if (project.startDate || project.endDate) {
        const dateText = `${project.startDate || ""} - ${project.endDate || ""}`
        doc.text(dateText, pageWidth - margin, rightY, { align: "right" })
      }

      rightY += 5

      if (project.technologies) {
        doc.setFontSize(10)
        doc.setFont(selectedFont, "italic")
        if (secondaryColorRGB) {
          doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
        }
        doc.text(`Technologies: ${project.technologies}`, rightColumnStart, rightY)
        doc.setTextColor(0, 0, 0)
        rightY += 5
      }

      doc.setFont(selectedFont, "normal")
      project.description.forEach((desc) => {
        if (desc) {
          // Draw bullet point
          doc.setDrawColor(0)
          doc.circle(rightColumnStart + 2, rightY - 1.5, 0.7, "F")

          // Handle text wrapping for descriptions
          const textLines = doc.splitTextToSize(desc, rightColumnWidth - 10)
          doc.text(textLines, rightColumnStart + 5, rightY)
          rightY += 5 * textLines.length
        }
      })

      rightY += 7
    })
  }
}

function generateSidebarLayout(
  doc: jsPDF,
  data: ResumeData,
  template: any,
  margin: number,
  pageWidth: number,
  primaryColorRGB: any,
  secondaryColorRGB: any,
  selectedFont: string,
) {
  // Set up column widths
  const sidebarWidth = (pageWidth - margin * 2) * 0.25
  const mainContentWidth = (pageWidth - margin * 2) * 0.75
  const mainContentStart = margin + sidebarWidth + 10

  // Draw sidebar background
  if (primaryColorRGB) {
    doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.1)
    doc.rect(margin, 10, sidebarWidth, 270, "F")
  }

  // Draw sidebar border
  if (primaryColorRGB) {
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    doc.setLineWidth(0.5)
    doc.line(margin + sidebarWidth, 10, margin + sidebarWidth, 280)
  }

  let sidebarY = 25
  let mainY = 25

  // Header in sidebar
  doc.setFontSize(16)
  doc.setFont(selectedFont, "bold")
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.text(data.personal.fullName || "Resume", margin + sidebarWidth / 2, sidebarY, { align: "center" })
  sidebarY += 10

  // Add avatar placeholder
  if (primaryColorRGB) {
    doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.2)
    doc.circle(margin + sidebarWidth / 2, sidebarY + 10, 10, "F")

    // Add initial
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    doc.setFontSize(14)
    doc.text(
      data.personal.fullName ? data.personal.fullName.charAt(0).toUpperCase() : "J",
      margin + sidebarWidth / 2,
      sidebarY + 12,
      { align: "center" },
    )
  }
  sidebarY += 25

  // Contact info
  doc.setFontSize(8)
  doc.setFont(selectedFont, "normal")
  doc.setTextColor(0, 0, 0)

  if (data.personal.email) {
    doc.text(data.personal.email, margin + sidebarWidth / 2, sidebarY, { align: "center" })
    sidebarY += 4
  }
  if (data.personal.phone) {
    doc.text(data.personal.phone, margin + sidebarWidth / 2, sidebarY, { align: "center" })
    sidebarY += 4
  }
  if (data.personal.linkedin) {
    doc.text(`LinkedIn: ${data.personal.linkedin}`, margin + sidebarWidth / 2, sidebarY, { align: "center" })
    sidebarY += 4
  }
  if (data.personal.github) {
    doc.text(`GitHub: ${data.personal.github}`, margin + sidebarWidth / 2, sidebarY, { align: "center" })
    sidebarY += 4
  }
  if (data.personal.website) {
    doc.text(data.personal.website, margin + sidebarWidth / 2, sidebarY, { align: "center" })
    sidebarY += 4
  }

  sidebarY += 10

  // Skills section in sidebar
  if (data.skills.languages || data.skills.frameworks || data.skills.databases || data.skills.other) {
    // Section header
    doc.setFontSize(10)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("SKILLS", margin + sidebarWidth / 2, sidebarY, { align: "center" })

    // Underline
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    doc.setLineWidth(0.5)
    doc.line(margin + 5, sidebarY + 2, margin + sidebarWidth - 5, sidebarY + 2)

    sidebarY += 8

    // Skills content
    doc.setFontSize(8)
    doc.setTextColor(0, 0, 0)

    if (data.skills.languages) {
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("LANGUAGES", margin + 5, sidebarY)
      sidebarY += 4

      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const languagesLines = doc.splitTextToSize(data.skills.languages, sidebarWidth - 10)
      doc.text(languagesLines, margin + 5, sidebarY)
      sidebarY += 4 * languagesLines.length
    }

    if (data.skills.frameworks) {
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("FRAMEWORKS", margin + 5, sidebarY)
      sidebarY += 4

      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const frameworksLines = doc.splitTextToSize(data.skills.frameworks, sidebarWidth - 10)
      doc.text(frameworksLines, margin + 5, sidebarY)
      sidebarY += 4 * frameworksLines.length
    }

    if (data.skills.databases) {
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("DATABASES", margin + 5, sidebarY)
      sidebarY += 4

      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const databasesLines = doc.splitTextToSize(data.skills.databases, sidebarWidth - 10)
      doc.text(databasesLines, margin + 5, sidebarY)
      sidebarY += 4 * databasesLines.length
    }

    if (data.skills.other) {
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("OTHER", margin + 5, sidebarY)
      sidebarY += 4

      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const otherLines = doc.splitTextToSize(data.skills.other, sidebarWidth - 10)
      doc.text(otherLines, margin + 5, sidebarY)
      sidebarY += 4 * otherLines.length
    }

    sidebarY += 10
  }

  // Education section in sidebar
  if (data.education.length > 0) {
    // Section header
    doc.setFontSize(10)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("EDUCATION", margin + sidebarWidth / 2, sidebarY, { align: "center" })

    // Underline
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    doc.setLineWidth(0.5)
    doc.line(margin + 5, sidebarY + 2, margin + sidebarWidth - 5, sidebarY + 2)

    sidebarY += 8

    // Education content
    doc.setTextColor(0, 0, 0)
    data.education.forEach((edu) => {
      doc.setFontSize(8)
      doc.setFont(selectedFont, "bold")
      const institutionLines = doc.splitTextToSize(edu.institution || "", sidebarWidth - 10)
      doc.text(institutionLines, margin + 5, sidebarY)
      sidebarY += 4 * institutionLines.length

      doc.setFont(selectedFont, "italic")
      const degreeLines = doc.splitTextToSize(edu.degree || "", sidebarWidth - 10)
      doc.text(degreeLines, margin + 5, sidebarY)
      sidebarY += 4 * degreeLines.length

      doc.setFont(selectedFont, "normal")
      doc.text(`${edu.startDate || ""} - ${edu.endDate || ""}`, margin + 5, sidebarY)
      sidebarY += 4

      sidebarY += 5
    })
  }

  // Experience section in main content
  if (data.experience.length > 0) {
    // Section header
    doc.setFontSize(14)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("PROFESSIONAL EXPERIENCE", mainContentStart + mainContentWidth / 2, mainY, { align: "center" })

    // Underline
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    doc.setLineWidth(0.5)
    doc.line(mainContentStart, mainY + 2, mainContentStart + mainContentWidth, mainY + 2)

    mainY += 10

    // Experience content
    doc.setTextColor(0, 0, 0)
    data.experience.forEach((exp, index) => {
      doc.setFontSize(11)
      doc.setFont(selectedFont, "bold")
      if (primaryColorRGB) {
        doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
      }
      doc.text(exp.title || "", mainContentStart, mainY)

      // Right-aligned date
      doc.setFontSize(10)
      doc.setFont(selectedFont, "italic")
      if (exp.startDate || exp.endDate) {
        const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
        doc.text(dateText, pageWidth - margin, mainY, { align: "right" })
      }

      mainY += 5

      doc.setTextColor(0, 0, 0)
      doc.setFont(selectedFont, "semibold")
      doc.text(exp.company || "", mainContentStart, mainY)

      // Right-aligned location
      if (exp.location) {
        doc.text(exp.location, pageWidth - margin, mainY, { align: "right" })
      }

      mainY += 7

      doc.setFont(selectedFont, "normal")
      exp.responsibilities.forEach((resp) => {
        if (resp) {
          // Draw bullet point
          doc.setDrawColor(0)
          doc.circle(mainContentStart + 2, mainY - 1.5, 0.7, "F")

          // Handle text wrapping for responsibilities
          const textLines = doc.splitTextToSize(resp, mainContentWidth - 10)
          doc.text(textLines, mainContentStart + 5, mainY)
          mainY += 5 * textLines.length
        }
      })

      // Add dashed line between experiences
      if (index < data.experience.length - 1) {
        if (secondaryColorRGB) {
          doc.setDrawColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
        } else {
          doc.setDrawColor(200, 200, 200)
        }
        doc.setLineWidth(0.2)

        // Draw dashed line
        const dashLength = 3
        const gapLength = 2
        let xPos = mainContentStart

        while (xPos < mainContentStart + mainContentWidth) {
          doc.line(xPos, mainY + 5, xPos + dashLength, mainY + 5)
          xPos += dashLength + gapLength
        }

        mainY += 10
      } else {
        mainY += 7
      }
    })
  }

  // Projects section in main content
  if (data.projects.length > 0) {
    // Section header
    doc.setFontSize(14)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("PROJECTS", mainContentStart + mainContentWidth / 2, mainY, { align: "center" })

    // Underline
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    doc.setLineWidth(0.5)
    doc.line(mainContentStart, mainY + 2, mainContentStart + mainContentWidth, mainY + 2)

    mainY += 10

    // Projects content in a grid (2 columns)
    const projectsPerRow = 2
    const projectWidth = (mainContentWidth - 10) / projectsPerRow

    // Group projects into rows
    for (let i = 0; i < data.projects.length; i += projectsPerRow) {
      const rowProjects = data.projects.slice(i, i + projectsPerRow)
      const rowStartY = mainY
      let maxRowHeight = 0

      // Process each project in the row
      rowProjects.forEach((project, idx) => {
        const projectX = mainContentStart + idx * (projectWidth + 10)
        let projectY = rowStartY

        // Draw project box
        if (primaryColorRGB) {
          doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.05)
          doc.setDrawColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
          doc.setLineWidth(0.2)
          doc.roundedRect(projectX, projectY, projectWidth, 40, 2, 2, "FD")
        }

        projectY += 5

        // Project title
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(10)
        doc.setFont(selectedFont, "bold")
        if (primaryColorRGB) {
          doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
        }
        const titleLines = doc.splitTextToSize(project.name || "", projectWidth - 10)
        doc.text(titleLines, projectX + 5, projectY)
        projectY += 4 * titleLines.length + 2

        // Project date
        doc.setFontSize(8)
        doc.setFont(selectedFont, "italic")
        doc.setTextColor(0, 0, 0)
        doc.text(`${project.startDate || ""} - ${project.endDate || ""}`, projectX + 5, projectY)
        projectY += 4

        // Technologies
        if (project.technologies) {
          if (secondaryColorRGB) {
            doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
          }
          doc.setFont(selectedFont, "semibold")
          doc.text("Tech:", projectX + 5, projectY)

          const techWidth = doc.getTextWidth("Tech: ")
          doc.setFont(selectedFont, "normal")
          doc.setTextColor(0, 0, 0)
          const techLines = doc.splitTextToSize(project.technologies, projectWidth - 15 - techWidth)
          doc.text(techLines, projectX + 5 + techWidth, projectY)
          projectY += 4 * techLines.length
        }

        // Calculate row height
        const projectHeight = projectY - rowStartY
        if (projectHeight > maxRowHeight) {
          maxRowHeight = projectHeight
        }
      })

      // Move to next row
      mainY += maxRowHeight + 10
    }
  }
}

function generateCompactLayout(
  doc: jsPDF,
  data: ResumeData,
  template: any,
  margin: number,
  pageWidth: number,
  primaryColorRGB: any,
  secondaryColorRGB: any,
  selectedFont: string,
) {
  let yPosition = 20

  // Header - Two column for executive
  doc.setFontSize(16)
  doc.setFont(selectedFont, "bold")
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.text(data.personal.fullName || "Your Full Name", margin, yPosition)

  // Contact info on right
  doc.setFontSize(9)
  doc.setFont(selectedFont, "normal")
  if (data.personal.email) {
    doc.text(data.personal.email, pageWidth - margin, yPosition, { align: "right" })
    yPosition += 5
  }
  if (data.personal.phone) {
    doc.text(data.personal.phone, pageWidth - margin, yPosition, { align: "right" })
    yPosition += 5
  }
  if (data.personal.linkedin) {
    doc.text(data.personal.linkedin, pageWidth - margin, yPosition, { align: "right" })
    yPosition += 5
  }
  if (data.personal.website) {
    doc.text(data.personal.website, pageWidth - margin, yPosition, { align: "right" })
  }

  // Professional title
  doc.setFontSize(12)
  doc.setFont(selectedFont, "semibold")
  if (secondaryColorRGB) {
    doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
  }
  doc.text("Executive Professional", margin, yPosition)

  // Horizontal line
  yPosition += 5
  if (primaryColorRGB) {
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.setLineWidth(0.5)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)

  yPosition += 10

  // Executive Summary
  if (primaryColorRGB) {
    doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.1)
    doc.rect(margin, yPosition, pageWidth - margin * 2, 30, "F")
  }

  yPosition += 5

  doc.setFontSize(12)
  doc.setFont(selectedFont, "bold")
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.text("Executive Summary", margin + 5, yPosition)

  yPosition += 7

  doc.setFontSize(10)
  doc.setFont(selectedFont, "normal")
  doc.setTextColor(0, 0, 0)

  const summaryText =
    data.executiveSummary ||
    "Accomplished executive with proven leadership experience and a track record of driving organizational growth and innovation. Skilled in strategic planning, team leadership, and delivering exceptional results in challenging environments."

  const summaryLines = doc.splitTextToSize(summaryText, pageWidth - margin * 2 - 10)
  doc.text(summaryLines, margin + 5, yPosition)

  yPosition += summaryLines.length * 5 + 10

  // Experience Section - Timeline style
  if (data.experience.length > 0) {
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("Professional Experience", margin, yPosition)

    // Underline
    yPosition += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)

    yPosition += 10

    // Experience content with timeline
    data.experience.forEach((exp, index) => {
      // Timeline dot
      if (primaryColorRGB) {
        doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
        doc.circle(margin + 3, yPosition, 1.5, "F")
      }

      // Timeline line to next experience
      if (index < data.experience.length - 1) {
        if (secondaryColorRGB) {
          doc.setDrawColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
        }
        doc.setLineWidth(0.5)
        doc.line(margin + 3, yPosition + 3, margin + 3, yPosition + 25)
      }

      // Experience content
      doc.setFontSize(11)
      doc.setFont(selectedFont, "bold")
      if (primaryColorRGB) {
        doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
      }
      doc.text(exp.title || "", margin + 8, yPosition)

      yPosition += 5

      doc.setFontSize(10)
      doc.setFont(selectedFont, "semibold")
      doc.setTextColor(0, 0, 0)
      doc.text(exp.company || "", margin + 8, yPosition)

      // Right-aligned date
      doc.setFont(selectedFont, "italic")
      if (exp.startDate || exp.endDate) {
        const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      // Location
      doc.setFont(selectedFont, "normal")
      doc.text(exp.location || "", margin + 8, yPosition)

      yPosition += 7

      // Responsibilities
      doc.setFont(selectedFont, "normal")
      exp.responsibilities.forEach((resp) => {
        if (resp) {
          // Draw bullet point
          doc.setDrawColor(0)
          doc.circle(margin + 10, yPosition - 1.5, 0.7, "F")

          // Handle text wrapping for responsibilities
          const textLines = doc.splitTextToSize(resp, pageWidth - margin * 2 - 15)
          doc.text(textLines, margin + 13, yPosition)
          yPosition += 5 * textLines.length
        }
      })

      yPosition += 10
    })
  }

  // Two column layout for skills and education
  const columnWidth = (pageWidth - margin * 2 - 10) / 2
  const rightColumnStart = margin + columnWidth + 10

  // Save current Y position
  const startTwoColumnY = yPosition
  let leftColumnY = yPosition
  let rightColumnY = yPosition

  // Skills Section - Left column
  if (data.skills.languages || data.skills.frameworks || data.skills.databases || data.skills.other) {
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("Core Competencies", margin, leftColumnY)

    // Underline
    leftColumnY += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.setLineWidth(0.5)
    doc.line(margin, leftColumnY, margin + columnWidth, leftColumnY)

    leftColumnY += 10

    // Skills in a grid
    const skillsPerRow = 2
    const skillWidth = (columnWidth - 5) / skillsPerRow

    // Create skill boxes
    const skills = [
      { title: "Technical", content: data.skills.languages },
      { title: "Leadership", content: data.skills.frameworks },
      { title: "Strategic", content: data.skills.databases },
      { title: "Business", content: data.skills.other },
    ].filter((skill) => skill.content)

    // Group skills into rows
    for (let i = 0; i < skills.length; i += skillsPerRow) {
      const rowSkills = skills.slice(i, i + skillsPerRow)
      const rowStartY = leftColumnY
      let maxRowHeight = 0

      // Process each skill in the row
      rowSkills.forEach((skill, idx) => {
        const skillX = margin + idx * (skillWidth + 5)
        let skillY = rowStartY

        // Draw skill box
        if (primaryColorRGB) {
          doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.1)
          doc.rect(skillX, skillY, skillWidth, 20, "F")
        }

        skillY += 5

        // Skill title
        doc.setFontSize(9)
        doc.setFont(selectedFont, "bold")
        if (secondaryColorRGB) {
          doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
        }
        doc.text(skill.title, skillX + 5, skillY)

        skillY += 5

        // Skill content
        doc.setFontSize(8)
        doc.setFont(selectedFont, "normal")
        doc.setTextColor(0, 0, 0)
        const contentLines = doc.splitTextToSize(skill.content, skillWidth - 10)
        doc.text(contentLines, skillX + 5, skillY)

        skillY += contentLines.length * 4

        // Calculate row height
        const skillHeight = skillY - rowStartY
        if (skillHeight > maxRowHeight) {
          maxRowHeight = skillHeight
        }
      })

      // Move to next row
      leftColumnY += maxRowHeight + 5
    }
  }

  // Education and Certifications - Right column
  if (data.education.length > 0) {
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("Education", rightColumnStart, rightColumnY)

    // Underline
    rightColumnY += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.setLineWidth(0.5)
    doc.line(rightColumnStart, rightColumnY, rightColumnStart + columnWidth, rightColumnY)

    rightColumnY += 10

    // Education content
    data.education.forEach((edu) => {
      doc.setFontSize(10)
      doc.setFont(selectedFont, "bold")
      doc.setTextColor(0, 0, 0)
      doc.text(edu.institution || "", rightColumnStart, rightColumnY)

      // Right-aligned date
      doc.setFont(selectedFont, "italic")
      if (edu.startDate || edu.endDate) {
        const dateText = `${edu.startDate || ""} - ${edu.endDate || ""}`
        doc.text(dateText, rightColumnStart + columnWidth, rightColumnY, { align: "right" })
      }

      rightColumnY += 5

      doc.setFont(selectedFont, "normal")
      doc.text(edu.degree || "", rightColumnStart, rightColumnY)

      rightColumnY += 5

      if (edu.gpa) {
        doc.setFontSize(9)
        doc.text(`GPA: ${edu.gpa}`, rightColumnStart, rightColumnY)
        rightColumnY += 5
      }

      rightColumnY += 5
    })

    // Certifications
    if (data.certifications.length > 0) {
      rightColumnY += 5

      doc.setFontSize(12)
      doc.setFont(selectedFont, "bold")
      if (primaryColorRGB) {
        doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
      }
      doc.text("Certifications", rightColumnStart, rightColumnY)

      // Underline
      rightColumnY += 2
      if (primaryColorRGB) {
        doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
      }
      doc.setLineWidth(0.5)
      doc.line(rightColumnStart, rightColumnY, rightColumnStart + columnWidth, rightColumnY)

      rightColumnY += 10

      // Certifications content
      doc.setTextColor(0, 0, 0)
      data.certifications.forEach((cert) => {
        // Draw bullet point
        doc.setDrawColor(0)
        doc.circle(rightColumnStart + 2, rightColumnY - 1.5, 0.7, "F")

        doc.setFontSize(9)
        doc.setFont(selectedFont, "semibold")
        doc.text(cert.name, rightColumnStart + 5, rightColumnY)

        rightColumnY += 4

        doc.setFontSize(8)
        doc.setFont(selectedFont, "normal")
        doc.text(`${cert.issuer}, ${cert.date}`, rightColumnStart + 5, rightColumnY)

        rightColumnY += 7
      })
    }
  }

  // Determine the maximum Y position from both columns
  yPosition = Math.max(leftColumnY, rightColumnY) + 10

  // Projects Section - Compact
  if (data.projects.length > 0) {
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("Key Projects & Initiatives", margin, yPosition)

    // Underline
    yPosition += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)

    yPosition += 10

    // Projects content
    data.projects.forEach((project) => {
      doc.setFontSize(10)
      doc.setFont(selectedFont, "bold")
      doc.setTextColor(0, 0, 0)
      doc.text(project.name || "", margin, yPosition)

      // Right-aligned date
      doc.setFont(selectedFont, "italic")
      if (project.startDate || project.endDate) {
        const dateText = `${project.startDate || ""} - ${project.endDate || ""}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      if (project.technologies) {
        doc.setFontSize(9)
        doc.setFont(selectedFont, "normal")
        doc.text(project.technologies, margin, yPosition)
        yPosition += 5
      }

      yPosition += 5
    })
  }
}

function generateExpandedLayout(
  doc: jsPDF,
  data: ResumeData,
  template: any,
  margin: number,
  pageWidth: number,
  primaryColorRGB: any,
  secondaryColorRGB: any,
  selectedFont: string,
) {
  let yPosition = 20

  // Header - Boxed for academic
  if (primaryColorRGB) {
    doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.1)
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    doc.setLineWidth(0.5)
    doc.rect(margin, yPosition, pageWidth - margin * 2, 25, "FD")
  }

  yPosition += 10

  doc.setFontSize(16)
  doc.setFont(selectedFont, "bold")
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.text(data.personal.fullName || "Your Full Name", pageWidth / 2, yPosition, { align: "center" })

  yPosition += 7

  doc.setFontSize(9)
  doc.setFont(selectedFont, "normal")
  doc.setTextColor(0, 0, 0)

  // Contact info
  let contactInfo = ""
  if (data.personal.email) contactInfo += `Email: ${data.personal.email}`
  if (data.personal.phone) {
    if (contactInfo) contactInfo += " | "
    contactInfo += `Phone: ${data.personal.phone}`
  }
  if (data.personal.linkedin) {
    if (contactInfo) contactInfo += " | "
    contactInfo += `LinkedIn: ${data.personal.linkedin}`
  }
  if (data.personal.github) {
    if (contactInfo) contactInfo += " | "
    contactInfo += `GitHub: ${data.personal.github}`
  }
  if (data.personal.website) {
    if (contactInfo) contactInfo += " | "
    contactInfo += `Website: ${data.personal.website}`
  }

  doc.text(contactInfo, pageWidth / 2, yPosition, { align: "center" })

  yPosition += 15

  // Education Section - Expanded for academic
  if (data.education.length > 0) {
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("EDUCATION", pageWidth / 2, yPosition, { align: "center" })

    // Underline
    yPosition += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)

    yPosition += 10

    // Education content
    data.education.forEach((edu) => {
      // Left border
      if (primaryColorRGB) {
        doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
        doc.setLineWidth(1.5)
        doc.line(margin, yPosition - 5, margin, yPosition + 25)
      }

      // Background
      if (primaryColorRGB) {
        doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.05)
        doc.rect(margin + 3, yPosition - 5, pageWidth - margin * 2 - 3, 30, "F")
      }

      doc.setFontSize(11)
      doc.setFont(selectedFont, "bold")
      if (primaryColorRGB) {
        doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
      }
      doc.text(edu.institution || "", margin + 5, yPosition)

      // Right-aligned date
      doc.setFontSize(10)
      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      if (edu.startDate || edu.endDate) {
        const dateText = `${edu.startDate || ""} - ${edu.endDate || ""}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      doc.setFont(selectedFont, "italic")
      doc.text(edu.degree || "", margin + 5, yPosition)

      // Right-aligned location
      if (edu.location) {
        doc.text(edu.location, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      if (edu.gpa) {
        doc.setFont(selectedFont, "normal")
        doc.text(`GPA: ${edu.gpa}`, margin + 5, yPosition)
        yPosition += 5
      }

      if (edu.coursework) {
        doc.setFont(selectedFont, "semibold")
        doc.text("Relevant Coursework:", margin + 5, yPosition)
        yPosition += 5

        doc.setFont(selectedFont, "normal")
        const courseworkLines = doc.splitTextToSize(edu.coursework, pageWidth - margin * 2 - 10)
        doc.text(courseworkLines, margin + 5, yPosition)
        yPosition += courseworkLines.length * 5
      }

      if (edu.achievements) {
        doc.setFont(selectedFont, "semibold")
        doc.text("Academic Achievements:", margin + 5, yPosition)
        yPosition += 5

        doc.setFont(selectedFont, "normal")
        const achievementsLines = doc.splitTextToSize(edu.achievements, pageWidth - margin * 2 - 10)
        doc.text(achievementsLines, margin + 5, yPosition)
        yPosition += achievementsLines.length * 5
      }

      yPosition += 10
    })
  }

  // Publications Section for Academic
  if (data.publications && data.publications.length > 0) {
    yPosition += 5

    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("PUBLICATIONS & RESEARCH", pageWidth / 2, yPosition, { align: "center" })

    // Underline
    yPosition += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)

    yPosition += 10

    // Publications content
    data.publications.forEach((pub) => {
      // Left border
      if (secondaryColorRGB) {
        doc.setDrawColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
        doc.setLineWidth(1.5)
        doc.line(margin, yPosition - 5, margin, yPosition + 20)
      }

      doc.setFontSize(11)
      doc.setFont(selectedFont, "bold")
      doc.setTextColor(0, 0, 0)
      const titleLines = doc.splitTextToSize(pub.title || "", pageWidth - margin * 2 - 10)
      doc.text(titleLines, margin + 5, yPosition)
      yPosition += titleLines.length * 5

      doc.setFontSize(10)
      doc.setFont(selectedFont, "italic")
      doc.text(`${pub.journal}, ${pub.date}`, margin + 5, yPosition)
      yPosition += 5

      if (pub.authors) {
        doc.setFontSize(9)
        doc.setFont(selectedFont, "normal")
        doc.text(`Authors: ${pub.authors}`, margin + 5, yPosition)
        yPosition += 5
      }

      if (pub.description) {
        doc.setFontSize(9)
        doc.setFont(selectedFont, "normal")
        const descLines = doc.splitTextToSize(pub.description, pageWidth - margin * 2 - 10)
        doc.text(descLines, margin + 5, yPosition)
        yPosition += descLines.length * 5
      }

      yPosition += 10
    })
  } else {
    // Default publications if none provided
    yPosition += 5

    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("PUBLICATIONS & RESEARCH", pageWidth / 2, yPosition, { align: "center" })

    // Underline
    yPosition += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)

    yPosition += 10

    // Sample publications
    // First publication
    if (secondaryColorRGB) {
      doc.setDrawColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      doc.setLineWidth(1.5)
      doc.line(margin, yPosition - 5, margin, yPosition + 20)
    }

    doc.setFontSize(11)
    doc.setFont(selectedFont, "bold")
    doc.setTextColor(0, 0, 0)
    doc.text("Machine Learning Applications in Natural Language Processing", margin + 5, yPosition)
    yPosition += 5

    doc.setFontSize(10)
    doc.setFont(selectedFont, "italic")
    doc.text("Journal of Computer Science, 2022", margin + 5, yPosition)
    yPosition += 5

    doc.setFontSize(9)
    doc.setFont(selectedFont, "normal")
    doc.text(
      "Research on advanced NLP techniques using transformer models for improved language understanding.",
      margin + 5,
      yPosition,
    )

    yPosition += 15

    // Second publication
    if (secondaryColorRGB) {
      doc.setDrawColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      doc.setLineWidth(1.5)
      doc.line(margin, yPosition - 5, margin, yPosition + 20)
    }

    doc.setFontSize(11)
    doc.setFont(selectedFont, "bold")
    doc.text("Quantum Computing: Practical Applications", margin + 5, yPosition)
    yPosition += 5

    doc.setFontSize(10)
    doc.setFont(selectedFont, "italic")
    doc.text("International Conference on Quantum Technologies, 2021", margin + 5, yPosition)
    yPosition += 5

    doc.setFontSize(9)
    doc.setFont(selectedFont, "normal")
    doc.text(
      "Presented research on practical applications of quantum computing in cryptography.",
      margin + 5,
      yPosition,
    )

    yPosition += 15
  }

  // Teaching Experience
  yPosition += 5

  doc.setFontSize(12)
  doc.setFont(selectedFont, "bold")
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.text("TEACHING EXPERIENCE", pageWidth / 2, yPosition, { align: "center" })

  // Underline
  yPosition += 2
  if (primaryColorRGB) {
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.setLineWidth(0.5)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)

  yPosition += 10

  // Teaching content
  if (data.experience.length > 0) {
    data.experience.forEach((exp) => {
      doc.setFontSize(11)
      doc.setFont(selectedFont, "bold")
      if (primaryColorRGB) {
        doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
      }
      doc.text(exp.title || "", margin, yPosition)

      // Right-aligned date
      doc.setFontSize(10)
      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      if (exp.startDate || exp.endDate) {
        const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      doc.setFont(selectedFont, "italic")
      doc.text(exp.company || "", margin, yPosition)

      // Right-aligned location
      if (exp.location) {
        doc.text(exp.location, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 7

      doc.setFont(selectedFont, "normal")
      exp.responsibilities.forEach((resp) => {
        if (resp) {
          // Draw bullet point
          doc.setDrawColor(0)
          doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")

          // Handle text wrapping for responsibilities
          const textLines = doc.splitTextToSize(resp, pageWidth - margin * 2 - 10)
          doc.text(textLines, margin + 5, yPosition)
          yPosition += 5 * textLines.length
        }
      })

      yPosition += 10
    })
  } else {
    // Default teaching experience
    if (secondaryColorRGB) {
      doc.setDrawColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      doc.setLineWidth(1.5)
      doc.line(margin, yPosition - 5, margin, yPosition + 20)
    }

    doc.setFontSize(11)
    doc.setFont(selectedFont, "bold")
    doc.setTextColor(0, 0, 0)
    doc.text("Teaching Assistant, Introduction to Computer Science", margin + 5, yPosition)
    yPosition += 5

    doc.setFontSize(10)
    doc.setFont(selectedFont, "italic")
    doc.text("University of Example, Department of Computer Science", margin + 5, yPosition)
    yPosition += 5

    doc.setFont(selectedFont, "normal")
    doc.text("Fall 2020 - Spring 2021", margin + 5, yPosition)
    yPosition += 7

    // Responsibilities
    const responsibilities = [
      "Led weekly discussion sections for undergraduate students",
      "Graded assignments and provided detailed feedback",
      "Held regular office hours to assist students with coursework",
    ]

    responsibilities.forEach((resp) => {
      // Draw bullet point
      doc.setDrawColor(0)
      doc.circle(margin + 7, yPosition - 1.5, 0.7, "F")
      doc.text(resp, margin + 10, yPosition)
      yPosition += 5
    })

    yPosition += 10
  }

  // Two column layout for skills and certifications
  const columnWidth = (pageWidth - margin * 2 - 10) / 2
  const rightColumnStart = margin + columnWidth + 10

  // Save current Y position
  const startTwoColumnY = yPosition
  let leftColumnY = yPosition
  let rightColumnY = yPosition

  // Skills Section - Left column
  if (data.skills.languages || data.skills.frameworks || data.skills.databases || data.skills.other) {
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("TECHNICAL SKILLS", margin + columnWidth / 2, leftColumnY, { align: "center" })

    // Underline
    leftColumnY += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.setLineWidth(0.5)
    doc.line(margin, leftColumnY, margin + columnWidth, leftColumnY)

    leftColumnY += 10

    // Skills content
    doc.setTextColor(0, 0, 0)

    if (data.skills.languages) {
      doc.setFontSize(10)
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("Languages:", margin, leftColumnY)

      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const languagesWidth = doc.getTextWidth("Languages: ")
      const languagesLines = doc.splitTextToSize(data.skills.languages, columnWidth - languagesWidth - 5)
      doc.text(languagesLines, margin + languagesWidth, leftColumnY)
      leftColumnY += languagesLines.length * 5 + 2
    }

    if (data.skills.frameworks) {
      doc.setFontSize(10)
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("Frameworks & Tools:", margin, leftColumnY)

      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const frameworksWidth = doc.getTextWidth("Frameworks & Tools: ")
      const frameworksLines = doc.splitTextToSize(data.skills.frameworks, columnWidth - frameworksWidth - 5)
      doc.text(frameworksLines, margin + frameworksWidth, leftColumnY)
      leftColumnY += frameworksLines.length * 5 + 2
    }

    if (data.skills.databases) {
      doc.setFontSize(10)
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("Database Systems:", margin, leftColumnY)

      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const databasesWidth = doc.getTextWidth("Database Systems: ")
      const databasesLines = doc.splitTextToSize(data.skills.databases, columnWidth - databasesWidth - 5)
      doc.text(databasesLines, margin + databasesWidth, leftColumnY)
      leftColumnY += databasesLines.length * 5 + 2
    }

    if (data.skills.other) {
      doc.setFontSize(10)
      doc.setFont(selectedFont, "bold")
      if (secondaryColorRGB) {
        doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
      }
      doc.text("Research Skills:", margin, leftColumnY)

      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      const otherWidth = doc.getTextWidth("Research Skills: ")
      const otherLines = doc.splitTextToSize(data.skills.other, columnWidth - otherWidth - 5)
      doc.text(otherLines, margin + otherWidth, leftColumnY)
      leftColumnY += otherLines.length * 5 + 2
    }
  }

  // Certifications - Right column
  doc.setFontSize(12)
  doc.setFont(selectedFont, "bold")
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.text("CERTIFICATIONS & AWARDS", rightColumnStart + columnWidth / 2, rightColumnY, { align: "center" })

  // Underline
  rightColumnY += 2
  if (primaryColorRGB) {
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }
  doc.setLineWidth(0.5)
  doc.line(rightColumnStart, rightColumnY, rightColumnStart + columnWidth, rightColumnY)

  rightColumnY += 10

  // Certifications content
  doc.setTextColor(0, 0, 0)

  if (data.certifications.length > 0) {
    data.certifications.forEach((cert) => {
      // Draw bullet point
      doc.setDrawColor(0)
      doc.circle(rightColumnStart + 2, rightColumnY - 1.5, 0.7, "F")

      doc.setFontSize(10)
      doc.setFont(selectedFont, "semibold")
      doc.text(cert.name, rightColumnStart + 5, rightColumnY)

      rightColumnY += 5

      doc.setFontSize(9)
      doc.setFont(selectedFont, "normal")
      doc.text(`${cert.issuer}, ${cert.date}`, rightColumnStart + 5, rightColumnY)

      rightColumnY += 7
    })
  } else {
    // Default certifications
    // Draw bullet point
    doc.setDrawColor(0)
    doc.circle(rightColumnStart + 2, rightColumnY - 1.5, 0.7, "F")

    doc.setFontSize(10)
    doc.setFont(selectedFont, "semibold")
    doc.text("Outstanding Research Award", rightColumnStart + 5, rightColumnY)

    rightColumnY += 5

    doc.setFontSize(9)
    doc.setFont(selectedFont, "normal")
    doc.text("University of Example, 2022", rightColumnStart + 5, rightColumnY)

    rightColumnY += 10

    // Draw bullet point
    doc.setDrawColor(0)
    doc.circle(rightColumnStart + 2, rightColumnY - 1.5, 0.7, "F")

    doc.setFontSize(10)
    doc.setFont(selectedFont, "semibold")
    doc.text("Teaching Excellence Certificate", rightColumnStart + 5, rightColumnY)

    rightColumnY += 5

    doc.setFontSize(9)
    doc.setFont(selectedFont, "normal")
    doc.text("Department of Computer Science, 2021", rightColumnStart + 5, rightColumnY)

    rightColumnY += 7
  }

  // Determine the maximum Y position from both columns
  yPosition = Math.max(leftColumnY, rightColumnY) + 10

  // Projects Section
  if (data.projects.length > 0) {
    doc.setFontSize(12)
    doc.setFont(selectedFont, "bold")
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.text("RESEARCH PROJECTS", pageWidth / 2, yPosition, { align: "center" })

    // Underline
    yPosition += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)

    yPosition += 10

    // Projects content
    data.projects.forEach((project, index) => {
      // Left border
      if (secondaryColorRGB) {
        doc.setDrawColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
        doc.setLineWidth(1.5)
        doc.line(margin, yPosition - 5, margin, yPosition + 20)
      }

      // Background for alternating projects
      if (index % 2 === 0 && primaryColorRGB) {
        doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b, 0.05)
        doc.rect(margin + 3, yPosition - 5, pageWidth - margin * 2 - 3, 30, "F")
      }

      doc.setFontSize(11)
      doc.setFont(selectedFont, "bold")
      if (primaryColorRGB) {
        doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
      }
      doc.text(project.name || "", margin + 5, yPosition)

      // Right-aligned date
      doc.setFontSize(10)
      doc.setFont(selectedFont, "normal")
      doc.setTextColor(0, 0, 0)
      if (project.startDate || project.endDate) {
        const dateText = `${project.startDate || ""} - ${project.endDate || ""}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      if (project.technologies) {
        doc.setFont(selectedFont, "italic")
        doc.text(`Technologies: ${project.technologies}`, margin + 5, yPosition)
        yPosition += 5
      }

      doc.setFont(selectedFont, "normal")
      project.description.forEach((desc) => {
        if (desc) {
          // Draw bullet point
          doc.setDrawColor(0)
          doc.circle(margin + 7, yPosition - 1.5, 0.7, "F")

          // Handle text wrapping for descriptions
          const textLines = doc.splitTextToSize(desc, pageWidth - margin * 2 - 15)
          doc.text(textLines, margin + 10, yPosition)
          yPosition += 5 * textLines.length
        }
      })

      yPosition += 10
    })
  }
}

function generateStandardLayout(
  doc: jsPDF,
  data: ResumeData,
  template: any,
  margin: number,
  pageWidth: number,
  primaryColorRGB: any,
  secondaryColorRGB: any,
  selectedFont: string,
) {
  // Add a title
  doc.setFontSize(18)
  doc.setFont(selectedFont, "bold")
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
  }

  // Header positioning based on template style
  const headerAlign = template.headerStyle === "minimal" ? "left" : "center"
  const headerX = template.headerStyle === "minimal" ? margin : 105

  doc.text(data.personal.fullName || "Resume", headerX, 20, { align: headerAlign })

  // Add contact information
  doc.setFontSize(10)
  doc.setFont(selectedFont, "normal")
  if (secondaryColorRGB) {
    doc.setTextColor(secondaryColorRGB.r, secondaryColorRGB.g, secondaryColorRGB.b)
  }

  // Build contact info line
  const contactParts = []
  if (data.personal.email) contactParts.push(`Email: ${data.personal.email}`)
  if (data.personal.phone) contactParts.push(`Phone: ${data.personal.phone}`)
  if (data.personal.linkedin) contactParts.push(`LinkedIn: ${data.personal.linkedin}`)
  if (data.personal.github) contactParts.push(`GitHub: ${data.personal.github}`)
  if (data.personal.website) contactParts.push(`Website: ${data.personal.website}`)

  const contactInfo = contactParts.join(" | ")
  doc.text(contactInfo, headerX, 30, { align: headerAlign })

  // Reset text color to black for content
  doc.setTextColor(0, 0, 0)

  // Add sections
  let yPosition = 40

  // Helper function to add section headers with lines
  const addSectionHeader = (title: string, y: number): number => {
    doc.setFontSize(14)
    doc.setFont(selectedFont, "bold")

    // Set color based on template
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    }

    doc.text(title, margin, y)

    // Add horizontal line
    y += 2
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b)
    } else {
      doc.setDrawColor(0, 0, 0)
    }
    doc.setLineWidth(0.5)
    doc.line(margin, y, pageWidth - margin, y)

    // Reset text color
    doc.setTextColor(0, 0, 0)

    return y + 8
  }

  // Education section
  if (data.education.length > 0) {
    yPosition = addSectionHeader("Education", yPosition)

    data.education.forEach((edu) => {
      doc.setFontSize(12)
      doc.setFont(selectedFont, "bold")
      doc.text(edu.institution || "", margin, yPosition)

      // Right-aligned date
      if (edu.startDate || edu.endDate) {
        const dateText = `${edu.startDate || ""} - ${edu.endDate || ""}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      doc.setFontSize(11)
      doc.setFont(selectedFont, "italic")
      doc.text(edu.degree || "", margin, yPosition)

      // Right-aligned location
      if (edu.location) {
        doc.text(edu.location, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      doc.setFont(selectedFont, "normal")
      if (edu.gpa) {
        doc.text(`GPA: ${edu.gpa}`, margin, yPosition)
        yPosition += 5
      }

      if (edu.coursework) {
        doc.text(`Relevant Coursework: ${edu.coursework}`, margin, yPosition)
        yPosition += 5
      }

      if (edu.achievements) {
        doc.text(`Achievements: ${edu.achievements}`, margin, yPosition)
        yPosition += 5
      }

      yPosition += 5
    })
  }

  // Experience section
  if (data.experience.length > 0) {
    yPosition = addSectionHeader("Experience", yPosition)

    data.experience.forEach((exp) => {
      doc.setFontSize(12)
      doc.setFont(selectedFont, "bold")
      doc.text(exp.title || "", margin, yPosition)

      // Right-aligned date
      if (exp.startDate || exp.endDate) {
        const dateText = `${exp.startDate || ""} - ${exp.endDate || ""}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      doc.setFontSize(11)
      doc.setFont(selectedFont, "italic")
      doc.text(exp.company || "", margin, yPosition)

      // Right-aligned location
      if (exp.location) {
        doc.text(exp.location, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      doc.setFont(selectedFont, "normal")
      exp.responsibilities.forEach((resp) => {
        if (resp) {
          // Draw bullet point
          doc.setDrawColor(0)
          doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
          doc.text(`${resp}`, margin + 5, yPosition)
          yPosition += 5
        }
      })

      yPosition += 5
    })
  }

  // Projects section
  if (data.projects.length > 0) {
    yPosition = addSectionHeader("Projects", yPosition)

    data.projects.forEach((project) => {
      doc.setFontSize(12)
      doc.setFont(selectedFont, "bold")
      doc.text(project.name || "", margin, yPosition)

      // Right-aligned date
      if (project.startDate || project.endDate) {
        const dateText = `${project.startDate || ""} - ${project.endDate || ""}`
        doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
      }

      yPosition += 5

      doc.setFontSize(11)
      doc.setFont(selectedFont, "normal")
      if (project.technologies) {
        doc.text(`Technologies: ${project.technologies}`, margin, yPosition)
        yPosition += 5
      }

      project.description.forEach((desc) => {
        if (desc) {
          // Draw bullet point
          doc.setDrawColor(0)
          doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
          doc.text(`${desc}`, margin + 5, yPosition)
          yPosition += 5
        }
      })

      yPosition += 5
    })
  }

  // Skills section
  if (data.skills.languages || data.skills.frameworks || data.skills.databases || data.skills.other) {
    yPosition = addSectionHeader("Technical Skills", yPosition)

    doc.setFontSize(11)
    doc.setFont(selectedFont, "normal")

    if (data.skills.languages) {
      doc.setFont(selectedFont, "bold")
      doc.text("Languages:", margin, yPosition)
      doc.setFont(selectedFont, "normal")
      const languagesWidth = doc.getTextWidth("Languages: ")
      doc.text(data.skills.languages, margin + languagesWidth, yPosition)
      yPosition += 5
    }

    if (data.skills.frameworks) {
      doc.setFont(selectedFont, "bold")
      doc.text("Frameworks & Tools:", margin, yPosition)
      doc.setFont(selectedFont, "normal")
      const frameworksWidth = doc.getTextWidth("Frameworks & Tools: ")
      doc.text(data.skills.frameworks, margin + frameworksWidth, yPosition)
      yPosition += 5
    }

    if (data.skills.databases) {
      doc.setFont(selectedFont, "bold")
      doc.text("Database Systems:", margin, yPosition)
      doc.setFont(selectedFont, "normal")
      const databasesWidth = doc.getTextWidth("Database Systems: ")
      doc.text(data.skills.databases, margin + databasesWidth, yPosition)
      yPosition += 5
    }

    if (data.skills.other) {
      doc.setFont(selectedFont, "bold")
      doc.text("Other Skills:", margin, yPosition)
      doc.setFont(selectedFont, "normal")
      const otherWidth = doc.getTextWidth("Other Skills: ")
      doc.text(data.skills.other, margin + otherWidth, yPosition)
      yPosition += 5
    }

    yPosition += 5
  }

  // Certifications section
  if (data.certifications.length > 0) {
    yPosition = addSectionHeader("Certifications", yPosition)

    doc.setFontSize(11)
    doc.setFont(selectedFont, "normal")

    data.certifications.forEach((cert) => {
      // Draw bullet point
      doc.setDrawColor(0)
      doc.circle(margin + 2, yPosition - 1.5, 0.7, "F")
      doc.text(`${cert.name} (${cert.issuer}, ${cert.date})`, margin + 5, yPosition)
      yPosition += 5
    })
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

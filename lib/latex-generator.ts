import type { ResumeData, ResumeSection } from "./resume-types"

export function generateLatex(data: ResumeData, templateId = "classic"): string {
  const latex = `\\documentclass[10pt,a4paper]{article}

% --- PACKAGES ---
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{graphicx}
\\usepackage{xcolor}
\\usepackage{fontawesome5} % Icons for social links
\\usepackage{hyperref}
\\usepackage{enumitem} % For list customization
\\usepackage{titlesec}
\\usepackage{multicol} % For two-column layout
\\usepackage[left=1.5cm, top=1.5cm, right=1.5cm, bottom=1.5cm]{geometry}

% --- CUSTOMIZATIONS ---
\\pagestyle{empty} % No page numbers
\\setlength{\\parindent}{0pt} % No paragraph indent
\\setlist{nosep, leftmargin=*} % More compact lists globally

% Define a custom color for links
\\definecolor{linkcolor}{rgb}{0.1, 0.4, 0.7}
\\hypersetup{
    colorlinks=true,
    linkcolor=linkcolor,
    urlcolor=linkcolor,
}

% Improved section headings with compact spacing
\\titleformat{\\section}
  {\\large\\bfseries\\scshape\\color{black!75}}
  {}
  {0em}
  {}[\\color{black!70}\\hrule]
\\titlespacing*{\\section}{0pt}{0.7mm}{2mm}

% Subsection formatting to match main sections
\\titleformat{\\subsection}
  {\\normalsize\\bfseries\\scshape\\color{black!75}}
  {}
  {0em}
  {}[\\color{black!70}\\hrule height 0.3pt]
\\titlespacing*{\\subsection}{0pt}{0.7mm}{2mm}

% Compact project/bullet environment
\\newenvironment{project}{
    \\begin{itemize}[leftmargin=3ex, rightmargin=2ex, noitemsep, labelsep=1.2mm, itemsep=0mm, topsep=0mm]\\small
}{
    \\end{itemize}
}

% --- DOCUMENT START ---
\\begin{document}

% --- HEADER ---
\\begin{center}
    {\\Huge \\bfseries ${escapeLatex(data.personal.fullName || "Your Name")}}\\vspace{6pt}\\\\
    {\\small
    ${generatePersonalInfo(data.personal)}
    }
    \\hline
\\end{center}

${generateSections(data.sections, true)}

\\end{document}`

  return latex
}

function escapeLatex(text: any): string {
  if (!text) return ""
  // Handle objects with content property (like executive-summary)
  if (typeof text === 'object' && text.content) {
    text = text.content
  }
  // Convert to string if not already
  if (typeof text !== 'string') {
    text = String(text)
  }
  // Critical: Backslash must be replaced first, but we need to handle & properly
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}")
}

function generatePersonalInfo(personal: any): string {
  const line1: string[] = []
  const line2: string[] = []
  
  // First line: Location, Phone, Email
  if (personal.location) line1.push(escapeLatex(personal.location))
  if (personal.phone) line1.push(escapeLatex(personal.phone))
  if (personal.email) line1.push(`\\href{mailto:${personal.email}}{${escapeLatex(personal.email)}}`)
  
  // Second line: Website, LinkedIn, GitHub with icons
  if (personal.website) {
    const url = personal.website.startsWith('http') ? personal.website : `https://${personal.website}`
    line2.push(`\\href{${url}}{\\faIcon{globe}\\, ${escapeLatex(personal.website)}}`)
  }
  if (personal.linkedin) {
    const url = personal.linkedin.startsWith('http') ? personal.linkedin : `https://linkedin.com/in/${personal.linkedin}`
    line2.push(`\\href{${url}}{\\faIcon[regular]{linkedin}\\, ${escapeLatex(personal.linkedin)}}`)
  }
  if (personal.github) {
    const url = personal.github.startsWith('http') ? personal.github : `https://github.com/${personal.github}`
    line2.push(`\\href{${url}}{\\faIcon[brands]{github}\\, ${escapeLatex(personal.github)}}`)
  }
  
  // Custom links (e.g., LeetCode, portfolio, etc.)
  if (personal.customLinks) {
    const links = personal.customLinks.split('\n').filter((l: string) => l.trim())
    links.forEach((link: string) => {
      const match = link.match(/^([^:]+):\s*(.+)$/)
      if (match) {
        const [, label, url] = match
        const fullUrl = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`
        line2.push(`\\href{${fullUrl}}{\\faIcon{link}\\, ${escapeLatex(label.trim())}}`)
      }
    })
  }
  
  let result = ""
  if (line1.length > 0) result += line1.join(" \\textbullet{} ")
  if (line2.length > 0) {
    if (result) result += "\\\\\n    "
    result += line2.join(" \\quad ")
  }
  
  return result
}

function generateSections(sections: ResumeSection[], includeExecutiveSummary = false): string {
  const filtered = sections.filter(s => s.visible).sort((a, b) => a.order - b.order)
  
  // Separate executive summary from other sections
  const execSummary = filtered.find(s => s.type === "executive-summary")
  const otherSections = filtered.filter(s => s.type !== "executive-summary")
  
  let result = ""
  
  // Executive summary right after header (no section title formatting)
  if (includeExecutiveSummary && execSummary && execSummary.data) {
    result += `${escapeLatex(execSummary.data)}\n\\vspace{0.7mm}\n\n`
  }
  
  // Other sections with normal formatting - compact spacing
  result += otherSections.map(section => generateSection(section)).join("\n\\vspace{0.7mm}\n")
  
  return result
}

function generateSection(section: ResumeSection): string {
  // Executive summary is handled separately, skip it here
  if (section.type === "executive-summary") return ""
  
  // CRITICAL: Escape & in section title for LaTeX
  const escapedTitle = section.title.replace(/&/g, "\\&")
  const title = `% --- ${escapedTitle.toUpperCase()} ---
\\section*{${escapedTitle.toUpperCase()}}
`
  
  switch (section.type) {
    case "education":
      return title + generateEducation(section.data)
    case "research-interests":
      return title + escapeLatex(section.data) + "\n"
    case "research-experience":
      return title + generateResearchExperience(section.data)
    case "experience":
    case "professional-experience":
    case "extracurricular":
      return title + generateExperience(section.data)
    case "projects":
      return title + generateProjects(section.data)
    case "publications":
      return title + generatePublications(section.data)
    case "certifications":
      return title + generateCertifications(section.data)
    case "skills":
      return title + generateSkills(section.data)
    case "awards":
      return title + generateAwards(section.data)
    case "interests":
    case "languages":
      return title + escapeLatex(section.data) + "\n"
    case "custom":
      return title + generateCustomSection(section.data.content || section.data)
    default:
      return title + "Section content\n"
  }
}

function generateEducation(data: any[]): string {
  if (!Array.isArray(data)) return ""
  
  return data.map(edu => {
    // Only include parts that have values - complete flexibility
    let content = ""
    
    // Institution and location line (only if institution exists)
    if (edu.institution) {
      content += `\\noindent\\textbf{${escapeLatex(edu.institution)}}`
      if (edu.location) {
        content += `\\hfill ${escapeLatex(edu.location)}`
      }
      content += "\\\\\n"
    }
    
    // Degree and dates line (only if degree exists)
    if (edu.degree) {
      content += `\\noindent\\textit{${escapeLatex(edu.degree)}}`
      if (edu.startDate || edu.endDate) {
        const start = edu.startDate || ""
        const end = edu.endDate || "Present"
        if (start || end !== "Present") {
          content += `\\hfill \\textit{${escapeLatex(start)}${start && end ? " -- " : ""}${escapeLatex(end)}}`
        }
      }
      content += "\\\\\n"
    }
    
    // Optional fields - each on new line if present
    if (edu.gpa) {
      content += `\\noindent\\textbf{GPA:} ${escapeLatex(edu.gpa)}\\\\\n`
    }
    
    if (edu.coursework) {
      content += `\\noindent\\textbf{Relevant Coursework:} ${escapeLatex(edu.coursework)}\\\\\n`
    }
    
    if (edu.achievements) {
      content += `\\noindent\\textbf{Achievements:} ${escapeLatex(edu.achievements)}\\\\\n`
    }
    
    content += "\n"
    return content
  }).join("")
}

function generateResearchExperience(data: any[]): string {
  if (!Array.isArray(data)) return ""
  
  return data.map(exp => {
    // Flexible - show only what's provided
    let content = ""
    
    // Main line: role | project (optional) with status/dates on right
    const parts = []
    if (exp.role) parts.push(`\\textbf{${escapeLatex(exp.role)}}`)
    if (exp.project) parts.push(`\\textit{${escapeLatex(exp.project)}}`)
    
    if (parts.length > 0) {
      content += parts.join(" \\textbar{} ")
      if (exp.status) {
        content += ` \\hfill \\textit{${escapeLatex(exp.status)}}`
      }
      content += "\n"
    }
    
    if (exp.course) {
      content += `\\textit{${escapeLatex(exp.course)}}\n`
    }
    
    if (exp.bullets && Array.isArray(exp.bullets) && exp.bullets.length > 0) {
      const validBullets = exp.bullets.filter((b: string) => b && b.trim())
      if (validBullets.length > 0) {
        content += "\\begin{project}\n"
        validBullets.forEach((bullet: string) => {
          content += `    \\item ${escapeLatex(bullet)}\n`
        })
        content += "\\end{project}\n\\vspace{2mm}\n\n"
      } else {
        content += "\\vspace{2mm}\n\n"
      }
    } else {
      content += "\\vspace{2mm}\n\n"
    }
    
    return content
  }).join("")
}

function generateExperience(data: any[]): string {
  if (!Array.isArray(data)) return ""
  
  return data.map(exp => {
    // Flexible - only show what's filled
    let content = ""
    
    const parts = []
    if (exp.position) parts.push(`\\textbf{${escapeLatex(exp.position)}}`)
    if (exp.organization) parts.push(escapeLatex(exp.organization))
    
    if (parts.length > 0) {
      content += parts.join(" \\textbar{} ")
      
      // Add dates if provided
      if (exp.startDate || exp.endDate) {
        const start = exp.startDate || ""
        const end = exp.endDate || "Present"
        if (start || end !== "Present") {
          content += ` \\hfill ${escapeLatex(start)}${start && end ? " -- " : ""}${escapeLatex(end)}`
        }
      }
      content += "\n"
    }
    
    if (exp.bullets && Array.isArray(exp.bullets) && exp.bullets.length > 0) {
      const validBullets = exp.bullets.filter((b: string) => b && b.trim())
      if (validBullets.length > 0) {
        content += "\\begin{project}\n"
        validBullets.forEach((bullet: string) => {
          content += `    \\item ${escapeLatex(bullet)}\n`
        })
        content += "\\end{project}\n\\vspace{2mm}\n\n"
      } else {
        content += "\\vspace{2mm}\n\n"
      }
    } else {
      content += "\\vspace{2mm}\n\n"
    }
    
    return content
  }).join("")
}

function generateSkills(data: any): string {
  if (!data.categories || !Array.isArray(data.categories)) return ""
  
  let content = "\\begin{itemize}\n"
  data.categories.forEach((cat: any) => {
    content += `    \\item \\textbf{${escapeLatex(cat.name)}:} ${escapeLatex(cat.items)}\n`
  })
  content += "\\end{itemize}\n\n"
  
  return content
}

function generateAwards(data: any): string {
  if (!data.categories || !Array.isArray(data.categories)) return ""
  
  // Check if we should use multicols (multiple categories)
  const useMulticols = data.categories.length > 2
  
  let content = useMulticols ? "\\begin{multicols}{2}\n" : ""
  
  data.categories.forEach((cat: any) => {
    content += `\\textbf{${escapeLatex(cat.title)}}\n\\begin{itemize}\n`
    
    // Handle flexible input - could be string or array
    if (typeof cat.items === 'string') {
      // Try to intelligently parse the string
      const items = cat.items.split(/[\\n,]/).map((s: string) => s.trim()).filter((s: string) => s.length > 0)
      items.forEach((item: string) => {
        content += `    \\item ${escapeLatex(item)}\n`
      })
    } else if (Array.isArray(cat.items)) {
      cat.items.forEach((item: string) => {
        content += `    \\item ${escapeLatex(item)}\n`
      })
    }
    
    content += "\\end{itemize}\n"
    if (!useMulticols) content += "\n"
  })
  
  if (useMulticols) {
    content += "\\end{multicols}\n\n"
  }
  
  return content
}

function generateProjects(data: any[]): string {
  if (!Array.isArray(data)) return ""
  
  return data.map(proj => {
    let content = ""
    
    // Flexible main line
    if (proj.name) {
      content += `\\textbf{${escapeLatex(proj.name)}}`
      if (proj.technologies) {
        content += ` \\textbar{} \\textit{${escapeLatex(proj.technologies)}}`
      }
      if (proj.date) {
        content += ` \\hfill ${escapeLatex(proj.date)}`
      }
      content += "\n"
    }
    
    if (proj.link) {
      content += `\\href{${proj.link}}{${escapeLatex(proj.link)}}\n`
    }
    
    // Handle description - can be string array or single string
    if (proj.description && Array.isArray(proj.description) && proj.description.length > 0) {
      const validDesc = proj.description.filter((d: string) => d && d.trim())
      if (validDesc.length > 0) {
        content += "\\begin{project}\n"
        validDesc.forEach((bullet: string) => {
          content += `    \\item ${escapeLatex(bullet)}\n`
        })
        content += "\\end{project}\n\\vspace{2mm}\n\n"
      } else {
        content += "\\vspace{2mm}\n\n"
      }
    } else if (proj.description && typeof proj.description === 'string') {
      content += `${escapeLatex(proj.description)}\n\\vspace{2mm}\n\n`
    } else {
      content += "\\vspace{2mm}\n\n"
    }
    
    return content
  }).join("")
}

function generatePublications(data: any[]): string {
  if (!Array.isArray(data)) return ""
  
  return data.map((pub, index) => {
    let content = `\\noindent [${index + 1}] `
    
    if (pub.authors) content += `${escapeLatex(pub.authors)}. `
    if (pub.title) content += `"\\textit{${escapeLatex(pub.title)}}." `
    if (pub.venue) content += `${escapeLatex(pub.venue)}, `
    if (pub.year) content += `${escapeLatex(pub.year)}. `
    if (pub.doi) content += `DOI: ${escapeLatex(pub.doi)}`
    
    content += "\n\\vspace{2mm}\n\n"
    return content
  }).join("")
}

function generateCertifications(data: any): string {
  // Handle both array and object with items property
  const items = Array.isArray(data) ? data : (data?.items || [])
  
  if (!Array.isArray(items) || items.length === 0) return ""
  
  return items.map((cert: any) => {
    // Handle string format (simple bullet points)
    if (typeof cert === 'string') {
      return `\\item ${escapeLatex(cert)}\n`
    }
    
    // Handle object format
    let content = ""
    
    if (cert.name) {
      content += `\\textbf{${escapeLatex(cert.name)}}`
      if (cert.issuer) {
        content += ` --- ${escapeLatex(cert.issuer)}`
      }
      if (cert.date) {
        content += ` \\hfill ${escapeLatex(cert.date)}`
      }
      content += "\n"
    }
    
    if (cert.credentialId) {
      content += `\\textit{Credential ID:} ${escapeLatex(cert.credentialId)}\n`
    }
    
    if (cert.link) {
      content += `\\href{${cert.link}}{View Certificate}\n`
    }
    
    content += "\\vspace{2mm}\n\n"
    return content
  }).join("")
}

function generateCustomSection(content: string): string {
  if (!content || typeof content !== 'string') return ""
  
  const lines = content.split('\n')
  let latex = ""
  let inBulletList = false
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    // Skip empty lines
    if (!trimmed) {
      if (inBulletList) {
        latex += "\\end{itemize}\n\n"
        inBulletList = false
      }
      latex += "\n"
      continue
    }
    
    // Bullet point
    if (trimmed.startsWith('- ')) {
      if (!inBulletList) {
        latex += "\\begin{itemize}\n"
        inBulletList = true
      }
      latex += `  \\item ${escapeLatex(trimmed.substring(2))}\n`
    }
    // Subsection title (ends with :)
    else if (trimmed.endsWith(':')) {
      if (inBulletList) {
        latex += "\\end{itemize}\n\n"
        inBulletList = false
      }
      latex += `\\textbf{${escapeLatex(trimmed)}}\n\n`
    }
    // Regular paragraph
    else {
      if (inBulletList) {
        latex += "\\end{itemize}\n\n"
        inBulletList = false
      }
      latex += `${escapeLatex(trimmed)}\n\n`
    }
  }
  
  // Close any open bullet list
  if (inBulletList) {
    latex += "\\end{itemize}\n"
  }
  
  return latex
}

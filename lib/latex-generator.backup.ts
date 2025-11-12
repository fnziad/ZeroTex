import type { ResumeData } from "./resume-types"
import { getTemplateConfig } from "./templates"

export function generateLatex(data: ResumeData, templateId = "classic"): string {
  const template = getTemplateConfig(templateId)

  // Add required LaTeX packages based on template
  const latex = `
\\documentclass[letterpaper,11pt]{${template.latexClass}}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontenc}
\\usepackage{lmodern}
${template.fontPackages.join("\n")}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Define colors based on template
\\definecolor{primary}{HTML}{${template.colorScheme.primary.replace("#", "")}}
\\definecolor{secondary}{HTML}{${template.colorScheme.secondary.replace("#", "")}}
\\definecolor{accent}{HTML}{${template.colorScheme.accent.replace("#", "")}}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\color{primary}
}{}{0em}{}[\\color{primary}\\titlerule \\vspace{-5pt}]

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

${generateHeader(data.personal, template.headerStyle)}

${generateEducationSection(data.education)}

${generateExperienceSection(data.experience)}

${generateProjectsSection(data.projects)}

${generateSkillsSection(data.skills)}

${generateCertificationsSection(data.certifications)}

%-------------------------------------------
\\end{document}
  `

  return latex
}

function generateHeader(personal: any, headerStyle: string): string {
  if (headerStyle === "centered") {
    return `
%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(personal.fullName || "Your Full Name")}} \\\\ \\vspace{1pt}
    \\small ${personal.email ? `Email: ${escapeLatex(personal.email)}` : "Email: your.email@example.com"} $|$ 
    ${personal.phone ? `Phone: ${escapeLatex(personal.phone)}` : "Phone: (123) 456-7890"} $|$ 
    ${personal.linkedin ? `LinkedIn: ${escapeLatex(personal.linkedin)}` : "LinkedIn: linkedin.com/in/yourprofile"} $|$
    ${personal.github ? `GitHub: ${escapeLatex(personal.github)}` : "GitHub: github.com/yourusername"}
    ${personal.website ? `$|$ Website: ${escapeLatex(personal.website)}` : ""}
\\end{center}
`
  } else if (headerStyle === "minimal") {
    return `
%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(personal.fullName || "Your Full Name")}} \\\\
    \\vspace{3pt}
    \\small
    ${personal.email ? `\\href{mailto:${personal.email}}{${escapeLatex(personal.email)}}` : "your.email@example.com"} $|$ 
    ${personal.phone ? escapeLatex(personal.phone) : "(123) 456-7890"} $|$ 
    ${personal.linkedin ? `\\href{https://linkedin.com/in/${personal.linkedin}}{${escapeLatex(personal.linkedin)}}` : "linkedin.com/in/yourprofile"} $|$
    ${personal.github ? `\\href{https://github.com/${personal.github}}{${escapeLatex(personal.github)}}` : "github.com/yourusername"}
    ${personal.website ? `$|$ \\href{https://${escapeLatex(personal.website)}}{${escapeLatex(personal.website)}}` : ""}
\\end{center}
\\vspace{-8pt}
`
  } else if (headerStyle === "sidebar") {
    return `
%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(personal.fullName || "Your Full Name")}} \\\\
    \\vspace{3pt}
    \\begin{tabular}{c c c c}
    ${personal.email ? `\\href{mailto:${personal.email}}{${escapeLatex(personal.email)}}` : "your.email@example.com"} & 
    ${personal.phone ? escapeLatex(personal.phone) : "(123) 456-7890"} & 
    ${personal.linkedin ? `\\href{https://linkedin.com/in/${personal.linkedin}}{${escapeLatex(personal.linkedin)}}` : "linkedin.com/in/yourprofile"} &
    ${personal.github ? `\\href{https://github.com/${personal.github}}{${escapeLatex(personal.github)}}` : "github.com/yourusername"}
    ${personal.website ? `& \\href{https://${escapeLatex(personal.website)}}{${escapeLatex(personal.website)}}` : ""}
    \\end{tabular}
\\end{center}
\\vspace{-8pt}
`
  } else {
    // Default to centered
    return `
%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(personal.fullName || "Your Full Name")}} \\\\ \\vspace{1pt}
    \\small ${personal.email ? `Email: ${escapeLatex(personal.email)}` : "Email: your.email@example.com"} $|$ 
    ${personal.phone ? `Phone: ${escapeLatex(personal.phone)}` : "Phone: (123) 456-7890"} $|$ 
    ${personal.linkedin ? `LinkedIn: ${escapeLatex(personal.linkedin)}` : "LinkedIn: linkedin.com/in/yourprofile"} $|$
    ${personal.github ? `GitHub: ${escapeLatex(personal.github)}` : "GitHub: github.com/yourusername"}
    ${personal.website ? `$|$ Website: ${escapeLatex(personal.website)}` : ""}
\\end{center}
`
  }
}

function escapeLatex(text: string): string {
  if (!text) return ""

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

function generateEducationSection(education: any[]): string {
  if (education.length === 0 || !education[0].institution) return ""

  let section = `
%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
`

  education.forEach((edu) => {
    if (!edu.institution) return

    section += `
    \\resumeSubheading
      {${escapeLatex(edu.institution)}}{${escapeLatex(edu.startDate)} -- ${escapeLatex(edu.endDate)}}
      {${escapeLatex(edu.degree)}}{${escapeLatex(edu.location)}}
      ${edu.gpa || edu.coursework || edu.achievements ? "\\resumeItemListStart" : ""}
      ${edu.gpa ? `\\resumeItem{GPA: ${escapeLatex(edu.gpa)}}` : ""}
      ${edu.coursework ? `\\resumeItem{Relevant Coursework: ${escapeLatex(edu.coursework)}}` : ""}
      ${edu.achievements ? `\\resumeItem{${escapeLatex(edu.achievements)}}` : ""}
      ${edu.gpa || edu.coursework || edu.achievements ? "\\resumeItemListEnd" : ""}
`
  })

  section += `  \\resumeSubHeadingListEnd
`

  return section
}

function generateExperienceSection(experience: any[]): string {
  if (experience.length === 0 || !experience[0].company) return ""

  let section = `
%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
`

  experience.forEach((exp) => {
    if (!exp.company) return

    section += `
    \\resumeSubheading
      {${escapeLatex(exp.title)}}{${escapeLatex(exp.startDate)} -- ${escapeLatex(exp.endDate)}}
      {${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}
      \\resumeItemListStart
`

    exp.responsibilities.forEach((resp: string) => {
      if (resp.trim()) {
        section += `        \\resumeItem{${escapeLatex(resp)}}
`
      }
    })

    section += `      \\resumeItemListEnd
`
  })

  section += `  \\resumeSubHeadingListEnd
`

  return section
}

function generateProjectsSection(projects: any[]): string {
  if (projects.length === 0 || !projects[0].name) return ""

  let section = `
%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
`

  projects.forEach((project) => {
    if (!project.name) return

    section += `
      \\resumeProjectHeading
          {\\textbf{${escapeLatex(project.name)}} ${project.technologies ? `$|$ \\emph{${escapeLatex(project.technologies)}}` : ""}}
          {${escapeLatex(project.startDate)} -- ${escapeLatex(project.endDate)}}
          \\resumeItemListStart
`

    project.description.forEach((desc: string) => {
      if (desc.trim()) {
        section += `            \\resumeItem{${escapeLatex(desc)}}
`
      }
    })

    section += `          \\resumeItemListEnd
`
  })

  section += `    \\resumeSubHeadingListEnd
`

  return section
}

function generateSkillsSection(skills: any): string {
  if (!skills.languages && !skills.frameworks && !skills.databases && !skills.other) return ""

  return `
%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     ${skills.languages ? `\\textbf{Languages}{: ${escapeLatex(skills.languages)}}` : ""}
     ${skills.frameworks ? `\\\\\\textbf{Frameworks \\& Tools}{: ${escapeLatex(skills.frameworks)}}` : ""}
     ${skills.databases ? `\\\\\\textbf{Database Systems}{: ${escapeLatex(skills.databases)}}` : ""}
     ${skills.other ? `\\\\\\textbf{Other Skills}{: ${escapeLatex(skills.other)}}` : ""}
    }}
\\end{itemize}
`
}

function generateCertificationsSection(certifications: any[]): string {
  if (certifications.length === 0 || !certifications[0].name) return ""

  let section = `
%-----------CERTIFICATIONS-----------
\\section{Certifications}
\\resumeSubHeadingListStart
`

  certifications.forEach((cert) => {
    if (!cert.name) return

    section += `    \\resumeSubItem{${escapeLatex(cert.name)} (${escapeLatex(cert.issuer)}, ${escapeLatex(cert.date)})}
`
  })

  section += ` \\resumeSubHeadingListEnd
`

  return section
}

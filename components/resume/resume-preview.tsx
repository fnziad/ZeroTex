"use client"

import type { ResumeData, ResumeSection } from "@/lib/resume-types"

interface ResumePreviewProps {
  data: ResumeData
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const renderSection = (section: ResumeSection) => {
    if (!section.visible) return null
    const sectionData = section.data
    
    switch (section.type) {
      case "executive-summary":
        return (
          <div key={section.id} className="mb-2">
            <p className="text-xs leading-snug italic text-justify">{sectionData?.content || sectionData}</p>
          </div>
        )
      case "education":
        if (!Array.isArray(sectionData)) return null
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1 uppercase tracking-wide">{section.title}</h2>
            <div className="space-y-1 text-xs">
              {sectionData.map((edu: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <strong className="text-sm">{edu.institution}</strong>
                    <span className="text-xs italic">{edu.startDate} – {edu.endDate || "Present"}</span>
                  </div>
                  <div className="text-xs"><em>{edu.degree}</em></div>
                  {edu.location && <div className="text-xs">{edu.location}</div>}
                  {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
                  {edu.coursework && <div className="text-xs mt-0.5 leading-tight">{edu.coursework}</div>}
                  {edu.achievements && <div className="text-xs mt-0.5 leading-tight">{edu.achievements}</div>}
                </div>
              ))}
            </div>
          </div>
        )
      case "research-interests":
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <p className="text-xs leading-relaxed">{sectionData}</p>
          </div>
        )
      case "research-experience":
      case "experience":
      case "professional-experience":
      case "extracurricular":
        if (!Array.isArray(sectionData)) return null
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <div className="space-y-1.5 text-xs">
              {sectionData.map((exp: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <strong className="text-sm">{exp.title || exp.position || exp.role}</strong>
                    <span className="text-xs italic">{exp.startDate || exp.status}</span>
                  </div>
                  <div className="text-xs"><em>{exp.institution || exp.organization || exp.project}</em></div>
                  {exp.course && <div className="text-xs italic">{exp.course}</div>}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc ml-4 text-xs space-y-0.5 mt-1">
                      {exp.bullets.map((b: string, i: number) => (
                        <li key={i} className="leading-snug text-justify">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case "projects":
        if (!Array.isArray(sectionData)) return null
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <div className="space-y-1.5 text-xs">
              {sectionData.map((proj: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <strong className="text-sm">{proj.name}</strong>
                    <span className="text-xs italic">{proj.date}</span>
                  </div>
                  {proj.technologies && <div className="text-xs italic">{proj.technologies}</div>}
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{proj.link}</a>}
                  {proj.description && Array.isArray(proj.description) && proj.description.length > 0 && (
                    <ul className="list-disc ml-4 text-xs space-y-0.5 mt-1">
                      {proj.description.filter((d: string) => d && d.trim()).map((desc: string, i: number) => (
                        <li key={i} className="leading-snug text-justify">{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case "publications":
        if (!Array.isArray(sectionData)) return null
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <div className="space-y-1 text-xs">
              {sectionData.map((pub: any, idx: number) => (
                <div key={idx} className="leading-relaxed">
                  [{idx + 1}] {pub.authors && <span>{pub.authors}. </span>}
                  {pub.title && <span className="italic">"{pub.title}." </span>}
                  {pub.venue && <span>{pub.venue}, </span>}
                  {pub.year && <span>{pub.year}. </span>}
                  {pub.doi && <span className="text-xs">DOI: {pub.doi}</span>}
                </div>
              ))}
            </div>
          </div>
        )
      case "certifications":
        const certItems = Array.isArray(sectionData) ? sectionData : (sectionData?.items || [])
        if (!Array.isArray(certItems) || certItems.length === 0) return null
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <div className="space-y-1 text-xs">
              {certItems.map((cert: any, idx: number) => {
                // Handle string format (simple bullet points)
                if (typeof cert === 'string') {
                  return (
                    <div key={idx} className="flex items-start">
                      <span className="mr-1.5">•</span>
                      <span>{cert}</span>
                    </div>
                  )
                }
                // Handle object format
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline">
                      <strong>{cert.name}</strong>
                      {cert.date && <span className="text-xs italic">{cert.date}</span>}
                    </div>
                    {cert.issuer && <div className="text-xs">{cert.issuer}</div>}
                    {cert.credentialId && <div className="text-xs">ID: {cert.credentialId}</div>}
                    {cert.link && <a href={cert.link} className="text-xs text-blue-600 underline">View Certificate</a>}
                  </div>
                )
              })}
            </div>
          </div>
        )
      case "skills":
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <div className="space-y-0.5 text-xs">
              {sectionData.categories?.map((cat: any, idx: number) => (
                <div key={idx}>
                  <strong>{cat.name}:</strong> {cat.items}
                </div>
              ))}
            </div>
          </div>
        )
      case "awards":
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <div className="space-y-1 text-xs">
              {sectionData.categories?.map((cat: any, idx: number) => {
                // Items is already an array from the form
                const items = Array.isArray(cat.items) ? cat.items : []
                
                return (
                  <div key={idx}>
                    <strong className="text-sm">{cat.title}</strong>
                    <ul className="list-disc ml-4 text-xs space-y-0.5 mt-0.5">
                      {items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        )
      case "interests":
      case "languages":
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <p className="text-xs leading-snug text-justify">{sectionData?.content || sectionData}</p>
          </div>
        )
      case "custom":
        const customContent = sectionData.content || sectionData
        const lines = typeof customContent === 'string' ? customContent.split('\n') : []
        
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <div className="text-xs space-y-0.5">
              {lines.map((line: string, idx: number) => {
                // Check if it's a bullet point
                if (line.trim().startsWith('- ')) {
                  return (
                    <div key={idx} className="flex items-start">
                      <span className="mr-1.5">•</span>
                      <span className="leading-snug text-justify">{line.replace(/^-\s*/, '')}</span>
                    </div>
                  )
                }
                // Check if it's a subsection title (ends with :)
                if (line.trim().endsWith(':') && line.trim().length > 1) {
                  return <div key={idx} className="font-semibold text-sm mt-1">{line}</div>
                }
                // Regular paragraph
                if (line.trim()) {
                  return <p key={idx} className="leading-snug text-justify">{line}</p>
                }
                // Empty line for spacing
                return <div key={idx} className="h-1" />
              })}
            </div>
          </div>
        )
      default:
        return (
          <div key={section.id} className="mb-2">
            <h2 className="text-sm font-bold border-b border-gray-800 mb-1.5 uppercase tracking-wide">{section.title}</h2>
            <div className="text-xs">Section content</div>
          </div>
        )
    }
  }

  return (
    <div className="bg-white text-black">
      <div className="text-center mb-2.5 border-b-2 border-gray-800 pb-1.5">
        <h1 className="text-lg font-bold mb-0.5 leading-tight">{data.personal.fullName || "Your Name"}</h1>
        <div className="text-[10px] space-x-1.5 leading-tight">
          {data.personal.location && <span>{data.personal.location}</span>}
          {data.personal.location && (data.personal.email || data.personal.phone) && <span>|</span>}
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.email && data.personal.phone && <span>|</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
        </div>
        {(data.personal.linkedin || data.personal.github || data.personal.website || data.personal.customLinks) && (
          <div className="text-[10px] space-x-1.5 mt-0.5 leading-tight">
            {data.personal.website && (
              <>
                <a href={data.personal.website.startsWith('http') ? data.personal.website : `https://${data.personal.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  🌐 {data.personal.website}
                </a>
              </>
            )}
            {data.personal.website && data.personal.linkedin && <span>|</span>}
            {data.personal.linkedin && (
              <>
                <a href={data.personal.linkedin.startsWith('http') ? data.personal.linkedin : `https://linkedin.com/in/${data.personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  💼 {data.personal.linkedin}
                </a>
              </>
            )}
            {data.personal.linkedin && data.personal.github && <span>|</span>}
            {data.personal.github && (
              <>
                <a href={data.personal.github.startsWith('http') ? data.personal.github : `https://github.com/${data.personal.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  💻 {data.personal.github}
                </a>
              </>
            )}
            {data.personal.customLinks && (
              <>
                {(data.personal.linkedin || data.personal.github || data.personal.website) && <span>|</span>}
                {data.personal.customLinks.split('\n').filter(l => l.trim()).map((link, idx) => {
                  const match = link.match(/^([^:]+):\s*(.+)$/)
                  if (match) {
                    const [, label, url] = match
                    const fullUrl = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`
                    return (
                      <span key={idx}>
                        {idx > 0 && <span className="mx-1.5">|</span>}
                        <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          🔗 {label.trim()}
                        </a>
                      </span>
                    )
                  }
                  return null
                })}
              </>
            )}
          </div>
        )}
      </div>
      {data.sections.filter(s => s.visible).sort((a,b) => a.order - b.order).map(s => renderSection(s))}
    </div>
  )
}

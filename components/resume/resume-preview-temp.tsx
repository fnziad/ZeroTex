"use client"

import { useTheme } from "next-themes"
import type { ResumeData } from "@/lib/resume-types"
import { getTemplateConfig } from "@/lib/templates"

interface ResumePreviewProps {
  data: ResumeData
  templateId?: string
}

export default function ResumePreview({ data, templateId = "classic" }: ResumePreviewProps) {
  const { theme } = useTheme()
  const template = getTemplateConfig(templateId)

  // Get primary color from template
  const primaryColor = template.colorScheme.primary
  const secondaryColor = template.colorScheme.secondary
  const accentColor = template.colorScheme.accent

  // Determine if we're using a two-column layout
  const isTwoColumn = template.layout === "two-column"
  const isSidebar = template.layout === "sidebar"
  const isCompact = template.layout === "compact"
  const isExpanded = template.layout === "expanded"

  // Render different layouts based on template type
  if (isTwoColumn) {
    return (
      <div
        className={`${template.fontClass} text-sm`}
        style={{
          fontFamily: template.fontFamily,
          color: theme === "dark" ? "#e2e8f0" : "#1a202c",
        }}
      >
        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - about 1/3 width */}
          <div className="md:w-1/3 space-y-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                {data.personal.fullName || "Your Full Name"}
              </h1>
              <p className="text-sm">
                {data.personal.email && `${data.personal.email}`}
                <br />
                {data.personal.phone && `${data.personal.phone}`}
                <br />
                {data.personal.linkedin && `LinkedIn: ${data.personal.linkedin}`}
                <br />
                {data.personal.github && `GitHub: ${data.personal.github}`}
                {data.personal.website && <br />}
                {data.personal.website && `${data.personal.website}`}
              </p>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
              <h2
                className="resume-section-title"
                style={{
                  borderColor: primaryColor,
                  color: primaryColor,
                  backgroundColor: theme === "dark" ? "rgba(44, 62, 80, 0.2)" : "rgba(44, 62, 80, 0.05)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                Technical Skills
              </h2>
              <div className="grid gap-2 mt-3">
                {data.skills.languages && (
                  <div>
                    <span className="font-bold" style={{ color: secondaryColor }}>
                      Languages:
                    </span>{" "}
                    {data.skills.languages}
                  </div>
                )}
                {data.skills.frameworks && (
                  <div>
                    <span className="font-bold" style={{ color: secondaryColor }}>
                      Frameworks & Tools:
                    </span>{" "}
                    {data.skills.frameworks}
                  </div>
                )}
                {data.skills.databases && (
                  <div>
                    <span className="font-bold" style={{ color: secondaryColor }}>
                      Database Systems:
                    </span>{" "}
                    {data.skills.databases}
                  </div>
                )}
                {data.skills.other && (
                  <div>
                    <span className="font-bold" style={{ color: secondaryColor }}>
                      Other Skills:
                    </span>{" "}
                    {data.skills.other}
                  </div>
                )}
              </div>
            </div>

            {/* Education Section */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2
                  className="resume-section-title"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    backgroundColor: theme === "dark" ? "rgba(44, 62, 80, 0.2)" : "rgba(44, 62, 80, 0.05)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Education
                </h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-4 mt-3">
                    <div className="font-bold">{edu.institution}</div>
                    <div className="italic">{edu.degree}</div>
                    <div>{`${edu.startDate} - ${edu.endDate}`}</div>
                    <div>{edu.location}</div>
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications Section */}
            {data.certifications.length > 0 && (
              <div className="mb-4">
                <h2
                  className="resume-section-title"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    backgroundColor: theme === "dark" ? "rgba(44, 62, 80, 0.2)" : "rgba(44, 62, 80, 0.05)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Certifications
                </h2>
                <ul className="list-disc pl-5 mt-3">
                  {data.certifications.map((cert, index) => (
                    <li key={index} className="mb-1">
                      {cert.name} ({cert.issuer}, {cert.date})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right column - about 2/3 width */}
          <div className="md:w-2/3 space-y-6">
            {/* Experience Section */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2
                  className="resume-section-title"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    backgroundColor: theme === "dark" ? "rgba(44, 62, 80, 0.2)" : "rgba(44, 62, 80, 0.05)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Experience
                </h2>
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-4 mt-3">
                    <div className="flex justify-between">
                      <div className="font-bold">{exp.title}</div>
                      <div>{`${exp.startDate} - ${exp.endDate}`}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="italic">{exp.company}</div>
                      <div>{exp.location}</div>
                    </div>
                    <ul className="list-disc pl-5 mt-2">
                      {exp.responsibilities.map(
                        (resp, respIndex) =>
                          resp && (
                            <li key={respIndex} className="text-sm mb-1">
                              {resp}
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Section */}
            {data.projects.length > 0 && (
              <div className="mb-6">
                <h2
                  className="resume-section-title"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    backgroundColor: theme === "dark" ? "rgba(44, 62, 80, 0.2)" : "rgba(44, 62, 80, 0.05)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Projects
                </h2>
                {data.projects.map((project, index) => (
                  <div key={index} className="mb-4 mt-3">
                    <div className="flex justify-between">
                      <div className="font-bold">{project.name}</div>
                      <div>{`${project.startDate} - ${project.endDate}`}</div>
                    </div>
                    {project.technologies && (
                      <div className="italic" style={{ color: secondaryColor }}>
                        Technologies: {project.technologies}
                      </div>
                    )}
                    <ul className="list-disc pl-5 mt-2">
                      {project.description.map(
                        (desc, descIndex) =>
                          desc && (
                            <li key={descIndex} className="text-sm mb-1">
                              {desc}
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } else if (isSidebar) {
    return (
      <div
        className={`${template.fontClass} text-sm`}
        style={{
          fontFamily: template.fontFamily,
          color: theme === "dark" ? "#e2e8f0" : "#1a202c",
        }}
      >
        {/* Sidebar layout */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar - about 1/4 width */}
          <div
            className="md:w-1/4 p-4"
            style={{
              backgroundColor: theme === "dark" ? `${primaryColor}33` : `${primaryColor}11`,
              borderRight: `2px solid ${primaryColor}`,
            }}
          >
            {/* Header in sidebar */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                {data.personal.fullName || "Your Full Name"}
              </h1>
              <div
                className="w-20 h-20 mx-auto rounded-full mb-4 flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
              >
                {data.personal.fullName ? data.personal.fullName.charAt(0) : "J"}
              </div>
              <p className="text-xs">
                {data.personal.email && `${data.personal.email}`}
                <br />
                {data.personal.phone && `${data.personal.phone}`}
                <br />
                {data.personal.linkedin && `LinkedIn: ${data.personal.linkedin}`}
                <br />
                {data.personal.github && `GitHub: ${data.personal.github}`}
                {data.personal.website && <br />}
                {data.personal.website && `${data.personal.website}`}
              </p>
            </div>

            {/* Skills in sidebar */}
            <div className="mb-6">
              <h2
                className="text-center font-bold mb-2 pb-1"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                }}
              >
                SKILLS
              </h2>
              <div className="grid gap-2">
                {data.skills.languages && (
                  <div>
                    <span className="font-bold text-xs" style={{ color: secondaryColor }}>
                      LANGUAGES
                    </span>
                    <p className="text-xs">{data.skills.languages}</p>
                  </div>
                )}
                {data.skills.frameworks && (
                  <div>
                    <span className="font-bold text-xs" style={{ color: secondaryColor }}>
                      FRAMEWORKS
                    </span>
                    <p className="text-xs">{data.skills.frameworks}</p>
                  </div>
                )}
                {data.skills.databases && (
                  <div>
                    <span className="font-bold text-xs" style={{ color: secondaryColor }}>
                      DATABASES
                    </span>
                    <p className="text-xs">{data.skills.databases}</p>
                  </div>
                )}
                {data.skills.other && (
                  <div>
                    <span className="font-bold text-xs" style={{ color: secondaryColor }}>
                      OTHER
                    </span>
                    <p className="text-xs">{data.skills.other}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Education in sidebar */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2
                  className="text-center font-bold mb-2 pb-1"
                  style={{
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}`,
                  }}
                >
                  EDUCATION
                </h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-3 text-xs">
                    <div className="font-bold">{edu.institution}</div>
                    <div className="italic">{edu.degree}</div>
                    <div>{`${edu.startDate} - ${edu.endDate}`}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications in sidebar */}
            {data.certifications.length > 0 && (
              <div className="mb-4">
                <h2
                  className="text-center font-bold mb-2 pb-1"
                  style={{
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}`,
                  }}
                >
                  CERTIFICATIONS
                </h2>
                <ul className="list-disc pl-4 text-xs">
                  {data.certifications.map((cert, index) => (
                    <li key={index} className="mb-1">
                      <span className="font-bold">{cert.name}</span>
                      <br />
                      {cert.issuer}, {cert.date}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main content - about 3/4 width */}
          <div className="md:w-3/4 p-4">
            {/* Experience Section */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2
                  className="font-bold text-lg mb-4 pb-1 text-center"
                  style={{
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}`,
                  }}
                >
                  PROFESSIONAL EXPERIENCE
                </h2>
                {data.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="mb-4 pb-4"
                    style={{
                      borderBottom: index < data.experience.length - 1 ? `1px dashed ${secondaryColor}` : "none",
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="font-bold text-base" style={{ color: primaryColor }}>
                        {exp.title}
                      </div>
                      <div className="italic">{`${exp.startDate} - ${exp.endDate}`}</div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div className="font-semibold">{exp.company}</div>
                      <div>{exp.location}</div>
                    </div>
                    <ul className="list-disc pl-5 mt-2">
                      {exp.responsibilities.map(
                        (resp, respIndex) =>
                          resp && (
                            <li key={respIndex} className="text-sm mb-1">
                              {resp}
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Section */}
            {data.projects.length > 0 && (
              <div className="mb-6">
                <h2
                  className="font-bold text-lg mb-4 pb-1 text-center"
                  style={{
                    color: primaryColor,
                    borderBottom: `2px solid ${primaryColor}`,
                  }}
                >
                  PROJECTS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.projects.map((project, index) => (
                    <div
                      key={index}
                      className="mb-4 p-3 rounded-md"
                      style={{
                        backgroundColor: theme === "dark" ? `${primaryColor}22` : `${primaryColor}11`,
                        border: `1px solid ${secondaryColor}`,
                      }}
                    >
                      <div className="font-bold" style={{ color: primaryColor }}>
                        {project.name}
                      </div>
                      <div className="text-xs italic mb-2">{`${project.startDate} - ${project.endDate}`}</div>
                      {project.technologies && (
                        <div className="text-xs mb-2" style={{ color: secondaryColor }}>
                          <span className="font-semibold">Tech:</span> {project.technologies}
                        </div>
                      )}
                      <ul className="list-disc pl-5 mt-1">
                        {project.description.map(
                          (desc, descIndex) =>
                            desc && (
                              <li key={descIndex} className="text-xs mb-1">
                                {desc}
                              </li>
                            ),
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } else if (isCompact) {
    return (
      <div
        className={`${template.fontClass} text-sm`}
        style={{
          fontFamily: template.fontFamily,
          color: theme === "dark" ? "#e2e8f0" : "#1a202c",
        }}
      >
        {/* Compact executive layout */}
        <div className="space-y-4">
          {/* Header - Two column for executive */}
          <div
            className="flex flex-col md:flex-row justify-between items-start border-b-2 pb-4 mb-6"
            style={{ borderColor: primaryColor }}
          >
            <div>
              <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
                {data.personal.fullName || "Your Full Name"}
              </h1>
              <p className="text-base font-semibold" style={{ color: secondaryColor }}>
                Executive Professional
              </p>
            </div>
            <div className="text-right text-sm">
              {data.personal.email && <div>{data.personal.email}</div>}
              {data.personal.phone && <div>{data.personal.phone}</div>}
              {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
              {data.personal.website && <div>{data.personal.website}</div>}
            </div>
          </div>

          {/* Executive Summary */}
          <div
            className="mb-6 p-4 rounded-md"
            style={{ backgroundColor: theme === "dark" ? `${primaryColor}22` : `${primaryColor}11` }}
          >
            <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
              Executive Summary
            </h2>
            <p className="text-sm">
              {data.executiveSummary ||
                "Accomplished executive with proven leadership experience and a track record of driving organizational growth and innovation. Skilled in strategic planning, team leadership, and delivering exceptional results in challenging environments."}
            </p>
          </div>

          {/* Experience Section - Timeline style */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-lg font-bold mb-4"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: "4px",
                }}
              >
                Professional Experience
              </h2>
              <div className="relative">
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-6 pl-6 relative">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    {/* Timeline line */}
                    {index < data.experience.length - 1 && (
                      <div
                        className="absolute left-1.5 top-4 w-0.5 h-full"
                        style={{ backgroundColor: secondaryColor }}
                      ></div>
                    )}
                    <div className="flex flex-col">
                      <div className="font-bold text-base" style={{ color: primaryColor }}>
                        {exp.title}
                      </div>
                      <div className="flex justify-between">
                        <div className="font-semibold">{exp.company}</div>
                        <div className="italic">{`${exp.startDate} - ${exp.endDate}`}</div>
                      </div>
                      <div className="text-sm mb-2">{exp.location}</div>
                      <ul className="list-disc pl-5 mt-1">
                        {exp.responsibilities.map(
                          (resp, respIndex) =>
                            resp && (
                              <li key={respIndex} className="text-sm mb-1">
                                {resp}
                              </li>
                            ),
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Two column for skills and education */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Skills Section */}
            <div className="md:w-1/2">
              <h2
                className="text-lg font-bold mb-3"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: "4px",
                }}
              >
                Core Competencies
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {data.skills.languages && (
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: theme === "dark" ? `${primaryColor}22` : `${primaryColor}11` }}
                  >
                    <span className="font-bold text-sm" style={{ color: secondaryColor }}>
                      Technical
                    </span>
                    <p className="text-sm">{data.skills.languages}</p>
                  </div>
                )}
                {data.skills.frameworks && (
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: theme === "dark" ? `${primaryColor}22` : `${primaryColor}11` }}
                  >
                    <span className="font-bold text-sm" style={{ color: secondaryColor }}>
                      Leadership
                    </span>
                    <p className="text-sm">{data.skills.frameworks}</p>
                  </div>
                )}
                {data.skills.databases && (
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: theme === "dark" ? `${primaryColor}22` : `${primaryColor}11` }}
                  >
                    <span className="font-bold text-sm" style={{ color: secondaryColor }}>
                      Strategic
                    </span>
                    <p className="text-sm">{data.skills.databases}</p>
                  </div>
                )}
                {data.skills.other && (
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: theme === "dark" ? `${primaryColor}22` : `${primaryColor}11` }}
                  >
                    <span className="font-bold text-sm" style={{ color: secondaryColor }}>
                      Business
                    </span>
                    <p className="text-sm">{data.skills.other}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Education and Certifications */}
            <div className="md:w-1/2">
              {data.education.length > 0 && (
                <div className="mb-4">
                  <h2
                    className="text-lg font-bold mb-3"
                    style={{
                      color: primaryColor,
                      borderBottom: `2px solid ${primaryColor}`,
                      paddingBottom: "4px",
                    }}
                  >
                    Education
                  </h2>
                  {data.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between">
                        <div className="font-bold">{edu.institution}</div>
                        <div className="italic">{`${edu.startDate} - ${edu.endDate}`}</div>
                      </div>
                      <div>{edu.degree}</div>
                      {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {data.certifications.length > 0 && (
                <div>
                  <h2
                    className="text-lg font-bold mb-3"
                    style={{
                      color: primaryColor,
                      borderBottom: `2px solid ${primaryColor}`,
                      paddingBottom: "4px",
                    }}
                  >
                    Certifications
                  </h2>
                  <ul className="list-disc pl-5">
                    {data.certifications.map((cert, index) => (
                      <li key={index} className="mb-1">
                        <span className="font-semibold">{cert.name}</span> - {cert.issuer}, {cert.date}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Projects Section - Compact */}
          {data.projects.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-lg font-bold mb-3"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: "4px",
                }}
              >
                Key Projects & Initiatives
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {data.projects.map((project, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <div className="font-bold">{project.name}</div>
                      <div className="text-sm">{project.technologies}</div>
                    </div>
                    <div className="text-sm italic">{`${project.startDate} - ${project.endDate}`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } else if (isExpanded) {
    return (
      <div
        className={`${template.fontClass} text-sm`}
        style={{
          fontFamily: template.fontFamily,
          color: theme === "dark" ? "#e2e8f0" : "#1a202c",
        }}
      >
        {/* Academic expanded layout */}
        <div className="space-y-4">
          {/* Header - Boxed for academic */}
          <div
            className="p-4 border-2 mb-6 text-center"
            style={{
              borderColor: primaryColor,
              backgroundColor: theme === "dark" ? `${primaryColor}22` : `${primaryColor}11`,
            }}
          >
            <h1 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
              {data.personal.fullName || "Your Full Name"}
            </h1>
            <p className="text-sm">
              {data.personal.email && `Email: ${data.personal.email}`}
              {data.personal.phone && data.personal.email && " | "}
              {data.personal.phone && `Phone: ${data.personal.phone}`}
              {data.personal.linkedin && (data.personal.email || data.personal.phone) && " | "}
              {data.personal.linkedin && `LinkedIn: ${data.personal.linkedin}`}
              {data.personal.github && (data.personal.email || data.personal.phone || data.personal.linkedin) && " | "}
              {data.personal.github && `GitHub: ${data.personal.github}`}
              {data.personal.website &&
                (data.personal.email || data.personal.phone || data.personal.linkedin || data.personal.github) &&
                " | "}
              {data.personal.website && `Website: ${data.personal.website}`}
            </p>
          </div>

          {/* Education Section - Expanded for academic */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-lg font-bold mb-4 text-center"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: "4px",
                }}
              >
                EDUCATION
              </h2>
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="mb-5 p-3"
                  style={{
                    borderLeft: `3px solid ${primaryColor}`,
                    backgroundColor: theme === "dark" ? `${primaryColor}22` : `${primaryColor}11`,
                  }}
                >
                  <div className="flex justify-between">
                    <div className="font-bold text-base" style={{ color: primaryColor }}>
                      {edu.institution}
                    </div>
                    <div>{`${edu.startDate} - ${edu.endDate}`}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="italic">{edu.degree}</div>
                    <div>{edu.location}</div>
                  </div>
                  {edu.gpa && (
                    <div className="mt-1">
                      <span className="font-semibold">GPA:</span> {edu.gpa}
                    </div>
                  )}
                  {edu.coursework && (
                    <div className="mt-2">
                      <span className="font-semibold">Relevant Coursework:</span> {edu.coursework}
                    </div>
                  )}
                  {edu.achievements && (
                    <div className="mt-2">
                      <span className="font-semibold">Academic Achievements:</span>
                      <p>{edu.achievements}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Publications Section for Academic */}
          {data.publications && data.publications.length > 0 ? (
            <div className="mb-6">
              <h2
                className="text-lg font-bold mb-4 text-center"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: "4px",
                }}
              >
                PUBLICATIONS & RESEARCH
              </h2>
              <div className="space-y-3">
                {data.publications.map((pub, index) => (
                  <div key={index} className="p-3" style={{ borderLeft: `3px solid ${secondaryColor}` }}>
                    <div className="font-bold">{pub.title}</div>
                    <div className="italic">
                      {pub.journal}, {pub.date}
                    </div>
                    {pub.authors && <div className="text-sm">Authors: {pub.authors}</div>}
                    {pub.description && <p className="text-sm mt-1">{pub.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <h2
                className="text-lg font-bold mb-4 text-center"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: "4px",
                }}
              >
                PUBLICATIONS & RESEARCH
              </h2>
              <div className="space-y-3">
                <div className="p-3" style={{ borderLeft: `3px solid ${secondaryColor}` }}>
                  <div className="font-bold">Machine Learning Applications in Natural Language Processing</div>
                  <div className="italic">Journal of Computer Science, 2022</div>
                  <p className="text-sm mt-1">
                    Research on advanced NLP techniques using transformer models for improved language understanding.
                  </p>
                </div>
                <div className="p-3" style={{ borderLeft: `3px solid ${secondaryColor}` }}>
                  <div className="font-bold">Quantum Computing: Practical Applications</div>
                  <div className="italic">International Conference on Quantum Technologies, 2021</div>
                  <p className="text-sm mt-1">
                    Presented research on practical applications of quantum computing in cryptography.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Teaching Experience */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-4 text-center"
              style={{
                color: primaryColor,
                borderBottom: `2px solid ${primaryColor}`,
                paddingBottom: "4px",
              }}
            >
              TEACHING EXPERIENCE
            </h2>
            <div className="space-y-4">
              {data.experience.length > 0 ? (
                data.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <div className="font-bold" style={{ color: primaryColor }}>
                        {exp.title}
                      </div>
                      <div>{`${exp.startDate} - ${exp.endDate}`}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="italic">{exp.company}</div>
                      <div>{exp.location}</div>
                    </div>
                    <ul className="list-disc pl-5 mt-2">
                      {exp.responsibilities.map(
                        (resp, respIndex) =>
                          resp && (
                            <li key={respIndex} className="text-sm mb-1">
                              {resp}
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="p-3" style={{ borderLeft: `3px solid ${secondaryColor}` }}>
                  <div className="font-bold">Teaching Assistant, Introduction to Computer Science</div>
                  <div className="italic">University of Example, Department of Computer Science</div>
                  <div>Fall 2020 - Spring 2021</div>
                  <ul className="list-disc pl-5 mt-2">
                    <li className="text-sm">Led weekly discussion sections for undergraduate students</li>
                    <li className="text-sm">Graded assignments and provided detailed feedback</li>
                    <li className="text-sm">Held regular office hours to assist students with coursework</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Skills and Certifications in two columns */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Skills */}
            <div className="md:w-1/2">
              <h2
                className="text-lg font-bold mb-3 text-center"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: "4px",
                }}
              >
                TECHNICAL SKILLS
              </h2>
              <div className="grid gap-2">
                {data.skills.languages && (
                  <div>
                    <span className="font-bold" style={{ color: secondaryColor }}>
                      Languages:
                    </span>{" "}
                    {data.skills.languages}
                  </div>
                )}
                {data.skills.frameworks && (
                  <div>
                    <span className="font-bold" style={{ color: secondaryColor }}>
                      Frameworks & Tools:
                    </span>{" "}
                    {data.skills.frameworks}
                  </div>
                )}
                {data.skills.databases && (
                  <div>
                    <span className="font-bold" style={{ color: secondaryColor }}>
                      Database Systems:
                    </span>{" "}
                    {data.skills.databases}
                  </div>
                )}
                {data.skills.other && (
                  <div>
                    <span className="font-bold" style={{ color: secondaryColor }}>
                      Research Skills:
                    </span>{" "}
                    {data.skills.other}
                  </div>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="md:w-1/2">
              <h2
                className="text-lg font-bold mb-3 text-center"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: "4px",
                }}
              >
                CERTIFICATIONS & AWARDS
              </h2>
              <ul className="list-disc pl-5">
                {data.certifications.length > 0 ? (
                  data.certifications.map((cert, index) => (
                    <li key={index} className="mb-1">
                      <span className="font-semibold">{cert.name}</span> - {cert.issuer}, {cert.date}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="mb-1">
                      <span className="font-semibold">Outstanding Research Award</span> - University of Example, 2022
                    </li>
                    <li className="mb-1">
                      <span className="font-semibold">Teaching Excellence Certificate</span> - Department of Computer
                      Science, 2021
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Projects Section */}
          {data.projects.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-lg font-bold mb-4 text-center"
                style={{
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: "4px",
                }}
              >
                RESEARCH PROJECTS
              </h2>
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="mb-4 p-3"
                  style={{
                    borderLeft: `3px solid ${secondaryColor}`,
                    backgroundColor:
                      index % 2 === 0 ? (theme === "dark" ? `${primaryColor}22` : `${primaryColor}11`) : "transparent",
                  }}
                >
                  <div className="flex justify-between">
                    <div className="font-bold" style={{ color: primaryColor }}>
                      {project.name}
                    </div>
                    <div>{`${project.startDate} - ${project.endDate}`}</div>
                  </div>
                  {project.technologies && <div className="italic">Technologies: {project.technologies}</div>}
                  <ul className="list-disc pl-5 mt-2">
                    {project.description.map(
                      (desc, descIndex) =>
                        desc && (
                          <li key={descIndex} className="text-sm mb-1">
                            {desc}
                          </li>
                        ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  } else {
    // Standard layout
    return (
      <div
        className={`${template.fontClass} text-sm`}
        style={{
          fontFamily: template.fontFamily,
          color: theme === "dark" ? "#e2e8f0" : "#1a202c",
        }}
      >
        {/* Header */}
        <div className={`${template.headerStyle === "minimal" ? "text-left" : "text-center"} mb-6`}>
          <h1 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
            {data.personal.fullName || "Your Full Name"}
          </h1>
          <p className="text-sm">
            {data.personal.email && `Email: ${data.personal.email}`}
            {data.personal.phone && data.personal.email && " | "}
            {data.personal.phone && `Phone: ${data.personal.phone}`}
            {data.personal.linkedin && (data.personal.email || data.personal.phone) && " | "}
            {data.personal.linkedin && `LinkedIn: ${data.personal.linkedin}`}
            {data.personal.github && (data.personal.email || data.personal.phone || data.personal.linkedin) && " | "}
            {data.personal.github && `GitHub: ${data.personal.github}`}
            {data.personal.website &&
              (data.personal.email || data.personal.phone || data.personal.linkedin || data.personal.github) &&
              " | "}
            {data.personal.website && `Website: ${data.personal.website}`}
          </p>
        </div>

        {/* Education Section */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2
              className="resume-section-title"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
            >
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <div className="font-bold">{edu.institution}</div>
                  <div>{`${edu.startDate} - ${edu.endDate}`}</div>
                </div>
                <div className="flex justify-between">
                  <div className="italic">{edu.degree}</div>
                  <div className="italic">{edu.location}</div>
                </div>
                {edu.gpa && <div>GPA: {edu.gpa}</div>}
                {edu.coursework && <div>Relevant Coursework: {edu.coursework}</div>}
                {edu.achievements && <div>Achievements: {edu.achievements}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2
              className="resume-section-title"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
            >
              Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <div className="font-bold">{exp.title}</div>
                  <div>{`${exp.startDate} - ${exp.endDate}`}</div>
                </div>
                <div className="flex justify-between">
                  <div className="italic">{exp.company}</div>
                  <div>{exp.location}</div>
                </div>
                <ul className="list-disc pl-5 mt-2">
                  {exp.responsibilities.map(
                    (resp, respIndex) =>
                      resp && (
                        <li key={respIndex} className="text-sm mb-1">
                          {resp}
                        </li>
                      ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2
              className="resume-section-title"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
            >
              Projects
            </h2>
            {data.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <div className="font-bold">{project.name}</div>
                  <div>{`${project.startDate} - ${project.endDate}`}</div>
                </div>
                {project.technologies && <div className="italic">Technologies: {project.technologies}</div>}
                <ul className="list-disc pl-5 mt-2">
                  {project.description.map(
                    (desc, descIndex) =>
                      desc && (
                        <li key={descIndex} className="text-sm mb-1">
                          {desc}
                        </li>
                      ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        <div className="mb-6">
          <h2
            className="resume-section-title"
            style={{
              borderColor: primaryColor,
              color: primaryColor,
            }}
          >
            Technical Skills
          </h2>
          <div className="grid gap-2">
            {data.skills.languages && (
              <div>
                <span className="font-bold">Languages:</span> {data.skills.languages}
              </div>
            )}
            {data.skills.frameworks && (
              <div>
                <span className="font-bold">Frameworks & Tools:</span> {data.skills.frameworks}
              </div>
            )}
            {data.skills.databases && (
              <div>
                <span className="font-bold">Database Systems:</span> {data.skills.databases}
              </div>
            )}
            {data.skills.other && (
              <div>
                <span className="font-bold">Other Skills:</span> {data.skills.other}
              </div>
            )}
          </div>
        </div>

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <div className="mb-4">
            <h2
              className="resume-section-title"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
            >
              Certifications
            </h2>
            <ul className="list-disc pl-5">
              {data.certifications.map((cert, index) => (
                <li key={index} className="mb-1">
                  {cert.name} ({cert.issuer}, {cert.date})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

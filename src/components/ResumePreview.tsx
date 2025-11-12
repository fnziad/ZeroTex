import type React from "react"
import { Box, Typography, Paper } from "@mui/material"
import type { ResumeData } from "../data/resumeData"
import { getTemplateConfig } from "../data/templates"

interface ResumePreviewProps {
  data: ResumeData
  templateId: string
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId }) => {
  const template = getTemplateConfig(templateId)

  // Get colors from template
  const primaryColor = template.colorScheme.primary
  const secondaryColor = template.colorScheme.secondary

  // Styles based on template
  const styles = {
    container: {
      fontFamily: template.fontFamily,
      padding: "20px",
      color: "#333",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "20px",
    },
    name: {
      fontSize: "24px",
      fontWeight: "bold" as const,
      color: primaryColor,
      marginBottom: "5px",
    },
    contactInfo: {
      fontSize: "14px",
      color: secondaryColor,
    },
    section: {
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "bold" as const,
      color: primaryColor,
      marginBottom: "10px",
      borderBottom: `2px solid ${primaryColor}`,
      paddingBottom: "5px",
    },
    itemTitle: {
      fontSize: "16px",
      fontWeight: "bold" as const,
      marginBottom: "5px",
    },
    itemSubtitle: {
      fontSize: "14px",
      fontStyle: "italic" as const,
      marginBottom: "5px",
    },
    dates: {
      fontSize: "14px",
      color: secondaryColor,
    },
    bullet: {
      fontSize: "14px",
      marginLeft: "20px",
      marginBottom: "5px",
      position: "relative" as const,
      "&::before": {
        content: '"•"',
        position: "absolute" as const,
        left: "-15px",
      },
    },
    skillCategory: {
      fontWeight: "bold" as const,
      marginRight: "5px",
    },
  }

  return (
    <Paper elevation={0} sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}>
      <Box sx={styles.container}>
        {/* Header */}
        <Box sx={styles.header}>
          <Typography sx={styles.name}>{data.personal.fullName || "Your Name"}</Typography>
          <Typography sx={styles.contactInfo}>
            {data.personal.email && `${data.personal.email} | `}
            {data.personal.phone && `${data.personal.phone} | `}
            {data.personal.linkedin && `LinkedIn: ${data.personal.linkedin} | `}
            {data.personal.github && `GitHub: ${data.personal.github}`}
            {data.personal.website && ` | ${data.personal.website}`}
          </Typography>
        </Box>

        {/* Executive Summary - Only show if it exists */}
        {data.executiveSummary && (
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Executive Summary</Typography>
            <Typography variant="body2">{data.executiveSummary}</Typography>
          </Box>
        )}

        {/* Education */}
        {data.education.length > 0 && data.education[0].institution && (
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Education</Typography>
            {data.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={styles.itemTitle}>{edu.institution}</Typography>
                  <Typography sx={styles.dates}>{`${edu.startDate} - ${edu.endDate}`}</Typography>
                </Box>
                <Typography sx={styles.itemSubtitle}>{edu.degree}</Typography>
                <Typography variant="body2">{edu.location}</Typography>
                {edu.gpa && <Typography variant="body2">GPA: {edu.gpa}</Typography>}
                {edu.coursework && <Typography variant="body2">Relevant Coursework: {edu.coursework}</Typography>}
                {edu.achievements && <Typography variant="body2">Achievements: {edu.achievements}</Typography>}
              </Box>
            ))}
          </Box>
        )}

        {/* Experience */}
        {data.experience.length > 0 && data.experience[0].company && (
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Experience</Typography>
            {data.experience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={styles.itemTitle}>{exp.title}</Typography>
                  <Typography sx={styles.dates}>{`${exp.startDate} - ${exp.endDate}`}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={styles.itemSubtitle}>{exp.company}</Typography>
                  <Typography variant="body2">{exp.location}</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                  {exp.responsibilities.map(
                    (resp, respIndex) =>
                      resp && (
                        <Typography key={respIndex} variant="body2" sx={{ ml: 2, position: "relative", mb: 0.5 }}>
                          <Box component="span" sx={{ position: "absolute", left: -15 }}>
                            •
                          </Box>
                          {resp}
                        </Typography>
                      ),
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Projects */}
        {data.projects.length > 0 && data.projects[0].name && (
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Projects</Typography>
            {data.projects.map((project, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={styles.itemTitle}>{project.name}</Typography>
                  <Typography sx={styles.dates}>{`${project.startDate} - ${project.endDate}`}</Typography>
                </Box>
                {project.technologies && (
                  <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
                    Technologies: {project.technologies}
                  </Typography>
                )}
                <Box>
                  {project.description.map(
                    (desc, descIndex) =>
                      desc && (
                        <Typography key={descIndex} variant="body2" sx={{ ml: 2, position: "relative", mb: 0.5 }}>
                          <Box component="span" sx={{ position: "absolute", left: -15 }}>
                            •
                          </Box>
                          {desc}
                        </Typography>
                      ),
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Skills */}
        {(data.skills.languages || data.skills.frameworks || data.skills.databases || data.skills.other) && (
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Skills</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {data.skills.languages && (
                <Typography variant="body2">
                  <Box component="span" sx={styles.skillCategory}>
                    Languages:
                  </Box>{" "}
                  {data.skills.languages}
                </Typography>
              )}
              {data.skills.frameworks && (
                <Typography variant="body2">
                  <Box component="span" sx={styles.skillCategory}>
                    Frameworks & Tools:
                  </Box>{" "}
                  {data.skills.frameworks}
                </Typography>
              )}
              {data.skills.databases && (
                <Typography variant="body2">
                  <Box component="span" sx={styles.skillCategory}>
                    Database Systems:
                  </Box>{" "}
                  {data.skills.databases}
                </Typography>
              )}
              {data.skills.other && (
                <Typography variant="body2">
                  <Box component="span" sx={styles.skillCategory}>
                    Other Skills:
                  </Box>{" "}
                  {data.skills.other}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && data.certifications[0].name && (
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Certifications</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {data.certifications.map((cert, index) => (
                <Typography key={index} variant="body2">
                  • {cert.name} ({cert.issuer}, {cert.date})
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        {/* Publications */}
        {data.publications.length > 0 && data.publications[0].title && (
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Publications</Typography>
            {data.publications.map((pub, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography sx={styles.itemTitle}>{pub.title}</Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                  {pub.journal}, {pub.date}
                </Typography>
                {pub.authors && <Typography variant="body2">Authors: {pub.authors}</Typography>}
                {pub.description && (
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {pub.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default ResumePreview

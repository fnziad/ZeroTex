"use client"

import type React from "react"
import { Grid, Card, CardContent, CardActionArea, Typography, Box } from "@mui/material"
import { templates } from "../data/templates"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Choose a Template
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Select a template that best fits your professional style and industry.
      </Typography>

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} key={template.id}>
            <Card
              variant="outlined"
              sx={{
                border:
                  selectedTemplate === template.id
                    ? `2px solid ${template.colorScheme.primary}`
                    : "1px solid rgba(0, 0, 0, 0.12)",
                transition: "all 0.3s ease",
              }}
            >
              <CardActionArea onClick={() => onSelectTemplate(template.id)}>
                <CardContent>
                  <Typography variant="h6" gutterBottom style={{ color: template.colorScheme.primary }}>
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {template.description}
                  </Typography>

                  {/* Template Preview */}
                  <Box
                    sx={{
                      mt: 2,
                      height: "100px",
                      border: "1px solid rgba(0, 0, 0, 0.12)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Header */}
                    <Box
                      sx={{
                        height: "20px",
                        backgroundColor: template.colorScheme.primary,
                        width: "100%",
                      }}
                    />

                    {/* Content Preview */}
                    <Box sx={{ p: 1 }}>
                      <Box
                        sx={{
                          width: "40%",
                          height: "8px",
                          backgroundColor: template.colorScheme.secondary,
                          opacity: 0.7,
                          mb: 1,
                        }}
                      />
                      <Box
                        sx={{
                          width: "80%",
                          height: "6px",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          mb: 1,
                        }}
                      />
                      <Box
                        sx={{
                          width: "60%",
                          height: "6px",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          mb: 1,
                        }}
                      />
                      <Box
                        sx={{
                          width: "70%",
                          height: "6px",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default TemplateSelector

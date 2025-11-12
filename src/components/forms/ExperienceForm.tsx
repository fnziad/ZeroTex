"use client"

import type React from "react"
import { TextField, Button, Grid, Typography, IconButton, Card, CardContent, Box } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import type { Experience } from "../../data/resumeData"

interface ExperienceFormProps {
  data: Experience[]
  updateData: (data: Experience[]) => void
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, updateData }) => {
  const handleChange = (index: number, field: keyof Experience) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedExperience = [...data]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: e.target.value,
    }
    updateData(updatedExperience)
  }

  const handleResponsibilityChange =
    (expIndex: number, respIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedExperience = [...data]
      const responsibilities = [...updatedExperience[expIndex].responsibilities]
      responsibilities[respIndex] = e.target.value
      updatedExperience[expIndex] = {
        ...updatedExperience[expIndex],
        responsibilities,
      }
      updateData(updatedExperience)
    }

  const handleAddResponsibility = (index: number) => {
    const updatedExperience = [...data]
    updatedExperience[index] = {
      ...updatedExperience[index],
      responsibilities: [...updatedExperience[index].responsibilities, ""],
    }
    updateData(updatedExperience)
  }

  const handleRemoveResponsibility = (expIndex: number, respIndex: number) => {
    const updatedExperience = [...data]
    const responsibilities = updatedExperience[expIndex].responsibilities.filter((_, i) => i !== respIndex)
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      responsibilities,
    }
    updateData(updatedExperience)
  }

  const handleAddExperience = () => {
    updateData([
      ...data,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
      },
    ])
  }

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = data.filter((_, i) => i !== index)
    updateData(updatedExperience)
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>

      {data.map((experience, expIndex) => (
        <Card key={expIndex} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1">Experience #{expIndex + 1}</Typography>
              <IconButton color="error" onClick={() => handleRemoveExperience(expIndex)} disabled={data.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  value={experience.title}
                  onChange={handleChange(expIndex, "title")}
                  placeholder="Software Engineer"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  value={experience.company}
                  onChange={handleChange(expIndex, "company")}
                  placeholder="Example Corp"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={experience.location}
                  onChange={handleChange(expIndex, "location")}
                  placeholder="City, State"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Start Date"
                  value={experience.startDate}
                  onChange={handleChange(expIndex, "startDate")}
                  placeholder="MM/YYYY"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="End Date"
                  value={experience.endDate}
                  onChange={handleChange(expIndex, "endDate")}
                  placeholder="MM/YYYY or Present"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Responsibilities
                </Typography>
                {experience.responsibilities.map((responsibility, respIndex) => (
                  <Box key={respIndex} sx={{ display: "flex", mb: 2 }}>
                    <TextField
                      fullWidth
                      value={responsibility}
                      onChange={handleResponsibilityChange(expIndex, respIndex)}
                      placeholder="Describe your responsibility"
                      multiline
                      rows={2}
                    />
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveResponsibility(expIndex, respIndex)}
                      disabled={experience.responsibilities.length <= 1}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddResponsibility(expIndex)}
                >
                  Add Responsibility
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddExperience} fullWidth>
        Add Experience
      </Button>
    </div>
  )
}

export default ExperienceForm

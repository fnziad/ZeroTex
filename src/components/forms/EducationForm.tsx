"use client"

import type React from "react"
import { TextField, Button, Grid, Typography, IconButton, Card, CardContent, Box } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import type { Education } from "../../data/resumeData"

interface EducationFormProps {
  data: Education[]
  updateData: (data: Education[]) => void
}

const EducationForm: React.FC<EducationFormProps> = ({ data, updateData }) => {
  const handleChange = (index: number, field: keyof Education) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEducation = [...data]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: e.target.value,
    }
    updateData(updatedEducation)
  }

  const handleAddEducation = () => {
    updateData([
      ...data,
      {
        institution: "",
        location: "",
        degree: "",
        startDate: "",
        endDate: "",
        gpa: "",
        coursework: "",
        achievements: "",
      },
    ])
  }

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = data.filter((_, i) => i !== index)
    updateData(updatedEducation)
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>

      {data.map((education, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1">Education #{index + 1}</Typography>
              <IconButton color="error" onClick={() => handleRemoveEducation(index)} disabled={data.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Institution"
                  value={education.institution}
                  onChange={handleChange(index, "institution")}
                  placeholder="University of Example"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Degree"
                  value={education.degree}
                  onChange={handleChange(index, "degree")}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={education.location}
                  onChange={handleChange(index, "location")}
                  placeholder="City, State"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  value={education.startDate}
                  onChange={handleChange(index, "startDate")}
                  placeholder="MM/YYYY"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  value={education.endDate}
                  onChange={handleChange(index, "endDate")}
                  placeholder="MM/YYYY or Present"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="GPA"
                  value={education.gpa}
                  onChange={handleChange(index, "gpa")}
                  placeholder="3.8/4.0"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Relevant Coursework"
                  value={education.coursework}
                  onChange={handleChange(index, "coursework")}
                  placeholder="Data Structures, Algorithms, Database Systems"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Achievements"
                  value={education.achievements}
                  onChange={handleChange(index, "achievements")}
                  placeholder="Dean's List, Academic Scholarship"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddEducation} fullWidth>
        Add Education
      </Button>
    </div>
  )
}

export default EducationForm

"use client"

import type React from "react"
import { TextField, Button, Grid, Typography, IconButton, Card, CardContent, Box } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import type { Project } from "../../data/resumeData"

interface ProjectsFormProps {
  data: Project[]
  updateData: (data: Project[]) => void
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, updateData }) => {
  const handleChange = (index: number, field: keyof Project) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProjects = [...data]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: e.target.value,
    }
    updateData(updatedProjects)
  }

  const handleDescriptionChange =
    (projIndex: number, descIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedProjects = [...data]
      const description = [...updatedProjects[projIndex].description]
      description[descIndex] = e.target.value
      updatedProjects[projIndex] = {
        ...updatedProjects[projIndex],
        description,
      }
      updateData(updatedProjects)
    }

  const handleAddDescription = (index: number) => {
    const updatedProjects = [...data]
    updatedProjects[index] = {
      ...updatedProjects[index],
      description: [...updatedProjects[index].description, ""],
    }
    updateData(updatedProjects)
  }

  const handleRemoveDescription = (projIndex: number, descIndex: number) => {
    const updatedProjects = [...data]
    const description = updatedProjects[projIndex].description.filter((_, i) => i !== descIndex)
    updatedProjects[projIndex] = {
      ...updatedProjects[projIndex],
      description,
    }
    updateData(updatedProjects)
  }

  const handleAddProject = () => {
    updateData([
      ...data,
      {
        name: "",
        technologies: "",
        startDate: "",
        endDate: "",
        description: ["", "", ""],
      },
    ])
  }

  const handleRemoveProject = (index: number) => {
    const updatedProjects = data.filter((_, i) => i !== index)
    updateData(updatedProjects)
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Projects
      </Typography>

      {data.map((project, projIndex) => (
        <Card key={projIndex} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1">Project #{projIndex + 1}</Typography>
              <IconButton color="error" onClick={() => handleRemoveProject(projIndex)} disabled={data.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Name"
                  value={project.name}
                  onChange={handleChange(projIndex, "name")}
                  placeholder="E-commerce Website"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Technologies Used"
                  value={project.technologies}
                  onChange={handleChange(projIndex, "technologies")}
                  placeholder="React, Node.js, MongoDB"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  value={project.startDate}
                  onChange={handleChange(projIndex, "startDate")}
                  placeholder="MM/YYYY"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  value={project.endDate}
                  onChange={handleChange(projIndex, "endDate")}
                  placeholder="MM/YYYY or Present"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Description Points
                </Typography>
                {project.description.map((desc, descIndex) => (
                  <Box key={descIndex} sx={{ display: "flex", mb: 2 }}>
                    <TextField
                      fullWidth
                      value={desc}
                      onChange={handleDescriptionChange(projIndex, descIndex)}
                      placeholder="Describe your project"
                      multiline
                      rows={2}
                    />
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveDescription(projIndex, descIndex)}
                      disabled={project.description.length <= 1}
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
                  onClick={() => handleAddDescription(projIndex)}
                >
                  Add Description Point
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddProject} fullWidth>
        Add Project
      </Button>
    </div>
  )
}

export default ProjectsForm

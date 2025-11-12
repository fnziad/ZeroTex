"use client"

import type React from "react"
import { TextField, Button, Grid, Typography, IconButton, Card, CardContent, Box } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import type { Publication } from "../../data/resumeData"

interface PublicationsFormProps {
  data: Publication[]
  updateData: (data: Publication[]) => void
}

const PublicationsForm: React.FC<PublicationsFormProps> = ({ data, updateData }) => {
  const handleChange = (index: number, field: keyof Publication) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPublications = [...data]
    updatedPublications[index] = {
      ...updatedPublications[index],
      [field]: e.target.value,
    }
    updateData(updatedPublications)
  }

  const handleAddPublication = () => {
    updateData([
      ...data,
      {
        title: "",
        journal: "",
        date: "",
        authors: "",
        description: "",
      },
    ])
  }

  const handleRemovePublication = (index: number) => {
    const updatedPublications = data.filter((_, i) => i !== index)
    updateData(updatedPublications)
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Publications
      </Typography>

      {data.map((publication, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1">Publication #{index + 1}</Typography>
              <IconButton color="error" onClick={() => handleRemovePublication(index)} disabled={data.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Publication Title"
                  value={publication.title}
                  onChange={handleChange(index, "title")}
                  placeholder="Machine Learning Applications in Natural Language Processing"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Journal/Conference"
                  value={publication.journal}
                  onChange={handleChange(index, "journal")}
                  placeholder="Journal of Computer Science"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Publication Date"
                  value={publication.date}
                  onChange={handleChange(index, "date")}
                  placeholder="MM/YYYY"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Authors"
                  value={publication.authors}
                  onChange={handleChange(index, "authors")}
                  placeholder="John Doe, Jane Smith, et al."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={publication.description}
                  onChange={handleChange(index, "description")}
                  placeholder="Brief description of the publication and its significance"
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddPublication} fullWidth>
        Add Publication
      </Button>
    </div>
  )
}

export default PublicationsForm

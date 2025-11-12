"use client"

import type React from "react"
import { TextField, Button, Grid, Typography, IconButton, Card, CardContent, Box } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import type { Certification } from "../../data/resumeData"

interface CertificationsFormProps {
  data: Certification[]
  updateData: (data: Certification[]) => void
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, updateData }) => {
  const handleChange = (index: number, field: keyof Certification) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCertifications = [...data]
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: e.target.value,
    }
    updateData(updatedCertifications)
  }

  const handleAddCertification = () => {
    updateData([
      ...data,
      {
        name: "",
        issuer: "",
        date: "",
      },
    ])
  }

  const handleRemoveCertification = (index: number) => {
    const updatedCertifications = data.filter((_, i) => i !== index)
    updateData(updatedCertifications)
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Certifications
      </Typography>

      {data.map((certification, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1">Certification #{index + 1}</Typography>
              <IconButton color="error" onClick={() => handleRemoveCertification(index)} disabled={data.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Certification Name"
                  value={certification.name}
                  onChange={handleChange(index, "name")}
                  placeholder="AWS Certified Solutions Architect"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Issuing Organization"
                  value={certification.issuer}
                  onChange={handleChange(index, "issuer")}
                  placeholder="Amazon Web Services"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  value={certification.date}
                  onChange={handleChange(index, "date")}
                  placeholder="MM/YYYY"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddCertification} fullWidth>
        Add Certification
      </Button>
    </div>
  )
}

export default CertificationsForm

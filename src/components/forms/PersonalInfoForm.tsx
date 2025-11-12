"use client"

import type React from "react"
import { TextField, Grid, Typography } from "@mui/material"
import type { PersonalInfo } from "../../data/resumeData"

interface PersonalInfoFormProps {
  data: PersonalInfo
  updateData: (data: PersonalInfo) => void
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, updateData }) => {
  const handleChange = (field: keyof PersonalInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({
      ...data,
      [field]: e.target.value,
    })
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            value={data.fullName}
            onChange={handleChange("fullName")}
            placeholder="John Doe"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            value={data.email}
            onChange={handleChange("email")}
            placeholder="john.doe@example.com"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            value={data.phone}
            onChange={handleChange("phone")}
            placeholder="(123) 456-7890"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="LinkedIn"
            value={data.linkedin}
            onChange={handleChange("linkedin")}
            placeholder="linkedin.com/in/johndoe"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GitHub"
            value={data.github}
            onChange={handleChange("github")}
            placeholder="github.com/johndoe"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Website"
            value={data.website}
            onChange={handleChange("website")}
            placeholder="johndoe.com"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default PersonalInfoForm

"use client"

import type React from "react"
import { TextField, Grid, Typography } from "@mui/material"
import type { Skills } from "../../data/resumeData"

interface SkillsFormProps {
  data: Skills
  updateData: (data: Skills) => void
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, updateData }) => {
  const handleChange = (field: keyof Skills) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({
      ...data,
      [field]: e.target.value,
    })
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Programming Languages"
            value={data.languages}
            onChange={handleChange("languages")}
            placeholder="JavaScript, Python, Java, C++"
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Frameworks & Tools"
            value={data.frameworks}
            onChange={handleChange("frameworks")}
            placeholder="React, Node.js, Express, Git, Docker"
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Database Systems"
            value={data.databases}
            onChange={handleChange("databases")}
            placeholder="MySQL, MongoDB, PostgreSQL, Redis"
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Other Skills"
            value={data.other}
            onChange={handleChange("other")}
            placeholder="Project Management, Agile, UI/UX Design"
            multiline
            rows={2}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default SkillsForm

"use client"

import type React from "react"
import { TextField, Typography } from "@mui/material"

interface ExecutiveSummaryFormProps {
  data: string
  updateData: (data: string) => void
}

const ExecutiveSummaryForm: React.FC<ExecutiveSummaryFormProps> = ({ data, updateData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData(e.target.value)
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Executive Summary
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Provide a concise overview of your professional background, key strengths, and career achievements. This section
        is particularly important for executive and senior-level positions.
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={8}
        value={data}
        onChange={handleChange}
        placeholder="Accomplished executive with over 15 years of experience in technology leadership. Proven track record of driving organizational growth, leading high-performance teams, and implementing strategic initiatives that enhance operational efficiency and market position."
      />
    </div>
  )
}

export default ExecutiveSummaryForm

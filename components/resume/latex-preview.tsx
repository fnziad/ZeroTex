"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { generateLatex } from "@/lib/latex-generator"
import type { ResumeData } from "@/lib/resume-types"

interface LatexPreviewProps {
  data: ResumeData
}

export default function LatexPreview({ data }: LatexPreviewProps) {
  const [latex, setLatex] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    try {
      const generatedLatex = generateLatex(data)
      setLatex(generatedLatex)
    } catch (error) {
      console.error("Error generating LaTeX:", error)
    } finally {
      setLoading(false)
    }
  }, [data])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-[600px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="bg-gray-100 p-4 rounded-md overflow-auto h-[600px]">
          <pre className="text-xs font-mono whitespace-pre-wrap">{latex}</pre>
        </div>
      </CardContent>
    </Card>
  )
}

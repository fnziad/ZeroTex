import { describe, expect, it } from "vitest"

import { exampleResumeData } from "./example-data"
import { generateLatex } from "./latex-generator"
import { defaultResumeData, type ResumeData } from "./resume-types"

describe("generateLatex", () => {
  it("generates a complete document for the default resume", () => {
    const latex = generateLatex(defaultResumeData)

    expect(latex).toContain("\\documentclass")
    expect(latex).toContain("\\begin{document}")
    expect(latex).toContain("\\end{document}")
  })

  it("renders the example project schema used by the editor", () => {
    const latex = generateLatex(exampleResumeData)

    expect(latex).toContain("Operation Reclaim Wall Maria")
    expect(latex).toContain("Led critical squad operations")
  })

  it("escapes LaTeX control characters in user-authored fields", () => {
    const data: ResumeData = {
      ...defaultResumeData,
      personal: {
        ...defaultResumeData.personal,
        fullName: "Ada & Bob_100%",
      },
    }

    const latex = generateLatex(data)

    expect(latex).toContain("Ada \\& Bob\\_100\\%")
    expect(latex).not.toContain("Ada & Bob_100%")
  })
})

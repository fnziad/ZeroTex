"use server"

export async function generatePDF(latex: string, filename = "resume"): Promise<{ url: string; latex: string }> {
  try {
    // In a real production environment, you would:
    // 1. Send the LaTeX to a server endpoint that has pdflatex installed
    // 2. Generate the PDF on the server
    // 3. Return a URL to download the generated PDF

    // For this demo, we'll return the LaTeX code and a simulated PDF URL
    // In a real implementation, you would replace this with actual PDF generation

    // Sanitize filename
    const safeFilename = filename.replace(/[^a-z0-9]/gi, "_").toLowerCase()

    // Create a timestamp for uniqueness
    const timestamp = Date.now()

    // Return both the LaTeX code and a simulated download URL
    return {
      url: `/api/download-pdf?filename=${safeFilename}_${timestamp}.pdf`,
      latex: latex,
    }
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw new Error("Failed to generate PDF. Please try again.")
  }
}

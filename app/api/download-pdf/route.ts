import { type NextRequest, NextResponse } from "next/server"

// Import jsPDF properly
import { jsPDF } from "jspdf"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const filename = searchParams.get("filename") || "resume.pdf"

    // Create a simple PDF with jsPDF
    const doc = new jsPDF()

    // Add a title
    doc.setFontSize(16)
    doc.text("Resume Preview", 105, 20, { align: "center" })

    // Add explanation text
    doc.setFontSize(12)
    doc.text(
      [
        "This is a preview PDF generated with jsPDF.",
        "In a production environment, this would be a LaTeX-generated PDF.",
        "",
        "To implement full LaTeX-to-PDF conversion, you would need:",
        "1. A server with pdflatex installed",
        "2. An API endpoint that processes the LaTeX code",
        "3. A way to return the compiled PDF to the user",
      ],
      20,
      40,
    )

    // Generate the PDF as a blob
    const pdfBlob = doc.output("blob")

    // Return the PDF file
    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)

    // Return a more detailed error response
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

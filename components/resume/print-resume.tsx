"use client"

import { useEffect } from "react"
import type { ResumeData } from "@/lib/resume-types"
import ResumePreview from "./resume-preview"

interface PrintResumeProps {
  data: ResumeData
  onClose: () => void
}

export default function PrintResume({ data, onClose }: PrintResumeProps) {
  useEffect(() => {
    // Small delay to ensure content is rendered
    const timer = setTimeout(() => {
      window.print()
    }, 500)

    // Listen for print dialog close
    const handleAfterPrint = () => {
      onClose()
    }

    window.addEventListener('afterprint', handleAfterPrint)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [onClose])

  return (
    <div className="print-container">
      <style jsx global>{`

        @media print {
          /* Force white background for all containers and dark mode classes */
          html, body, #__next, .print-container, .print-resume,
          [class*='dark'], [class*='Dark'], [class*='DARK'],
          [data-theme='dark'], [data-theme='Dark'], [data-theme='DARK'] {
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            color-scheme: light !important;
          }
          body * {
            visibility: hidden !important;
          }
          .print-container,
          .print-container * {
            visibility: visible !important;
          }
          .print-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            min-height: 100vh !important;
          }
          .print-resume {
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }

          /* A4 page setup - Compact margins to match LaTeX */
          @page {
            size: A4;
            margin: 12mm 18mm;
          }

          /* Reset print styles */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Ensure proper page breaks */
          .print-resume {
            page-break-after: auto;
          }

          /* Avoid breaking inside important elements */
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            break-after: avoid;
          }

          /* Keep entries together */
          .print-resume > div > div {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }

        @media screen {
          .print-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .print-resume {
            background: white;
            width: 210mm;
            min-height: 297mm;
            padding: 12mm 18mm;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            overflow: auto;
            max-height: calc(100vh - 4rem);
            font-size: 10pt;
            line-height: 1.2;
            text-align: justify;
          }
        }
      `}</style>

      <div className="print-resume">
        <ResumePreview data={data} />
      </div>
    </div>
  )
}

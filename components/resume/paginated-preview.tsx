"use client"

import { useEffect, useRef, useState } from "react"
import type { ResumeData } from "@/lib/resume-types"
import ResumePreview from "./resume-preview"

interface PaginatedPreviewProps {
  data: ResumeData
}

export default function PaginatedPreview({ data }: PaginatedPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<string[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Render full content off-screen to measure it
    const fullContent = containerRef.current.cloneNode(true) as HTMLDivElement
    fullContent.style.position = 'absolute'
    fullContent.style.left = '-9999px'
    fullContent.style.width = '170mm' // Content width (210mm - 40mm padding)
    document.body.appendChild(fullContent)

    // Get all elements
    const elements = Array.from(fullContent.querySelectorAll('*')) as HTMLElement[]
    
    // Calculate page breaks
    const pageHeight = 257 * 3.7795275591 // 257mm in pixels (297mm - 40mm padding)
    const pageContents: HTMLElement[][] = [[]]
    let currentPageIndex = 0
    let currentPageHeight = 0

    for (const element of elements) {
      const elementHeight = element.offsetHeight
      
      // Check if element fits on current page
      if (currentPageHeight + elementHeight > pageHeight) {
        // Move to next page
        currentPageIndex++
        pageContents[currentPageIndex] = []
        currentPageHeight = 0
      }
      
      pageContents[currentPageIndex].push(element)
      currentPageHeight += elementHeight
    }

    // Convert to HTML strings
    const pageHTMLs = pageContents.map(elements => 
      elements.map(el => el.outerHTML).join('')
    )

    setPages(pageHTMLs)
    document.body.removeChild(fullContent)
  }, [data])

  return (
    <>
      {/* Hidden reference for measurement */}
      <div ref={containerRef} style={{ position: 'absolute', left: '-9999px', width: '170mm' }}>
        <ResumePreview data={data} />
      </div>

      {/* Render pages */}
      {pages.length === 0 ? (
        // Initial render - show single page
        <div 
          className="bg-white relative"
          style={{ 
            width: "210mm",
            height: "297mm",
            padding: "20mm 20mm",
            fontSize: "11pt",
            lineHeight: "1.3",
            boxSizing: "border-box",
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            overflow: "hidden"
          }}
        >
          <ResumePreview data={data} />
        </div>
      ) : (
        // Paginated render
        pages.map((pageHTML, index) => (
          <div 
            key={index}
            className="bg-white relative"
            style={{ 
              width: "210mm",
              height: "297mm",
              padding: "20mm 20mm",
              fontSize: "11pt",
              lineHeight: "1.3",
              boxSizing: "border-box",
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              overflow: "hidden"
            }}
            dangerouslySetInnerHTML={{ __html: pageHTML }}
          />
        ))
      )}
    </>
  )
}

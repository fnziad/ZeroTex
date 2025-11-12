"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import type { TemplateConfig } from "@/lib/templates"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
  templates: TemplateConfig[]
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate, templates }: TemplateSelectorProps) {
  // Create sample template previews with styling based on the template config
  const getTemplatePreview = (template: TemplateConfig) => {
    return (
      <div
        className={`template-preview ${template.fontClass}`}
        style={{
          fontFamily: template.fontFamily,
          backgroundColor: "white",
          padding: "12px",
          height: "150px",
          fontSize: "8px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Simplified Preview */}
        <div
          style={{
            color: template.colorScheme.primary,
            borderBottom: `1px solid ${template.colorScheme.primary}`,
            marginBottom: "4px",
            paddingBottom: "2px",
            fontWeight: "bold",
            textAlign: template.headerStyle === "minimal" ? "left" : "center",
          }}
        >
          JOHN DOE
        </div>

        <div
          style={{
            fontSize: "6px",
            textAlign: template.headerStyle === "minimal" ? "left" : "center",
            marginBottom: "8px",
          }}
        >
          johndoe@example.com | (123) 456-7890 | linkedin.com/in/johndoe | github.com/johndoe
        </div>

        {/* Education */}
        <div style={{ marginBottom: "6px" }}>
          <div
            style={{
              borderBottom: `1px solid ${template.colorScheme.primary}`,
              color: template.colorScheme.primary,
              fontWeight: "bold",
              fontSize: "7px",
              marginBottom: "2px",
            }}
          >
            EDUCATION
          </div>
          <div style={{ fontSize: "6px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>University of Example</strong>
            </div>
            <div>2018-2022</div>
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: "6px" }}>
          <div
            style={{
              borderBottom: `1px solid ${template.colorScheme.primary}`,
              color: template.colorScheme.primary,
              fontWeight: "bold",
              fontSize: "7px",
              marginBottom: "2px",
            }}
          >
            EXPERIENCE
          </div>
          <div style={{ fontSize: "6px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>Software Engineer</strong>
            </div>
            <div>2022-Present</div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div
            style={{
              borderBottom: `1px solid ${template.colorScheme.primary}`,
              color: template.colorScheme.primary,
              fontWeight: "bold",
              fontSize: "7px",
              marginBottom: "2px",
            }}
          >
            SKILLS
          </div>
          <div style={{ fontSize: "6px" }}>
            <strong>Languages:</strong> JavaScript, Python, Java
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Choose a Template</h2>
      </div>

      <div className="bg-muted/50 p-4 rounded-md mb-4 flex items-start gap-2">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Each template comes with a specific font family and styling optimized for different industries and career
          levels. The template will affect both the preview and the final PDF.
        </p>
      </div>

      <RadioGroup value={selectedTemplate} onValueChange={onSelectTemplate} className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem value={template.id} id={template.id} className="peer sr-only" />
            <Label
              htmlFor={template.id}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all duration-200"
            >
              <div className="mb-2 w-full">
                <div className="font-medium mb-1">{template.name}</div>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
              <div className="relative h-[150px] w-full overflow-hidden rounded-md border border-muted">
                {getTemplatePreview(template)}
              </div>
              <div className="mt-2 w-full">
                <p className="text-xs text-muted-foreground">
                  Font: <span className={template.fontClass}>{template.fontClass.replace("font-", "")}</span>
                </p>
              </div>
              {selectedTemplate === template.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

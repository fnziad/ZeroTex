"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, X, GripVertical, List, Type, ListOrdered } from "lucide-react"
import type { CustomSection } from "@/lib/resume-types"

interface CustomSectionFormProps {
  data: CustomSection
  updateData: (data: CustomSection) => void
}

type CustomSectionFormat = "paragraph" | "bullets" | "subsections"

interface CustomSubsection {
  title: string
  content: string[]
}

export default function CustomSectionForm({ data, updateData }: CustomSectionFormProps) {
  // Parse existing content to determine format
  const parseExistingContent = () => {
    if (!data.content || typeof data.content === "string") {
      const content = data.content || ""
      if (content.includes("- ")) {
        // Bullet point format
        return {
          format: "bullets" as CustomSectionFormat,
          bullets: content.split("\n").filter(line => line.trim().startsWith("- ")).map(line => line.replace(/^-\s*/, "")),
          paragraph: "",
          subsections: []
        }
      }
      return {
        format: "paragraph" as CustomSectionFormat,
        bullets: [],
        paragraph: content,
        subsections: []
      }
    }
    return {
      format: "paragraph" as CustomSectionFormat,
      bullets: [],
      paragraph: "",
      subsections: []
    }
  }

  const [format, setFormat] = useState<CustomSectionFormat>(parseExistingContent().format)
  const [bullets, setBullets] = useState<string[]>(parseExistingContent().bullets.length > 0 ? parseExistingContent().bullets : [""])
  const [paragraph, setParagraph] = useState(parseExistingContent().paragraph)
  const [subsections, setSubsections] = useState<CustomSubsection[]>([{ title: "", content: [""] }])

  const updateContent = (newFormat: CustomSectionFormat, newBullets?: string[], newParagraph?: string, newSubsections?: CustomSubsection[]) => {
    let content = ""
    
    if (newFormat === "bullets") {
      const validBullets = (newBullets || bullets).filter(b => b.trim())
      content = validBullets.map(b => `- ${b}`).join("\n")
    } else if (newFormat === "paragraph") {
      content = newParagraph !== undefined ? newParagraph : paragraph
    } else if (newFormat === "subsections") {
      const validSubsections = (newSubsections || subsections).filter(s => s.title.trim())
      content = validSubsections.map(s => {
        const validContent = s.content.filter(c => c.trim())
        return `${s.title}:\n${validContent.map(c => `- ${c}`).join("\n")}`
      }).join("\n\n")
    }
    
    updateData({ content })
  }

  const handleFormatChange = (newFormat: CustomSectionFormat) => {
    setFormat(newFormat)
    updateContent(newFormat)
  }

  const handleAddBullet = () => {
    const newBullets = [...bullets, ""]
    setBullets(newBullets)
  }

  const handleRemoveBullet = (index: number) => {
    const newBullets = bullets.filter((_, i) => i !== index)
    setBullets(newBullets)
    updateContent("bullets", newBullets)
  }

  const handleBulletChange = (index: number, value: string) => {
    const newBullets = [...bullets]
    newBullets[index] = value
    setBullets(newBullets)
    updateContent("bullets", newBullets)
  }

  const handleParagraphChange = (value: string) => {
    setParagraph(value)
    updateContent("paragraph", undefined, value)
  }

  const handleAddSubsection = () => {
    const newSubsections = [...subsections, { title: "", content: [""] }]
    setSubsections(newSubsections)
  }

  const handleRemoveSubsection = (index: number) => {
    const newSubsections = subsections.filter((_, i) => i !== index)
    setSubsections(newSubsections)
    updateContent("subsections", undefined, undefined, newSubsections)
  }

  const handleSubsectionTitleChange = (index: number, value: string) => {
    const newSubsections = [...subsections]
    newSubsections[index].title = value
    setSubsections(newSubsections)
    updateContent("subsections", undefined, undefined, newSubsections)
  }

  const handleAddSubsectionItem = (subsectionIndex: number) => {
    const newSubsections = [...subsections]
    newSubsections[subsectionIndex].content.push("")
    setSubsections(newSubsections)
  }

  const handleRemoveSubsectionItem = (subsectionIndex: number, itemIndex: number) => {
    const newSubsections = [...subsections]
    newSubsections[subsectionIndex].content = newSubsections[subsectionIndex].content.filter((_, i) => i !== itemIndex)
    setSubsections(newSubsections)
    updateContent("subsections", undefined, undefined, newSubsections)
  }

  const handleSubsectionItemChange = (subsectionIndex: number, itemIndex: number, value: string) => {
    const newSubsections = [...subsections]
    newSubsections[subsectionIndex].content[itemIndex] = value
    setSubsections(newSubsections)
    updateContent("subsections", undefined, undefined, newSubsections)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Custom Section Format</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose how you want to structure this section's content
        </p>

        <RadioGroup value={format} onValueChange={handleFormatChange} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paragraph" id="format-paragraph" />
            <Label htmlFor="format-paragraph" className="flex items-center gap-2 cursor-pointer">
              <Type className="h-4 w-4" />
              <span>Paragraph - Freeform text content</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bullets" id="format-bullets" />
            <Label htmlFor="format-bullets" className="flex items-center gap-2 cursor-pointer">
              <List className="h-4 w-4" />
              <span>Bullet Points - List of items</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="subsections" id="format-subsections" />
            <Label htmlFor="format-subsections" className="flex items-center gap-2 cursor-pointer">
              <ListOrdered className="h-4 w-4" />
              <span>Subsections - Multiple titled groups with bullet points</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Paragraph Format */}
      {format === "paragraph" && (
        <div>
          <Label htmlFor="paragraph-content">Content</Label>
          <Textarea
            id="paragraph-content"
            value={paragraph}
            onChange={(e) => handleParagraphChange(e.target.value)}
            placeholder="Enter your content as a paragraph..."
            rows={8}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Write freely - great for summaries, descriptions, or narrative content
          </p>
        </div>
      )}

      {/* Bullet Points Format */}
      {format === "bullets" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Bullet Points</Label>
            <Button onClick={handleAddBullet} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Bullet
            </Button>
          </div>

          {bullets.map((bullet, index) => (
            <div key={index} className="flex items-start gap-2">
              <GripVertical className="h-5 w-5 text-muted-foreground mt-2" />
              <Input
                value={bullet}
                onChange={(e) => handleBulletChange(index, e.target.value)}
                placeholder="Enter bullet point..."
                className="flex-1"
              />
              <Button
                onClick={() => handleRemoveBullet(index)}
                size="icon"
                variant="ghost"
                className="mt-1"
                disabled={bullets.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <p className="text-xs text-muted-foreground">
            Perfect for lists of achievements, responsibilities, or key points
          </p>
        </div>
      )}

      {/* Subsections Format */}
      {format === "subsections" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Subsections</Label>
            <Button onClick={handleAddSubsection} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Subsection
            </Button>
          </div>

          {subsections.map((subsection, subsectionIndex) => (
            <Card key={subsectionIndex} className="p-4 space-y-3">
              <div className="flex items-start gap-2">
                <Input
                  value={subsection.title}
                  onChange={(e) => handleSubsectionTitleChange(subsectionIndex, e.target.value)}
                  placeholder="Subsection title..."
                  className="flex-1 font-semibold"
                />
                <Button
                  onClick={() => handleRemoveSubsection(subsectionIndex)}
                  size="icon"
                  variant="ghost"
                  disabled={subsections.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 pl-4">
                {subsection.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-2">•</span>
                    <Input
                      value={item}
                      onChange={(e) => handleSubsectionItemChange(subsectionIndex, itemIndex, e.target.value)}
                      placeholder="Item content..."
                      className="flex-1"
                    />
                    <Button
                      onClick={() => handleRemoveSubsectionItem(subsectionIndex, itemIndex)}
                      size="icon"
                      variant="ghost"
                      disabled={subsection.content.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  onClick={() => handleAddSubsectionItem(subsectionIndex)}
                  size="sm"
                  variant="outline"
                  className="ml-6"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>
            </Card>
          ))}
          
          <p className="text-xs text-muted-foreground">
            Ideal for organizing content into categories with details under each
          </p>
        </div>
      )}
    </div>
  )
}

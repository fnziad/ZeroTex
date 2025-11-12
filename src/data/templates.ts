export interface TemplateConfig {
  id: string
  name: string
  description: string
  colorScheme: {
    primary: string
    secondary: string
  }
  fontFamily: string
}

export const templates: TemplateConfig[] = [
  {
    id: "simple",
    name: "Simple",
    description: "A clean, minimalist design with a professional look",
    colorScheme: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
    },
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  {
    id: "modern",
    name: "Modern",
    description: "A contemporary design with a sleek, minimalist aesthetic",
    colorScheme: {
      primary: "#3498db",
      secondary: "#2c3e50",
    },
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  {
    id: "professional",
    name: "Professional",
    description: "A traditional resume layout with a clean, professional look",
    colorScheme: {
      primary: "#34495e",
      secondary: "#7f8c8d",
    },
    fontFamily: '"Georgia", "Times New Roman", serif',
  },
  {
    id: "creative",
    name: "Creative",
    description: "A bold design for creative professionals",
    colorScheme: {
      primary: "#8e44ad",
      secondary: "#7f8c8d",
    },
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
]

export function getTemplateConfig(templateId: string): TemplateConfig {
  return templates.find((template) => template.id === templateId) || templates[0]
}

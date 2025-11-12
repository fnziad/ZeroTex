export interface TemplateConfig {
  id: string
  name: string
  description: string
  latexClass: string
  fontPackages: string[]
  headerStyle: "centered" | "sidebar" | "minimal" | "two-column" | "boxed"
  sectionStyle: "standard" | "boxed" | "sidebar" | "timeline" | "modern"
  colorScheme: {
    primary: string
    secondary: string
    accent: string
  }
  fontClass: string
  fontFamily: string
  previewImage: string
  layout: "standard" | "two-column" | "sidebar" | "compact" | "expanded"
  features: string[]
}

export const templates: Record<string, TemplateConfig> = {
  classic: {
    id: "classic",
    name: "Classic",
    description: "A traditional resume layout with a clean, professional look",
    latexClass: "article",
    fontPackages: ["\\usepackage{libertine}"],
    headerStyle: "centered",
    sectionStyle: "standard",
    colorScheme: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
      accent: "#2c3e50",
    },
    fontClass: "font-classic",
    fontFamily: "Merriweather, serif",
    previewImage: "/classic-preview.png",
    layout: "standard",
    features: ["Clean layout", "Traditional style", "ATS-friendly"],
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "A contemporary design with a sleek, minimalist aesthetic",
    latexClass: "article",
    fontPackages: ["\\usepackage[sfdefault]{inter}"],
    headerStyle: "minimal",
    sectionStyle: "modern",
    colorScheme: {
      primary: "#3498db",
      secondary: "#2c3e50",
      accent: "#3498db",
    },
    fontClass: "font-modern",
    fontFamily: "Inter, sans-serif",
    previewImage: "/modern-preview.png",
    layout: "standard",
    features: ["Minimalist design", "Modern typography", "Subtle accents"],
  },
  academic: {
    id: "academic",
    name: "Academic",
    description: "Ideal for academic positions with focus on publications and research",
    latexClass: "article",
    fontPackages: ["\\usepackage{ebgaramond}"],
    headerStyle: "boxed",
    sectionStyle: "standard",
    colorScheme: {
      primary: "#34495e",
      secondary: "#7f8c8d",
      accent: "#34495e",
    },
    fontClass: "font-classic",
    fontFamily: "Merriweather, serif",
    previewImage: "/academic-preview.png",
    layout: "expanded",
    features: ["Publication sections", "Research emphasis", "Teaching experience"],
  },
  technical: {
    id: "technical",
    name: "Technical",
    description: "Perfect for technical roles with emphasis on skills and projects",
    latexClass: "article",
    fontPackages: ["\\usepackage[sfdefault]{sourcesanspro}"],
    headerStyle: "minimal",
    sectionStyle: "boxed",
    colorScheme: {
      primary: "#2980b9",
      secondary: "#7f8c8d",
      accent: "#2980b9",
    },
    fontClass: "font-technical",
    fontFamily: "Source Sans 3, sans-serif",
    previewImage: "/technical-preview.png",
    layout: "two-column",
    features: ["Skills focus", "Project showcase", "Technical achievements"],
  },
  creative: {
    id: "creative",
    name: "Creative",
    description: "A bold design for creative professionals",
    latexClass: "article",
    fontPackages: ["\\usepackage[sfdefault]{raleway}"],
    headerStyle: "sidebar",
    sectionStyle: "boxed",
    colorScheme: {
      primary: "#8e44ad",
      secondary: "#7f8c8d",
      accent: "#8e44ad",
    },
    fontClass: "font-creative",
    fontFamily: "Raleway, sans-serif",
    previewImage: "/creative-preview.png",
    layout: "sidebar",
    features: ["Unique layout", "Visual emphasis", "Portfolio integration"],
  },
  executive: {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior professionals and executives",
    latexClass: "article",
    fontPackages: ["\\usepackage{bookman}"],
    headerStyle: "two-column",
    sectionStyle: "timeline",
    colorScheme: {
      primary: "#1a5276",
      secondary: "#566573",
      accent: "#1a5276",
    },
    fontClass: "font-classic",
    fontFamily: "Merriweather, serif",
    previewImage: "/executive-preview.png",
    layout: "compact",
    features: ["Leadership focus", "Achievement highlights", "Executive summary"],
  },
}

export function getTemplateConfig(templateId: string): TemplateConfig {
  return templates[templateId] || templates.classic
}

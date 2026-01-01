export interface PersonalInfo {
  fullName: string
  location: string
  phone: string
  email: string
  linkedin: string
  github: string
  website: string
  customLinks: string  // For LeetCode, portfolio, or other profile links (one per line)
}

export type SectionType =
  | "executive-summary"
  | "education"
  | "research-interests"
  | "research-experience"
  | "experience"
  | "professional-experience"
  | "extracurricular"
  | "projects"
  | "publications"
  | "certifications"
  | "skills"
  | "awards"
  | "interests"
  | "languages"
  | "custom"

export interface ResumeSection {
  id: string
  type: SectionType
  title: string
  order: number
  visible: boolean
  data: any
}

export interface EducationEntry {
  institution: string
  location: string
  degree: string
  gpa?: string
  startDate: string
  endDate: string
  thesis?: string
  coursework?: string
  achievements?: string
}

export interface ResearchExperience {
  role: string
  project: string
  status?: string
  course?: string
  bullets: string[]
}

export interface Experience {
  organization: string
  location: string
  position: string
  startDate: string
  endDate: string
  bullets: string[]
}

export interface SkillCategory {
  name: string
  items: string
}

export interface Skills {
  categories: SkillCategory[]
}

export interface AwardCategory {
  title: string
  items: string | string[]  // Flexible: accepts both string and array
}

export interface Awards {
  categories: AwardCategory[]
}

export interface CustomSection {
  content: string
}

export interface ResumeData {
  personal: PersonalInfo
  sections: ResumeSection[]
}

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: "",
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    website: "",
    customLinks: "",
  },
  sections: [
    {
      id: "education-1",
      type: "education",
      title: "Education",
      order: 0,
      visible: true,
      data: [
        {
          institution: "",
          location: "",
          degree: "",
          gpa: "",
          startDate: "",
          endDate: "",
          thesis: "",
          coursework: "",
          achievements: "",
        },
      ] as EducationEntry[],
    },
    {
      id: "experience-1",
      type: "experience",
      title: "Experience",
      order: 1,
      visible: true,
      data: [] as Experience[],
    },
    {
      id: "skills-1",
      type: "skills",
      title: "Skills",
      order: 2,
      visible: true,
      data: {
        categories: [
          { name: "Programming Languages", items: "" },
          { name: "Technologies & Frameworks", items: "" },
          { name: "Tools", items: "" },
        ],
      } as Skills,
    },
    {
      id: "projects-1",
      type: "projects",
      title: "Projects",
      order: 3,
      visible: true,
      data: [],
    },
  ],
}

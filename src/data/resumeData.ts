export interface PersonalInfo {
  fullName: string
  phone: string
  email: string
  linkedin: string
  github: string
  website: string
}

export interface Education {
  institution: string
  location: string
  degree: string
  startDate: string
  endDate: string
  gpa: string
  coursework: string
  achievements: string
}

export interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  responsibilities: string[]
}

export interface Project {
  name: string
  technologies: string
  startDate: string
  endDate: string
  description: string[]
}

export interface Skills {
  languages: string
  frameworks: string
  databases: string
  other: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export interface Publication {
  title: string
  journal: string
  date: string
  authors: string
  description: string
}

export interface ResumeData {
  personal: PersonalInfo
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skills
  certifications: Certification[]
  publications: Publication[]
  executiveSummary: string
}

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    website: "",
  },
  education: [
    {
      institution: "",
      location: "",
      degree: "",
      startDate: "",
      endDate: "",
      gpa: "",
      coursework: "",
      achievements: "",
    },
  ],
  experience: [
    {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      responsibilities: ["", "", ""],
    },
  ],
  projects: [
    {
      name: "",
      technologies: "",
      startDate: "",
      endDate: "",
      description: ["", "", ""],
    },
  ],
  skills: {
    languages: "",
    frameworks: "",
    databases: "",
    other: "",
  },
  certifications: [
    {
      name: "",
      issuer: "",
      date: "",
    },
  ],
  publications: [
    {
      title: "",
      journal: "",
      date: "",
      authors: "",
      description: "",
    },
  ],
  executiveSummary: "",
}

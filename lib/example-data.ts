// © 2025 Fahad Nadim Ziad — https://github.com/fnziad

import type { ResumeData } from "./resume-types"

export const exampleResumeData: ResumeData = {
  personal: {
    fullName: "Jordan Lee",
    location: "Dhaka, Bangladesh",
    phone: "+880 1700 000000",
    email: "jordan.lee@example.com",
    linkedin: "jordanlee",
    github: "jordanlee",
    website: "jordanlee.dev",
    customLinks: "Portfolio: jordanlee.dev/work",
  },
  sections: [
    {
      id: "executive-summary-1",
      type: "executive-summary",
      title: "Professional Summary",
      order: 0,
      visible: true,
      data: {
        content:
          "Software delivery and project management professional who turns product goals into reliable releases. Experienced in coordinating cross-functional engineering teams, improving delivery workflows, and contributing hands-on to web applications and internal tooling.",
      },
    },
    {
      id: "education-1",
      type: "education",
      title: "Education",
      order: 1,
      visible: true,
      data: [
        {
          institution: "University of Technology",
          location: "Dhaka, Bangladesh",
          degree: "B.Sc. in Computer Science and Engineering",
          gpa: "3.70/4.00",
          startDate: "2018",
          endDate: "2022",
          coursework: "Software Engineering, Algorithms, Databases, Human-Computer Interaction",
          achievements: "Capstone project recognized for practical product delivery and team collaboration.",
        },
      ],
    },
    {
      id: "work-experience-1",
      type: "experience",
      title: "Work Experience",
      order: 2,
      visible: true,
      data: [
        {
          organization: "Northstar Software",
          location: "Dhaka, Bangladesh",
          position: "Software Project Manager",
          startDate: "2024",
          endDate: "Present",
          bullets: [
            "Coordinate a cross-functional team of engineers, designers, and QA specialists across parallel product releases.",
            "Translate product requirements into scoped milestones, acceptance criteria, and delivery plans for stakeholder review.",
            "Introduced sprint health reporting and release checklists that reduced late-stage delivery risk.",
            "Partner with engineers on technical trade-offs, backlog refinement, and customer-impact prioritization.",
          ],
        },
        {
          organization: "Northstar Software",
          location: "Dhaka, Bangladesh",
          position: "Software Engineer",
          startDate: "2022",
          endDate: "2024",
          bullets: [
            "Built and maintained TypeScript web features for internal operations and customer-facing workflows.",
            "Worked with product and QA to deliver incremental releases with clear ownership and measurable outcomes.",
            "Improved engineering documentation, deployment handoffs, and issue triage for a growing delivery team.",
          ],
        },
      ],
    },
    {
      id: "research-experience-1",
      type: "research-experience",
      title: "Research Experience",
      order: 3,
      visible: true,
      data: [
        {
          role: "Research Assistant",
          project: "Developer Workflow Analytics for Software Teams",
          status: "2021 – 2022",
          course: "Software Engineering Research Lab",
          bullets: [
            "Studied how issue-flow and pull-request signals can identify delivery bottlenecks without monitoring individual developers.",
            "Designed a prototype dashboard that combined anonymized cycle-time, review, and release metrics.",
            "Presented findings on using evidence-based delivery metrics during project planning and retrospectives.",
          ],
        },
      ],
    },
    {
      id: "skills-1",
      type: "skills",
      title: "Software & Delivery Skills",
      order: 4,
      visible: true,
      data: {
        categories: [
          { name: "Delivery", items: "Agile delivery, sprint planning, roadmap coordination, risk management, stakeholder communication" },
          { name: "Software", items: "TypeScript, React, Next.js, Node.js, REST APIs, SQL" },
          { name: "Tooling", items: "GitHub, Jira, Linear, Figma, CI/CD, Vercel" },
          { name: "Collaboration", items: "Backlog refinement, technical writing, QA coordination, incident follow-up" },
        ],
      },
    },
    {
      id: "software-projects-1",
      type: "projects",
      title: "Software Projects",
      order: 5,
      visible: true,
      data: [
        {
          name: "Release Readiness Hub",
          date: "2025",
          link: "https://github.com/jordanlee/release-readiness-hub",
          technologies: "Next.js, TypeScript, PostgreSQL, Vercel",
          description: [
            "Built a shared release workspace for product, engineering, and QA to track scope, risks, approvals, and rollout status.",
            "Designed role-based checklists that made handoffs and ownership visible before each release.",
            "Used the project to practice translating delivery process needs into a maintainable software product.",
          ],
        },
        {
          name: "Team Retrospective Insights",
          date: "2024",
          link: "https://github.com/jordanlee/retro-insights",
          technologies: "React, Node.js, SQLite, Chart.js",
          description: [
            "Created a lightweight tool for collecting retrospective themes and turning them into prioritized follow-up actions.",
            "Added trend views that help teams distinguish one-off friction from recurring delivery problems.",
          ],
        },
      ],
    },
    {
      id: "certifications-1",
      type: "certifications",
      title: "Certifications",
      order: 6,
      visible: true,
      data: {
        items: [
          "Professional Scrum Master I — Scrum.org (2024)",
          "Google Project Management Certificate (2023)",
        ],
      },
    },
  ],
}

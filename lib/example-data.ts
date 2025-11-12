// © 2025 Fahad Nadim Ziad — https://github.com/fnziad

import type { ResumeData } from "./resume-types"

export const exampleResumeData: ResumeData = {
  personal: {
    fullName: "Levi Ackerman",
    location: "Paradis Island, Shiganshina District",
    phone: "+123-456-7890",
    email: "levi.ackerman@survey.corps",
    linkedin: "linkedin.com/in/levi-ackerman",
    github: "github.com/humanity-strongest",
    website: "leviackerman.dev",
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
          "Elite tactical specialist with 10+ years of experience in high-stakes operations, team leadership, and strategic planning. Renowned for exceptional decision-making under pressure, maintaining 100% mission success rate in critical operations. Seeking to leverage combat expertise and leadership skills in cybersecurity and risk management roles.",
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
          institution: "Survey Corps Military Academy",
          location: "Wall Rose, Paradis",
          degree: "Advanced Tactical Operations & Leadership Certification",
          gpa: "4.0",
          startDate: "850",
          endDate: "852",
          coursework: "Advanced Combat Strategies, 3D Maneuvering Systems, Risk Assessment, Team Coordination",
          achievements: "Graduated top of class with highest combat proficiency scores in academy history",
        },
        {
          institution: "Underground District Technical Institute",
          location: "Underground City, Wall Sina",
          degree: "Survival Tactics & Urban Combat Diploma",
          gpa: "",
          startDate: "845",
          endDate: "848",
          coursework: "Stealth Operations, Resource Management, Hand-to-Hand Combat",
          achievements: "Developed innovative urban navigation techniques adopted by military forces",
        },
      ],
    },
    {
      id: "experience-1",
      type: "experience",
      title: "Professional Experience",
      order: 2,
      visible: true,
      data: [
        {
          organization: "Survey Corps",
          location: "Wall Rose, Paradis Island",
          position: "Captain & Special Operations Squad Leader",
          startDate: "854",
          endDate: "Present",
          bullets: [
            "Led elite squad of 10+ soldiers in high-risk reconnaissance missions with 100% success rate",
            "Developed and implemented advanced tactical protocols that reduced casualty rates by 85%",
            "Mentored junior officers in combat techniques, leadership, and strategic decision-making",
            "Coordinated cross-functional teams during critical operations, ensuring seamless execution",
            "Maintained operational readiness through rigorous training programs and equipment optimization",
          ],
        },
        {
          organization: "Survey Corps",
          location: "Wall Rose, Paradis Island",
          position: "Squad Leader",
          startDate: "852",
          endDate: "854",
          bullets: [
            "Managed squad of 5-8 members in expeditions beyond the walls with zero casualties",
            "Executed strategic maneuvers that became standard operating procedures across the corps",
            "Trained new recruits in 3D maneuvering gear operation and combat techniques",
            "Collaborated with military leadership to optimize resource allocation and mission planning",
          ],
        },
      ],
    },
    {
      id: "skills-1",
      type: "skills",
      title: "Technical Skills",
      order: 3,
      visible: true,
      data: {
        categories: [
          {
            name: "Combat & Tactical",
            items: "Advanced 3D Maneuvering, Close-Quarter Combat, Strategic Planning, Risk Assessment, Threat Analysis",
          },
          {
            name: "Leadership & Management",
            items: "Team Leadership, Crisis Management, Decision Making, Training & Development, Resource Optimization",
          },
          {
            name: "Technical Proficiencies",
            items: "Equipment Maintenance, Navigation Systems, Surveillance Techniques, Emergency Response Protocols",
          },
          {
            name: "Soft Skills",
            items: "Problem Solving, Attention to Detail, Adaptability, Communication, Mentorship",
          },
        ],
      },
    },
    {
      id: "projects-1",
      type: "projects",
      title: "Key Operations & Projects",
      order: 4,
      visible: true,
      data: [
        {
          name: "Operation Reclaim Wall Maria",
          dates: "857",
          technologies: "Strategic Planning, Multi-Unit Coordination, Risk Mitigation",
          bullets: [
            "Led critical squad operations during large-scale military campaign to reclaim territory",
            "Executed high-precision maneuvers that neutralized multiple high-value targets",
            "Coordinated with intelligence units to optimize tactical approaches in real-time",
          ],
        },
        {
          name: "Underground Rescue Initiative",
          dates: "850",
          technologies: "Urban Combat, Search & Rescue, Crisis Response",
          bullets: [
            "Spearheaded rescue operations in complex underground environments with 100% success rate",
            "Developed innovative navigation techniques for low-visibility, high-risk scenarios",
            "Trained 50+ personnel in specialized urban combat and rescue protocols",
          ],
        },
      ],
    },
    {
      id: "certifications-1",
      type: "certifications",
      title: "Certifications & Awards",
      order: 5,
      visible: true,
      data: {
        items: [
          "Humanity's Strongest Soldier - Official Military Recognition (855)",
          "Elite Squad Leader Certification - Survey Corps (852)",
          "Advanced 3D Maneuvering Instructor License (853)",
          "Distinguished Service Medal for Exceptional Leadership (856)",
          "Tactical Excellence Award - Survey Corps Command (857)",
        ],
      },
    },
  ],
}

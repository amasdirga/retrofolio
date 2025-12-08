import { ExperienceItem, SkillCategory } from './types';

export const RESUME_SUMMARY = `
Highly experienced ERP Consultant Supervisor and Fullstack Developer with over 7 years of experience. 
Currently NOT open to full-time work, but actively taking on System Consultation and Freelance projects.
Specializes in delivering complex ERP solutions, optimizing client operations, and custom software development.
Passionate about new challenges and futuristic ideas.
Proficient in a wide range of technologies from legacy Smalltalk to modern React/Next.js and Python FastAPI.
Proven track record in project management, business process analysis, and system implementation.
`;

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "PT. Toyo Business Engineering Indonesia",
    role: "ERP Consultant Supervisor",
    period: "Jan 2024 - Present",
    location: "Jakarta, Indonesia (Hybrid)",
    description: [
      "Ensuring successful project execution and client satisfaction.",
      "Oversaw the implementation and customization of ERP systems tailored to specific business needs.",
      "Collaborating with stakeholders to address complex operational challenges.",
      "Aligning technology with business goals and ensuring successful software adoption."
    ],
    skills: ["Flutter", "ASP.NET Web API", "Team Leadership", "ERP Implementation"]
  },
  {
    company: "PT. Toyo Business Engineering Indonesia",
    role: "Senior ERP Consultant",
    period: "May 2022 - Jan 2024",
    location: "Jakarta, Indonesia",
    description: [
      "Conducted comprehensive business process analyses.",
      "Identified key areas for improvement that enhanced operational efficiency.",
      "Provided end-user training and system integration strategies."
    ],
    skills: ["Business Analysis", "Inventory Management", "System Integration"]
  },
  {
    company: "Kosta Consulting",
    role: "ERP Functional Consultant",
    period: "Jan 2021 - Apr 2022",
    location: "Jakarta, Indonesia",
    description: [
      "Gathered and analyzed business requirements from clients to tailor ERP solutions.",
      "Specialized in Idempiere (Free Open Source ERP and CRM).",
      "Enhanced operational efficiency through custom workflows."
    ],
    skills: ["Idempiere", "CRM", "Open Source ERP"]
  },
  {
    company: "Go Solution",
    role: "Project Management",
    period: "Jan 2020 - Dec 2020",
    location: "Yogyakarta, Indonesia",
    description: [
      "Defined project scope, goals, and deliverables.",
      "Developed detailed project plans and timelines.",
      "Ensured clear alignment with client expectations."
    ],
    skills: ["Project Management", "Agile", "Scrum"]
  },
  {
    company: "PT. INDOGLOBAL SOLUSI PRATAMA",
    role: "ERP Consultant",
    period: "May 2018 - Apr 2020",
    location: "Yogyakarta Area",
    description: [
      "Developed comprehensive implementation plans for ERP systems.",
      "Configured software and hardware tailored to organizational needs.",
      "Ensured seamless integration."
    ],
    skills: ["Hardware Configuration", "ERP Configuration"]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "ERP & Business",
    items: [
      "Business Process Analysis",
      "ERP Implementation (7+ Years)",
      "Supply Chain Management",
      "Inventory Management",
      "Project Management",
      "Client Stakeholder Management"
    ]
  },
  {
    category: "Backend Development",
    items: [
      "Python (FastAPI, Django)",
      "C# / ASP.NET Core",
      "Java (Spring Boot)",
      "Smalltalk",
      "Node.js"
    ]
  },
  {
    category: "Frontend Development",
    items: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Flutter (Mobile)",
      "TypeScript"
    ]
  },
  {
    category: "DevOps & Tools",
    items: [
      "Docker",
      "CI/CD (GitHub Actions)",
      "Git",
      "PostgreSQL",
      "Linux Administration"
    ]
  }
];
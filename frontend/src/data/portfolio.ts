export const portfolio = {
  name: "Sagar Singh",
  title: "Full-Stack Developer | AI Engineer",
  location: "Jaipur, Rajasthan, India",
  email: "sagarrsinghh11@gmail.com",

  links: {
    github: "https://github.com/sagarrsinghh",
    linkedin: "https://www.linkedin.com/in/sagarrsingh",
    portfolio: "https://sgrportfolio.vercel.app/",
    creativePortfolio: "https://sgrmagic.vercel.app/",
  },

  summary:
    "Computer Science and Engineering graduate with hands-on experience building REST APIs, backend systems, full-stack web applications, and AI-integrated tools. Interested in backend engineering, full-stack development, and AI engineering.",

  education: [
    {
      degree: "B.Tech, Computer Science & Engineering",
      institution: "JECRC University",
      location: "Jaipur, Rajasthan",
      period: "2022–2026",
      result: "CGPA: 7.9",
    },
  ],

  skills: {
    languages: ["Java", "JavaScript", "TypeScript", "Python", "C++", "SQL"],
    ai: [
      "AI Integration",
      "Prompt Engineering",
      "Large Language Models",
      "Claude API",
      "OpenAI API",
      "Generative AI",
    ],
    backend: [
      "NestJS",
      "Node.js",
      "Flask",
      "REST API Development",
      "JWT Authentication",
      "Role-Based Access Control",
    ],
    frontend: ["React", "HTML5", "CSS3", "WordPress", "Bootstrap"],
    databases: [
      "MySQL",
      "TypeORM",
      "Database Design",
      "SQL Query Optimization",
    ],
    tools: ["Git", "GitHub", "Docker", "Vercel", "Postman", "Swagger"],
  },

  experience: [
    {
      role: "Project Intern",
      organization: "Smart Data Center Monitoring Platform — DoIT&C / BSDC",
      period: "February 2026 – June 2026",
      location: "Jaipur",
      highlights: [
        "Built a platform for processing and visualizing infrastructure metrics from Excel and PowerPoint reports.",
        "Developed Excel parsing pipelines using SheetJS and persisted structured metrics in MySQL through TypeORM.",
        "Developed NestJS REST APIs with JWT authentication, role-based access control, and React dashboards.",
        "Documented the system in a technical report covering a 68-endpoint API specification and database schema.",
      ],
    },
    {
      role: "Jr. Software Engineer Intern",
      organization: "ZUCOL Solution",
      period: "January 2026 – February 2026",
      location: "Jaipur",
      highlights: [
        "Built REST APIs using NestJS and Node.js with MySQL integration.",
        "Contributed backend API development to BTHawk, a business and GST billing platform.",
        "Worked with authentication and RESTful design principles.",
      ],
    },
  ],

  projects: [
    {
      name: "Sagar Website — Frontend Magic",
      subtitle: "Creative Website & Frontend Experience",
      description:
        "A creative web experience focused on presenting a polished visual identity and interactive frontend work.",
      stack: ["Frontend Development", "JavaScript", "Web UI"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      githubUrl: "https://github.com/sagarrsinghh/sagar-website-frontend-magic-",
      url: "https://sgrmagic.vercel.app/",
    },
    {
      name: "BillStack",
      subtitle: "Billing & Invoice Management",
      description:
        "A full-stack billing system for managing customers and items and generating GST-aware invoices.",
      stack: ["React", "Vite", "Node.js", "Express", "MySQL"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
      githubUrl: "https://github.com/sagarrsinghh/BillStack",
      url: "",
    },
    {
      name: "ExpenseTracker",
      subtitle: "Expense Management REST API",
      description:
        "A NestJS API for creating, listing, filtering, totaling, and deleting expenses, with request validation and automated end-to-end tests.",
      stack: ["NestJS", "Node.js", "TypeScript", "Swagger", "Jest"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      githubUrl: "https://github.com/sagarrsinghh/ExpenseTracker",
      url: "",
    },
    {
      name: "MusicDB",
      subtitle: "Music Rating & Review Platform",
      description:
        "A music platform for rating and reviewing albums and artists, with SQL-backed data for search, ratings, and artist biographies.",
      stack: ["React", "NestJS", "Node.js", "TypeScript", "MySQL"],
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
      githubUrl: "https://github.com/sagarrsinghh/MusicDB",
      url: "",
    },
    {
      name: "Warrgyizmorsch Agency CRM",
      subtitle: "Agency Website & Lead Management",
      description:
        "A digital-agency experience with a CRM workflow for managing leads and an authenticated admin pipeline.",
      stack: ["React", "NestJS", "GSAP", "JWT"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      githubUrl: "https://github.com/sagarrsinghh/warrgyizmorsch-agency-crm",
      url: "",
    },
    {
      name: "What-a-Drag",
      subtitle: "Full-Stack E-Commerce Platform",
      description:
        "A full-stack e-commerce application built around a storefront and backend services.",
      stack: ["React", "NestJS", "TypeScript", "TypeORM", "MySQL"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
      githubUrl: "https://github.com/sagarrsinghh/What-a-Drag",
      url: "",
    },
    {
      name: "Smart Data Center Monitoring Platform",
      subtitle: "Infrastructure Monitoring & Analytics",
      description:
        "A platform for ingesting operational reports, processing infrastructure metrics, managing alerts, and presenting monitoring dashboards.",
      stack: ["React", "NestJS", "MySQL", "TypeORM", "JWT"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
      githubUrl: "https://github.com/sagarrsinghh/smart-data-center-platform",
      url: "",
    },

  ],
} as const;

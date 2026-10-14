
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
    languages: [
      "Java",
      "JavaScript",
      "TypeScript",
      "Python",
      "C++",
      "SQL",
    ],
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
    frontend: [
      "React",
      "HTML5",
      "CSS3",
      "WordPress",
      "Bootstrap",
    ],
    databases: [
      "MySQL",
      "TypeORM",
      "Database Design",
      "SQL Query Optimization",
    ],
    tools: [
      "Git",
      "GitHub",
      "Docker",
      "Vercel",
      "Postman",
      "Swagger",
    ],
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
      name: "Promptaify",
      subtitle: "AI-Powered Code Generator",
      description:
        "A code-generation application that uses typed or spoken prompts and an AI API to generate code through a Java Spring Boot backend.",
      stack: [
        "Java",
        "Spring Boot",
        "SQL",
        "JavaScript",
        "OpenAI / OpenRouter API",
      ],
      url: "",
    },
    {
      name: "DRAG",
      subtitle: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform featuring multi-role access control, JWT authentication, REST APIs, and payment gateway integration.",
      stack: [
        "React",
        "NestJS",
        "Node.js",
        "TypeScript",
        "TypeORM",
        "MySQL",
      ],
      url: "",
    },
    {
      name: "MusicDB",
      subtitle: "Music Rating & Review Platform",
      description:
        "A music platform for rating and reviewing albums and artists, with SQL-backed data for search, ratings, and artist biographies.",
      stack: [
        "React",
        "NestJS",
        "Node.js",
        "TypeScript",
        "MySQL",
      ],
      url: "",
    },
    {
      name: "Spider-Verse Portfolio",
      subtitle: "Cinematic Interactive Portfolio",
      description:
        "An animation-driven portfolio featuring a side-scrolling world and parallax effects.",
      stack: ["React", "Three.js", "GSAP"],
      url: "https://sgrmagic.vercel.app/",
    },
    {
      name: "Smart Data Center Monitoring Platform",
      subtitle: "Infrastructure Monitoring & Analytics",
      description:
        "A platform for ingesting operational reports, processing metrics, managing alerts, and presenting monitoring dashboards.",
      stack: ["React", "NestJS", "MySQL", "TypeORM"],
      url: "https://github.com/sagarsinghh/smart-data-center-platform",
    },
    {
      name: "AI Prompt Processing API",
      subtitle: "AI Backend Project",
      description:
        "An AI prompt-processing API project.",
      stack: ["Python", "Flask", "AI APIs"],
      url: "https://github.com/sagarsinghh/ai-prompt-processing-api",
    },
  ],
} as const;


from fastapi import APIRouter

router = APIRouter()


@router.get("/", tags=["Portfolio"])
def get_portfolio():
    return {
        "name": "Sagar Singh",
        "title": "Full-Stack Developer | AI Engineer",
        "location": "Jaipur, Rajasthan, India",
        "email": "sagarrsinghh11@gmail.com",
        "links": {
            "github": "https://github.com/sagarrsinghh",
            "linkedin": "https://www.linkedin.com/in/sagarrsingh",
            "portfolio": "https://sgrportfolio.vercel.app/",
        },
        "summary": (
            "Developer focused on REST APIs, backend systems, "
            "full-stack applications, and AI integration."
        ),
        "education": [
            {
                "degree": "B.Tech, Computer Science & Engineering",
                "institution": "JECRC University",
                "period": "2022–2026",
                "result": "CGPA: 7.9",
            }
        ],
        "experience": [
            {
                "role": "Project Intern",
                "organization": (
                    "Smart Data Center Monitoring Platform — DoIT&C / BSDC"
                ),
                "period": "February 2026 – June 2026",
            },
            {
                "role": "Jr. Software Engineer Intern",
                "organization": "ZUCOL Solution",
                "period": "January 2026 – February 2026",
            },
        ],
        "projects": [
            {
                "name": "Promptaify",
                "subtitle": "AI-Powered Code Generator",
                "description": "An AI-powered code generation application.",
                "stack": ["Java", "Spring Boot", "SQL", "OpenRouter"],
                "url": "",
            },
            {
                "name": "DRAG",
                "subtitle": "E-commerce Platform",
                "description": "A full-stack e-commerce platform with role-based access control.",
                "stack": ["React", "NestJS", "TypeScript", "MySQL"],
                "url": "",
            },
            {
                "name": "MusicDB",
                "subtitle": "Music Rating and Review Platform",
                "description": "A platform for music discovery, ratings, and reviews.",
                "stack": ["React", "NestJS", "TypeScript", "MySQL"],
                "url": "",
            },
            {
                "name": "Sgr Portfolio",
                "subtitle": "Interactive Portfolio",
                "description": "A cinematic portfolio featuring animated visual effects.",
                "stack": ["React", "Three.js", "GSAP"],
                "url": "https://sgrmagic.vercel.app/",
            },
        ],
    }

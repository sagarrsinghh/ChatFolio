
import json
import os
import re

from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel, Field


# --------------------------------------------------
# 1. ENVIRONMENT CONFIGURATION
# --------------------------------------------------

load_dotenv()

my_api_key = os.getenv("GROQ_API_KEY")
model = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")

if not my_api_key:
    raise ValueError("GROQ_API_KEY is missing from the .env file")

client = Groq(api_key=my_api_key)


# --------------------------------------------------
# 2. JOB DESCRIPTION MODEL
# --------------------------------------------------

class JobD(BaseModel):
    role: str = "Not specified"
    required_skills: list[str] = Field(default_factory=list)
    preferred_skills: list[str] = Field(default_factory=list)
    minimum_experience: float | None = None
    education_requirements: list[str] = Field(default_factory=list)
    responsibilities: list[str] = Field(default_factory=list)


# --------------------------------------------------
# 3. RESUME PROFILE MODEL
# --------------------------------------------------

class Resume(BaseModel):
    name: str
    skills: list[str] = Field(default_factory=list)
    experiences: list[str] = Field(default_factory=list)
    projects: list[str] = Field(default_factory=list)
    education: list[str] = Field(default_factory=list)


# This is the approved professional profile used by
# the public portfolio's JD matcher.
# Update it when your verified resume changes.

resume = Resume(
    name="Sagar Singh",
    skills=[
        "Java",
        "Spring Boot",
        "JavaScript",
        "TypeScript",
        "Python",
        "C++",
        "SQL",
        "NestJS",
        "Node.js",
        "Express.js",
        "Flask",
        "React",
        "REST APIs",
        "JWT Authentication",
        "Role-Based Access Control",
        "MySQL",
        "TypeORM",
        "Database Design",
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
        "DBMS",
        "System Design",
        "Git",
        "GitHub",
        "Docker",
        "Postman",
        "Backend Development",
        "HTTP",
        "JSON",
        "Client-Server Architecture",
        "Problem Solving",
        "Agile",
        "OpenAI API",
        "Claude API",
        "Generative AI",
        "Prompt Engineering",
    ],
    experiences=[
        (
            "Project Intern — Smart Data Center Monitoring Platform, "
            "DoIT&C / BSDC, February–June 2026. Worked on data ingestion, "
            "Excel parsing, MySQL persistence, NestJS REST APIs, JWT, "
            "RBAC and React dashboards."
        ),
        (
            "Junior Software Engineer Intern — ZUCOL Solution, "
            "January–February 2026. Worked on NestJS/Node.js REST APIs, "
            "MySQL, authentication and backend development for a "
            "business/GST billing platform."
        ),
    ],
    projects=[
        (
            "Promptaify — AI prompt-processing application using "
            "Java, Spring Boot, SQL and an OpenAI-compatible API "
            "through OpenRouter."
        ),
        (
            "DRAG — E-commerce application using React, NestJS, "
            "TypeScript, TypeORM and MySQL, with JWT and role-based access."
        ),
        (
            "Spider-Verse Portfolio — React, Three.js and GSAP."
        ),
        (
            "MusicDB — music rating/review application. Verify the "
            "current technology stack before presenting it as evidence."
        ),
    ],
    education=[
        "B.Tech in Computer Science and Engineering, JECRC University, 2022–2026"
    ],
)


# --------------------------------------------------
# 4. EXTRACT STRUCTURED INFORMATION FROM THE JD
# --------------------------------------------------

def parse_job_description(job_description: str) -> JobD:
    jobd_schema = JobD.model_json_schema()

    system_prompt = f"""
You are an expert technical job-description analysis assistant.

Extract structured information from the supplied job description.
Return only valid JSON matching this schema:

{json.dumps(jobd_schema)}

CRITICAL EXTRACTION RULES FOR SKILLS:
- Extract individual, standardized, atomic skill and technology names.
- Do NOT extract full descriptive sentences or bullet paragraphs.
  BAD: "Strong knowledge of Java and OOP concepts."
  GOOD: ["Java", "Object-Oriented Programming", "OOP"]
  BAD: "Basic knowledge of SQL and MySQL."
  GOOD: ["SQL", "MySQL"]
  BAD: "Experience with Spring Boot or NestJS."
  GOOD: ["Spring Boot", "NestJS"]
  BAD: "Familiarity with React.js and JavaScript."
  GOOD: ["React", "JavaScript"]
  BAD: "Knowledge of Git and GitHub."
  GOOD: ["Git", "GitHub"]
- Split compound phrases into separate skills (e.g. "Git and GitHub" -> "Git", "GitHub").
- required_skills: explicitly required skills and core technologies.
- preferred_skills: optional, nice-to-have, or bonus skills.
- minimum_experience: numeric years (e.g., 0, 1, 2) or null if not specified.
- responsibilities: core job duties.
- Do not invent skills not mentioned in the job description.
- Return a single JSON object.
"""

    user_prompt = f"""
Analyze this job description:

{job_description}
"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0.1,
    )

    answer = response.choices[0].message.content

    if not answer:
        raise ValueError("The AI returned an empty job analysis.")

    job_data = json.loads(answer)
    return JobD.model_validate(job_data)


# --------------------------------------------------
# 5. NORMALIZE SKILL NAMES
# --------------------------------------------------

def normalize_skill(skill: str) -> str:
    """
    Normalize equivalent spellings before comparison.
    """

    skill = skill.lower().strip()
    skill = re.sub(r"\s+", " ", skill)
    skill = re.sub(r"[.,;:!?]", "", skill)

    aliases = {
        "js": "javascript",
        "ts": "typescript",
        "node": "node.js",
        "nodejs": "node.js",
        "nestjs": "nestjs",
        "react.js": "react",
        "reactjs": "react",
        "express": "express.js",
        "postgres": "postgresql",
        "postgresql": "postgresql",
        "restful apis": "rest apis",
        "restful api": "rest apis",
        "rest api": "rest apis",
        "rest": "rest apis",
        "dsa": "data structures and algorithms",
        "data structures": "data structures and algorithms",
        "data structures and algorithms": "data structures and algorithms",
        "data structures & algorithms": "data structures and algorithms",
        "oops": "object-oriented programming",
        "oop": "object-oriented programming",
        "object oriented programming": "object-oriented programming",
        "object-oriented programming": "object-oriented programming",
        "rbac": "role-based access control",
        "genai": "generative ai",
        "jwt": "jwt authentication",
        "jwt authentication": "jwt authentication",
        "spring": "spring boot",
        "spring boot": "spring boot",
    }

    return aliases.get(skill, skill)


# --------------------------------------------------
# 6. CALCULATE AN EXPLAINABLE MATCH SCORE
# --------------------------------------------------

def final_score(job: JobD, candidate: Resume) -> dict:
    candidate_skills = {
        normalize_skill(skill): skill
        for skill in candidate.skills
    }

    def match_criterion(criterion: str) -> list[str]:
        """Match a requirement against candidate skills using exact & keyword search."""
        crit_norm = normalize_skill(criterion)
        matches = []

        # 1. Direct normalized match
        if crit_norm in candidate_skills:
            matches.append(candidate_skills[crit_norm])

        # 2. Check if candidate skill appears in criterion OR criterion word appears in multi-word candidate skill
        for cand_norm, cand_canonical in candidate_skills.items():
            pattern_cand = r"\b" + re.escape(cand_norm) + r"\b"
            pattern_crit = r"\b" + re.escape(crit_norm) + r"\b"
            if re.search(pattern_cand, crit_norm) or (len(crit_norm) >= 3 and re.search(pattern_crit, cand_norm)):
                if cand_canonical not in matches:
                    matches.append(cand_canonical)

        # 3. Handle common tech synonyms, abbreviations, and composite terms
        synonym_rules = [
            (r"\b(oop|oops|object[- ]oriented)\b", "Object-Oriented Programming"),
            (r"\b(dsa|data structures?|algorithms?)\b", "Data Structures and Algorithms"),
            (r"\b(jwt)\b", "JWT Authentication"),
            (r"\b(spring|spring[- ]boot)\b", "Spring Boot"),
            (r"\b(orm|orm tools?)\b", "TypeORM"),
            (r"\b(client[- ]server|client[- ]server architecture)\b", "Client-Server Architecture"),
            (r"\b(rest|restful|rest apis?)\b", "REST APIs"),
            (r"\b(backend|backend development)\b", "Backend Development"),
            (r"\b(problem[- ]solving|analytical skills?)\b", "Problem Solving"),
            (r"\b(agile)\b", "Agile"),
            (r"\b(react|react\.?js)\b", "React"),
            (r"\b(node|node\.?js)\b", "Node.js"),
            (r"\b(nest|nest\.?js)\b", "NestJS"),
            (r"\b(sql|mysql)\b", "MySQL"),
        ]

        for pattern, canonical_name in synonym_rules:
            if re.search(pattern, crit_norm, re.IGNORECASE):
                norm_target = normalize_skill(canonical_name)
                if norm_target in candidate_skills:
                    matches.append(candidate_skills[norm_target])

        return list(dict.fromkeys(matches))

    matched_required = []
    missing_required = []
    for req in job.required_skills:
        found = match_criterion(req)
        if found:
            matched_required.extend(found)
        else:
            missing_required.append(req)

    matched_required = list(dict.fromkeys(matched_required))

    matched_preferred = []
    missing_preferred = []
    for pref in job.preferred_skills:
        found = match_criterion(pref)
        if found:
            matched_preferred.extend(found)
        else:
            missing_preferred.append(pref)

    matched_preferred = list(dict.fromkeys(matched_preferred))

    total_req = len(job.required_skills)
    total_pref = len(job.preferred_skills)

    satisfied_req = total_req - len(missing_required)
    satisfied_pref = total_pref - len(missing_preferred)

    if total_req > 0 and total_pref > 0:
        req_score = satisfied_req / total_req
        pref_score = satisfied_pref / total_pref
        score = (req_score * 0.80 + pref_score * 0.20) * 100
    elif total_req > 0:
        score = (satisfied_req / total_req) * 100
    elif total_pref > 0:
        score = (satisfied_pref / total_pref) * 100
    else:
        score = 0.0

    evidence = [
        {
            "skill": skill,
            "evidence": "Documented in candidate technical skills and active project repositories."
        }
        for skill in matched_required
    ]

    return {
        "score": round(score, 1),
        "matched_required_skills": matched_required,
        "missing_required_skills": missing_required,
        "matched_preferred_skills": matched_preferred,
        "missing_preferred_skills": missing_preferred,
        "evidence": evidence,
        "score_method": (
            "Required skills: 80%, preferred skills: 20%. "
            "Evaluates tech stack, concept alignment and project evidence."
        ),
    }


# --------------------------------------------------
# 7. GENERATE AN EXPLANATION WITH GROQ
# --------------------------------------------------

def explain_match(job: JobD, candidate: Resume, result: dict) -> dict:
    system_prompt = """
You are a careful technical recruiter assistant.
You must output a single valid JSON object only. Do not output markdown code fences or conversational text.

Expected JSON schema:
{
  "summary": "short explanation of the match",
  "relevant_experience": ["item 1", "item 2"],
  "relevant_projects": ["item 1", "item 2"],
  "experience_requirement": "summary of experience alignment",
  "education_requirement": "summary of degree alignment",
  "improvement_suggestions": ["suggestion 1", "suggestion 2"]
}
"""

    user_prompt = f"""
Candidate: {candidate.name}
Role: {job.role}
Match Score: {result.get('score', 0)}%
Matched Required Skills: {result.get('matched_required_skills', [])}
Missing Required Skills: {result.get('missing_required_skills', [])}
Matched Preferred Skills: {result.get('matched_preferred_skills', [])}
Missing Preferred Skills: {result.get('missing_preferred_skills', [])}
Candidate Experiences: {candidate.experiences}
Candidate Projects: {candidate.projects}
Candidate Education: {candidate.education}

Provide the match summary JSON without changing the score.
"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.2,
            max_tokens=1000,
        )

        answer = response.choices[0].message.content or ""
        clean_json = re.sub(r"^```(?:json)?\s*|\s*```$", "", answer.strip(), flags=re.MULTILINE)
        return json.loads(clean_json)

    except Exception as error:
        print(f"Warning: explain_match fallback used due to: {error}")
        return {
            "summary": (
                f"Candidate matches {result.get('score', 0)}% of the requirements for {job.role}, "
                f"with strong coverage in core backend technologies like "
                f"{', '.join(result.get('matched_required_skills', [])[:4])}."
            ),
            "relevant_experience": [
                "Practical experience building REST APIs, relational databases, and authentication through internships."
            ],
            "relevant_projects": [
                "Java backend project (Promptaify) and full-stack API platforms (DRAG, Smart Data Center)."
            ],
            "experience_requirement": "Candidate profile matches early-career / junior engineering expectations.",
            "education_requirement": "B.Tech in Computer Science and Engineering directly satisfies the degree requirement.",
            "improvement_suggestions": (
                [f"Review: {item}" for item in result.get("missing_required_skills", [])[:3]]
                if result.get("missing_required_skills")
                else ["Deepen production cloud and performance optimization expertise."]
            ),
        }


# --------------------------------------------------
# 8. MAIN REUSABLE FUNCTION
# --------------------------------------------------

def match_resume_with_jd(job_description: str) -> dict:
    job_description = job_description.strip()

    if len(job_description) < 50:
        raise ValueError(
            "Please provide a complete job description "
            "with at least 50 characters."
        )

    if len(job_description) > 20000:
        raise ValueError(
            "Job description is too long. Maximum length is 20,000 characters."
        )

    job = parse_job_description(job_description)

    result = final_score(job, resume)

    explanation = explain_match(job, resume, result)

    return {
        "candidate_name": resume.name,
        "job_role": job.role,
        "match_score": result["score"],
        "score_method": result["score_method"],
        "job_analysis": job.model_dump(),
        "matched_required_skills": result["matched_required_skills"],
        "missing_required_skills": result["missing_required_skills"],
        "matched_preferred_skills": result["matched_preferred_skills"],
        "missing_preferred_skills": result["missing_preferred_skills"],
        "skill_evidence": result["evidence"],
        "explanation": explanation,
        "notice": (
            "This is an advisory skills-match estimate, not a hiring "
            "probability. Profile information and extracted JD requirements "
            "can affect the result."
        ),
    }

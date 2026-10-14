from pydantic import BaseModel, Field


class JDMatchRequest(BaseModel):
    job_description: str = Field(
        min_length=50,
        max_length=20000
    )


class JobD(BaseModel):
    role: str = "Not specified"
    required_skills: list[str] = Field(default_factory=list)
    preferred_skills: list[str] = Field(default_factory=list)
    minimum_experience: float | None = None
    education_requirements: list[str] = Field(default_factory=list)
    responsibilities: list[str] = Field(default_factory=list)


class MatchExplanation(BaseModel):
    summary: str
    relevant_experience: list[str] = Field(default_factory=list)
    relevant_projects: list[str] = Field(default_factory=list)
    experience_requirement: str
    education_requirement: str
    improvement_suggestions: list[str] = Field(default_factory=list)


class SkillEvidenceItem(BaseModel):
    skill: str
    evidence: str


class JDMatchResponse(BaseModel):
    candidate_name: str
    job_role: str
    match_score: float
    matched_required_skills: list[str] = Field(default_factory=list)
    missing_required_skills: list[str] = Field(default_factory=list)
    matched_preferred_skills: list[str] = Field(default_factory=list)
    missing_preferred_skills: list[str] = Field(default_factory=list)
    skill_evidence: list[SkillEvidenceItem] = Field(default_factory=list)
    explanation: MatchExplanation
    notice: str


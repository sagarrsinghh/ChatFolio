"""Resume matcher service alias/forwarder to jd_matcher."""

from app.services.jd_matcher import (
    JobD,
    Resume,
    resume,
    parse_job_description,
    normalize_skill,
    final_score,
    explain_match,
    match_resume_with_jd,
)

__all__ = [
    "JobD",
    "Resume",
    "resume",
    "parse_job_description",
    "normalize_skill",
    "final_score",
    "explain_match",
    "match_resume_with_jd",
]

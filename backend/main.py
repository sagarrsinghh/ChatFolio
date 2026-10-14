from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health
from app.core.config import settings

from app.api import portfolio

from app.api import ai
from app.api import jd_matcher


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": f"{settings.app_name} API is running!",
        "status": "success",
    }


app.include_router(
    health.router,
    prefix=settings.api_v1_prefix,
)

app.include_router(
    portfolio.router,
    prefix=f"{settings.api_v1_prefix}/portfolio",
)

app.include_router(
    ai.router,
    prefix=f"{settings.api_v1_prefix}/ai",
    tags=["AI"],
)

app.include_router(
    jd_matcher.router,
    prefix=f"{settings.api_v1_prefix}/jd-matcher",
    tags=["JD Matcher"],
)
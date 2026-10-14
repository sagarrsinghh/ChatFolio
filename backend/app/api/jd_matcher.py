from io import BytesIO
from fastapi import APIRouter, HTTPException, UploadFile, File
from pypdf import PdfReader

from app.schemas.jd_matcher import JDMatchRequest, JDMatchResponse
from app.services.resume_matcher import match_resume_with_jd

router = APIRouter()


@router.post("/match", response_model=JDMatchResponse)
def match_job_description(request: JDMatchRequest):
    try:
        return match_resume_with_jd(request.job_description)
    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        ) from error
    except Exception as error:
        print(f"JD Matcher error: {type(error).__name__}: {error}")
        raise HTTPException(
            status_code=502,
            detail="Unable to analyze this job description right now."
        ) from error


@router.post("/match-pdf")
async def match_job_description_pdf(file: UploadFile = File(...)):
    try:
        # Read a maximum of 5 MB plus one byte to detect oversized files.
        pdf_bytes = await file.read(5 * 1024 * 1024 + 1)
        if len(pdf_bytes) > 5 * 1024 * 1024:
            raise HTTPException(
                status_code=413,
                detail="PDF is too large. Maximum size is 5 MB."
            )
        if not pdf_bytes:
            raise HTTPException(
                status_code=400,
                detail="The uploaded PDF is empty."
            )
        reader = PdfReader(BytesIO(pdf_bytes))
        if reader.is_encrypted:
            raise HTTPException(
                status_code=400,
                detail="Encrypted PDFs are not supported."
            )
        if len(reader.pages) > 50:
            raise HTTPException(
                status_code=400,
                detail="PDF cannot contain more than 50 pages."
            )
        extracted_text = "\n".join(
            page.extract_text() or ""
            for page in reader.pages
        ).strip()
        if len(extracted_text) < 50:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Could not extract enough text from this PDF. "
                    "Try a text-based PDF instead of a scanned document."
                )
            )
        result = match_resume_with_jd(extracted_text)
        # Include the uploaded filename in the response.
        return {
            **result,
            "source_filename": file.filename,
        }
    except HTTPException:
        raise
    except Exception as error:
        print(
            f"JD PDF Matcher error: {type(error).__name__}: {error}"
        )
        raise HTTPException(
            status_code=502,
            detail="Unable to analyze this PDF right now."
        ) from error
    finally:
        await file.close()

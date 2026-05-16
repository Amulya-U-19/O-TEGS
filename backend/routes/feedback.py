from fastapi import APIRouter, UploadFile, File
import shutil
import os

from services.feedback import analyze

router = APIRouter()

# ensure data folder exists
os.makedirs("data", exist_ok=True)

@router.post("/upload-feedback/")
async def upload_feedback(file: UploadFile = File(...)):
    path = f"data/{file.filename}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = analyze(path)

    return result
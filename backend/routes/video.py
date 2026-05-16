from fastapi import APIRouter, UploadFile, File
import shutil
import os
from rag.ingestion import ingest

router = APIRouter()

# Data Directories
VIDEO_DIR = "data/video"
FEEDBACK_DIR = "data/feedback"
AUDIO_DIR = "data/audio"

for d in [VIDEO_DIR, FEEDBACK_DIR, AUDIO_DIR]:
    os.makedirs(d, exist_ok=True)

@router.post("/upload-video/")
async def upload(file: UploadFile = File(...)):
    filename = file.filename.lower()
    
    # Route file to correct directory
    if filename.endswith(('.mp4', '.mkv', '.avi')):
        target_dir = VIDEO_DIR
    elif filename.endswith('.csv'):
        target_dir = FEEDBACK_DIR
    elif filename.endswith(('.wav', '.mp3')):
        target_dir = AUDIO_DIR
    else:
        return {"status": "error", "message": "Unsupported file type"}

    path = os.path.join(target_dir, file.filename)

    # Save the file
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Trigger the unified ingestion pipeline
    try:
        ingest()
        return {"status": "success", "message": f"{file.filename} uploaded and processed"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
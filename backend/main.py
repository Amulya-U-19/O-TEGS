from fastapi import FastAPI
from routes import video, feedback, evaluation, teacher, compare
from auth import router as auth_router
from database import Base, engine

from fastapi.middleware.cors import CORSMiddleware
from rag.ingestion import ingest
from services.rag import evaluate as evaluate_service

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.post("/ingest-audio/")
async def trigger_ingestion():
    try:
        ingest()
        return {"status": "success", "message": "Audio ingestion complete"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/evaluate/")
async def run_evaluation(query: str = "teaching quality"):
    result = evaluate_service(query)
    return result

app.include_router(auth_router)
app.include_router(video.router)
app.include_router(feedback.router)
app.include_router(evaluation.router)
app.include_router(teacher.router)
app.include_router(compare.router)

@app.get("/")
def root():
    return {"message": "O-TEGS running 🚀"}
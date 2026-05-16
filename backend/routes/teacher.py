from fastapi import APIRouter

router = APIRouter()

@router.get("/teacher/")
async def get_teachers():
    return {"message": "Teacher data placeholder"}

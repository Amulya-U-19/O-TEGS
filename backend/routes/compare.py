from fastapi import APIRouter

router = APIRouter()

@router.get("/compare/")
async def compare_teachers():
    return {"message": "Comparison data placeholder"}

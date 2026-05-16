from fastapi import APIRouter, HTTPException

router = APIRouter()

users = {
    "admin": "admin",
    "teacher": "teacher"
}

@router.post("/login")
def login(data: dict):
    if users.get(data["username"]) != data["password"]:
        raise HTTPException(status_code=401, detail="Invalid login")
    return {"message": "success"}
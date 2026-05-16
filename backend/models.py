from sqlalchemy import Column, Integer, String, Float
from database import Base

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    clarity = Column(Float)
    coverage = Column(Float)
    feedback = Column(Float)
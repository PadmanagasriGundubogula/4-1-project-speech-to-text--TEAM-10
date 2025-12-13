from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from .database import Base

# --- Pydantic Schemas (for API) ---

class UserSchema(BaseModel):
    username: str
    email: EmailStr
    hashed_password: str

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class TranscriptionSchema(BaseModel):
    filename: str
    text: str
    owner_username: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# --- SQLAlchemy Models (for DB) ---

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Transcription(Base):
    __tablename__ = "transcriptions"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    text = Column(String)
    owner_username = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import uuid
import subprocess
import speech_recognition as sr
import os
import re
from . import models, database, auth

app = FastAPI()

# Question generation helper
def generate_questions(text: str) -> list:
    """Generate relevant questions based on transcribed text"""
    if not text or len(text.strip()) < 10:
        return []
    
    questions = []
    text_lower = text.lower()
    
    # Extract potential topics (words longer than 4 chars, capitalized or important)
    words = re.findall(r'\b[A-Z][a-z]+\b|\b\w{5,}\b', text)
    unique_words = list(set(words))[:5]  # Get up to 5 unique words
    
    # Template-based question generation
    templates = [
        "What are the main points discussed about {}?",
        "Can you explain more about {}?",
        "What is the significance of {}?",
        "How does {} relate to the overall topic?",
        "What details were mentioned regarding {}?"
    ]
    
    # Generate questions from key words
    for i, word in enumerate(unique_words[:3]):
        if i < len(templates):
            questions.append(templates[i].format(word.lower()))
    
    # Add general questions based on content
    if "meeting" in text_lower or "discuss" in text_lower:
        questions.append("What were the key decisions made?")
    
    if "project" in text_lower or "plan" in text_lower:
        questions.append("What are the next steps?")
    
    if len(text.split()) > 50:
        questions.append("Can you summarize the main ideas?")
    
    # Return up to 5 questions
    return questions[:5] if questions else ["What is the main topic of this transcription?"]

# Create tables on startup
models.Base.metadata.create_all(bind=database.engine)

# CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    # Add your production frontend URL here after deployment
    # Example: "https://your-frontend-app.onrender.com"
]

# Allow all origins in production (you can restrict this later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# --- AUTH ENDPOINTS ---

@app.post("/register")
async def register(
    username: str = Form(...), 
    email: str = Form(...), 
    password: str = Form(...),
    db: Session = Depends(database.get_db)
):
    # Check if user exists
    existing_user = db.query(models.User).filter(
        (models.User.username == username) | (models.User.email == email)
    ).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or Email already registered")
    
    hashed_pw = auth.get_password_hash(password)
    new_user = models.User(username=username, email=email, hashed_password=hashed_pw)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    print(f"User REGISTERED: {username}")
    return {"message": "User created successfully"}

@app.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db)
):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    
    print(f"LOGIN ATTEMPT: {form_data.username}")
    if user:
        print(f"User found. Hashed PW in DB: {user.hashed_password}")
        verify = auth.verify_password(form_data.password, user.hashed_password)
        print(f"Password verification result: {verify}")
    else:
        print("User NOT found in DB")

    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return {"username": current_user.username, "email": current_user.email}

# --- HISTORY ---

@app.get("/history")
async def get_history(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db)
):
    # Fetch user's transcriptions, sorted by created_at desc
    results = db.query(models.Transcription)\
        .filter(models.Transcription.owner_username == current_user.username)\
        .order_by(models.Transcription.created_at.desc())\
        .all()
    return results

@app.delete("/history/{transcription_id}")
async def delete_history_item(
    transcription_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db)
):
    # Find the transcription
    transcription = db.query(models.Transcription)\
        .filter(models.Transcription.id == transcription_id)\
        .filter(models.Transcription.owner_username == current_user.username)\
        .first()
    
    if not transcription:
        raise HTTPException(status_code=404, detail="Transcription not found")
    
    db.delete(transcription)
    db.commit()
    
    return {"message": "Transcription deleted successfully"}

# --- UPLOAD ---

@app.post("/upload")
async def upload_audio(
    file: UploadFile = File(...), 
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db)
):
    print(f"FILES RECEIVED from {current_user.username}: {file.filename}")

    input_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}.opus")
    wav_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}.wav")

    try:
        # Save uploaded file
        content = await file.read()
        with open(input_path, "wb") as f:
            f.write(content)

        # Convert opus -> wav
        if not os.path.exists(wav_path):
             subprocess.run([
                "ffmpeg", "-y",
                "-i", input_path,
                "-ar", "16000",
                "-ac", "1",
                wav_path
            ], check=True)

        # Speech Recognition
        recognizer = sr.Recognizer()
        with sr.AudioFile(wav_path) as source:
            audio = recognizer.record(source)

        text = recognizer.recognize_google(audio)
        print("TRANSCRIBED TEXT:", text)
        
        # Generate questions based on transcribed text
        questions = generate_questions(text)
        print("GENERATED QUESTIONS:", questions)
        
        # SAVE TO DB (SQLite)
        new_transcription = models.Transcription(
            filename=file.filename,
            text=text,
            owner_username=current_user.username
        )
        db.add(new_transcription)
        db.commit()
        db.refresh(new_transcription)
        
        return {
            "text": text, 
            "questions": questions,
            "id": new_transcription.id, 
            "created_at": new_transcription.created_at
        }

    except sr.UnknownValueError:
        return {"text": "Error: Could not understand audio"}
    except Exception as e:
        print(f"ERROR: {e}")
        return {"text": f"Error: {str(e)}"}

# 🎙️ Speech Transcription App

A modern web application for converting audio to text with intelligent question generation.

## ✨ Features

- 🎤 **Audio Upload & Recording**: Upload audio files or record directly in the browser
- 📝 **Speech-to-Text**: Accurate transcription using Google Speech Recognition
- 🤔 **Smart Questions**: Automatically generates relevant questions based on transcribed content
- 📚 **History Tracking**: Save and manage all your transcriptions
- 🔐 **User Authentication**: Secure login and registration system
- 🎨 **Modern UI**: Beautiful, responsive interface with light theme

## 🚀 Live Demo

**Frontend**: [Your Render URL will go here]  
**Backend API**: [Your Render URL will go here]

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** - Lightweight database
- **SQLAlchemy** - ORM for database operations
- **JWT** - Secure authentication
- **SpeechRecognition** - Audio transcription

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling

## 📦 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- FFmpeg (for audio processing)

### Backend Setup
```bash
# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run backend
cd backend
uvicorn main:app --reload
```

### Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to Render.com (FREE!).

## 📖 Usage

1. **Register/Login**: Create an account or sign in
2. **Upload Audio**: Drag & drop an audio file or click to browse
3. **Or Record**: Click "Start Recording" to record your voice
4. **View Results**: See your transcription and generated questions
5. **Manage History**: Access past transcriptions from the sidebar

## 🔑 Environment Variables

### Backend
- `SECRET_KEY` - JWT secret key
- `DATABASE_URL` - SQLite database path

### Frontend
- `VITE_API_URL` - Backend API URL

## 📝 License

MIT License - feel free to use this project!

## 👤 Author

Created with ❤️ by [Your Name]

## 🙏 Acknowledgments

- Google Speech Recognition API
- FastAPI framework
- React ecosystem

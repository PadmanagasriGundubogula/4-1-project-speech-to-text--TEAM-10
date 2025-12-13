# 🚀 Deployment Guide - Speech Transcription App

This guide will help you deploy your Speech Transcription application to **Render.com** for FREE!

## Prerequisites
- A GitHub account
- A Render.com account (sign up at https://render.com)

## Step 1: Push Your Code to GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it: `speech-transcription-app`
   - Make it Public
   - Don't initialize with README (you already have code)

2. **Push your code** (run these commands in your project folder):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Speech Transcription App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/speech-transcription-app.git
   git push -u origin main
   ```

## Step 2: Deploy Backend on Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:
   - **Name**: `speech-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

5. **Add Environment Variables** (click "Advanced"):
   - `PYTHON_VERSION` = `3.11.0`
   - `SECRET_KEY` = (click "Generate" for a random key)

6. **Click "Create Web Service"**
7. **Wait 5-10 minutes** for deployment
8. **Copy your backend URL** (e.g., `https://speech-backend-xxxx.onrender.com`)

## Step 3: Deploy Frontend on Render

1. **Go back to Render Dashboard**
2. **Click "New +" → "Static Site"**
3. **Connect the same GitHub repository**
4. **Configure the site**:
   - **Name**: `speech-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

5. **Add Environment Variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL from Step 2 (e.g., `https://speech-backend-xxxx.onrender.com`)

6. **Click "Create Static Site"**
7. **Wait 5-10 minutes** for deployment

## Step 4: Update Backend CORS (Important!)

1. **Go to your backend service** on Render
2. **Click "Environment"**
3. **Add a new environment variable**:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your frontend URL (e.g., `https://speech-frontend-xxxx.onrender.com`)

4. **Update `backend/main.py`** (in your local code):
   ```python
   # Replace allow_origins=["*"] with:
   allow_origins=[os.getenv("FRONTEND_URL", "*")]
   ```

5. **Commit and push** the change:
   ```bash
   git add .
   git commit -m "Update CORS for production"
   git push
   ```

6. **Render will auto-deploy** the update

## Step 5: Test Your App! 🎉

1. **Visit your frontend URL**: `https://speech-frontend-xxxx.onrender.com`
2. **Register a new account**
3. **Upload audio** and test transcription
4. **Share the link** with anyone!

## Important Notes

⚠️ **Free Tier Limitations**:
- Backend may "sleep" after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- 750 hours/month free (enough for personal use)

💡 **Tips**:
- Keep your backend URL handy
- The app is now PUBLIC - anyone can use it!
- You can update code anytime by pushing to GitHub

## Troubleshooting

**Backend not working?**
- Check Render logs for errors
- Verify environment variables are set
- Make sure `requirements.txt` has all dependencies

**Frontend can't connect to backend?**
- Check `VITE_API_URL` is set correctly
- Verify CORS settings in backend
- Check browser console for errors

## Need Help?

- Render Docs: https://render.com/docs
- Your backend logs: Render Dashboard → Your Service → Logs
- Frontend build logs: Render Dashboard → Your Static Site → Events

---

**Congratulations! Your app is now live! 🚀**

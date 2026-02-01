# SIMPLE DEPLOYMENT WITH NGROK

## Step 1: Download Ngrok
Go to: https://ngrok.com/download
Download for Windows and extract the zip file

## Step 2: Sign Up (Free)
Go to: https://dashboard.ngrok.com/signup
Sign up with your email (it's free!)

## Step 3: Get Your Auth Token
After signing up, copy your auth token from:
https://dashboard.ngrok.com/get-started/your-authtoken

## Step 4: Run These Commands

Open a NEW terminal and run:
```bash
# Navigate to where you extracted ngrok
cd path\to\ngrok

# Add your auth token (replace YOUR_TOKEN with the token from step 3)
ngrok config add-authtoken YOUR_TOKEN

# Start ngrok for backend (port 8000)
ngrok http 8000
```

## Step 5: Copy Your Public URL
Ngrok will show you a URL like:
`https://abc123.ngrok.io`

That's your PUBLIC backend URL! Anyone can access it!

## Step 6: Share Your App
Your backend is now live at: `https://abc123.ngrok.io`
Your frontend is still at: `http://localhost:5173`

To make frontend public too, open ANOTHER terminal:
```bash
cd path\to\ngrok
ngrok http 5173
```

Now you have TWO public URLs:
- Backend: `https://abc123.ngrok.io`
- Frontend: `https://xyz456.ngrok.io`

Share the frontend URL with anyone!

## ⚠️ Important Notes:
- Keep your computer running
- Keep ngrok terminals open
- URLs change when you restart ngrok (free tier)
- Upgrade to paid for permanent URLs ($8/month)

## That's It!
Your app is now PUBLIC and accessible to anyone! 🎉

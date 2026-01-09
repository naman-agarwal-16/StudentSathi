# Deployment Guide for Render + Vercel + Supabase

## Overview
This guide explains how to deploy StudentSathi with:
- **Backend**: Render
- **Frontend**: Vercel
- **Database**: Supabase

## 🔧 Backend Setup (Render)

### 1. Create a Web Service on Render
1. Connect your GitHub repository
2. Select the `backend` folder as the root directory
3. Configure build & start commands:
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`

### 2. Environment Variables on Render
Add these environment variables in your Render dashboard:

```env
NODE_ENV=production
PORT=3001

# Database - Your Supabase connection string
DATABASE_URL=postgresql://postgres:[PASSWORD]@[PROJECT-REF].pooler.supabase.com:6543/postgres?pgbouncer=true

# Frontend - Your Vercel domain
FRONTEND_URL=https://your-app.vercel.app

# Security
JWT_SECRET=your-super-secure-jwt-secret-min-32-characters-long
ENCRYPTION_KEY=your-encryption-key-exactly-32-chars

# CORS - Add your Vercel domain (you can add multiple, comma-separated)
CORS_ORIGIN=https://your-app.vercel.app,https://your-app-preview.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Optional: Email (for password reset)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# SMTP_FROM=noreply@studentsathi.com
```

### 3. Important Notes
- Use Supabase's **connection pooling URL** (port 6543) for better performance
- The `CORS_ORIGIN` must match your Vercel domain exactly (including https://)
- For multiple domains (preview branches), separate with commas

---

## 🎨 Frontend Setup (Vercel)

### 1. Create a New Project on Vercel
1. Import your GitHub repository
2. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Environment Variables on Vercel
Add this environment variable in your Vercel project settings:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

**Important**: Replace `your-backend.onrender.com` with your actual Render backend URL.

### 3. After First Deploy
1. Get your Vercel domain (e.g., `your-app.vercel.app`)
2. Go back to **Render** and update the `CORS_ORIGIN` environment variable to include your Vercel domain
3. Restart your Render backend service

---

## 🗄️ Database Setup (Supabase)

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to provision

### 2. Get Connection String
1. Go to **Settings** → **Database**
2. Copy the **Connection Pooling** string (port 6543)
3. Replace `[YOUR-PASSWORD]` with your database password
4. Add this to your Render environment variables as `DATABASE_URL`

### 3. Run Migrations
You have two options:

#### Option A: Using Render Shell
```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

#### Option B: Locally (then migrations will be in Git)
```bash
cd backend
DATABASE_URL="your-supabase-url" npx prisma migrate deploy
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend health check: `https://your-backend.onrender.com/health`
- [ ] Frontend loads: `https://your-app.vercel.app`
- [ ] Registration works (test creating a new account)
- [ ] Login works
- [ ] No CORS errors in browser console (F12)

---

## 🔍 Troubleshooting

### CORS Error
**Problem**: Browser shows CORS error

**Solution**:
1. Check that `CORS_ORIGIN` in Render matches your Vercel domain exactly
2. Make sure it includes `https://` (not `http://`)
3. Restart Render service after changing environment variables

### Cookie Not Set
**Problem**: Login succeeds but user isn't authenticated

**Solution**:
1. Ensure backend uses `sameSite: 'none'` for production (already fixed in code)
2. Ensure backend uses `secure: true` for production (already fixed in code)
3. Verify `withCredentials: true` in frontend API calls (already set)

### Database Connection Error
**Problem**: Backend can't connect to database

**Solution**:
1. Use Supabase's **connection pooling** URL (port 6543, not 5432)
2. Ensure `?pgbouncer=true` is in the connection string
3. Check that your Supabase project is active

### 401 Unauthorized
**Problem**: All API calls return 401

**Solution**:
1. Check JWT_SECRET is set in Render
2. Verify accessToken is stored in localStorage (browser DevTools)
3. Check browser console for errors

---

## 🚀 Quick Deploy Commands

### Update Backend
```bash
git push origin main
# Render will auto-deploy
```

### Update Frontend
```bash
git push origin main
# Vercel will auto-deploy
```

### Force Rebuild on Render
1. Go to Render dashboard
2. Click "Manual Deploy" → "Clear build cache & deploy"

---

## 📝 Important URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Base**: `https://your-backend.onrender.com/api`
- **Health Check**: `https://your-backend.onrender.com/health`

---

## 🔐 Security Notes

1. **Never commit `.env` files** - they're in `.gitignore`
2. **Use strong secrets** - JWT_SECRET should be at least 32 characters
3. **Enable 2FA** on Render, Vercel, and Supabase
4. **Rotate secrets** periodically
5. **Monitor logs** for suspicious activity

---

## 💡 Pro Tips

1. **Preview Branches**: Add preview URLs to CORS_ORIGIN for testing
2. **Environment Per Branch**: Use different databases for dev/staging/prod
3. **Monitoring**: Enable Render metrics and Vercel analytics
4. **Logging**: Check Render logs for backend errors
5. **Performance**: Enable Vercel Edge Network for faster global access

---

Need help? Check the main [README.md](./README.md) or create an issue on GitHub.

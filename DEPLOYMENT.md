# Deployment Guide - Farm2Home

This guide will walk you through deploying Farm2Home to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed on your machine
- Supabase project set up

## Step 1: Prepare Your Project

### 1.1 Check Git Status
```bash
git status
```

### 1.2 Initialize Git (if not already done)
```bash
git init
```

### 1.3 Add Remote Repository
```bash
git remote add origin https://github.com/Cosmic-hackers/farm2home1.0.git
```

Or if you need to create a new repository:
- Go to https://github.com/new
- Create a new repository named `farm2home1.0`
- Copy the repository URL

## Step 2: Commit and Push to GitHub

### 2.1 Add All Files
```bash
git add .
```

### 2.2 Commit Changes
```bash
git commit -m "Initial commit: Farm2Home marketplace platform with responsive design"
```

### 2.3 Push to GitHub
```bash
git push -u origin main
```

If you get an error about branch name, try:
```bash
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Git Repository**
   - Select "Import Git Repository"
   - Choose your GitHub account
   - Select `farm2home1.0` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install --legacy-peer-deps`

4. **Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   > **Important**: Get these from your Supabase project settings

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (2-5 minutes)
   - Your app will be live at `https://farm2home1-0.vercel.app` (or similar)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? `farm2home1.0`
- Directory? `./`
- Override settings? **Y**
  - Build Command: `npm run build`
  - Output Directory: `.next`
  - Development Command: `npm run dev`

4. **Add Environment Variables**
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

5. **Deploy to Production**
```bash
vercel --prod
```

## Step 4: Post-Deployment Configuration

### 4.1 Update Supabase Redirect URLs

In your Supabase project:
1. Go to Authentication → URL Configuration
2. Add your Vercel URL to:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

### 4.2 Configure Custom Domain (Optional)

In Vercel Dashboard:
1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 4.3 Test Your Deployment

Visit your deployed URL and test:
- ✅ Homepage loads correctly
- ✅ Authentication works (login/signup)
- ✅ Marketplace displays products
- ✅ Dashboard is accessible
- ✅ Mobile responsive design works
- ✅ Images load properly

## Step 5: Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy to production
4. Update your live site

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Environment Variables Not Working
- Make sure they start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new environment variables

### Images Not Loading
- Check if images are in `public/` directory
- Verify Supabase storage bucket permissions
- The app has a fallback to local images

### Authentication Issues
- Verify Supabase redirect URLs include your Vercel domain
- Check that environment variables are correct
- Test authentication in incognito mode

## Monitoring and Analytics

### Vercel Analytics
Enable in Vercel Dashboard → Analytics to track:
- Page views
- Performance metrics
- User engagement

### Supabase Monitoring
Check Supabase Dashboard for:
- Database usage
- API requests
- Storage usage

## Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Remove deployment
vercel remove

# Check environment variables
vercel env ls
```

## Security Checklist

- ✅ `.env.local` is in `.gitignore`
- ✅ No secrets committed to GitHub
- ✅ Supabase RLS policies are enabled
- ✅ Environment variables set in Vercel
- ✅ HTTPS enabled (automatic with Vercel)

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Supabase Docs**: https://supabase.com/docs

---

**Congratulations! Your Farm2Home marketplace is now live! 🎉**

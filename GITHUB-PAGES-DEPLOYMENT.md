# GitHub Pages Deployment Guide

## 📋 Prerequisites

1. GitHub account
2. Git installed on your computer
3. Node.js and npm installed
4. Your project built successfully

---

## 🚀 Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **+** icon → **New repository**
3. Name your repository (e.g., `jashn-events`)
4. Choose **Public** (required for free GitHub Pages)
5. Click **Create repository**

### Step 2: Update Configuration Files

#### A. Update `package.json`

Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPO_NAME` with your actual values:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME"
```

**Example:**
```json
"homepage": "https://johndoe.github.io/jashn-events"
```

#### B. Update `vite.config.js`

Replace `YOUR_REPO_NAME` with your repository name:

```javascript
base: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME/' : '/',
```

**Example:**
```javascript
base: process.env.NODE_ENV === 'production' ? '/jashn-events/' : '/',
```

### Step 3: Initialize Git Repository

```bash
# Navigate to your project
cd react-jashn-events

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Jashn Events React App"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to GitHub Pages

```bash
# Deploy (this will build and push to gh-pages branch)
npm run deploy
```

This command will:
1. Run `npm run build` (creates optimized production build)
2. Push the `dist` folder to `gh-pages` branch
3. GitHub Pages will automatically serve from this branch

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### Step 6: Wait for Deployment

- GitHub will deploy your site (takes 1-5 minutes)
- You'll see a green checkmark when ready
- Your site will be live at: `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME`

---

## 🔄 Updating Your Site

Whenever you make changes:

```bash
# Make your changes
# ...

# Commit changes
git add .
git commit -m "Description of changes"
git push origin main

# Deploy updated version
npm run deploy
```

---

## 🛠️ Alternative: Custom Domain

### Using Custom Domain (e.g., jashnevents.com)

1. **Add CNAME file** in `public/` folder:
   ```
   jashnevents.com
   ```

2. **Update vite.config.js**:
   ```javascript
   base: '/',  // Remove repo name for custom domain
   ```

3. **Update package.json**:
   ```json
   "homepage": "https://jashnevents.com"
   ```

4. **Configure DNS** (at your domain registrar):
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: YOUR_GITHUB_USERNAME.github.io
   ```

5. **Enable custom domain in GitHub**:
   - Go to Settings → Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

---

## 📝 Complete Example

### Example Configuration

**GitHub Username**: `animeshsahu`  
**Repository Name**: `jashn-events`  
**Site URL**: `https://animeshsahu.github.io/jashn-events`

### package.json
```json
{
  "name": "jashn-events-react",
  "homepage": "https://animeshsahu.github.io/jashn-events",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### vite.config.js
```javascript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/jashn-events/' : '/',
  // ... rest of config
})
```

### Deployment Commands
```bash
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/animeshsahu/jashn-events.git
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

---

## 🐛 Troubleshooting

### Issue: 404 Error on Page Refresh

**Problem**: Routes work on initial load but show 404 on refresh.

**Solution**: GitHub Pages doesn't support client-side routing by default.

**Fix**: Add a `404.html` in `public/` folder:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Jashn Events</title>
    <script>
      // Redirect to index.html with path as query parameter
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
  <body></body>
</html>
```

Then add this to `index.html` in `<head>`:

```html
<script>
  (function() {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

### Issue: Assets Not Loading

**Problem**: CSS/JS files return 404.

**Solution**: Check that `base` in `vite.config.js` matches your repo name.

### Issue: Blank Page

**Problem**: Site loads but shows blank page.

**Solution**: 
1. Check browser console for errors
2. Verify `base` path is correct
3. Ensure `homepage` in package.json is correct
4. Clear browser cache

### Issue: Old Version Still Showing

**Problem**: Changes not appearing after deployment.

**Solution**:
```bash
# Clear gh-pages cache
rm -rf node_modules/.cache/gh-pages

# Redeploy
npm run deploy
```

---

## 🔒 Environment Variables

For production, you may want to use environment variables:

### Create `.env.production`
```env
VITE_API_URL=https://bookingapi.hereco.xyz/api/booking
VITE_API_KEY=your_production_api_key
```

### Update code to use env variables
```javascript
const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY
```

**Note**: Don't commit `.env.production` to GitHub!

---

## 📊 Monitoring Deployment

### Check Deployment Status

1. Go to your repository
2. Click **Actions** tab
3. See deployment progress

### View Deployment Logs

```bash
# Check gh-pages branch
git checkout gh-pages
git log

# Return to main branch
git checkout main
```

---

## 🎯 Quick Reference

### Essential Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Update and redeploy
git add .
git commit -m "Update"
git push origin main
npm run deploy
```

### Important Files

- `package.json` - Contains homepage and deploy scripts
- `vite.config.js` - Contains base path configuration
- `dist/` - Production build folder (auto-generated)
- `.github/workflows/` - Optional: GitHub Actions for auto-deploy

---

## 🚀 Advanced: Auto-Deploy with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

This will auto-deploy on every push to main branch!

---

## ✅ Deployment Checklist

Before deploying, ensure:

- [ ] Updated `homepage` in package.json
- [ ] Updated `base` in vite.config.js
- [ ] Tested build locally (`npm run build && npm run preview`)
- [ ] All API endpoints are production-ready
- [ ] Environment variables configured
- [ ] Git repository initialized
- [ ] Remote repository added
- [ ] Code committed and pushed
- [ ] gh-pages package installed
- [ ] GitHub Pages enabled in repository settings

---

## 🎉 Success!

Your site should now be live at:
`https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME`

Share your link and enjoy your deployed React app! 🚀

---

## 📞 Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)

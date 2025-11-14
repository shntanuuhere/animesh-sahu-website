# Deployment Guide

## Pre-Deployment Checklist

### 1. Build Optimization
```bash
# Install dependencies
npm install

# Run production build
npm run build

# Preview production build locally
npm run preview
```

### 2. Performance Testing
- Run Lighthouse audit (target: 90+ scores)
- Test on slow 3G network
- Test on mobile devices
- Check bundle sizes

### 3. Environment Variables
Create `.env.production`:
```env
VITE_MEDIA_CONTAINER_URL=https://media.hereco.xyz/jashnevents/
VITE_API_URL=https://bookingapi.hereco.xyz/api
VITE_CACHE_DURATION=300000
```

## Deployment Options

### Option 1: Vercel (Recommended)

**Automatic Deployment:**
1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

**Manual Deployment:**
```bash
npm install -g vercel
vercel --prod
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Option 2: Netlify

**Automatic Deployment:**
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

**Manual Deployment:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Option 3: Cloudflare Pages

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

**Benefits:**
- Global CDN with 200+ locations
- Automatic HTTPS
- DDoS protection
- Free tier available

### Option 4: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
{
  "homepage": "https://yourusername.github.io/jashn-events",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Deploy
npm run deploy
```

**Update vite.config.js for GitHub Pages:**
```javascript
export default defineConfig({
  base: '/jashn-events/', // Your repo name
  // ... rest of config
})
```

## Post-Deployment

### 1. DNS Configuration
Point your domain to deployment:
- **Vercel**: Add CNAME record
- **Netlify**: Add CNAME or A record
- **Cloudflare**: Update nameservers

### 2. SSL Certificate
All platforms provide automatic HTTPS. Ensure:
- Force HTTPS redirect enabled
- HSTS headers configured
- Mixed content warnings resolved

### 3. CDN Configuration
- Enable Brotli compression
- Configure cache headers
- Set up edge caching
- Enable HTTP/2

### 4. Monitoring Setup

**Google Analytics:**
```javascript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Error Tracking (Sentry):**
```bash
npm install @sentry/react
```

### 5. Performance Optimization

**Enable Compression:**
- Gzip/Brotli on server
- Minify HTML/CSS/JS
- Optimize images

**Cache Strategy:**
- Static assets: 1 year cache
- HTML: No cache or short cache
- API responses: Appropriate cache headers

**CDN Setup:**
- Use Cloudflare or similar
- Enable auto-minification
- Enable Rocket Loader (optional)

## Continuous Deployment

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

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
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Rollback Strategy

### Quick Rollback
```bash
# Vercel
vercel rollback

# Netlify
netlify rollback

# Manual
git revert HEAD
git push origin main
```

## Health Checks

### Automated Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure alerts for downtime
- Monitor Core Web Vitals
- Track error rates

### Manual Checks
- Test all routes
- Verify forms work
- Check media loading
- Test on multiple devices
- Verify analytics tracking

## Troubleshooting

### Build Failures
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Routing Issues
- Ensure SPA fallback configured
- Check redirect rules
- Verify base URL in vite.config.js

### Performance Issues
- Check bundle sizes
- Verify CDN caching
- Test network waterfall
- Review Lighthouse report

## Security

### Headers Configuration
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Environment Secrets
- Never commit `.env` files
- Use platform environment variables
- Rotate API keys regularly
- Use HTTPS only

## Maintenance

### Regular Updates
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions
npm install react@latest react-dom@latest
```

### Backup Strategy
- Regular database backups
- Version control for code
- Document configuration
- Keep deployment logs

## Support

For deployment issues:
- Check platform status pages
- Review deployment logs
- Contact platform support
- Consult documentation

---

**Last Updated:** January 2025

# Jashn Events - React Version

A modern, responsive event planning website built with React and Vite.

## Features

- 🎨 **Modern UI Design** - Clean and professional interface matching the original HTML version
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🍔 **Mobile Menu** - Smooth hamburger menu with animations
- 🎉 **Event Gallery** - Dynamic media gallery loading from Azure Blob Storage
- 📝 **Booking System** - Complete event booking form
- 🔍 **Status Tracking** - Check booking status functionality
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **React Router** - Client-side routing for smooth navigation

## Performance Optimizations

### Core Optimizations
- ⚡ **Code Splitting** - Lazy loading with retry logic for reliability
- 🖼️ **Image Optimization** - Intersection Observer with aggressive preloading
- 💾 **Smart Caching** - LocalStorage with fallback and error handling
- 🎯 **Memoization** - React.memo for Header and Footer components
- 📦 **Bundle Optimization** - Vendor chunk splitting + asset optimization
- 🔄 **Adaptive Loading** - Network-aware quality adjustment
- 🎨 **CSS Optimization** - Code splitting + containment
- 📊 **Performance Monitoring** - Built-in metrics logging

### Advanced Features
- 🛡️ **Error Boundaries** - Graceful error handling at multiple levels
- 🔄 **Service Worker** - Offline support and advanced caching
- ⏱️ **Request Timeout** - 10s timeout with abort controller
- 🔁 **Retry Logic** - Automatic retry for failed imports
- 🎯 **Priority Loading** - First 9 items load immediately
- 📱 **PWA Ready** - Service worker + manifest support
- 🔒 **Security Headers** - XSS, clickjacking protection
- 🚀 **CDN Optimized** - Asset naming for long-term caching

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Vite** - Next-generation frontend tooling
- **CSS3** - Custom styling with animations

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed

### Installation

1. Navigate to the project directory:
```bash
cd react-jashn-events
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
react-jashn-events/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Navigation header with mobile menu
│   │   ├── Header.css
│   │   ├── Footer.jsx       # Site footer
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx         # Homepage with gallery
│   │   ├── Home.css
│   │   ├── About.jsx        # About page
│   │   ├── About.css
│   │   ├── Contact.jsx      # Contact form
│   │   ├── Contact.css
│   │   ├── Booking.jsx      # Event booking form
│   │   ├── Booking.css
│   │   ├── CheckStatus.jsx  # Booking status checker
│   │   ├── CheckStatus.css
│   │   ├── Privacy.jsx      # Privacy policy
│   │   ├── Terms.jsx        # Terms of service
│   │   └── Legal.css
│   ├── App.jsx              # Main app component with routing
│   ├── App.css
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Pages

- **Home (/)** - Hero section with profile and dynamic media gallery
- **About (/about)** - Information about Jashn Events and services
- **Contact (/contact)** - Contact form and information
- **Booking (/booking)** - Event booking form
- **Check Status (/check-status)** - Track booking status
- **Privacy (/privacy)** - Privacy policy
- **Terms (/terms)** - Terms of service

## Customization

### Update Contact Information

Edit the email in:
- `src/components/Footer.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Privacy.jsx`
- `src/pages/Terms.jsx`

### Update Media Gallery Source

Edit the `containerURL` in `src/pages/Home.jsx`:
```javascript
const containerURL = "https://your-storage-url.com/container/"
```

### Update Colors

Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #ff6b35;
  --primary-600: #f7931e;
  /* ... */
}
```

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the dist folder to Netlify
```

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/jashn-events",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## License

© 2025 Animesh Sahu. All rights reserved.

## Contact

For questions or support:
- Email: hello@hereco.xyz
- Website: jashnevents.hereco.xyz

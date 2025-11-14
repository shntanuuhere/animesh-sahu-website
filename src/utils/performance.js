// Performance monitoring utilities

export function measurePageLoad() {
  if (typeof window === 'undefined' || !window.performance) return null

  const perfData = window.performance.timing
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
  const connectTime = perfData.responseEnd - perfData.requestStart
  const renderTime = perfData.domComplete - perfData.domLoading

  return {
    pageLoadTime,
    connectTime,
    renderTime,
    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart
  }
}

export function logPerformance() {
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const metrics = measurePageLoad()
        if (metrics) {
          console.log('📊 Performance Metrics:', metrics)
        }
      }, 0)
    })
  }
}

// Report Web Vitals (optional - requires web-vitals package)
// To use: npm install web-vitals
export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Uncomment if you install web-vitals package
    // import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    //   getCLS(onPerfEntry)
    //   getFID(onPerfEntry)
    //   getFCP(onPerfEntry)
    //   getLCP(onPerfEntry)
    //   getTTFB(onPerfEntry)
    // })
    console.log('Web Vitals reporting is available but requires web-vitals package')
  }
}

// Prefetch resources
export function prefetchResource(url, as = 'fetch') {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = as
  link.href = url
  document.head.appendChild(link)
}

// Preload critical resources
export function preloadResource(url, as = 'image') {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.href = url
  document.head.appendChild(link)
}

// Check if user prefers reduced motion
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get connection speed
export function getConnectionSpeed() {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    }
  }
  return null
}

// Adaptive loading based on connection
export function shouldLoadHighQuality() {
  const connection = getConnectionSpeed()
  if (!connection) return true // Default to high quality if unknown
  
  // Don't load high quality on slow connections or data saver mode
  if (connection.saveData) return false
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') return false
  
  return true
}

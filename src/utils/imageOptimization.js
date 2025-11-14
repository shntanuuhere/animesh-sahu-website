// Preload critical images
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Generate optimized image URL with query params
export function getOptimizedImageUrl(url, options = {}) {
  const { width, quality = 85, format } = options
  
  // If using a CDN that supports image optimization, add query params
  const urlObj = new URL(url)
  
  if (width) {
    urlObj.searchParams.set('w', width)
  }
  if (quality) {
    urlObj.searchParams.set('q', quality)
  }
  if (format) {
    urlObj.searchParams.set('fm', format)
  }
  
  return urlObj.toString()
}

// Check if browser supports WebP
export function supportsWebP() {
  const canvas = document.createElement('canvas')
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
  return false
}

// Lazy load images with Intersection Observer
export function lazyLoadImages(selector = 'img[data-src]') {
  const images = document.querySelectorAll(selector)
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.add('loaded')
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px'
  })
  
  images.forEach(img => imageObserver.observe(img))
  
  return () => images.forEach(img => imageObserver.unobserve(img))
}

// Debounce function for performance
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

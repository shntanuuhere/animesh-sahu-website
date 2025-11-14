import { useState, useEffect, useRef } from 'react'
import { shouldLoadHighQuality } from '../utils/performance'

function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  loading = 'lazy',
  onLoad,
  onError 
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef(null)
  const highQuality = shouldLoadHighQuality()

  useEffect(() => {
    if (!imgRef.current || loading !== 'lazy') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [loading])

  const handleLoad = () => {
    setLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
    onError?.()
  }

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!width) return undefined
    
    const sizes = [0.5, 1, 1.5, 2]
    return sizes
      .map(multiplier => {
        const w = Math.round(width * multiplier)
        return `${src}?w=${w} ${w}w`
      })
      .join(', ')
  }

  return (
    <div 
      ref={imgRef}
      className={`optimized-image-wrapper ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        position: 'relative'
      }}
    >
      {!loaded && !error && (
        <div 
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
      )}
      
      {isVisible && !error && (
        <img
          src={src}
          srcSet={generateSrcSet()}
          sizes={width ? `${width}px` : '100vw'}
          alt={alt}
          className={`${loaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
      
      {error && (
        <div 
          className="image-error"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: '#f3f4f6',
            color: '#6b7280'
          }}
        >
          Failed to load image
        </div>
      )}
    </div>
  )
}

export default OptimizedImage

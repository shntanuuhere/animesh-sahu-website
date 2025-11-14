import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

// Cache for media list
const CACHE_KEY = 'jashn_media_cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function Home() {
  const [mediaItems, setMediaItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadMedia()
  }, [])

  const loadMedia = useCallback(async () => {
    const containerURL = "https://media.hereco.xyz/jashnevents/"
    const listURL = containerURL + "?restype=container&comp=list"

    try {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION && Array.isArray(data) && data.length > 0) {
            setMediaItems(data)
            setLoading(false)
            return
          }
        } catch (cacheError) {
          console.warn('Cache parse error, fetching fresh data')
          localStorage.removeItem(CACHE_KEY)
        }
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const res = await fetch(listURL, { 
        signal: controller.signal,
        cache: 'default'
      })
      
      clearTimeout(timeoutId)
      
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
      }

      const text = await res.text()
      const xml = new DOMParser().parseFromString(text, "application/xml")

      const parseError = xml.querySelector("parsererror")
      if (parseError) {
        throw new Error("Unable to parse blob list")
      }

      const blobs = xml.getElementsByTagName("Blob")

      if (blobs.length === 0) {
        setMediaItems([])
        setLoading(false)
        return
      }

      const blobArray = Array.from(blobs).map(blob => {
        const name = blob.getElementsByTagName("Name")[0].textContent
        const ext = name.split(".").pop().toLowerCase()
        return {
          name,
          url: containerURL + name,
          ext,
          type: ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? 'image' : 'video'
        }
      })

      // Sort: images first, then videos
      const images = blobArray.filter(b => b.type === 'image')
      const videos = blobArray.filter(b => b.type === 'video')
      
      const sortedItems = [...images, ...videos]
      
      // Cache the results with error handling
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: sortedItems,
          timestamp: Date.now()
        }))
      } catch (storageError) {
        console.warn('Failed to cache media list:', storageError)
      }
      
      setMediaItems(sortedItems)
      setLoading(false)
    } catch (error) {
      console.error("Error loading media:", error)
      
      // Try to use stale cache as fallback
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data } = JSON.parse(cached)
          if (Array.isArray(data) && data.length > 0) {
            setMediaItems(data)
            setError('Using cached data (network error)')
            setLoading(false)
            return
          }
        }
      } catch (fallbackError) {
        console.warn('Fallback cache failed')
      }
      
      setError(error.name === 'AbortError' ? 'Request timeout' : error.message)
      setLoading(false)
    }
  }, [])

  return (
    <main className="main">
      <section className="hero-section">
        <div className="profile-container">
          <img 
            className="profile" 
            src="https://media.hereco.xyz/assets/550869990_17885489733365604_3186628821431398796_n.jpg" 
            alt="Jashn Events"
          />
          <h1>Jashn Events</h1>
          <p>Creating Unforgettable Moments • Owned by <strong>Animesh Sahu</strong></p>
          <Link to="/booking" className="book-now-btn">
            📅 Book Your Event
          </Link>
        </div>
      </section>

      <div className="container">
        <div className="section-header-center">
          <h2 className="section-title">Our Event Gallery</h2>
          <p>Capturing the magic of every celebration</p>
        </div>

        {loading && (
          <div className="loading-spinner">
            <div className="spinner-wrapper">
              <img 
                src="https://media.hereco.xyz/assets/550869990_17885489733365604_3186628821431398796_n.jpg" 
                alt="Loading" 
                className="spinner-image"
              />
            </div>
            <p>Loading amazing moments...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>Unable to load media: {error}</p>
          </div>
        )}

        {!loading && !error && mediaItems.length === 0 && (
          <div className="empty-message">
            <p>No media files found.</p>
          </div>
        )}

        {!loading && !error && mediaItems.length > 0 && (
          <div className="media-grid" id="gallery">
            {mediaItems.map((item, index) => (
              <MediaItem key={index} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function MediaItem({ item, index }) {
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const elementRef = useRef(null)

  // Simple and fast: load first 9 immediately, lazy load rest
  const [isVisible, setIsVisible] = useState(index < 9)

  useEffect(() => {
    if (isVisible) return // Already visible

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '300px',
        threshold: 0.01
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <div 
      ref={elementRef}
      className={`media-item ${item.type === 'video' ? 'video-item' : ''} ${playing ? 'playing' : ''}`}
      style={{ animationDelay: index < 9 ? '0s' : '0.1s' }}
    >
      {!loaded && <div className="media-placeholder"></div>}
      
      {item.type === 'image' ? (
        <img
          src={isVisible ? item.url : ''}
          alt="Event photo"
          className={loaded ? 'loaded' : 'loading'}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          loading={index < 6 ? 'eager' : 'lazy'}
          decoding="async"
          style={{ display: isVisible ? 'block' : 'none' }}
        />
      ) : (
        <video
          src={isVisible ? item.url : ''}
          controls
          preload="metadata"
          playsInline
          className={loaded ? 'loaded' : 'loading'}
          onLoadedMetadata={() => setLoaded(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          style={{ display: isVisible ? 'block' : 'none' }}
        />
      )}
    </div>
  )
}

export default Home

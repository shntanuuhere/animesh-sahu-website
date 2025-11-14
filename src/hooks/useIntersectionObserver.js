import { useEffect, useState, useRef } from 'react'

export function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)
        
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true)
        }
      },
      {
        rootMargin: options.rootMargin || '50px',
        threshold: options.threshold || 0.01,
        ...options
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [hasBeenVisible, options])

  return [elementRef, isVisible, hasBeenVisible]
}

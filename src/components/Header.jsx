import { useState, useEffect, useCallback, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      const newState = !prev
      document.body.style.overflow = newState ? 'hidden' : ''
      return newState
    })
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }, [])

  // Close menu on route change
  useEffect(() => {
    closeMenu()
  }, [location.pathname, closeMenu])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen, closeMenu])

  const isActive = useCallback((path) => location.pathname === path, [location.pathname])

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="site-title">
            <Link to="/" className="site-title-link" onClick={closeMenu}>
              Jashn Events <span className="beta-badge" title="Currently under Development">β</span>
            </Link>
          </h1>

          <button
            className="mobile-menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list" id="nav-menu">
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/about" 
                  className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/#gallery" 
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/booking" 
                  className={`nav-link ${isActive('/booking') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Book Event
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/check-status" 
                  className={`nav-link ${isActive('/check-status') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Check Status
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)

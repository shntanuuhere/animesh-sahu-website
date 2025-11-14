import { memo } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Jashn Events</h3>
            <p className="footer-description">Creating Unforgettable Moments</p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/#gallery" className="footer-link">Gallery</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/booking" className="footer-link">Book Event</Link>
              <Link to="/check-status" className="footer-link">Check Status</Link>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Contact</h4>
            <div className="footer-links">
              <a href="mailto:hello@hereco.xyz" className="footer-link">
                hello@hereco.xyz
              </a>
              <Link to="/contact" className="footer-link">Get in Touch</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-text">&copy; 2025 Animesh Sahu. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/admin-login" className="footer-link admin-link">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)

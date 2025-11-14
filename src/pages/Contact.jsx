import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      alert('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitting(false)
    }, 1000)
  }

  return (
    <main className="main">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">Let's plan your perfect celebration together!</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-section">
              <h2 className="section-title">Send us a Message</h2>
              <p className="section-text">
                Have questions? Want to discuss your event? Fill out the form below or{' '}
                <Link to="/booking" style={{ color: '#ff6b35', fontWeight: 600 }}>
                  book your event directly
                </Link>.
              </p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-input"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="contact-info-section">
              <h2 className="section-title">Get in Touch</h2>
              
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-details">
                    <h3 className="contact-label">Email</h3>
                    <p className="contact-value">
                      <a href="mailto:hello@hereco.xyz">
                        hello@hereco.xyz
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">🌐</div>
                  <div className="contact-details">
                    <h3 className="contact-label">Website</h3>
                    <p className="contact-value">jashnevents.hereco.xyz</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">⏰</div>
                  <div className="contact-details">
                    <h3 className="contact-label">Response Time</h3>
                    <p className="contact-value">Within 24 hours</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📅</div>
                  <div className="contact-details">
                    <h3 className="contact-label">Ready to Book?</h3>
                    <p className="contact-value">
                      <Link to="/booking" style={{ color: '#ff6b35', fontWeight: 600 }}>
                        Start Your Booking →
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">🔍</div>
                  <div className="contact-details">
                    <h3 className="contact-label">Check Booking Status</h3>
                    <p className="contact-value">
                      <Link to="/check-status" style={{ color: '#ff6b35', fontWeight: 600 }}>
                        Track Your Event →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact

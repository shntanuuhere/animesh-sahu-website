import { useState } from 'react'
import './CheckStatus.css'

function CheckStatus() {
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  })
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const API_URL = 'https://bookingapi.hereco.xyz/api/booking'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setChecking(true)
    setResult(null)
    setError('')

    try {
      const response = await fetch(
        `${API_URL}?email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}`
      )
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error('Failed to fetch booking')
      }

      const booking = data.bookings.find(
        b => b.email.toLowerCase() === formData.email.toLowerCase() && b.phone === formData.phone
      )

      if (!booking) {
        setError('No booking found with these details. Please check your email and phone number.')
        return
      }

      setResult(booking)
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to check status. Please try again later.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <main className="main">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Check Booking Status</h1>
          <p className="page-subtitle">Track your event booking</p>
        </div>
      </section>

      <section className="check-status-content">
        <div className="container">
          <div className="status-form-container">
            {error && (
              <div className="error-message">
                ✗ {error}
              </div>
            )}
            
            <form className="status-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
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
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-large" disabled={checking}>
                {checking ? 'Checking...' : 'Check Status'}
              </button>
            </form>

            {result && (
              <div className="result-card">
                <h3>Your Booking Details</h3>
                <div className={`status-badge-large status-${result.status}`}>
                  {result.status.toUpperCase()}
                </div>
                <div className="result-details">
                  <div className="result-item">
                    <span className="result-label">Name</span>
                    <span className="result-value">{result.name}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Event Type</span>
                    <span className="result-value">
                      {result.eventType.charAt(0).toUpperCase() + result.eventType.slice(1)}
                    </span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Event Date</span>
                    <span className="result-value">
                      {new Date(result.eventDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {result.guests && (
                    <div className="result-item">
                      <span className="result-label">Expected Guests</span>
                      <span className="result-value">{result.guests}</span>
                    </div>
                  )}
                  {result.budget && (
                    <div className="result-item">
                      <span className="result-label">Budget Range</span>
                      <span className="result-value">{result.budget}</span>
                    </div>
                  )}
                  {result.venue && (
                    <div className="result-item">
                      <span className="result-label">Venue</span>
                      <span className="result-value">{result.venue}</span>
                    </div>
                  )}
                  <div className="result-item">
                    <span className="result-label">Booking ID</span>
                    <span className="result-value booking-id">{result._id}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Submitted</span>
                    <span className="result-value">
                      {new Date(result.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default CheckStatus

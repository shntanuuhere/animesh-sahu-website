import { useState } from 'react'
import './Booking.css'

function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guests: '',
    budget: '',
    venue: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [notification, setNotification] = useState({ type: '', message: '' })

  const API_URL = 'https://bookingapi.hereco.xyz/api/booking'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: '' }), 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setNotification({ type: '', message: '' })

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        showNotification('success', 'Booking request submitted successfully! We\'ll contact you soon.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guests: '',
          budget: '',
          venue: '',
          message: ''
        })
      } else {
        throw new Error(result.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Error:', error)
      showNotification('error', error.message || 'Something went wrong. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <main className="main">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Book Your Event</h1>
          <p className="page-subtitle">Let's make your celebration unforgettable</p>
        </div>
      </section>

      <section className="booking-content">
        <div className="container">
          {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.type === 'success' ? '✓' : '✗'} {notification.message}
            </div>
          )}
          
          <div className="booking-form-container">
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
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
              </div>

              <div className="form-row">
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

                <div className="form-group">
                  <label htmlFor="eventType" className="form-label">Event Type *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    className="form-input"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="eventDate" className="form-label">Event Date *</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    className="form-input"
                    value={formData.eventDate}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guests" className="form-label">Expected Guests *</label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    className="form-input"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="budget" className="form-label">Budget Range</label>
                <select
                  id="budget"
                  name="budget"
                  className="form-input"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select your budget range</option>
                  <option value="under-50k">Under ₹50,000</option>
                  <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                  <option value="1l-2l">₹1,00,000 - ₹2,00,000</option>
                  <option value="2l-5l">₹2,00,000 - ₹5,00,000</option>
                  <option value="above-5l">Above ₹5,00,000</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="venue" className="form-label">Venue/Location</label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  className="form-input"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="City or specific venue"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Additional Details</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your event requirements..."
                  maxLength="500"
                ></textarea>
                <div className="character-count">
                  {formData.message.length}/500 characters
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-large" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Booking

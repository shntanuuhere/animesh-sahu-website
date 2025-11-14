import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if already logged in
    const adminUser = localStorage.getItem('adminUser')
    if (adminUser) {
      navigate('/admin')
    }
  }, [navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate authentication - In production, this would use Firebase Auth
    setTimeout(() => {
      if (formData.email && formData.password) {
        const userData = {
          email: formData.email,
          loginTime: new Date().toISOString()
        }
        localStorage.setItem('adminUser', JSON.stringify(userData))
        navigate('/admin')
      } else {
        setError('Invalid credentials')
        setLoading(false)
      }
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setError('')
    setLoading(true)
    // Simulate Google login - In production, this would use Firebase Auth
    setTimeout(() => {
      const userData = {
        email: 'admin@jashnevents.com',
        loginTime: new Date().toISOString(),
        provider: 'google'
      }
      localStorage.setItem('adminUser', JSON.stringify(userData))
      navigate('/admin')
    }, 1500)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo">
          <h1>🎉 Jashn Events</h1>
          <p>Admin Dashboard Login</p>
        </div>

        {error && (
          <div className="error-message show">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@jashnevents.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="divider">OR</div>

        <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
            <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
            <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  )
}

export default AdminLogin

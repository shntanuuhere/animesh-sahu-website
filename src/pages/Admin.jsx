import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    thisMonth: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    eventType: 'all',
    search: ''
  });
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [user, setUser] = useState(null);

  const API_URL = 'https://bookingapi.hereco.xyz/api/booking';
  const API_KEY = 'jashn_admin_2024_secure_key_' + btoa('jashn-events-admin');

  useEffect(() => {
    // Check authentication
    const authUser = localStorage.getItem('adminUser');
    if (!authUser) {
      navigate('/admin-login');
      return;
    }
    
    try {
      const userData = JSON.parse(authUser);
      setUser(userData);
    } catch (error) {
      console.error('Invalid user data:', error);
      navigate('/admin-login');
      return;
    }

    loadBookings();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadBookings, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    applyFilters();
  }, [filters, bookings]);

  const loadBookings = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { 'X-API-Key': API_KEY }
      });
      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
        calculateStats(data.bookings);
      } else {
        throw new Error('Failed to load bookings');
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      showNotification('error', 'Failed to load bookings: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData) => {
    const total = bookingsData.length;
    const pending = bookingsData.filter(b => b.status === 'pending').length;
    const confirmed = bookingsData.filter(b => b.status === 'confirmed').length;
    
    const now = new Date();
    const thisMonth = bookingsData.filter(b => {
      const bookingDate = new Date(b.createdAt);
      return bookingDate.getMonth() === now.getMonth() && 
             bookingDate.getFullYear() === now.getFullYear();
    }).length;

    setStats({ total, pending, confirmed, thisMonth });
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    if (filters.status !== 'all') {
      filtered = filtered.filter(b => b.status === filters.status);
    }

    if (filters.eventType !== 'all') {
      filtered = filtered.filter(b => b.eventType === filters.eventType);
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(query) ||
        b.email.toLowerCase().includes(query) ||
        b.phone.includes(query)
      );
    }

    setFilteredBookings(filtered);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: '', message: '' }), 5000);
  };

  const updateStatus = async (bookingId, newStatus) => {
    if (!confirm(`Are you sure you want to change status to ${newStatus.toUpperCase()}?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${bookingId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showNotification('success', 'Status updated successfully!');
        loadBookings();
      } else {
        throw new Error(result.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('error', 'Failed to update status: ' + error.message);
    }
  };

  const deleteBooking = async (bookingId, bookingName) => {
    if (!confirm(`⚠️ Are you sure you want to DELETE this booking?\n\nCustomer: ${bookingName}\n\nThis action cannot be undone!`)) {
      return;
    }

    if (!confirm('Final confirmation: Delete this booking permanently?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${bookingId}`, {
        method: 'DELETE',
        headers: { 'X-API-Key': API_KEY }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showNotification('success', 'Booking deleted successfully!');
        loadBookings();
      } else {
        throw new Error(result.error || 'Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      showNotification('error', 'Failed to delete booking: ' + error.message);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminUser');
      navigate('/admin-login');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <div className="header-left">
          <div className="admin-logo">
            <h1>🎉 Jashn Events</h1>
            <span className="admin-badge">Admin Panel</span>
          </div>
        </div>
        
        <div className="header-right">
          <span className="user-email">{user?.email || 'admin@jashn.com'}</span>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="admin-container">

          {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.type === 'success' ? '✓' : '✗'} {notification.message}
            </div>
          )}

              <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h3>Total Bookings</h3>
                <div className="stat-number">{stats.total}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending">⏳</div>
              <div className="stat-info">
                <h3>Pending</h3>
                <div className="stat-number">{stats.pending}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon confirmed">✓</div>
              <div className="stat-info">
                <h3>Confirmed</h3>
                <div className="stat-number">{stats.confirmed}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>This Month</h3>
                <div className="stat-number">{stats.thisMonth}</div>
              </div>
            </div>
          </div>

          <div className="filters-bar">
        <select 
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select 
          value={filters.eventType}
          onChange={(e) => setFilters({...filters, eventType: e.target.value})}
        >
          <option value="all">All Event Types</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday</option>
          <option value="corporate">Corporate</option>
          <option value="anniversary">Anniversary</option>
          <option value="engagement">Engagement</option>
          <option value="other">Other</option>
        </select>

        <input 
          type="text"
          placeholder="Search by name, email, phone..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />

        <button className="refresh-btn" onClick={loadBookings}>
          🔄 Refresh
        </button>

          </div>

          <div className="bookings-section">
            <div className="section-header">
              <h2>Recent Bookings</h2>
              <span className="booking-count">{filteredBookings.length} bookings</span>
            </div>
            
            <div className="bookings-grid">
        {filteredBookings.length === 0 ? (
          <div className="empty-state">
            <h3>📭 No Bookings Found</h3>
            <p>No bookings match your filters</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <div>
                  <div className="booking-title">
                    {booking.eventType.charAt(0).toUpperCase() + booking.eventType.slice(1)}
                  </div>
                  <div className="booking-id">ID: {booking._id}</div>
                </div>
                <span className={`status-badge status-${booking.status}`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>

              <div className="quick-stats">
                <span className="quick-stat">
                  📅 {new Date(booking.eventDate).toLocaleDateString('en-IN', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                {booking.guests && (
                  <span className="quick-stat">👥 {booking.guests} guests</span>
                )}
                {booking.budget && (
                  <span className="quick-stat">💰 {booking.budget}</span>
                )}
              </div>

              <div className="booking-details">
                <div className="detail-group">
                  <h4>Contact Person</h4>
                  <p>{booking.name}</p>
                </div>

                <div className="detail-group">
                  <h4>Email</h4>
                  <p><a href={`mailto:${booking.email}`}>{booking.email}</a></p>
                </div>

                <div className="detail-group">
                  <h4>Phone</h4>
                  <p><a href={`tel:${booking.phone}`}>{booking.phone}</a></p>
                </div>

                <div className="detail-group">
                  <h4>Event Date</h4>
                  <p>{formatDate(booking.eventDate)}</p>
                </div>

                {booking.guests && (
                  <div className="detail-group">
                    <h4>Expected Guests</h4>
                    <p>{booking.guests}</p>
                  </div>
                )}

                {booking.budget && (
                  <div className="detail-group">
                    <h4>Budget Range</h4>
                    <p>{booking.budget}</p>
                  </div>
                )}

                {booking.venue && (
                  <div className="detail-group">
                    <h4>Venue/Location</h4>
                    <p>{booking.venue}</p>
                  </div>
                )}
              </div>

              {booking.message && (
                <div className="message-box">
                  <h4>Additional Details</h4>
                  <p>{booking.message}</p>
                </div>
              )}

              <div className="timestamp">
                Submitted: {formatDateTime(booking.createdAt)}
              </div>

              <div className="status-actions">
                <button 
                  className="status-btn confirm"
                  onClick={() => updateStatus(booking._id, 'confirmed')}
                  disabled={booking.status === 'confirmed'}
                >
                  ✓ Confirm
                </button>
                <button 
                  className="status-btn cancel"
                  onClick={() => updateStatus(booking._id, 'cancelled')}
                  disabled={booking.status === 'cancelled'}
                >
                  ✗ Cancel
                </button>
                <button 
                  className="status-btn pending"
                  onClick={() => updateStatus(booking._id, 'pending')}
                  disabled={booking.status === 'pending'}
                >
                  ⟳ Pending
                </button>
                <button 
                  className="status-btn delete"
                  onClick={() => deleteBooking(booking._id, booking.name)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Admin;

# API Integration Guide

## Overview
All React pages are now integrated with the live booking API at `https://bookingapi.hereco.xyz/api/booking`

## Integrated Pages

### 1. Booking Page (`/booking`)
**File**: `src/pages/Booking.jsx`

**Features**:
- ✅ Full form submission to API
- ✅ Success/error notifications
- ✅ Form validation
- ✅ Character counter for message field
- ✅ Venue/location field added
- ✅ Proper error handling

**API Endpoint**: `POST /api/booking`

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "eventType": "string",
  "eventDate": "string",
  "guests": "string",
  "budget": "string",
  "venue": "string",
  "message": "string"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": { ... }
}
```

---

### 2. Check Status Page (`/check-status`)
**File**: `src/pages/CheckStatus.jsx`

**Features**:
- ✅ Search bookings by email and phone
- ✅ Display full booking details
- ✅ Status badge with color coding
- ✅ Error handling for not found
- ✅ Formatted dates and details

**API Endpoint**: `GET /api/booking?email={email}&phone={phone}`

**Response**:
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "eventType": "string",
      "eventDate": "string",
      "status": "pending|confirmed|cancelled",
      "guests": "string",
      "budget": "string",
      "venue": "string",
      "message": "string",
      "createdAt": "string"
    }
  ]
}
```

---

### 3. Admin Dashboard (`/admin`)
**File**: `src/pages/Admin.jsx`

**Features**:
- ✅ View all bookings
- ✅ Filter by status and event type
- ✅ Search by name, email, phone
- ✅ Update booking status
- ✅ Delete bookings
- ✅ Real-time statistics
- ✅ Auto-refresh every 30 seconds

**API Endpoints**:

**Get All Bookings**:
- `GET /api/booking`
- Headers: `X-API-Key: {API_KEY}`

**Update Status**:
- `PATCH /api/booking/{id}`
- Headers: `Content-Type: application/json`, `X-API-Key: {API_KEY}`
- Body: `{ "status": "pending|confirmed|cancelled" }`

**Delete Booking**:
- `DELETE /api/booking/{id}`
- Headers: `X-API-Key: {API_KEY}`

---

## API Configuration

### Base URL
```javascript
const API_URL = 'https://bookingapi.hereco.xyz/api/booking'
```

### Admin API Key
```javascript
const API_KEY = 'jashn_admin_2024_secure_key_' + btoa('jashn-events-admin')
```

**Note**: In production, move this to environment variables:
```javascript
const API_KEY = import.meta.env.VITE_API_KEY
```

---

## Error Handling

All API calls include proper error handling:

```javascript
try {
  const response = await fetch(API_URL, options)
  const data = await response.json()
  
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Request failed')
  }
  
  // Handle success
} catch (error) {
  console.error('Error:', error)
  // Show user-friendly error message
}
```

---

## Status Codes

- `200` - Success
- `201` - Created (new booking)
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Server Error

---

## Testing

### Test Booking Submission
1. Go to `/booking`
2. Fill out the form
3. Submit
4. Check for success notification
5. Verify in admin dashboard

### Test Status Check
1. Go to `/check-status`
2. Enter email and phone from a booking
3. Verify booking details display correctly

### Test Admin Dashboard
1. Login at `/admin-login`
2. Verify bookings load
3. Test filters and search
4. Test status updates
5. Test delete functionality

---

## Environment Variables

Create `.env` file:
```env
VITE_API_URL=https://bookingapi.hereco.xyz/api/booking
VITE_API_KEY=your_api_key_here
```

Update code to use env variables:
```javascript
const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY
```

---

## Security Considerations

### Current Implementation
- ✅ API key for admin operations
- ✅ Client-side validation
- ✅ Error message sanitization

### Production Recommendations
1. **Move API keys to environment variables**
2. **Add rate limiting** on API endpoints
3. **Implement CORS** properly
4. **Add request signing** for admin operations
5. **Use HTTPS only**
6. **Add input sanitization** on backend
7. **Implement authentication tokens** instead of localStorage
8. **Add CSRF protection**

---

## Monitoring

### What to Monitor
- API response times
- Error rates
- Failed submissions
- Booking conversion rate
- Status check usage

### Logging
All API calls log errors to console. In production:
- Send errors to monitoring service (Sentry, LogRocket)
- Track user actions
- Monitor API health

---

## Future Enhancements

1. **Retry Logic**: Auto-retry failed requests
2. **Offline Support**: Queue submissions when offline
3. **Real-time Updates**: WebSocket for live booking updates
4. **File Uploads**: Support for event images/documents
5. **Email Notifications**: Auto-send confirmation emails
6. **SMS Notifications**: Send booking updates via SMS
7. **Payment Integration**: Add payment gateway
8. **Calendar Integration**: Sync with Google Calendar

---

## Troubleshooting

### Booking Submission Fails
- Check network connection
- Verify API endpoint is accessible
- Check browser console for errors
- Validate form data format

### Status Check Returns No Results
- Verify email and phone match exactly
- Check for typos
- Ensure booking exists in database

### Admin Dashboard Not Loading
- Check authentication
- Verify API key is correct
- Check browser console for errors
- Ensure API endpoint is accessible

---

## Support

For API issues or questions:
- Check browser console for detailed errors
- Review API response in Network tab
- Contact backend team for API issues
- Check API documentation for endpoint details

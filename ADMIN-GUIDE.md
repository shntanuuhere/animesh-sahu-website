# Admin Dashboard Guide

## Overview
The admin dashboard allows authorized users to manage event bookings for Jashn Events.

## Features

### Authentication
- **Email/Password Login**: Standard authentication with email and password
- **Google OAuth**: Quick login using Google account
- **Session Management**: Automatic logout and session persistence
- **Protected Routes**: Admin pages require authentication

### Dashboard Features

#### Statistics Overview
- Total bookings count
- Pending bookings count
- Confirmed bookings count
- Current month bookings count

#### Booking Management
- View all bookings with detailed information
- Filter by status (pending, confirmed, cancelled)
- Filter by event type (wedding, birthday, corporate, etc.)
- Search by customer name, email, or phone
- Auto-refresh every 30 seconds

#### Booking Actions
- **Confirm**: Mark booking as confirmed
- **Cancel**: Mark booking as cancelled
- **Pending**: Reset booking to pending status
- **Delete**: Permanently remove booking (requires double confirmation)

#### Booking Details Display
- Customer contact information
- Event date and type
- Guest count and budget
- Venue/location
- Additional messages
- Submission timestamp
- Unique booking ID

### Mobile Responsive
- Fully responsive design for tablets and mobile devices
- Touch-friendly buttons and controls
- Optimized layouts for small screens

## Routes

- `/admin-login` - Admin login page
- `/admin` - Admin dashboard (protected)

## API Integration

The dashboard connects to the booking API:
- **Endpoint**: `https://bookingapi.hereco.xyz/api/booking`
- **Authentication**: API key-based authentication
- **Operations**: GET (list), PATCH (update status), DELETE (remove)

## Security Notes

### Current Implementation (Development)
- Uses localStorage for session management
- Simulated authentication for demo purposes
- Client-side route protection

### Production Recommendations
1. **Firebase Authentication**: Implement full Firebase Auth integration
2. **Secure API Keys**: Store API keys in environment variables
3. **Token-based Auth**: Use JWT tokens for API requests
4. **Role-based Access**: Implement admin role verification
5. **HTTPS Only**: Ensure all connections use HTTPS
6. **Session Timeout**: Add automatic session expiration
7. **Audit Logging**: Track all admin actions

## Usage

### Login
1. Navigate to `/admin-login`
2. Enter credentials or use Google login
3. Redirects to dashboard on success

### Managing Bookings
1. View all bookings on the dashboard
2. Use filters to find specific bookings
3. Click action buttons to update status
4. Use delete button to remove bookings (with confirmation)

### Logout
1. Click the "Logout" button in the header
2. Confirms before logging out
3. Redirects to login page

## Development

### Adding New Features
- Admin components are in `src/pages/Admin.jsx` and `src/pages/AdminLogin.jsx`
- Styles are in corresponding CSS files
- Routes are defined in `src/App.jsx`

### Testing
- Test authentication flow
- Verify API integration
- Check mobile responsiveness
- Test all CRUD operations

## Troubleshooting

### Cannot Login
- Check if credentials are correct
- Verify localStorage is enabled
- Check browser console for errors

### Bookings Not Loading
- Verify API endpoint is accessible
- Check API key configuration
- Ensure network connection is stable

### Actions Not Working
- Check API key permissions
- Verify booking ID is valid
- Check browser console for errors

## Future Enhancements
- Email notifications for status changes
- Export bookings to CSV/Excel
- Advanced analytics and reporting
- Bulk operations
- Custom status labels
- Booking notes and comments
- File attachments support

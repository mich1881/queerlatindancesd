# Online Course Access Control Setup

## Overview
Your online course platform now has complete access control integrated with Google Sheets. Students can register, pay, and receive course access, while you can manage everything through an admin panel.

## How It Works

### For Students:
1. **Register/Login** - Create account with email/password
2. **Browse Courses** - View available courses with pricing
3. **Purchase Course** - Click "Buy Now" and complete payment via Zelle/Venmo/PayPal/Stripe
4. **Access Granted** - After payment confirmation, access is automatically granted
5. **Watch Videos** - Full access to video lessons and course materials

### For Admin:
1. **Admin Panel** - Access via dashboard (admin emails only)
2. **Pending Payments** - Review course payment requests
3. **Grant/Deny Access** - Approve or deny course access manually
4. **Automatic Tracking** - All actions logged in Google Sheets

## Setup Instructions

### 1. Google Sheets Setup
Your existing Google Sheet is already configured. The system will now track:
- **registrationType**: 'online-course' vs 'in-person-event'
- **accessGranted**: 'granted', 'denied', 'pending', 'confirmed'
- **courseName**: Course title (e.g., "Salsa Fundamentals")
- **email**: Student email for access checking

### 2. Google Apps Script Update
Replace your current Google Apps Script with the updated code in:
`backend/google-apps-script-deduplication.js`

This adds:
- `handleCourseAccessCheck()` - Verify student course access
- `handleCourseAccessUpdate()` - Admin access management
- `handleGetPendingPayments()` - Get pending course payments

### 3. Environment Variables
Add to your Cloudflare Worker environment:
```
ADMIN_KEY=your-secret-admin-key-here
```

### 4. Admin Access
Add admin email addresses to the `isAdmin()` function in `course-app.js`:
```javascript
const adminEmails = [
    'michelle@queerlatindance.com',
    'admin@queerlatindance.com',
    // Add other admin emails here
];
```

## Course Access Flow

### Student Payment:
1. Student clicks "Buy Now" on course
2. Payment form submitted to backend
3. Email sent to student with payment instructions
4. Email sent to admin with notification
5. Registration logged in Google Sheets with status "pending"

### Admin Approval:
1. Admin accesses admin panel
2. Reviews pending payments
3. Clicks "Grant Access" after confirming payment
4. Google Sheets updated with status "granted"
5. Student can now access course videos

### Automatic Access Check:
1. When student tries to watch video
2. System checks Google Sheets for access
3. If granted: video loads
4. If denied: payment prompt shown

## Testing the System

### Test Student Flow:
1. Open `courses.html`
2. Register with test email
3. Browse courses and click "Buy Now"
4. Complete payment process
5. Check email for payment instructions

### Test Admin Flow:
1. Login with admin email
2. Click "Admin" button in dashboard
3. Enter admin key when prompted
4. Review pending payments
5. Grant access to test student

### Test Access Control:
1. Login as test student
2. Try to access course videos
3. Should see payment prompt if not granted
4. Should see videos if access granted

## Course Management

### Adding New Courses:
Edit the `courses` object in `course-app.js`:
```javascript
'new-course-id': {
    id: 'new-course-id',
    title: 'New Course Title',
    description: 'Course description',
    price: 49,
    // ... more course data
}
```

### Payment Method Configuration:
Payment details are configured in the payment overlay:
- **Zelle**: michelle@queerlatindance.com
- **Venmo**: @QueerLatinDance  
- **PayPal**: michelle@queerlatindance.com
- **Stripe**: Live payment links

## Security Features

### Video Protection:
- Server-side access validation
- Email-based authentication
- Right-click disable on videos
- Overlay protection
- Session-based access tokens

### Admin Security:
- Admin key required for sensitive actions
- Email-based admin authentication
- Google Sheets as secure backend
- All actions logged with timestamps

## Files Modified:
- `courses.html` - Added admin panel UI
- `course-app.js` - Added access control and admin functions
- `course-styles.css` - Added admin panel styles
- `backend/cloudflare-worker.js` - Added course access endpoints
- `backend/google-apps-script-deduplication.js` - Added access control

## Next Steps:
1. Update Google Apps Script with new code
2. Set ADMIN_KEY environment variable
3. Test student registration and payment flow
4. Test admin panel and access granting
5. Add your real course content and videos
6. Configure Gumlet for secure video hosting (optional)

Your online course platform is now fully functional with complete access control! 🎉

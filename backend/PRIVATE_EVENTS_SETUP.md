# Private Events Email Setup

Your private events form now uses the **same email system** as your payment forms!

## ✅ What Was Done

1. **Added new endpoint** to `backend/server.js`: `/api/private-events`
2. **Updated** `private-events.html` to submit to your Node.js backend
3. **Sends 2 emails** automatically:
   - Customer confirmation email
   - Admin notification email (with all event details)

## 🚀 How to Use

### If your backend is already running (for payment forms):
**Nothing else needed!** The private events form will now automatically send emails using your existing setup.

### If your backend is NOT running yet:

1. Make sure you have a `.env` file in the `backend/` folder with:
   ```
   EMAIL_USER=queerlatindancesd@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ADMIN_EMAIL=queerlatindancesd@gmail.com
   ```

2. Start your backend server:
   ```bash
   cd backend
   npm install
   npm start
   ```

3. Your server will run on `http://localhost:3000`

## 📧 Emails Sent

### Customer Confirmation Email
- **To**: Customer's email
- **Subject**: "Your Private Event Inquiry - Queer Latin Dance SD"
- **Contains**: 
  - Thank you message
  - Summary of their submission
  - Expected response time (24-48 hours)
  - Links to Instagram, events, gallery

### Admin Notification Email
- **To**: Your admin email (from .env)
- **Subject**: "🎉 New Private Event Inquiry - [Customer Name]"
- **Contains**: 
  - All form fields organized by section
  - Contact information
  - Event details
  - Venue information
  - Services & music preferences
  - Additional notes

## 🌐 For Production (Live Website)

Update line in `private-events.html` from:
```javascript
fetch('http://localhost:3000/api/private-events', {
```

To your live backend URL:
```javascript
fetch('https://your-backend-domain.com/api/private-events', {
```

## ✨ Benefits

- ✅ Same reliable email system as payment forms
- ✅ Instant email notifications
- ✅ Professional customer experience
- ✅ All form data in both emails
- ✅ No Google Apps Script needed!

## 🧪 Testing

1. Fill out the private events form
2. Click submit
3. Check:
   - Success message appears
   - Customer receives confirmation email
   - You receive admin notification email

---

**Note**: This uses your existing Node.js backend setup. If you're already getting emails for payment forms, this will work automatically!

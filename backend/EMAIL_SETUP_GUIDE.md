# Email Setup Guide for Private Event Form

This guide will help you set up email notifications for the "Book Us" (Private Events) form.

## 🎯 What This Does

When someone submits the private event inquiry form:
1. **Admin receives** a detailed notification with all form details
2. **User receives** a confirmation email with their submission summary

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Access Your Google Apps Script

1. Open your Google Sheets document (ID: `1hnC7FE6VtJHJE0hNLNY6j-xzY_xbZAhGmtpbhpOYDGc`)
2. Click **Extensions** → **Apps Script**
3. You should see your existing script code

### Step 2: Replace the Script Code

1. **Delete all existing code** in the Apps Script editor
2. **Copy the entire code** from: `backend/google-apps-script-with-email.js`
3. **Paste** it into the Apps Script editor

### Step 3: Configure Admin Email

At the top of the script (around line 10), find this line:

```javascript
const ADMIN_EMAIL = 'your-admin-email@example.com'; // ⚠️ UPDATE THIS!
```

**Replace it with your actual admin email:**

```javascript
const ADMIN_EMAIL = 'admin@queerlatindancesd.com';
```

Or whatever email address should receive the booking notifications.

### Step 4: Save and Deploy

1. Click **File** → **Save** (or press `Ctrl+S` / `Cmd+S`)
2. Click **Deploy** → **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Configure the deployment:
   - **Description:** "Private Event Email Notifications"
   - **Execute as:** Me
   - **Who has access:** Anyone
6. Click **Deploy**
7. Click **Authorize access**
8. Choose your Google account
9. Click **Advanced** → **Go to [Your Project Name] (unsafe)**
10. Click **Allow**
11. **Copy the Web App URL** - it should look like:
    ```
    https://script.google.com/macros/s/AKfycby.../exec
    ```

### Step 5: Update the Form (if needed)

The form in `private-events.html` should already be pointing to the correct endpoint. If you need to update it:

1. Open `private-events.html`
2. Find the `<form>` tag (around line 238)
3. Ensure the `action` attribute matches your Web App URL from Step 4

---

## 🧪 Testing the Email Notifications

### Test the Form Submission

1. Open `private-events.html` in your browser
2. Fill out the form with test data
3. Use a **real email address you can access** for testing
4. Submit the form

### What Should Happen

✅ **Immediate:**
- You see a success message: "Thank you! Your inquiry has been submitted..."
- The form clears

✅ **Within 1-2 minutes:**
- Admin email receives a detailed notification with all form data
- User email receives a confirmation message

### Troubleshooting

**If emails are not being sent:**

1. **Check the Apps Script execution log:**
   - In Apps Script editor, click **Executions** in the left sidebar
   - Look for recent executions
   - Check for any error messages

2. **Verify admin email:**
   - Make sure `ADMIN_EMAIL` is set correctly (no typos)
   - Check your spam folder

3. **Check Google Apps Script quotas:**
   - Free Gmail accounts: 100 emails/day
   - Google Workspace: 1,500 emails/day

4. **Test the script manually:**
   - In Apps Script editor, create a test function:
   ```javascript
   function testEmail() {
     MailApp.sendEmail({
       to: 'your-email@example.com',
       subject: 'Test Email',
       body: 'This is a test!'
     });
   }
   ```
   - Click the **Run** button (▶️)
   - Check your email

---

## 📧 Email Templates

### Admin Email Example

```
Subject: New Private Event Inquiry - John Doe

You have received a new private event booking inquiry!

═══════════════════════════════════════════
CONTACT INFORMATION
═══════════════════════════════════════════
Full Name: John Doe
Email: john@example.com
Phone: (555) 123-4567
Preferred Contact: Email

═══════════════════════════════════════════
EVENT DETAILS
═══════════════════════════════════════════
Event Type: Wedding
Event Name/Occasion: Smith Wedding
Event Date: 2024-06-15
Start Time: 18:00
End Time: 23:00
Event Duration: 5 hours

[... rest of form data ...]
```

### User Confirmation Example

```
Subject: Your Private Event Inquiry - Queer Latin Dance SD

Hi John Doe!

Thank you for your interest in booking Queer Latin Dance SD for your event!

We've received your inquiry and our team will review the details 
and get back to you within 24-48 hours.

═══════════════════════════════════════════
YOUR SUBMISSION SUMMARY
═══════════════════════════════════════════

Event: Smith Wedding
Date: 2024-06-15
Time: 18:00 - 23:00
Venue: Grand Ballroom
Expected Guests: 150

Services Requested: DJ Services, Sound System, Lighting

[... additional details ...]
```

---

## 🔧 Customization Options

### Change Email Templates

Edit the email text in these functions:
- `sendAdminNotification()` - Admin email template
- `sendUserConfirmation()` - User confirmation template

### Change Reply-To Address

In `sendUserConfirmation()`, the user's email will have a `replyTo` field set to `ADMIN_EMAIL`, so when they reply, it goes to the admin.

### Add Additional Recipients

To send copies to multiple admins:

```javascript
const ADMIN_EMAIL = 'admin1@example.com,admin2@example.com';
```

Or use `cc`:

```javascript
MailApp.sendEmail({
  to: ADMIN_EMAIL,
  cc: 'manager@example.com',
  subject: subject,
  body: body
});
```

---

## 🔒 Security & Privacy

- The script only sends emails for form submissions
- User emails are stored in Google Sheets (already configured)
- Email sending uses Google's MailApp service (secure)
- No email addresses are exposed to the website visitors

---

## 📊 Monitoring

### View Email Logs

1. Go to Apps Script editor
2. Click **Executions** in left sidebar
3. See all script runs and their status

### View Form Submissions

All submissions are logged to your Google Sheet automatically.

---

## ✅ Checklist

Before going live, verify:

- [ ] Admin email configured correctly (`ADMIN_EMAIL`)
- [ ] Script saved and deployed as Web App
- [ ] Form action URL matches deployment URL
- [ ] Test submission sent successfully
- [ ] Admin received test email
- [ ] User received confirmation email
- [ ] Both emails look correct (no formatting issues)
- [ ] Data appears in Google Sheets

---

## 💡 Tips

1. **Test with multiple email providers** (Gmail, Yahoo, Outlook) to ensure deliverability
2. **Check spam folders** during testing
3. **Consider adding a logo** to emails (requires HTML emails instead of plain text)
4. **Set up email filters** in your admin inbox to organize inquiries
5. **Create email templates** in your email client for quick responses

---

## 🆘 Support

If you encounter issues:

1. Check the **Executions** log in Apps Script
2. Review the **Google Sheets** to see if data is being recorded
3. Test email sending with a simple test function
4. Verify the deployment is set to "Anyone" access
5. Check Google Apps Script service status

---

## 📚 Additional Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [MailApp Class Reference](https://developers.google.com/apps-script/reference/mail/mail-app)
- [Troubleshooting Guide](https://developers.google.com/apps-script/guides/support)

---

**Last Updated:** January 2024

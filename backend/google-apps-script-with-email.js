// Google Apps Script code to handle form submissions with deduplication AND EMAIL NOTIFICATIONS
// This script handles:
// 1. Form submissions from private-events.html
// 2. Course access control
// 3. Email notifications for both admin and users

// ===== CONFIGURATION =====
// Replace this with the admin email address that should receive notifications
const ADMIN_EMAIL = 'queerlatindancesd@gmail.com';

// The name that will appear in "From" field
const FROM_NAME = 'Queer Latin Dance SD';

// ===== MAIN HANDLERS =====

function doGet(e) {
  // Handle GET requests for course access checking
  try {
    const action = e.parameter.action;
    
    if (action === 'checkCourseAccess') {
      return handleCourseAccessCheck(e);
    } else if (action === 'getPendingPayments') {
      return handleGetPendingPayments(e);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Unknown action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('GET request error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // Log incoming data for debugging
    console.log('Received POST submission:', e.parameter);
    
    // Get form data
    const formData = e.parameter;
    
    // Handle course access updates (admin actions)
    if (formData.action === 'updateCourseAccess') {
      return handleCourseAccessUpdate(formData);
    }
    
    // Handle regular form submissions (event/course registrations)
    // Open the spreadsheet by ID
    const sheet = SpreadsheetApp.openById('1hnC7FE6VtJHJE0hNLNY6j-xzY_xbZAhGmtpbhpOYDGc').getActiveSheet();
    
    // Check for deduplication - if we have deduplicationKey, check for duplicates
    if (formData.deduplicationKey) {
      console.log('Checking for duplicate:', formData.deduplicationKey);
      
      // Get all data in the sheet
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      
      // Check if we have a header row and find the deduplication column
      if (values.length > 0) {
        const headers = values[0];
        const dedupeColIndex = headers.indexOf('deduplicationKey');
        
        // If deduplication column exists, check for duplicates
        if (dedupeColIndex >= 0) {
          for (let i = 1; i < values.length; i++) {
            if (values[i][dedupeColIndex] === formData.deduplicationKey) {
              console.log('Duplicate entry found, skipping:', formData.deduplicationKey);
              return ContentService
                .createTextOutput(JSON.stringify({ 
                  success: true, 
                  message: 'Duplicate submission detected, skipped' 
                }))
                .setMimeType(ContentService.MimeType.JSON);
            }
          }
        }
      }
    }
    
    // If no duplicate found, proceed with insertion
    const timestamp = new Date().toISOString();
    
    // Determine if this is a private event inquiry based on the form fields
    const isPrivateEvent = formData.eventType === 'Private Event' || 
                          formData.fullName || 
                          formData.eventDate;
    
    // Create row data based on event type
    let rowData;
    
    if (isPrivateEvent) {
      // Handle private event form data
      rowData = createPrivateEventRow(formData, timestamp);
      
      // Send email notifications for private event
      try {
        sendPrivateEventEmails(formData);
        console.log('Private event emails sent successfully');
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Continue with form submission even if email fails
      }
    } else {
      // Handle regular course registration
      rowData = [
        timestamp,
        formData.firstName || '',
        formData.lastName || '',
        formData.email || '',
        formData.phone || '',
        formData.pronouns || '',
        formData.paymentMethod || '',
        formData.series || '',
        formData.amount || '',
        formData.date || '',
        formData.time || '',
        formData.submissionId || '',
        formData.deduplicationKey || '',
        formData.timestamp || timestamp
      ];
    }
    
    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      const headers = isPrivateEvent ? 
        createPrivateEventHeaders() :
        [
          'Timestamp',
          'First Name',
          'Last Name', 
          'Email',
          'Phone',
          'Pronouns',
          'Payment Method',
          'Series',
          'Amount',
          'Date',
          'Time',
          'Submission ID',
          'Deduplication Key',
          'Form Timestamp'
        ];
      sheet.appendRow(headers);
    }
    
    // Append the data
    sheet.appendRow(rowData);
    
    console.log('Form data successfully added to sheet');
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== EMAIL FUNCTIONS FOR PRIVATE EVENT FORM =====

function sendPrivateEventEmails(formData) {
  // Send email to admin
  sendAdminNotification(formData);
  
  // Send confirmation email to user
  sendUserConfirmation(formData);
}

function sendAdminNotification(formData) {
  const subject = `New Private Event Inquiry - ${formData.fullName}`;
  
  const body = `
You have received a new private event booking inquiry!

═══════════════════════════════════════════
CONTACT INFORMATION
═══════════════════════════════════════════
Full Name: ${formData.fullName || 'N/A'}
Email: ${formData.email || 'N/A'}
Phone: ${formData.phone || 'N/A'}
Preferred Contact: ${formData.preferredContact || 'N/A'}

═══════════════════════════════════════════
EVENT DETAILS
═══════════════════════════════════════════
Event Type: ${formData.eventType || 'N/A'}
Event Name/Occasion: ${formData.eventName || 'N/A'}
Event Date: ${formData.eventDate || 'N/A'}
Start Time: ${formData.startTime || 'N/A'}
End Time: ${formData.endTime || 'N/A'}
Event Duration: ${formData.eventDuration || 'N/A'}

═══════════════════════════════════════════
VENUE INFORMATION
═══════════════════════════════════════════
Venue Name: ${formData.venueName || 'N/A'}
Venue Address: ${formData.venueAddress || 'N/A'}
Venue Type: ${formData.venueType || 'N/A'}
Expected Guests: ${formData.expectedGuests || 'N/A'}
Age Range: ${formData.ageRange || 'N/A'}
Dance Floor: ${formData.danceFloor || 'N/A'}

═══════════════════════════════════════════
SERVICES & MUSIC
═══════════════════════════════════════════
Services Needed: ${formData.services || 'N/A'}
Music Preferences: ${formData.musicPreferences || 'N/A'}
Do Not Play: ${formData.doNotPlay || 'N/A'}
Dance Lesson Interest: ${formData.lessonInterest || 'N/A'}
Lesson Duration: ${formData.lessonDuration || 'N/A'}

═══════════════════════════════════════════
ADDITIONAL INFORMATION
═══════════════════════════════════════════
Venue Booked: ${formData.venueBooked || 'N/A'}
On-Site Contact: ${formData.onsiteContact || 'N/A'}
How They Heard About Us: ${formData.hearAboutUs || 'N/A'}
Additional Notes: ${formData.additionalNotes || 'N/A'}

═══════════════════════════════════════════

This inquiry was submitted on ${new Date().toLocaleString('en-US', { 
  timeZone: 'America/Los_Angeles',
  dateStyle: 'full',
  timeStyle: 'short'
})}.

Please respond to ${formData.email} as soon as possible!
`;

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    body: body,
    name: FROM_NAME
  });
  
  console.log('Admin notification sent to:', ADMIN_EMAIL);
}

function sendUserConfirmation(formData) {
  const userEmail = formData.email;
  
  if (!userEmail) {
    console.log('No user email provided, skipping user confirmation');
    return;
  }
  
  const subject = 'Your Private Event Inquiry - Queer Latin Dance SD';
  
  const body = `
Hi ${formData.fullName || 'there'}!

Thank you for your interest in booking Queer Latin Dance SD for your event!

We've received your inquiry and our team will review the details and get back to you within 24-48 hours.

═══════════════════════════════════════════
YOUR SUBMISSION SUMMARY
═══════════════════════════════════════════

Event: ${formData.eventName || 'N/A'}
Date: ${formData.eventDate || 'N/A'}
Time: ${formData.startTime || 'N/A'} - ${formData.endTime || 'N/A'}
Venue: ${formData.venueName || 'N/A'}
Expected Guests: ${formData.expectedGuests || 'N/A'}

Services Requested: ${formData.services || 'N/A'}

═══════════════════════════════════════════

In the meantime, feel free to:
• Check out our Instagram: @queerlatindancesd
• Browse our upcoming events: https://queerlatindancesd.com/events
• Explore our gallery: https://queerlatindancesd.com/gallery

If you have any urgent questions, please reply to this email or call us directly.

Looking forward to making your event unforgettable!

Best regards,
The Queer Latin Dance SD Team

---
This is an automated confirmation. Please do not reply to this email directly.
`;

  MailApp.sendEmail({
    to: userEmail,
    subject: subject,
    body: body,
    name: FROM_NAME,
    replyTo: ADMIN_EMAIL
  });
  
  console.log('User confirmation sent to:', userEmail);
}

// ===== HELPER FUNCTIONS FOR PRIVATE EVENT DATA =====

function createPrivateEventHeaders() {
  return [
    'Timestamp',
    'Event Type',
    'Full Name',
    'Email',
    'Phone',
    'Preferred Contact',
    'Event Name',
    'Event Date',
    'Start Time',
    'End Time',
    'Event Duration',
    'Venue Name',
    'Venue Address',
    'Venue Type',
    'Expected Guests',
    'Age Range',
    'Dance Floor',
    'Services Needed',
    'Music Preferences',
    'Do Not Play',
    'Lesson Interest',
    'Lesson Duration',
    'Venue Booked',
    'On-Site Contact',
    'How Heard About Us',
    'Additional Notes'
  ];
}

function createPrivateEventRow(formData, timestamp) {
  return [
    timestamp,
    formData.eventType || 'Private Event',
    formData.fullName || '',
    formData.email || '',
    formData.phone || '',
    formData.preferredContact || '',
    formData.eventName || '',
    formData.eventDate || '',
    formData.startTime || '',
    formData.endTime || '',
    formData.eventDuration || '',
    formData.venueName || '',
    formData.venueAddress || '',
    formData.venueType || '',
    formData.expectedGuests || '',
    formData.ageRange || '',
    formData.danceFloor || '',
    formData.services || '',
    formData.musicPreferences || '',
    formData.doNotPlay || '',
    formData.lessonInterest || '',
    formData.lessonDuration || '',
    formData.venueBooked || '',
    formData.onsiteContact || '',
    formData.hearAboutUs || '',
    formData.additionalNotes || ''
  ];
}

// ===== DEDUPLICATION CLEANUP =====

// Optional: Function to clean up old deduplication entries (run periodically)
function cleanupOldDuplicateEntries() {
  try {
    const sheet = SpreadsheetApp.openById('1hnC7FE6VtJHJE0hNLNY6j-xzY_xbZAhGmtpbhpOYDGc').getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    if (values.length <= 1) return; // No data to clean
    
    const headers = values[0];
    const timestampIndex = headers.indexOf('Timestamp');
    const dedupeIndex = headers.indexOf('Deduplication Key');
    
    if (timestampIndex < 0 || dedupeIndex < 0) return;
    
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    // Find and remove entries older than 1 hour that have the same deduplication key
    const seenKeys = new Set();
    const rowsToDelete = [];
    
    for (let i = values.length - 1; i >= 1; i--) {
      const row = values[i];
      const timestamp = new Date(row[timestampIndex]);
      const dedupeKey = row[dedupeIndex];
      
      if (dedupeKey && timestamp < oneHourAgo && seenKeys.has(dedupeKey)) {
        rowsToDelete.push(i + 1); // +1 for 1-based sheet indexing
      } else if (dedupeKey) {
        seenKeys.add(dedupeKey);
      }
    }
    
    // Delete rows (in reverse order to maintain indices)
    rowsToDelete.forEach(rowIndex => {
      sheet.deleteRow(rowIndex);
    });
    
    console.log(`Cleaned up ${rowsToDelete.length} duplicate entries`);
    
  } catch (error) {
    console.error('Error cleaning up duplicate entries:', error);
  }
}

// ===== COURSE ACCESS CONTROL FUNCTIONS =====

function handleCourseAccessCheck(e) {
  try {
    const email = e.parameter.email;
    const courseId = e.parameter.courseId;
    
    console.log('Checking course access for:', email, courseId);
    
    const sheet = SpreadsheetApp.openById('1hnC7FE6VtJHJE0hNLNY6j-xzY_xbZAhGmtpbhpOYDGc').getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    if (values.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          hasAccess: false,
          courses: [],
          message: 'No registrations found'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = values[0];
    const emailIndex = headers.indexOf('email');
    const courseNameIndex = Math.max(
      headers.indexOf('courseName'),
      headers.indexOf('series')
    );
    const statusIndex = Math.max(
      headers.indexOf('accessGranted'),
      headers.indexOf('status'),
      headers.indexOf('paymentConfirmed')
    );
    const typeIndex = headers.indexOf('registrationType');
    
    console.log('Column indices:', { emailIndex, courseNameIndex, statusIndex, typeIndex });
    
    if (emailIndex < 0 || courseNameIndex < 0) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Required columns not found in spreadsheet'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const ownedCourses = [];
    let hasSpecificCourseAccess = false;
    
    // Check each row for this user's course access
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const rowEmail = row[emailIndex];
      const rowCourse = row[courseNameIndex];
      const rowStatus = statusIndex >= 0 ? row[statusIndex] : '';
      const rowType = typeIndex >= 0 ? row[typeIndex] : '';
      
      // Only check online course registrations
      if (rowEmail === email && (rowType === 'online-course' || !rowType)) {
        const isAccessGranted = rowStatus === 'granted' || 
                               rowStatus === 'confirmed' || 
                               rowStatus === 'paid' ||
                               rowStatus === true ||
                               rowStatus === 'TRUE';
        
        if (isAccessGranted) {
          const courseKey = convertCourseNameToId(rowCourse);
          if (!ownedCourses.includes(courseKey)) {
            ownedCourses.push(courseKey);
          }
          
          // Check if this matches the specific course requested
          if (courseId && courseKey === courseId) {
            hasSpecificCourseAccess = true;
          }
        }
      }
    }
    
    console.log('Found owned courses:', ownedCourses);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        hasAccess: courseId ? hasSpecificCourseAccess : ownedCourses.length > 0,
        courses: ownedCourses,
        accessType: ownedCourses.length > 0 ? 'granted' : 'none',
        message: `Found ${ownedCourses.length} accessible courses`
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Course access check error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleCourseAccessUpdate(formData) {
  try {
    console.log('Updating course access:', formData);
    
    const sheet = SpreadsheetApp.openById('1hnC7FE6VtJHJE0hNLNY6j-xzY_xbZAhGmtpbhpOYDGc').getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    if (values.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'No data found in spreadsheet'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = values[0];
    const emailIndex = headers.indexOf('email');
    const courseNameIndex = Math.max(
      headers.indexOf('courseName'),
      headers.indexOf('series')
    );
    
    // Add status column if it doesn't exist
    let statusIndex = Math.max(
      headers.indexOf('accessGranted'),
      headers.indexOf('status'),
      headers.indexOf('paymentConfirmed')
    );
    
    if (statusIndex < 0) {
      // Add new column for status
      statusIndex = headers.length;
      sheet.getRange(1, statusIndex + 1).setValue('accessGranted');
    }
    
    let updated = false;
    const targetCourseName = convertCourseIdToName(formData.courseId);
    
    // Find and update the matching row
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const rowEmail = row[emailIndex];
      const rowCourse = row[courseNameIndex];
      
      if (rowEmail === formData.email && 
          (rowCourse === targetCourseName || 
           rowCourse === formData.courseId ||
           convertCourseNameToId(rowCourse) === formData.courseId)) {
        
        const newStatus = formData.accessAction === 'grant' ? 'granted' : 
                         formData.accessAction === 'deny' ? 'denied' : 
                         formData.accessAction === 'confirm-payment' ? 'confirmed' : 'pending';
        
        sheet.getRange(i + 1, statusIndex + 1).setValue(newStatus);
        
        // Add timestamp for the update
        const timestampIndex = headers.indexOf('lastUpdated');
        if (timestampIndex >= 0) {
          sheet.getRange(i + 1, timestampIndex + 1).setValue(new Date().toISOString());
        }
        
        updated = true;
        console.log(`Updated course access for ${formData.email}: ${newStatus}`);
      }
    }
    
    if (!updated) {
      // If no existing registration found, create a new row (for manual grants)
      if (formData.accessAction === 'grant') {
        const newRow = Array(headers.length).fill('');
        newRow[emailIndex] = formData.email;
        newRow[courseNameIndex] = targetCourseName;
        newRow[statusIndex] = 'granted';
        
        const timestampIndex = headers.indexOf('timestamp');
        if (timestampIndex >= 0) {
          newRow[timestampIndex] = new Date().toISOString();
        }
        
        const typeIndex = headers.indexOf('registrationType');
        if (typeIndex >= 0) {
          newRow[typeIndex] = 'online-course';
        }
        
        sheet.appendRow(newRow);
        updated = true;
        console.log(`Created new course access grant for ${formData.email}`);
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: updated,
        message: updated ? 'Course access updated successfully' : 'No matching registration found'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Course access update error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleGetPendingPayments(e) {
  try {
    console.log('Getting pending payments');
    
    const sheet = SpreadsheetApp.openById('1hnC7FE6VtJHJE0hNLNY6j-xzY_xbZAhGmtpbhpOYDGc').getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    if (values.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          payments: []
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = values[0];
    const pendingPayments = [];
    
    // Find relevant columns
    const emailIndex = headers.indexOf('email');
    const firstNameIndex = headers.indexOf('firstName');
    const lastNameIndex = headers.indexOf('lastName');
    const courseNameIndex = Math.max(
      headers.indexOf('courseName'),
      headers.indexOf('series')
    );
    const paymentMethodIndex = headers.indexOf('paymentMethod');
    const timestampIndex = headers.indexOf('timestamp');
    const statusIndex = Math.max(
      headers.indexOf('accessGranted'),
      headers.indexOf('status'),
      headers.indexOf('paymentConfirmed')
    );
    const typeIndex = headers.indexOf('registrationType');
    const priceIndex = Math.max(
      headers.indexOf('price'),
      headers.indexOf('amount')
    );
    
    // Process each row to find pending online course payments
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const rowType = typeIndex >= 0 ? row[typeIndex] : '';
      const rowStatus = statusIndex >= 0 ? row[statusIndex] : '';
      
      // Check if this is a pending online course payment
      if (rowType === 'online-course' && 
          (rowStatus === 'pending' || rowStatus === '' || !rowStatus)) {
        
        const payment = {
          email: emailIndex >= 0 ? row[emailIndex] : '',
          firstName: firstNameIndex >= 0 ? row[firstNameIndex] : '',
          lastName: lastNameIndex >= 0 ? row[lastNameIndex] : '',
          courseName: courseNameIndex >= 0 ? row[courseNameIndex] : '',
          courseId: courseNameIndex >= 0 ? convertCourseNameToId(row[courseNameIndex]) : '',
          paymentMethod: paymentMethodIndex >= 0 ? row[paymentMethodIndex] : '',
          timestamp: timestampIndex >= 0 ? row[timestampIndex] : '',
          status: rowStatus || 'pending',
          amount: priceIndex >= 0 ? row[priceIndex] : ''
        };
        
        if (payment.email && payment.courseName) {
          pendingPayments.push(payment);
        }
      }
    }
    
    console.log(`Found ${pendingPayments.length} pending payments`);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        payments: pendingPayments
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Get pending payments error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper functions to convert between course names and IDs
function convertCourseNameToId(courseName) {
  if (!courseName) return '';
  
  return courseName.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function convertCourseIdToName(courseId) {
  // Map common course IDs back to display names
  const courseMap = {
    'salsa-fundamentals': 'Salsa Fundamentals',
    'bachata-basics': 'Bachata Basics',
    'queer-latin-styling': 'Queer Latin Styling'
  };
  
  return courseMap[courseId] || courseId.replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

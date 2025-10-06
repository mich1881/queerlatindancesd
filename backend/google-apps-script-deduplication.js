// Google Apps Script code to handle form submissions with deduplication
// Replace your existing Google Apps Script with this code

function doPost(e) {
  try {
    // Log incoming data for debugging
    console.log('Received form submission:', e.parameter);
    
    // Open the spreadsheet by ID
    const sheet = SpreadsheetApp.openById('1hnC7FE6VtJHJE0hNLNY6j-xzY_xbZAhGmtpbhpOYDGc').getActiveSheet();
    
    // Get form data
    const formData = e.parameter;
    
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
    
    // Create row data - adjust order based on your spreadsheet columns
    const rowData = [
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
    
    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      const headers = [
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

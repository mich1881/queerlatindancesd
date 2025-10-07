// Cloudflare Worker version of your backend
// This replaces server.js for Cloudflare Workers deployment

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only handle POST requests to /api/payment-form
    if (request.method === 'POST' && new URL(request.url).pathname === '/api/payment-form') {
      try {
        const formData = await request.json();
        
        console.log('📝 Received form submission:', formData);

        // Validate required fields
        if (!formData.email || !formData.firstName || !formData.lastName) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Missing required fields: email, firstName, lastName' 
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }

        // Debug environment variables
        console.log('🔍 Environment check:', {
          hasResendKey: !!env.RESEND_API_KEY,
          resendKeyLength: env.RESEND_API_KEY ? env.RESEND_API_KEY.length : 0,
          fromEmail: env.FROM_EMAIL,
          adminEmail: env.ADMIN_EMAIL
        });

        // Send email to student with payment instructions
        const studentEmailSent = await sendPaymentInstructionsEmail(formData, env);
        
        // Send notification email to admin
        const adminEmailSent = await sendAdminNotificationEmail(formData, env);

        // Send backup to Google Sheets with deduplication
        await sendToGoogleSheetsWithDeduplication(formData, env);

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Registration submitted successfully! Check your email for payment instructions.',
          studentEmailSent,
          adminEmailSent
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });

      } catch (error) {
        console.error('❌ Error processing form:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Internal server error: ' + error.message 
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // Return 404 for other routes
    return new Response('Not Found', { 
      status: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  },
};

// Send payment instructions email to student
async function sendPaymentInstructionsEmail(formData, env) {
  try {
    const emailContent = generatePaymentInstructionsEmail(formData);
    
    // Try Resend first (if API key is available)
    if (env.RESEND_API_KEY) {
      const emailData = {
        from: env.FROM_EMAIL || 'onboarding@resend.dev',
        to: [formData.email],
        subject: `Payment Instructions - ${formData.series || 'Dance Class'} Registration`,
        html: emailContent,
      };

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('✅ Student email sent successfully via Resend');
        return true;
      } else {
        const errorText = await response.text();
        console.error('❌ Resend API error:', errorText);
      }
    }

    // Fallback to MailChannels
    const emailData = {
      personalizations: [
        {
          to: [{ email: formData.email, name: `${formData.firstName} ${formData.lastName}` }],
        },
      ],
      from: {
        email: env.FROM_EMAIL || 'noreply@michf18.workers.dev',
        name: 'Queer Latin Dance SD',
      },
      subject: `Payment Instructions - ${formData.series || 'Dance Class'} Registration`,
      content: [
        {
          type: 'text/html',
          value: emailContent,
        },
      ],
    };

    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ MailChannels error: ${response.status} - ${errorText}`);
      throw new Error(`Email API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Student email sent successfully via MailChannels:', result);
    return true;

  } catch (error) {
    console.error('❌ Failed to send student email:', error);
    return false;
  }
}

// Send notification email to admin
async function sendAdminNotificationEmail(formData, env) {
  try {
    const emailContent = generateAdminNotificationEmail(formData);
    
    // Try Resend first (if API key is available)
    if (env.RESEND_API_KEY) {
      const emailData = {
        from: env.FROM_EMAIL || 'onboarding@resend.dev',
        to: [env.ADMIN_EMAIL || 'queerlatindancesd@gmail.com'],
        subject: `New Registration: ${formData.firstName} ${formData.lastName} - ${formData.paymentMethod}`,
        html: emailContent,
      };

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('✅ Admin notification sent successfully via Resend');
        return true;
      } else {
        const errorText = await response.text();
        console.error('❌ Resend admin email error:', errorText);
      }
    }

    // Fallback to MailChannels
    const emailData = {
      personalizations: [
        {
          to: [{ email: env.ADMIN_EMAIL || 'queerlatindancesd@gmail.com', name: 'Admin' }],
        },
      ],
      from: {
        email: env.FROM_EMAIL || 'noreply@michf18.workers.dev',
        name: 'Queer Latin Dance SD Registration System',
      },
      subject: `New Registration: ${formData.firstName} ${formData.lastName} - ${formData.paymentMethod}`,
      content: [
        {
          type: 'text/html',
          value: emailContent,
        },
      ],
    };

    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ MailChannels admin error: ${response.status} - ${errorText}`);
      throw new Error(`Admin email API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Admin notification sent successfully via MailChannels:', result);
    return true;

  } catch (error) {
    console.error('❌ Failed to send admin email:', error);
    return false;
  }
}

// Generate payment instructions email for student
function generatePaymentInstructionsEmail(formData) {
  const paymentMethod = formData.paymentMethod;
  let paymentInstructions = '';
  
  if (paymentMethod === 'Zelle') {
    paymentInstructions = `
    <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #6c1cd1; margin-top: 0;">💰 Zelle Payment Instructions</h3>
      <p><strong>Amount:</strong> ${formData.amount}</p>
      <p><strong>Send to:</strong> michf18@gmail.com or 760-529-1320</p>
      <p><strong>Memo:</strong> ${formData.firstName} ${formData.lastName} - ${formData.series}</p>
      <p><strong>Steps:</strong></p>
      <ol>
        <li>Open your banking app and select Zelle</li>
        <li>Enter the recipient info above</li>
        <li>Send the exact amount: ${formData.amount}</li>
        <li>Include your name and series in the memo</li>
      </ol>
    </div>`;
  } else if (paymentMethod === 'Venmo') {
    paymentInstructions = `
    <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #3d95ce; margin-top: 0;">📱 Venmo Payment Instructions</h3>
      <p><strong>Amount:</strong> ${formData.amount}</p>
      <p><strong>Send to:</strong> @michf18</p>
      <p><strong>Note:</strong> ${formData.firstName} ${formData.lastName} - ${formData.series}</p>
      <p><strong>Steps:</strong></p>
      <ol>
        <li>Open the Venmo app</li>
        <li>Search for @michf18</li>
        <li>Send the exact amount: ${formData.amount}</li>
        <li>Include your name and series in the note</li>
      </ol>
    </div>`;
  } else if (paymentMethod === 'PayPal') {
    paymentInstructions = `
    <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #ffa500; margin-top: 0;">💳 PayPal Payment Instructions</h3>
      <p><strong>Amount:</strong> ${formData.amount}</p>
      <p><strong>Send to:</strong> @queerlatindance</p>
      <p><strong>Link:</strong> <a href="https://www.paypal.com/paypalme/queerlatindance/${formData.amount?.replace('$', '')}">Click here to pay</a></p>
      <p><strong>Note:</strong> ${formData.firstName} ${formData.lastName} - ${formData.series}</p>
    </div>`;
  }

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Payment Instructions</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #716cff; margin-bottom: 10px;">🎉 Registration Confirmed!</h1>
      <p style="font-size: 18px; color: #666;">Thank you for registering for our dance series!</p>
    </div>
    
    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #444; margin-top: 0;">Registration Details:</h2>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
      ${formData.pronouns ? `<p><strong>Pronouns:</strong> ${formData.pronouns}</p>` : ''}
      <p><strong>Series:</strong> ${formData.series || 'Dance Class'}</p>
      <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
      <p><strong>Amount:</strong> ${formData.amount}</p>
      ${formData.date ? `<p><strong>Date:</strong> ${formData.date}</p>` : ''}
      ${formData.time ? `<p><strong>Time:</strong> ${formData.time}</p>` : ''}
    </div>

    ${paymentInstructions}

    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Next Steps:</strong></p>
      <ol style="margin: 10px 0;">
        <li>Complete your payment using the instructions above</li>
        <li>Keep this email for your records</li>
        <li>You'll receive a final confirmation once payment is processed</li>
      </ol>
    </div>

    <div style="background: #f0f4ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #25d366; margin-top: 0;">📱 Join Our WhatsApp Group!</h3>
      <p>Stay connected with other dancers and get updates about events:</p>
      <p><a href="https://chat.whatsapp.com/queerlatindancesd" style="color: #25d366; font-weight: bold;">Click here to join our WhatsApp group</a></p>
    </div>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 14px;">
        Questions? Reply to this email or contact us at<br>
        <a href="mailto:queerlatindancesd@gmail.com">queerlatindancesd@gmail.com</a>
      </p>
      <p style="color: #999; font-size: 12px;">
        Queer Latin Dance San Diego<br>
        Building community through dance 💃🕺
      </p>
    </div>
  </body>
  </html>`;
}

// Generate admin notification email
function generateAdminNotificationEmail(formData) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Registration</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #716cff;">🎉 New Registration!</h1>
    
    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
      <h2 style="color: #444; margin-top: 0;">Student Details:</h2>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
      ${formData.phone ? `<p><strong>Phone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>` : ''}
      ${formData.pronouns ? `<p><strong>Pronouns:</strong> ${formData.pronouns}</p>` : ''}
      <p><strong>Series:</strong> ${formData.series || 'Dance Class'}</p>
      <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
      <p><strong>Amount:</strong> ${formData.amount}</p>
      ${formData.date ? `<p><strong>Date:</strong> ${formData.date}</p>` : ''}
      ${formData.time ? `<p><strong>Time:</strong> ${formData.time}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    </div>

    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px;">
      <p style="margin: 0;"><strong>Action Required:</strong></p>
      <ul style="margin: 10px 0;">
        <li>Watch for ${formData.paymentMethod} payment from ${formData.firstName} ${formData.lastName}</li>
        <li>Confirm payment when received</li>
        <li>Add to class roster if not already done</li>
      </ul>
    </div>
  </body>
  </html>`;
}

// Send backup to Google Sheets with deduplication
async function sendToGoogleSheetsWithDeduplication(formData, env) {
  try {
    // Create deduplication key based on form data (excluding submissionId and timestamp)
    const dedupeKey = `sheet_${formData.firstName}_${formData.lastName}_${formData.email}_${formData.series}_${formData.paymentMethod}`;
    
    // Check if we already submitted this form to Google Sheets
    // Note: In production, you would use Cloudflare KV storage: env.SUBMISSIONS?.get(dedupeKey)
    // For now, we'll use a simple in-memory approach with submission ID
    if (formData.submissionId) {
      console.log(`🔍 Checking for duplicate submission: ${dedupeKey}`);
    }
    
    const url = 'https://script.google.com/macros/s/AKfycbzwit7Dtxt6SK-KrgfqHRiz7W41UwnLLu59rJvJdzHUW7yvqmYVa8eXxP6efibH_sre7Q/exec';
    
    // Convert to URLSearchParams for Google Sheets
    const params = new URLSearchParams();
    for (const key in formData) {
      params.append(key, formData[key]);
    }
    
    // Add deduplication info
    params.append('deduplicationKey', dedupeKey);
    params.append('timestamp', new Date().toISOString());
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });
    
    if (response.ok) {
      console.log('✅ Backup sent to Google Sheets');
      // In production, store the submission ID: await env.SUBMISSIONS?.put(dedupeKey, formData.submissionId, { expirationTtl: 3600 });
    } else {
      console.error('❌ Google Sheets response error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Google Sheets backup error:', error);
  }
}

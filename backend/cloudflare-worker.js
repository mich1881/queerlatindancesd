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
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;

    // ============================================================
    // ADMIN: manually add a registration
    // ============================================================
    if (pathname === '/api/admin/add-registration' && request.method === 'POST') {
      if (!await verifyAdmin(request, env.ADMIN_KV)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
      const body = await request.json();
      const regId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const regRecord = {
        id: regId,
        firstName: body.firstName || '',
        lastName: body.lastName || '',
        email: body.email || '',
        phone: body.phone || '',
        pronouns: body.pronouns || '',
        role: body.role || '',
        series: body.series || '',
        amount: body.amount || '',
        paymentMethod: body.paymentMethod || 'Manual',
        submittedAt: new Date().toISOString(),
        status: body.status || 'pending',
        creditsTotal: body.creditsTotal || 0,
        creditsRemaining: body.creditsRemaining || 0,
        attendance: [],
        addedManually: true
      };
      // If admin already verified, set credits
      if (body.status === 'verified' && body.credits) {
        regRecord.creditsTotal = parseInt(body.credits);
        regRecord.creditsRemaining = parseInt(body.credits);
        regRecord.verifiedAt = new Date().toISOString();
      }
      await env.ADMIN_KV.put('reg:' + regId, JSON.stringify(regRecord));
      return new Response(JSON.stringify({ success: true, reg: regRecord }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    // ============================================================
    // ADMIN: delete a registration
    // ============================================================
    if (pathname === '/api/admin/delete-registration' && request.method === 'POST') {
      if (!await verifyAdmin(request, env.ADMIN_KV)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
      const { regId } = await request.json();
      await env.ADMIN_KV.delete('reg:' + regId);
      return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    // ============================================================
    // ADMIN: secure login check
    // ============================================================
    if (pathname === '/api/admin/login' && request.method === 'POST') {
      const { password } = await request.json();
      if (password !== env.ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ success: false, error: 'Wrong password' }), { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
      const token = btoa('admin:' + Date.now() + ':' + Math.random());
      // Store token in KV for 8 hours
      if (env.ADMIN_KV) await env.ADMIN_KV.put('admintoken:' + token, '1', { expirationTtl: 28800 });
      return new Response(JSON.stringify({ success: true, token }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    // Helper: verify admin token
    async function verifyAdmin(req, kv) {
      const auth = req.headers.get('Authorization') || '';
      const token = auth.replace('Bearer ', '');
      if (!token) return false;
      if (!kv) return false;
      const val = await kv.get('admintoken:' + token);
      return val === '1';
    }

    // ============================================================
    // ADMIN: get all in-person registrations (pending + verified)
    // ============================================================
    if (pathname === '/api/admin/registrations' && request.method === 'GET') {
      if (!await verifyAdmin(request, env.ADMIN_KV)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
      const list = await env.ADMIN_KV.list({ prefix: 'reg:' });
      const regs = [];
      for (const key of list.keys) {
        const val = await env.ADMIN_KV.get(key.name);
        if (val) regs.push(JSON.parse(val));
      }
      return new Response(JSON.stringify(regs), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    // ============================================================
    // ADMIN: verify payment → assign credits
    // ============================================================
    if (pathname === '/api/admin/verify-payment' && request.method === 'POST') {
      if (!await verifyAdmin(request, env.ADMIN_KV)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
      const { regId, credits } = await request.json();
      const key = 'reg:' + regId;
      const val = await env.ADMIN_KV.get(key);
      if (!val) return new Response(JSON.stringify({ error: 'Registration not found' }), { status: 404, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      const reg = JSON.parse(val);
      reg.status = 'verified';
      reg.creditsTotal = credits;
      reg.creditsRemaining = credits;
      reg.verifiedAt = new Date().toISOString();
      reg.attendance = reg.attendance || [];
      await env.ADMIN_KV.put(key, JSON.stringify(reg));
      return new Response(JSON.stringify({ success: true, reg }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    // ============================================================
    // ADMIN: check in student (deduct 1 credit)
    // ============================================================
    if (pathname === '/api/admin/checkin-credit' && request.method === 'POST') {
      if (!await verifyAdmin(request, env.ADMIN_KV)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
      const { regId } = await request.json();
      const key = 'reg:' + regId;
      const val = await env.ADMIN_KV.get(key);
      if (!val) return new Response(JSON.stringify({ error: 'Registration not found' }), { status: 404, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      const reg = JSON.parse(val);
      if (reg.creditsRemaining <= 0) {
        return new Response(JSON.stringify({ error: 'No credits remaining' }), { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
      reg.creditsRemaining -= 1;
      reg.attendance = reg.attendance || [];
      reg.attendance.push({ date: new Date().toISOString() });
      await env.ADMIN_KV.put(key, JSON.stringify(reg));
      return new Response(JSON.stringify({ success: true, creditsRemaining: reg.creditsRemaining, reg }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    // ============================================================
    // ADMIN: undo last check-in (add 1 credit back)
    // ============================================================
    if (pathname === '/api/admin/undo-checkin' && request.method === 'POST') {
      if (!await verifyAdmin(request, env.ADMIN_KV)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
      const { regId } = await request.json();
      const key = 'reg:' + regId;
      const val = await env.ADMIN_KV.get(key);
      if (!val) return new Response(JSON.stringify({ error: 'Registration not found' }), { status: 404, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      const reg = JSON.parse(val);
      if (reg.creditsRemaining < reg.creditsTotal) {
        reg.creditsRemaining += 1;
        if (reg.attendance && reg.attendance.length > 0) reg.attendance.pop();
        await env.ADMIN_KV.put(key, JSON.stringify(reg));
      }
      return new Response(JSON.stringify({ success: true, creditsRemaining: reg.creditsRemaining, reg }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    // ============================================================
    // Handle both event payments and course payments
    // ============================================================
    if (request.method === 'POST' && (pathname === '/api/payment-form' || pathname === '/api/course-payment')) {
      try {
        const formData = await request.json();
        
        console.log('📝 Received form submission:', formData);
        console.log('📍 Endpoint:', pathname);

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

        // Determine if this is a course or event payment
        const isCoursePayment = pathname === '/api/course-payment' || formData.type === 'course';
        
        // Add course/event type to formData for tracking
        formData.registrationType = isCoursePayment ? 'online-course' : 'in-person-event';

        // Store in-person registrations in KV for admin portal
        if (!isCoursePayment && env.ADMIN_KV) {
          const regId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          const regRecord = {
            id: regId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone || '',
            pronouns: formData.pronouns || '',
            role: formData.role || '',
            series: formData.series || '',
            amount: formData.amount || '',
            paymentMethod: formData.paymentMethod || '',
            submittedAt: new Date().toISOString(),
            status: 'pending',
            creditsTotal: 0,
            creditsRemaining: 0,
            attendance: []
          };
          await env.ADMIN_KV.put('reg:' + regId, JSON.stringify(regRecord));
        }
        
        // Send email to student with payment instructions
        const studentEmailSent = await sendPaymentInstructionsEmail(formData, env, isCoursePayment);
        
        // Send notification email to admin
        const adminEmailSent = await sendAdminNotificationEmail(formData, env, isCoursePayment);

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

    // Handle course access checking
    if (request.method === 'POST' && pathname === '/api/course-access') {
      try {
        const { email, courseId } = await request.json();
        
        console.log('🔍 Checking course access for:', email, courseId);
        
        // Check Google Sheets for course access
        const accessData = await checkCourseAccessInGoogleSheets(email, courseId, env);
        
        return new Response(JSON.stringify({ 
          success: true,
          hasAccess: accessData.hasAccess,
          courses: accessData.ownedCourses,
          accessType: accessData.accessType, // 'paid', 'granted', 'pending'
          message: accessData.message
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        
      } catch (error) {
        console.error('❌ Error checking course access:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Error checking course access: ' + error.message 
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // Handle admin course access management
    if (request.method === 'POST' && pathname === '/api/admin/grant-access') {
      try {
        const { adminKey, email, courseId, action } = await request.json();
        
        // Simple admin key check (in production, use proper authentication)
        if (adminKey !== env.ADMIN_KEY) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Invalid admin key' 
          }), {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
        
        console.log('👑 Admin action:', { email, courseId, action });
        
        // Update Google Sheets with admin action
        const result = await updateCourseAccessInGoogleSheets(email, courseId, action, env);
        
        return new Response(JSON.stringify({ 
          success: true,
          message: `Course access ${action} successfully for ${email}`,
          result
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        
      } catch (error) {
        console.error('❌ Error managing course access:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Error managing course access: ' + error.message 
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // Handle getting all pending payments for admin
    if (request.method === 'POST' && pathname === '/api/admin/pending-payments') {
      try {
        const { adminKey } = await request.json();
        
        // Simple admin key check
        if (adminKey !== env.ADMIN_KEY) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Invalid admin key' 
          }), {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
        
        // Get pending payments from Google Sheets
        const pendingPayments = await getPendingPaymentsFromGoogleSheets(env);
        
        return new Response(JSON.stringify({ 
          success: true,
          pendingPayments
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        
      } catch (error) {
        console.error('❌ Error getting pending payments:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Error getting pending payments: ' + error.message 
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
async function sendPaymentInstructionsEmail(formData, env, isCoursePayment = false) {
  try {
    const emailContent = generatePaymentInstructionsEmail(formData, isCoursePayment);
    
    // Try Resend first (if API key is available)
    if (env.RESEND_API_KEY) {
      const subjectPrefix = isCoursePayment ? 'Online Course' : 'Dance Class';
      const emailData = {
        from: env.FROM_EMAIL || 'onboarding@resend.dev',
        to: [formData.email],
        subject: `Payment Instructions - ${formData.series || formData.courseName || subjectPrefix} Registration`,
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
      subject: `Payment Instructions - ${formData.series || formData.courseName || subjectPrefix} Registration`,
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
async function sendAdminNotificationEmail(formData, env, isCoursePayment = false) {
  try {
    const emailContent = generateAdminNotificationEmail(formData, isCoursePayment);
    
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
function generatePaymentInstructionsEmail(formData, isCoursePayment = false) {
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
      <p style="font-size: 18px; color: #666;">Thank you for registering for our ${isCoursePayment ? 'online dance course' : 'dance series'}!</p>
    </div>
    
    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #444; margin-top: 0;">Registration Details:</h2>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
      ${formData.pronouns ? `<p><strong>Pronouns:</strong> ${formData.pronouns}</p>` : ''}
      <p><strong>${isCoursePayment ? 'Course' : 'Series'}:</strong> ${formData.series || formData.courseName || 'Dance Class'}</p>
      <p><strong>Type:</strong> ${isCoursePayment ? '🌐 Online Course' : '🏫 In-Person Class'}</p>
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
function generateAdminNotificationEmail(formData, isCoursePayment = false) {
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
      <p><strong>${isCoursePayment ? 'Course' : 'Series'}:</strong> ${formData.series || formData.courseName || 'Dance Class'}</p>
      <p><strong>Type:</strong> ${isCoursePayment ? '🌐 Online Course' : '🏫 In-Person Class'}</p>
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

// ===== GOOGLE SHEETS INTEGRATION FOR COURSE ACCESS CONTROL =====

async function checkCourseAccessInGoogleSheets(email, courseId, env) {
  try {
    const sheetsUrl = 'https://script.google.com/macros/s/AKfycbzwit7Dtxt6SK-KrgfqHRiz7W41UwnLLu59rJvJdzHUW7yvqmYVa8eXxP6efibH_sre7Q/exec';
    
    // Query Google Sheets for course access
    const params = new URLSearchParams({
      action: 'checkCourseAccess',
      email: email,
      courseId: courseId || 'all'
    });
    
    const response = await fetch(`${sheetsUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      console.error('❌ Google Sheets API error:', response.status, response.statusText);
      // Return default deny access on API error
      return {
        hasAccess: false,
        ownedCourses: [],
        accessType: 'error',
        message: 'Unable to verify course access - please contact support'
      };
    }
    
    const data = await response.json();
    console.log('📊 Google Sheets response:', data);
    
    // Process the response from Google Sheets
    // Expected format: { success: true, courses: [...], hasAccess: true/false }
    if (data.success) {
      return {
        hasAccess: courseId ? data.hasAccess : data.courses.length > 0,
        ownedCourses: data.courses || [],
        accessType: data.accessType || 'paid',
        message: data.message || 'Access verified successfully'
      };
    } else {
      return {
        hasAccess: false,
        ownedCourses: [],
        accessType: 'denied',
        message: data.message || 'Access denied - payment not found'
      };
    }
    
  } catch (error) {
    console.error('❌ Error checking Google Sheets:', error);
    return {
      hasAccess: false,
      ownedCourses: [],
      accessType: 'error',
      message: 'System error - please contact support'
    };
  }
}

async function updateCourseAccessInGoogleSheets(email, courseId, action, env) {
  try {
    const sheetsUrl = 'https://script.google.com/macros/s/AKfycbzwit7Dtxt6SK-KrgfqHRiz7W41UwnLLu59rJvJdzHUW7yvqmYVa8eXxP6efibH_sre7Q/exec';
    
    const params = new URLSearchParams({
      action: 'updateCourseAccess',
      email: email,
      courseId: courseId,
      accessAction: action, // 'grant', 'revoke', 'confirm-payment'
      timestamp: new Date().toISOString(),
      updatedBy: 'admin'
    });
    
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Course access updated in Google Sheets');
      return data;
    } else {
      console.error('❌ Error updating Google Sheets:', response.status, response.statusText);
      return { success: false, error: 'Failed to update Google Sheets' };
    }
    
  } catch (error) {
    console.error('❌ Error updating course access:', error);
    return { success: false, error: error.message };
  }
}

async function getPendingPaymentsFromGoogleSheets(env) {
  try {
    const sheetsUrl = 'https://script.google.com/macros/s/AKfycbzwit7Dtxt6SK-KrgfqHRiz7W41UwnLLu59rJvJdzHUW7yvqmYVa8eXxP6efibH_sre7Q/exec';
    
    const params = new URLSearchParams({
      action: 'getPendingPayments',
      type: 'online-course'
    });
    
    const response = await fetch(`${sheetsUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('📊 Pending payments from Google Sheets:', data);
      return data.payments || [];
    } else {
      console.error('❌ Error getting pending payments:', response.status, response.statusText);
      return [];
    }
    
  } catch (error) {
    console.error('❌ Error getting pending payments:', error);
    return [];
  }
}

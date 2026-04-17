var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
//resend email helper
async function sendEmail(env, { to, subject, html }) {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Queer Latin Dance SD <noreply@queerlatindance.com>",
      to: [to],
      subject: subject,
      html: html,
    }),
  });
  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(`Email send failed: ${errorText}`);
  }
}

// Google Sheets helpers
async function getAccessToken(serviceAccount) {
  const header = { alg: "RS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp,
    iat
  };

  const enc = (obj) => btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const toSign = `${enc(header)}.${enc(payload)}`;
  
  const key = await crypto.subtle.importKey(
    "pkcs8",
    str2ab(atob(serviceAccount.private_key
  .replace('-----BEGIN PRIVATE KEY-----\n', '')
  .replace('-----END PRIVATE KEY-----\n', '')
)),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(toSign));
  const jwt = `${toSign}.${btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Google token error: " + errorText);
  }
  const data = await res.json();
  return data.access_token;
}

function str2ab(str) {
  const b = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) b[i] = str.charCodeAt(i);
  return b.buffer;
}

async function getSheetData(accessToken, SHEET_ID, SHEET_NAME) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Sheet fetch error: " + errorText);
  }
  const data = await res.json();
  return data.values || [];
}

async function updateCell(accessToken, SHEET_ID, SHEET_NAME, cell, value) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${cell}?valueInputOption=RAW`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values: [[value]] })
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Sheet update error: " + errorText);
  }
}

// ============ MANUAL CHECK-IN HANDLERS ============

async function handleGuest(body, accessToken, SHEET_ID, SHEET_NAME) {
  const query = (body.query || '').toLowerCase().trim();
  const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);
  let matches = [];
  for (let i = 1; i < rows.length; i++) {
    const actualName = (rows[i][0] || '').toLowerCase().trim();
    const preferredName = (rows[i][1] || '').toLowerCase().trim();
    const email = (rows[i][2] || '').toLowerCase().trim();
    if (query === actualName || query === preferredName || query === email) {
      matches.push({
        row: i + 1,
        actualName: rows[i][0] || '',
        preferredName: rows[i][1] || '',
        email: rows[i][2] || '',
        checkedIn: rows[i][3] === 'TRUE',
        printed: rows[i][4] === 'TRUE',
        pronouns: rows[i][5] || '',
        qrCode: rows[i][6] || '',
        checkInTime: rows[i][7] || ""
      });
    }
  }
  if (matches.length > 0) {
    return new Response(JSON.stringify({ found: true, matches }), { headers: corsHeaders });
  }
  return new Response(JSON.stringify({ found: false }), { headers: corsHeaders });
}

async function handleCheckin(body, accessToken, SHEET_ID, SHEET_NAME) {
  return await handleGuest(body, accessToken, SHEET_ID, SHEET_NAME);
}

async function handleCheckinComplete(body, accessToken, SHEET_ID, SHEET_NAME) {
  const row = body.row;
  const preferredName = body.preferredName || '';
  const pronouns = body.pronouns || '';
  const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);

  if (row) {
    const rowNum = parseInt(row, 10);
    if (preferredName) {
      await updateCell(accessToken, SHEET_ID, SHEET_NAME, `B${rowNum}`, preferredName);
    }
    if (pronouns) {
      await updateCell(accessToken, SHEET_ID, SHEET_NAME, `F${rowNum}`, pronouns);
    }
    await updateCell(accessToken, SHEET_ID, SHEET_NAME, `D${rowNum}`, 'TRUE');
    await updateCell(accessToken, SHEET_ID, SHEET_NAME, `H${rowNum}`, new Date().toISOString());
    return new Response(JSON.stringify({ success: true, name: preferredName }), { headers: corsHeaders });
  }

  for (let i = 1; i < rows.length; i++) {
    const actualName = (rows[i][0] || '').toLowerCase().trim();
    const preferredNameSheet = (rows[i][1] || '').toLowerCase().trim();
    const email = (rows[i][2] || '').toLowerCase().trim();
    const query = (body.query || '').toLowerCase().trim();
    if (query === actualName || query === preferredNameSheet || query === email) {
      const rowNum = i + 1;
      if (preferredName) {
        await updateCell(accessToken, SHEET_ID, SHEET_NAME, `B${rowNum}`, preferredName);
      }
      if (pronouns) {
        await updateCell(accessToken, SHEET_ID, SHEET_NAME, `F${rowNum}`, pronouns);
      }
      await updateCell(accessToken, SHEET_ID, SHEET_NAME, `D${rowNum}`, 'TRUE');
      await updateCell(accessToken, SHEET_ID, SHEET_NAME, `H${rowNum}`, new Date().toISOString());
      return new Response(JSON.stringify({ success: true, name: preferredName }), { headers: corsHeaders });
    }
  }
  return new Response(JSON.stringify({ success: false, error: 'Guest not found' }), { headers: corsHeaders });
}

async function handleMarkPrinted(body, accessToken, SHEET_ID, SHEET_NAME) {
  const row = body.row;
  const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);

  if (row) {
    const rowNum = parseInt(row, 10);
    await updateCell(accessToken, SHEET_ID, SHEET_NAME, `E${rowNum}`, 'TRUE');
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
  }

  const query = (body.query || '').toLowerCase().trim();
  for (let i = 1; i < rows.length; i++) {
    const actualName = (rows[i][0] || '').toLowerCase().trim();
    const preferredName = (rows[i][1] || '').toLowerCase().trim();
    const email = (rows[i][2] || '').toLowerCase().trim();
    if (query === actualName || query === preferredName || query === email) {
      await updateCell(accessToken, SHEET_ID, SHEET_NAME, `E${i + 1}`, 'TRUE');
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }
  }
  return new Response(JSON.stringify({ success: false, error: 'Guest not found' }), { headers: corsHeaders });
}

// ============ QR CODE HANDLERS ============

async function handleQRCheckin(body, accessToken, SHEET_ID, SHEET_NAME) {
  const qrCode = (body.qrCode || '').trim();
  if (!qrCode) {
    return new Response(JSON.stringify({ error: 'No QR code provided' }), { status: 400, headers: corsHeaders });
  }
  const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);
  for (let i = 1; i < rows.length; i++) {
    const rowQRCode = (rows[i][6] || '').trim();
    if (qrCode === rowQRCode) {
      return new Response(JSON.stringify({
        found: true,
        row: i + 1,
        actualName: rows[i][0] || '',
        preferredName: rows[i][1] || '',
        email: rows[i][2] || '',
        checkedIn: rows[i][3] === 'TRUE',
        printed: rows[i][4] === 'TRUE',
        pronouns: rows[i][5] || '',
        qrCode: rows[i][6] || '',
        checkInTime: rows[i][7] || ""
      }), { headers: corsHeaders });
    }
  }
  return new Response(JSON.stringify({ found: false }), { headers: corsHeaders });
}

async function handleQRCheckinComplete(body, accessToken, SHEET_ID, SHEET_NAME) {
  const qrCode = (body.qrCode || '').trim();
  const preferredName = body.preferredName || '';
  const pronouns = body.pronouns || '';
  if (!qrCode) {
    return new Response(JSON.stringify({ error: 'No QR code provided' }), { status: 400, headers: corsHeaders });
  }
  const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);
  for (let i = 1; i < rows.length; i++) {
    const rowQRCode = (rows[i][6] || '').trim();
    if (qrCode === rowQRCode) {
      const rowNum = i + 1;
      if (preferredName) {
        await updateCell(accessToken, SHEET_ID, SHEET_NAME, `B${rowNum}`, preferredName);
      }
      if (pronouns) {
        await updateCell(accessToken, SHEET_ID, SHEET_NAME, `F${rowNum}`, pronouns);
      }
      await updateCell(accessToken, SHEET_ID, SHEET_NAME, `D${rowNum}`, 'TRUE');
      await updateCell(accessToken, SHEET_ID, SHEET_NAME, `H${rowNum}`, new Date().toISOString());
      return new Response(JSON.stringify({ 
        success: true, 
        name: preferredName || rows[i][0] 
      }), { headers: corsHeaders });
    }
  }
  return new Response(JSON.stringify({ success: false, error: 'QR code not found' }), { headers: corsHeaders });
}

async function handleQRMarkPrinted(body, accessToken, SHEET_ID, SHEET_NAME) {
  const qrCode = (body.qrCode || '').trim();
  if (!qrCode) {
    return new Response(JSON.stringify({ error: 'No QR code provided' }), { status: 400, headers: corsHeaders });
  }
  const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);
  for (let i = 1; i < rows.length; i++) {
    const rowQRCode = (rows[i][6] || '').trim();
    if (qrCode === rowQRCode) {
      await updateCell(accessToken, SHEET_ID, SHEET_NAME, `E${i + 1}`, 'TRUE');
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }
  }
  return new Response(JSON.stringify({ success: false, error: 'QR code not found' }), { headers: corsHeaders });
}

// --- Worker main handler ---
export default {
  async fetch(request, env) {

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;
if (pathname === '/api/send-qr-email') {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: corsHeaders });
  }
  // FIX: Destructure all fields sent from frontend
const { guestName, guestEmail, qrCode, preferredName, pronouns, eventDate, html } = body;
if (!guestEmail || !qrCode || !html) {
  return new Response(JSON.stringify({ success: false, error: 'Missing guestEmail, qrCode, or html' }), { status: 400, headers: corsHeaders });
}
  try {
    await sendEmail(env, {
      to: guestEmail,
      subject: "QSS hosted by Queer Latin Dance SD - Confirmation Ticket",
      html,
    });
    await sendEmail(env, {
      to: "queerlatindancesd@gmail.com",
      subject: `Copy: Confirmation sent to ${guestEmail}`,
      html,
    });
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: corsHeaders });
  }
}
if (pathname === '/api/add-guest') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
      }
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: corsHeaders });
      }
      const { guestName, guestEmail, qrCode, preferredName = '', pronouns = '', eventDate = '' } = body;
      const row = [guestName, preferredName, guestEmail, '', '', pronouns, qrCode, ''];
      const serviceAccount = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
      const accessToken = await getAccessToken(serviceAccount);
      const SHEET_ID = '1dkewxtaQUYmd7yDjXc-55Hs2YORp6RKBynCfvmpJdvY';
      const SHEET_NAME = 'Guests';
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:H:append?valueInputOption=RAW`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: [row] })
        }
      );
            if (!response.ok) {
        const errorText = await response.text();
        return new Response(JSON.stringify({ success: false, error: errorText }), { status: 500, headers: corsHeaders });
      }
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }
    if (pathname === '/api/stripe-webhook') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
      }
      let event;
      try {
        event = await request.json();
      } catch {
        return new Response('Invalid JSON', { status: 400, headers: corsHeaders });
      }
//       if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;
//         const actualName = session.customer_details?.name || '';
//         const email = session.customer_details?.email || '';
//         if (actualName || email) {
//           try {
//             const serviceAccount = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
//             const accessToken = await getAccessToken(serviceAccount);
//             const SHEET_ID = '1dkewxtaQUYmd7yDjXc-55Hs2YORp6RKBynCfvmpJdvY';
//             const SHEET_NAME = 'Guests';
// //added qrData
//             const qrData = `QLDSD-${session.id}`;
//             const response = await fetch(
//               `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:H:append?valueInputOption=RAW`,
//               {
//                 method: 'POST',
//                 headers: {
//                   Authorization: `Bearer ${accessToken}`,
//                   'Content-Type': 'application/json'
//                 },
//                 // Column order: actualName, preferredName, email, checkedIn, printed, pronouns, qrCode, checkInTime
//                 body: JSON.stringify({ values: [[actualName, '', email, '', '', '', qrData, '']] })
//               }
//             );

//             if (!response.ok) {
//               const errorText = await response.text();
//               return new Response('Sheets error: ' + errorText, { status: 500, headers: corsHeaders });
//             }
//           } catch (err) {
//             return new Response('Sheets error: ' + err.message, { status: 500, headers: corsHeaders });
//           }
//           const qrData = `QLDSD-${session.id}`;
//           const { guestName, guestEmail, qrCode, preferredName, pronouns, eventDate } = body;
//           const qrImage = `https://quickchart.io/qr?text=${encodeURIComponent(qrCode)}&size=400`;
//           console.log("QR Image URL:", qrImage);
//           const firstName = actualName.split(' ')[0] || 'Guest';
//           const html = `
//           <p>Hi ${guestName || 'Guest'},</p>
//           <p>We have received your payment for our Queer Salsa Social hosted by QLDSD. Please see the attached QR code to be used for check in. See you ${eventDate || 'at the event'}!</p>
//           <img src="${qrImage}" alt="QR Code" style="margin:1em 0;max-width:220px;">
//           <p style="font-size:1.3em;color:#e75480;font-weight:bold;">${qrCode}</p>
//           <p style="font-size:1.1em;color:#333;">${guestName}</p>
//           <p>Best,</p>
//         `;

//           try {
//             await sendGmail(env, {
//               to: email,
//               subject: "Your QSS Social Receipt & QR Code",
//               html,
//             });
//           } catch (err) {
//             return new Response('Gmail error: ' + err.message, { status: 500, headers: corsHeaders });
//           }
//         }
//       }
//       return new Response('ok', { headers: corsHeaders });
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  const actualName = session.customer_details?.name || '';
  const email = session.customer_details?.email || '';

  if (actualName || email) {
    try {
      const serviceAccount = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
      const accessToken = await getAccessToken(serviceAccount);
      const SHEET_ID = '1dkewxtaQUYmd7yDjXc-55Hs2YORp6RKBynCfvmpJdvY';
      const SHEET_NAME = 'Guests';

      const qrData = `QLDSD-${session.id}`; // ← ONLY declare once

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:H:append?valueInputOption=RAW`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: [[actualName, '', email, '', '', '', qrData, '']] })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        return new Response('Sheets error: ' + errorText, { status: 500, headers: corsHeaders });
      }

      // ← FIX: use local variables, NOT body.xxx
      const qrImage = `https://quickchart.io/qr?text=${encodeURIComponent(qrData)}&size=400`;
      const firstName = actualName.split(' ')[0] || 'Guest';
      const html = `
        <div style="background:#fff0f6;padding:0;margin:0;font-family:Arial,sans-serif;">
          <div style="background:#e75480;padding:0.5em 0;">
            <img src="https://queerlatindance.com/images/logos/logo1.png" alt="Event Banner" style="max-width:100%;height:auto;border-radius:12px;display:block;margin:0 auto;">
          </div>
          <div style="padding:2em;">
            <h2 style="color:#e75480;margin-bottom:0.5em;">You're in ${firstName}, here is your order confirmation for:</h2>
            <h1 style="color:#8354c0;margin-bottom:1em;">Queer Salsa Social: ¡Que Dulce Ritmo!</h1>
            <div style="background:#fff;padding:1.5em;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.08);margin-bottom:2em;">
              <div style="text-align:center;">
                <h3 style="color:#333;margin-bottom:0.5em;font-size:1.5em;">Your ticket</h3>
                <div style="text-align:center;">
                  <img src="${qrImage}" alt="QR Code" style="margin:1em 0;max-width:220px;">
                </div>
                <div style="text-align:center;font-size:1.2em;color:#e75480;font-weight:bold;margin-bottom:0.5em;">Order number: ${qrData}</div>
                <div style="text-align:center;">
                  <div style="color:#555;">Present this QR code at the event entrance to be scanned.</div>
                </div>
              </div>
            </div>
            <div style="background:#f8f4ff;padding:1.5em;border-radius:12px;">
              <h3 style="color:#8354c0;margin-bottom:0.5em;">Event details</h3>
              <div style="margin-bottom:0.5em;">
                <span style="font-size:1.1em;"></span>
                <span>April 17th, 2026, 7pm–10:30pm</span>
              </div>
              <div style="margin-bottom:0.5em;">
                <span style="font-size:1.1em;">📍</span>
                <span>Location: Studio K, 9340 Clairemont Mesa Blvd Studio 2, San Diego, CA 92123</span>
              </div>
            </div>
            <div style="margin-top:2em;color:#555;">
              <p>Thank you for your purchase. If you have any questions, please send us an email at queerlatindancesd@gmail.com</p>
              <p>See you at the event!</p>
              <p style="color:#e75480;font-weight:bold;">Queer Latin Dance SD Team</p>
            </div>
          </div>
        </div>
      `;

      // Send to customer
      await sendEmail(env, {
        to: email,
        subject: "Your QSS Social Receipt & QR Code",
        html,
      });

      // Send copy to yourself
      await sendEmail(env, {
        to: "queerlatindancesd@gmail.com",
        subject: `Copy: QR Code sent to ${email} (${actualName})`,
        html,
      });

    } catch (err) {
      return new Response('Error: ' + err.message, { status: 500, headers: corsHeaders });
    }
  }
}
return new Response('ok', { status: 200, headers: corsHeaders }); // ← always return 200
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: corsHeaders });
    }

    const serviceAccount = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
    const accessToken = await getAccessToken(serviceAccount);
    const SHEET_ID = '1dkewxtaQUYmd7yDjXc-55Hs2YORp6RKBynCfvmpJdvY';
    const SHEET_NAME = 'Guests';

    if (pathname === '/api/guest') {
      return await handleGuest(body, accessToken, SHEET_ID, SHEET_NAME);
    }
    if (pathname === '/api/checkin') {
      return await handleCheckin(body, accessToken, SHEET_ID, SHEET_NAME);
    }
    if (pathname === '/api/checkin-complete') {
      return await handleCheckinComplete(body, accessToken, SHEET_ID, SHEET_NAME);
    }
    if (pathname === '/api/mark-printed') {
      return await handleMarkPrinted(body, accessToken, SHEET_ID, SHEET_NAME);
    }
    if (pathname === '/api/qr-checkin') {
      return await handleQRCheckin(body, accessToken, SHEET_ID, SHEET_NAME);
    }
    if (pathname === '/api/qr-checkin-complete') {
      return await handleQRCheckinComplete(body, accessToken, SHEET_ID, SHEET_NAME);
    }
    if (pathname === '/api/qr-mark-printed') {
      return await handleQRMarkPrinted(body, accessToken, SHEET_ID, SHEET_NAME);
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders });
  }
}






























var corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type",
//   "Content-Type": "application/json"
// };

// // Gmail API helpers
// async function getGmailAccessToken(env) {
//   const params = new URLSearchParams();
//   params.append("client_id", env.GMAIL_CLIENT_ID);
//   params.append("client_secret", env.GMAIL_CLIENT_SECRET);
//   params.append("refresh_token", env.GMAIL_REFRESH_TOKEN);
//   params.append("grant_type", "refresh_token");

//   const resp = await fetch("https://oauth2.googleapis.com/token", {
//     method: "POST",
//     body: params,
//   });
//   if (!resp.ok) {
//     const errorText = await resp.text();
//     throw new Error(`Gmail token error: ${errorText}`);
//   }
//   const data = await resp.json();
//   return data.access_token;
// }

// async function sendGmail(env, { to, subject, html }) {
//   const accessToken = await getGmailAccessToken(env);
//   const boundary = "__cloudflare_worker_boundary__";
//   const messageParts = [
//     `From: <${env.GMAIL_SENDER}>`,
//     `To: <${to}>`,
//     `Subject: ${subject}`,
//     "MIME-Version: 1.0",
//     `Content-Type: multipart/alternative; boundary="${boundary}"`,
//     "",
//     `--${boundary}`,
//     "Content-Type: text/html; charset=UTF-8",
//     "",
//     html,
//     `--${boundary}--`,
//   ];
//   const rawMessage = messageParts.join("\r\n");
// function base64EncodeUnicode(str) {
//   const uint8Array = new TextEncoder().encode(str);
//   let binary = '';
//   uint8Array.forEach(byte => {
//     binary += String.fromCharCode(byte);
//   });
//   return btoa(binary);
// }

// const encodedMessage = base64EncodeUnicode(rawMessage)
//   .replace(/\+/g, '-')
//   .replace(/\//g, '_')
//   .replace(/=+$/, '');

//   const resp = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ raw: encodedMessage }),
//   });

//   if (!resp.ok) {
//     const errorText = await resp.text();
//     throw new Error(`Gmail send failed: ${errorText}`);
//   }
// }

// // Google Sheets helpers
// async function getAccessToken(serviceAccount) {
//   const header = { alg: "RS256", typ: "JWT" };
//   const iat = Math.floor(Date.now() / 1000);
//   const exp = iat + 3600;
//   const payload = {
//     iss: serviceAccount.client_email,
//     scope: "https://www.googleapis.com/auth/spreadsheets",
//     aud: "https://oauth2.googleapis.com/token",
//     exp,
//     iat
//   };

//   const enc = (obj) => btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
//   const toSign = `${enc(header)}.${enc(payload)}`;
  
//   const key = await crypto.subtle.importKey(
//     "pkcs8",
//     str2ab(atob(serviceAccount.private_key
//   .replace('-----BEGIN PRIVATE KEY-----\n', '')
//   .replace('-----END PRIVATE KEY-----\n', '')
// )),
//     { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
//     false,
//     ["sign"]
//   );
  
//   const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(toSign));
//   const jwt = `${toSign}.${btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}`;

//   const res = await fetch("https://oauth2.googleapis.com/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
//   });
//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error("Google token error: " + errorText);
//   }
//   const data = await res.json();
//   return data.access_token;
// }

// function str2ab(str) {
//   const b = new Uint8Array(str.length);
//   for (let i = 0; i < str.length; i++) b[i] = str.charCodeAt(i);
//   return b.buffer;
// }

// async function getSheetData(accessToken, SHEET_ID, SHEET_NAME) {
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}`;
//   const res = await fetch(url, {
//     headers: { Authorization: `Bearer ${accessToken}` }
//   });
//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error("Sheet fetch error: " + errorText);
//   }
//   const data = await res.json();
//   return data.values || [];
// }

// async function updateCell(accessToken, SHEET_ID, SHEET_NAME, cell, value) {
//   const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${cell}?valueInputOption=RAW`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ values: [[value]] })
//   });
//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error("Sheet update error: " + errorText);
//   }
// }

// // ============ MANUAL CHECK-IN HANDLERS ============

// async function handleGuest(body, accessToken, SHEET_ID, SHEET_NAME) {
//   const query = (body.query || '').toLowerCase().trim();
//   const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);
//   let matches = [];
//   for (let i = 1; i < rows.length; i++) {
//     const actualName = (rows[i][0] || '').toLowerCase().trim();
//     const preferredName = (rows[i][1] || '').toLowerCase().trim();
//     const email = (rows[i][2] || '').toLowerCase().trim();
//     if (query === actualName || query === preferredName || query === email) {
//       matches.push({
//         row: i + 1,
//         actualName: rows[i][0] || '',
//         preferredName: rows[i][1] || '',
//         email: rows[i][2] || '',
//         checkedIn: rows[i][3] === 'TRUE',
//         printed: rows[i][4] === 'TRUE',
//         pronouns: rows[i][5] || '',
//         qrCode: rows[i][6] || '',
//         checkInTime: rows[i][7] || ""
//       });
//     }
//   }
//   if (matches.length > 0) {
//     return new Response(JSON.stringify({ found: true, matches }), { headers: corsHeaders });
//   }
//   return new Response(JSON.stringify({ found: false }), { headers: corsHeaders });
// }

// async function handleCheckin(body, accessToken, SHEET_ID, SHEET_NAME) {
//   return await handleGuest(body, accessToken, SHEET_ID, SHEET_NAME);
// }

// async function handleCheckinComplete(body, accessToken, SHEET_ID, SHEET_NAME) {
//   const row = body.row;
//   const preferredName = body.preferredName || '';
//   const pronouns = body.pronouns || '';
//   const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);

//   if (row) {
//     const rowNum = parseInt(row, 10);
//     if (preferredName) {
//       await updateCell(accessToken, SHEET_ID, SHEET_NAME, `B${rowNum}`, preferredName);
//     }
//     if (pronouns) {
//       await updateCell(accessToken, SHEET_ID, SHEET_NAME, `F${rowNum}`, pronouns);
//     }
//     await updateCell(accessToken, SHEET_ID, SHEET_NAME, `D${rowNum}`, 'TRUE');
//     await updateCell(accessToken, SHEET_ID, SHEET_NAME, `H${rowNum}`, new Date().toISOString());
//     return new Response(JSON.stringify({ success: true, name: preferredName }), { headers: corsHeaders });
//   }

//   for (let i = 1; i < rows.length; i++) {
//     const actualName = (rows[i][0] || '').toLowerCase().trim();
//     const preferredNameSheet = (rows[i][1] || '').toLowerCase().trim();
//     const email = (rows[i][2] || '').toLowerCase().trim();
//     const query = (body.query || '').toLowerCase().trim();
//     if (query === actualName || query === preferredNameSheet || query === email) {
//       const rowNum = i + 1;
//       if (preferredName) {
//         await updateCell(accessToken, SHEET_ID, SHEET_NAME, `B${rowNum}`, preferredName);
//       }
//       if (pronouns) {
//         await updateCell(accessToken, SHEET_ID, SHEET_NAME, `F${rowNum}`, pronouns);
//       }
//       await updateCell(accessToken, SHEET_ID, SHEET_NAME, `D${rowNum}`, 'TRUE');
//       await updateCell(accessToken, SHEET_ID, SHEET_NAME, `H${rowNum}`, new Date().toISOString());
//       return new Response(JSON.stringify({ success: true, name: preferredName }), { headers: corsHeaders });
//     }
//   }
//   return new Response(JSON.stringify({ success: false, error: 'Guest not found' }), { headers: corsHeaders });
// }

// async function handleMarkPrinted(body, accessToken, SHEET_ID, SHEET_NAME) {
//   const row = body.row;
//   const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);

//   if (row) {
//     const rowNum = parseInt(row, 10);
//     await updateCell(accessToken, SHEET_ID, SHEET_NAME, `E${rowNum}`, 'TRUE');
//     return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
//   }

//   const query = (body.query || '').toLowerCase().trim();
//   for (let i = 1; i < rows.length; i++) {
//     const actualName = (rows[i][0] || '').toLowerCase().trim();
//     const preferredName = (rows[i][1] || '').toLowerCase().trim();
//     const email = (rows[i][2] || '').toLowerCase().trim();
//     if (query === actualName || query === preferredName || query === email) {
//       await updateCell(accessToken, SHEET_ID, SHEET_NAME, `E${i + 1}`, 'TRUE');
//       return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
//     }
//   }
//   return new Response(JSON.stringify({ success: false, error: 'Guest not found' }), { headers: corsHeaders });
// }

// // ============ QR CODE HANDLERS ============

// async function handleQRCheckin(body, accessToken, SHEET_ID, SHEET_NAME) {
//   const qrCode = (body.qrCode || '').trim();
//   if (!qrCode) {
//     return new Response(JSON.stringify({ error: 'No QR code provided' }), { status: 400, headers: corsHeaders });
//   }
//   const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);
//   for (let i = 1; i < rows.length; i++) {
//     const rowQRCode = (rows[i][6] || '').trim();
//     if (qrCode === rowQRCode) {
//       return new Response(JSON.stringify({
//         found: true,
//         row: i + 1,
//         actualName: rows[i][0] || '',
//         preferredName: rows[i][1] || '',
//         email: rows[i][2] || '',
//         checkedIn: rows[i][3] === 'TRUE',
//         printed: rows[i][4] === 'TRUE',
//         pronouns: rows[i][5] || '',
//         qrCode: rows[i][6] || '',
//         checkInTime: rows[i][7] || ""
//       }), { headers: corsHeaders });
//     }
//   }
//   return new Response(JSON.stringify({ found: false }), { headers: corsHeaders });
// }

// async function handleQRCheckinComplete(body, accessToken, SHEET_ID, SHEET_NAME) {
//   const qrCode = (body.qrCode || '').trim();
//   const preferredName = body.preferredName || '';
//   const pronouns = body.pronouns || '';
//   if (!qrCode) {
//     return new Response(JSON.stringify({ error: 'No QR code provided' }), { status: 400, headers: corsHeaders });
//   }
//   const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);
//   for (let i = 1; i < rows.length; i++) {
//     const rowQRCode = (rows[i][6] || '').trim();
//     if (qrCode === rowQRCode) {
//       const rowNum = i + 1;
//       if (preferredName) {
//         await updateCell(accessToken, SHEET_ID, SHEET_NAME, `B${rowNum}`, preferredName);
//       }
//       if (pronouns) {
//         await updateCell(accessToken, SHEET_ID, SHEET_NAME, `F${rowNum}`, pronouns);
//       }
//       await updateCell(accessToken, SHEET_ID, SHEET_NAME, `D${rowNum}`, 'TRUE');
//       await updateCell(accessToken, SHEET_ID, SHEET_NAME, `H${rowNum}`, new Date().toISOString());
//       return new Response(JSON.stringify({ 
//         success: true, 
//         name: preferredName || rows[i][0] 
//       }), { headers: corsHeaders });
//     }
//   }
//   return new Response(JSON.stringify({ success: false, error: 'QR code not found' }), { headers: corsHeaders });
// }

// async function handleQRMarkPrinted(body, accessToken, SHEET_ID, SHEET_NAME) {
//   const qrCode = (body.qrCode || '').trim();
//   if (!qrCode) {
//     return new Response(JSON.stringify({ error: 'No QR code provided' }), { status: 400, headers: corsHeaders });
//   }
//   const rows = await getSheetData(accessToken, SHEET_ID, SHEET_NAME);
//   for (let i = 1; i < rows.length; i++) {
//     const rowQRCode = (rows[i][6] || '').trim();
//     if (qrCode === rowQRCode) {
//       await updateCell(accessToken, SHEET_ID, SHEET_NAME, `E${i + 1}`, 'TRUE');
//       return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
//     }
//   }
//   return new Response(JSON.stringify({ success: false, error: 'QR code not found' }), { headers: corsHeaders });
// }

// // --- Worker main handler ---
// export default {
//   async fetch(request, env) {

//     if (request.method === "OPTIONS") {
//       return new Response(null, { headers: corsHeaders });
//     }

//     const url = new URL(request.url);
//     const pathname = url.pathname;
// if (pathname === '/api/send-qr-email') {
//   if (request.method !== 'POST') {
//     return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
//   }
//   let body;
//   try {
//     body = await request.json();
//   } catch {
//     return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: corsHeaders });
//   }
//   // FIX: Destructure all fields sent from frontend
// const { guestName, guestEmail, qrCode, preferredName, pronouns, eventDate, html } = body;
// if (!guestEmail || !qrCode || !html) {
//   return new Response(JSON.stringify({ success: false, error: 'Missing guestEmail, qrCode, or html' }), { status: 400, headers: corsHeaders });
// }
//   try {
//     await sendGmail(env, {
//       to: guestEmail,
//       subject: "QSS hosted by Queer Latin Dance SD - Confirmation Ticket",
//       html,
//     });
//     await sendGmail(env, {
//   to: "queerlatindancesd@gmail.com", 
//   subject: `Copy: Confirmation sent to ${guestEmail}`,
//   html,
// });
//     return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
//   } catch (err) {
//     return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: corsHeaders });
//   }
// }
// if (pathname === '/api/add-guest') {
//       if (request.method !== 'POST') {
//         return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
//       }
//       let body;
//       try {
//         body = await request.json();
//       } catch {
//         return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: corsHeaders });
//       }
//       const { guestName, guestEmail, qrCode, preferredName = '', pronouns = '', eventDate = '' } = body;
//       const row = [guestName, preferredName, guestEmail, '', '', pronouns, qrCode, ''];
//       const serviceAccount = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
//       const accessToken = await getAccessToken(serviceAccount);
//       const SHEET_ID = '1dkewxtaQUYmd7yDjXc-55Hs2YORp6RKBynCfvmpJdvY';
//       const SHEET_NAME = 'Guests';
//       const response = await fetch(
//         `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:H:append?valueInputOption=RAW`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ values: [row] })
//         }
//       );
//             if (!response.ok) {
//         const errorText = await response.text();
//         return new Response(JSON.stringify({ success: false, error: errorText }), { status: 500, headers: corsHeaders });
//       }
//       return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
//     }
//     if (pathname === '/api/stripe-webhook') {
//       if (request.method !== 'POST') {
//         return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
//       }
//       let event;
//       try {
//         event = await request.json();
//       } catch {
//         return new Response('Invalid JSON', { status: 400, headers: corsHeaders });
//       }
// //       if (event.type === 'checkout.session.completed') {
// //         const session = event.data.object;
// //         const actualName = session.customer_details?.name || '';
// //         const email = session.customer_details?.email || '';
// //         if (actualName || email) {
// //           try {
// //             const serviceAccount = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
// //             const accessToken = await getAccessToken(serviceAccount);
// //             const SHEET_ID = '1dkewxtaQUYmd7yDjXc-55Hs2YORp6RKBynCfvmpJdvY';
// //             const SHEET_NAME = 'Guests';
// // //added qrData
// //             const qrData = `QLDSD-${session.id}`;
// //             const response = await fetch(
// //               `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:H:append?valueInputOption=RAW`,
// //               {
// //                 method: 'POST',
// //                 headers: {
// //                   Authorization: `Bearer ${accessToken}`,
// //                   'Content-Type': 'application/json'
// //                 },
// //                 // Column order: actualName, preferredName, email, checkedIn, printed, pronouns, qrCode, checkInTime
// //                 body: JSON.stringify({ values: [[actualName, '', email, '', '', '', qrData, '']] })
// //               }
// //             );

// //             if (!response.ok) {
// //               const errorText = await response.text();
// //               return new Response('Sheets error: ' + errorText, { status: 500, headers: corsHeaders });
// //             }
// //           } catch (err) {
// //             return new Response('Sheets error: ' + err.message, { status: 500, headers: corsHeaders });
// //           }
// //           const qrData = `QLDSD-${session.id}`;
// //           const { guestName, guestEmail, qrCode, preferredName, pronouns, eventDate } = body;
// //           const qrImage = `https://quickchart.io/qr?text=${encodeURIComponent(qrCode)}&size=400`;
// //           console.log("QR Image URL:", qrImage);
// //           const firstName = actualName.split(' ')[0] || 'Guest';
// //           const html = `
// //           <p>Hi ${guestName || 'Guest'},</p>
// //           <p>We have received your payment for our Queer Salsa Social hosted by QLDSD. Please see the attached QR code to be used for check in. See you ${eventDate || 'at the event'}!</p>
// //           <img src="${qrImage}" alt="QR Code" style="margin:1em 0;max-width:220px;">
// //           <p style="font-size:1.3em;color:#e75480;font-weight:bold;">${qrCode}</p>
// //           <p style="font-size:1.1em;color:#333;">${guestName}</p>
// //           <p>Best,</p>
// //         `;

// //           try {
// //             await sendGmail(env, {
// //               to: email,
// //               subject: "Your QSS Social Receipt & QR Code",
// //               html,
// //             });
// //           } catch (err) {
// //             return new Response('Gmail error: ' + err.message, { status: 500, headers: corsHeaders });
// //           }
// //         }
// //       }
// //       return new Response('ok', { headers: corsHeaders });
// if (event.type === 'checkout.session.completed') {
//   const session = event.data.object;
//   const actualName = session.customer_details?.name || '';
//   const email = session.customer_details?.email || '';

//   if (actualName || email) {
//     try {
//       const serviceAccount = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
//       const accessToken = await getAccessToken(serviceAccount);
//       const SHEET_ID = '1dkewxtaQUYmd7yDjXc-55Hs2YORp6RKBynCfvmpJdvY';
//       const SHEET_NAME = 'Guests';

//       const qrData = `QLDSD-${session.id}`; // ← ONLY declare once

//       const response = await fetch(
//         `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:H:append?valueInputOption=RAW`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ values: [[actualName, '', email, '', '', '', qrData, '']] })
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         return new Response('Sheets error: ' + errorText, { status: 500, headers: corsHeaders });
//       }

//       // ← FIX: use local variables, NOT body.xxx
//       const qrImage = `https://quickchart.io/qr?text=${encodeURIComponent(qrData)}&size=400`;
//       const firstName = actualName.split(' ')[0] || 'Guest';
//       const html = `
//         <div style="background:#fff0f6;padding:0;margin:0;font-family:Arial,sans-serif;">
//           <div style="background:#e75480;padding:0.5em 0;">
//             <img src="https://queerlatindance.com/images/logos/logo1.png" alt="Event Banner" style="max-width:100%;height:auto;border-radius:12px;display:block;margin:0 auto;">
//           </div>
//           <div style="padding:2em;">
//             <h2 style="color:#e75480;margin-bottom:0.5em;">You're in ${firstName}, here is your order confirmation for:</h2>
//             <h1 style="color:#8354c0;margin-bottom:1em;">Queer Salsa Social: ¡Que Dulce Ritmo!</h1>
//             <div style="background:#fff;padding:1.5em;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.08);margin-bottom:2em;">
//               <div style="text-align:center;">
//                 <h3 style="color:#333;margin-bottom:0.5em;font-size:1.5em;">Your ticket</h3>
//                 <div style="text-align:center;">
//                   <img src="${qrImage}" alt="QR Code" style="margin:1em 0;max-width:220px;">
//                 </div>
//                 <div style="text-align:center;font-size:1.2em;color:#e75480;font-weight:bold;margin-bottom:0.5em;">Order number: ${qrData}</div>
//                 <div style="text-align:center;">
//                   <div style="color:#555;">Present this QR code at the event entrance to be scanned.</div>
//                 </div>
//               </div>
//             </div>
//             <div style="background:#f8f4ff;padding:1.5em;border-radius:12px;">
//               <h3 style="color:#8354c0;margin-bottom:0.5em;">Event details</h3>
//               <div style="margin-bottom:0.5em;">
//                 <span style="font-size:1.1em;"></span>
//                 <span>April 17th, 2026, 7pm–10:30pm</span>
//               </div>
//               <div style="margin-bottom:0.5em;">
//                 <span style="font-size:1.1em;">📍</span>
//                 <span>Location: Studio K, 9340 Clairemont Mesa Blvd Studio 2, San Diego, CA 92123</span>
//               </div>
//             </div>
//             <div style="margin-top:2em;color:#555;">
//               <p>Thank you for your purchase! If you have any questions, reply to this email.</p>
//               <p>See you at the event!</p>
//               <p style="color:#e75480;font-weight:bold;">Queer Latin Dance SD Team</p>
//             </div>
//           </div>
//         </div>
//       `;

//       // Send to customer
//       await sendGmail(env, {
//         to: email,
//         subject: "Your QSS Social Receipt & QR Code",
//         html,
//       });

//       // ✅ Send copy to yourself
//       await sendGmail(env, {
//         to: "queerlatindancesd@gmail.com",
//         subject: `Copy: QR Code sent to ${email} (${actualName})`,
//         html,
//       });

//     } catch (err) {
//       return new Response('Error: ' + err.message, { status: 500, headers: corsHeaders });
//     }
//   }
// }
// return new Response('ok', { status: 200, headers: corsHeaders }); // ← always return 200
//     }

//     if (request.method !== 'POST') {
//       return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
//     }

//     let body;
//     try {
//       body = await request.json();
//     } catch {
//       return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: corsHeaders });
//     }

//     const serviceAccount = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
//     const accessToken = await getAccessToken(serviceAccount);
//     const SHEET_ID = '1dkewxtaQUYmd7yDjXc-55Hs2YORp6RKBynCfvmpJdvY';
//     const SHEET_NAME = 'Guests';

//     if (pathname === '/api/guest') {
//       return await handleGuest(body, accessToken, SHEET_ID, SHEET_NAME);
//     }
//     if (pathname === '/api/checkin') {
//       return await handleCheckin(body, accessToken, SHEET_ID, SHEET_NAME);
//     }
//     if (pathname === '/api/checkin-complete') {
//       return await handleCheckinComplete(body, accessToken, SHEET_ID, SHEET_NAME);
//     }
//     if (pathname === '/api/mark-printed') {
//       return await handleMarkPrinted(body, accessToken, SHEET_ID, SHEET_NAME);
//     }
//     if (pathname === '/api/qr-checkin') {
//       return await handleQRCheckin(body, accessToken, SHEET_ID, SHEET_NAME);
//     }
//     if (pathname === '/api/qr-checkin-complete') {
//       return await handleQRCheckinComplete(body, accessToken, SHEET_ID, SHEET_NAME);
//     }
//     if (pathname === '/api/qr-mark-printed') {
//       return await handleQRMarkPrinted(body, accessToken, SHEET_ID, SHEET_NAME);
//     }

//     return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders });
//   }
// }

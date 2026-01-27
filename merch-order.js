function generateOrderConfirmationHtml(order, paymentInstructions) {
  return `
  <div style="font-family:Montserrat,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;">
    <h2 style="color:#716cff;">Thank you for your merch order!</h2>
    <p><b>Order Number:</b> ${order.orderNumber}</p>
    <p><b>Order Date:</b> ${order.orderDate}</p>
    <p><b>Name:</b> ${order.firstName} ${order.lastName}</p>
    <p><b>Email:</b> ${order.email}</p>
    <p><b>Delivery Option:</b> ${order.deliveryOption}</p>
    ${order.deliveryOption === 'Delivery' ? `<p><b>Address:</b> ${order.address}, ${order.city}, ${order.state} ${order.zip}</p>` : ''}
    <hr>
    <h3 style="color:#716cff;">Order Items:</h3>
    <ul>
      ${order.cart.map(item => `<li>${item.title} (Size: ${item.size}, Qty: ${item.quantity}, Price: ${item.price})</li>`).join('')}
    </ul>
    <hr>
    <h3 style="color:#716cff;">Payment Instructions</h3>
    <div style="background:#f7f7ff;padding:12px;border-radius:8px;font-family:monospace;">${paymentInstructions.replace(/\n/g, '<br>')}</div>
    <p style="margin-top:24px;color:#888;">Questions? Reply to this email or contact us at <a href="mailto:queerlatindancesd@gmail.com">queerlatindancesd@gmail.com</a></p>
  </div>
  `;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    if (request.method !== 'POST' || !request.url.endsWith('/api/merch-order')) {
      return new Response('Not found', { status: 404 });
    }

    try {
      const data = await request.json();

      // Validate required fields
      const {
        firstName, lastName, email, phone, deliveryOption,
        address, city, state, zip, paymentMethod,
        orderNumber, orderDate, cart, amount
      } = data;

      if (!firstName || !lastName || !email || !paymentMethod || !cart || !Array.isArray(cart) || cart.length === 0) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Missing required fields'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      // Compose order summary
      const orderItems = cart.map((item, idx) =>
        `${idx + 1}. ${item.title} (Size: ${item.size}, Style: ${item.style}, Color: ${item.color}, Qty: ${item.quantity}, Price: ${item.price})`
      ).join('\n');

      // Calculate total amount if not provided
      const totalAmount = amount || cart.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity)), 0);

      // Generate payment instructions
      const paymentInstructions = generatePaymentInstructions(paymentMethod, totalAmount, firstName, lastName);

      // Prepare order object for HTML template
      const orderObj = {
        firstName, lastName, email, phone, deliveryOption,
        address, city, state, zip, orderNumber, orderDate, cart
      };

      const html = generateOrderConfirmationHtml(orderObj, paymentInstructions);

      // Send confirmation to buyer
      await sendEmail({
        to: email,
        subject: 'Your Merch Order Confirmation',
        html,
        env
      });

      // Send notification to admin
      await sendEmail({
        to: env.ADMIN_EMAIL,
        subject: `New Merch Order: ${firstName} ${lastName}`,
        html,
        env
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }
};

// Helper: Generate payment instructions (edit as needed)
function generatePaymentInstructions(paymentMethod, amount, firstName, lastName) {
  const cleanAmount = typeof amount === 'string' ? amount.replace('$', '') : amount;
  const memo = `${firstName} ${lastName} - Merch Order`;

  switch(paymentMethod) {
    case 'PayPal':
      return `
PAYMENT INSTRUCTIONS:
PayPal Recipient: @queerlatindance
PayPal Link: https://www.paypal.com/paypalme/queerlatindance/${cleanAmount}
Note: ${memo}
Instructions:
1. Click the PayPal link above
2. Log in to PayPal if prompted
3. Confirm the amount ($${cleanAmount})
4. Include "${memo}" in the note
5. Complete payment
      `.trim();
    case 'Zelle':
      return `
PAYMENT INSTRUCTIONS:
Zelle Recipient: michf18@gmail.com or 760-529-1320
Memo: ${memo}
Instructions:
1. Open your banking app
2. Select Zelle
3. Send to: michf18@gmail.com (or call 760-529-1320)
4. Amount: $${cleanAmount}
5. Memo: "${memo}"
      `.trim();
    case 'Venmo':
      return `
PAYMENT INSTRUCTIONS:
Venmo Recipient: @michf18
Note: ${memo}
Instructions:
1. Open Venmo app
2. Send to: @michf18
3. Amount: $${cleanAmount}
4. Note: "${memo}"
5. Complete payment
      `.trim();
    case 'Stripe':
      return `
PAYMENT INSTRUCTIONS:
Stripe: Please use the Stripe payment link provided on the website or contact us for a direct invoice.
      `.trim();
    default:
      return `
PAYMENT INSTRUCTIONS:
Please contact us for payment instructions for method: ${paymentMethod}
      `.trim();
  }
}

// Helper: Send email using Resend API (https://resend.com/)
async function sendEmail({ to, subject, html, env }) {
  const apiKey = env.RESEND_API_KEY;
  const from = env.FROM_EMAIL || 'Queer Latin Dance SD <no-reply@queerlatindance.com>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error('Failed to send email: ' + err);
  }
}
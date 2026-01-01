const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['https://www.queerlatindance.com', 'https://queerlatindance.com', 'http://localhost:3000'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email transporter setup (using Gmail)
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail App Password
    }
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Queer Latin Dance SD Backend is running!' });
});

// Payment form submission endpoint
app.post('/api/payment-form', async (req, res) => {
    try {
        console.log('📝 Received form submission:', req.body);
        
        const {
            firstName,
            lastName,
            email,
            phone,
            pronouns,
            danceRole,
            paymentMethod,
            series,
            amount,
            date,
            time
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !paymentMethod || !amount) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                required: ['firstName', 'lastName', 'email', 'paymentMethod', 'amount']
            });
        }

        // Generate payment instructions based on method
        const paymentInstructions = generatePaymentInstructions(paymentMethod, amount, firstName, lastName, series);
        
        // Send email to student
        await sendPaymentInstructionsEmail(email, firstName, paymentMethod, amount, series, paymentInstructions);
        
        // Send notification to you (optional)
        await sendNotificationEmail(req.body);
        
        console.log('✅ Form processed successfully for:', email);
        res.json({ 
            success: true, 
            message: 'Payment instructions sent successfully!',
            email: email
        });

    } catch (error) {
        console.error('❌ Error processing form:', error);
        res.status(500).json({ 
            error: 'Failed to process form submission',
            details: error.message 
        });
    }
});

// Function to generate payment instructions
function generatePaymentInstructions(paymentMethod, amount, firstName, lastName, series) {
    const cleanAmount = amount.replace('$', '');
    const memo = `${firstName} ${lastName} - ${series}`;
    
    switch(paymentMethod) {
        case 'PayPal':
            return {
                method: 'PayPal',
                recipient: '@queerlatindance',
                link: `https://www.paypal.com/paypalme/queerlatindance/${cleanAmount}`,
                note: memo,
                instructions: `1. Click the PayPal link\n2. Log in to PayPal if prompted\n3. Confirm the amount (${amount})\n4. Include "${memo}" in the note\n5. Complete payment`
            };
        case 'Zelle':
            return {
                method: 'Zelle',
                recipient: 'michf18@gmail.com or 760-529-1320',
                memo: memo,
                instructions: `1. Open your banking app\n2. Select Zelle\n3. Send to: michf18@gmail.com (or call 760-529-1320)\n4. Amount: ${amount}\n5. Memo: "${memo}"`
            };
        case 'Venmo':
            return {
                method: 'Venmo',
                recipient: '@michf18',
                note: memo,
                instructions: `1. Open Venmo app\n2. Send to: @michf18\n3. Amount: ${amount}\n4. Note: "${memo}"\n5. Complete payment`
            };
        default:
            return {
                method: paymentMethod,
                instructions: 'Please contact us for payment instructions.'
            };
    }
}

// Function to send payment instructions to student
async function sendPaymentInstructionsEmail(email, firstName, paymentMethod, amount, series, instructions) {
    const emailContent = `
Hi ${firstName},

Thank you for registering for ${series || 'our dance series'}!

Here are your payment instructions:

PAYMENT METHOD: ${instructions.method}
AMOUNT: ${amount}

${instructions.method === 'PayPal' ? 
    `RECIPIENT: ${instructions.recipient}
PAYPAL LINK: ${instructions.link}
NOTE: Include "${instructions.note}"

INSTRUCTIONS:
${instructions.instructions}` :
    instructions.method === 'Zelle' ?
    `RECIPIENT: ${instructions.recipient}
MEMO: "${instructions.memo}"

INSTRUCTIONS:
${instructions.instructions}` :
    `RECIPIENT: ${instructions.recipient}
NOTE: "${instructions.note}"

INSTRUCTIONS:
${instructions.instructions}`
}

IMPORTANT: Save these instructions! You can complete your payment anytime using the details above.

You'll receive a confirmation email within 24 hours once payment is processed.

Join our WhatsApp group for updates: https://chat.whatsapp.com/queerlatindancesd

Questions? Reply to this email or contact us at queerlatindancesd@gmail.com

Best regards,
Queer Latin Dance SD Team

---
This is an automated message with your payment instructions.
    `.trim();

    const mailOptions = {
        from: `"Queer Latin Dance SD" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Payment Instructions - ${series || 'Dance Series Registration'}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>')
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Payment instructions sent to:', email);
}

// Function to send notification to you
async function sendNotificationEmail(formData) {
    const emailContent = `
New registration received!

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Pronouns: ${formData.pronouns || 'Not provided'}
Payment Method: ${formData.paymentMethod}
Series: ${formData.series}
Amount: ${formData.amount}
${formData.date ? `Date: ${formData.date}` : ''}
${formData.time ? `Time: ${formData.time}` : ''}

Payment instructions have been automatically sent to the student.
    `.trim();

    const mailOptions = {
        from: `"QLD Registration System" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Registration: ${formData.firstName} ${formData.lastName}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>')
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Notification sent to admin');
}

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('❌ Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 Email service configured with: ${process.env.EMAIL_USER}`);
});

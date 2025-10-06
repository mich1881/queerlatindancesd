# Queer Latin Dance SD - Backend

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Email
1. Go to your Gmail account
2. Enable 2-Factor Authentication
3. Generate App Password (16 characters)
4. Copy `.env.example` to `.env`
5. Fill in your Gmail and app password

### 3. Run Locally
```bash
npm run dev
```
Backend will run on http://localhost:3000

### 4. Test the Backend
Visit http://localhost:3000 to see if it's running

### 5. Deploy to Production

#### Option A: Railway (Recommended - Free)
1. Sign up at railway.app
2. Connect your GitHub repo
3. Add environment variables in Railway dashboard
4. Deploy automatically

#### Option B: Render (Free tier)
1. Sign up at render.com
2. Connect GitHub repo
3. Set environment variables
4. Deploy

#### Option C: Vercel (Free)
1. Sign up at vercel.com
2. Connect GitHub repo
3. Add environment variables
4. Deploy

### 6. Update Frontend
Once deployed, update the `backendUrl` in payment1.html:
```javascript
const backendUrl = 'https://your-app-name.railway.app/api/payment-form';
```

## How It Works

1. Student fills out payment form on website
2. Form data sent to your backend
3. Backend automatically emails payment instructions to student
4. Backend also emails you a notification
5. Data is backed up to Google Sheets

## Environment Variables

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=queerlatindancesd@gmail.com
PORT=3000
```

## API Endpoint

**POST** `/api/payment-form`

Expected data:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "pronouns": "he/him",
  "paymentMethod": "Zelle",
  "series": "Salsa & Bachata Series",
  "amount": "$144"
}
```

Response:
```json
{
  "success": true,
  "message": "Payment instructions sent successfully!",
  "email": "john@example.com"
}
```

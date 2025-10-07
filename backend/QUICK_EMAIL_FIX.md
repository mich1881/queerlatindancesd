# Quick Email Fix - Use Resend Instead

## The Issue
MailChannels requires domain verification and specific configuration that's complex to set up. Let's use **Resend** instead - it's much more reliable and easier.

## Quick Solution (5 minutes)

### Step 1: Sign up for Resend (Free)
1. Go to https://resend.com 
2. Sign up with your email
3. Verify your account

### Step 2: Get API Key
1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key" 
3. Copy the key (starts with `re_`)

### Step 3: Add to Cloudflare Worker
```bash
cd backend
npx wrangler secret put RESEND_API_KEY
# When prompted, paste your Resend API key
```

### Step 4: Update Worker Code
I'll update the worker to try Resend first, then fall back to MailChannels.

### Step 5: Test
After setup, your emails will work reliably!

## Why This Happens
- MailChannels is free but requires domain verification
- Your current domain `queerlatindancesd.com` isn't verified with MailChannels
- Resend works immediately with their domain, then you can verify your own later

## Benefits of Resend
✅ **Immediate setup** - no domain verification needed initially  
✅ **Free tier** - 3,000 emails/month  
✅ **Reliable delivery** - high deliverability rates  
✅ **Better support** - easier troubleshooting  
✅ **Custom domains** - can add your domain later  

Would you like me to update your worker code to use Resend?

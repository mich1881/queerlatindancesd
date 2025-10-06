# Cloudflare Worker Deployment Guide

## Option 1: Deploy via Cloudflare Dashboard (Easiest)

### Step 1: Create a Cloudflare Worker
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click "Workers & Pages" in the sidebar
3. Click "Create" → "Create Worker"
4. Replace the default code with the contents of `cloudflare-worker.js`
5. Click "Save and Deploy"

### Step 2: Set Environment Variables
1. In your Worker dashboard, go to "Settings" → "Environment Variables"
2. Add these variables:
   - `ADMIN_EMAIL`: Your admin email (e.g., `queerlatindancesd@gmail.com`)
   - `FROM_EMAIL`: Email to send from (e.g., `noreply@queerlatindancesd.com`)

### Step 3: Get Your Worker URL
- Your worker will be available at: `https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev`
- Copy this URL for use in your frontend

## Option 2: Deploy via Wrangler CLI (Advanced)

### Prerequisites
```bash
npm install -g wrangler
wrangler login
```

### Step 1: Initialize Wrangler
```bash
cd backend
wrangler init payment-form-worker
```

### Step 2: Configure wrangler.toml
```toml
name = "payment-form-worker"
main = "cloudflare-worker.js"
compatibility_date = "2023-12-01"

[env.production.vars]
ADMIN_EMAIL = "queerlatindancesd@gmail.com"
FROM_EMAIL = "noreply@queerlatindancesd.com"
```

### Step 3: Deploy
```bash
wrangler deploy
```

## Email Configuration

### Using MailChannels (Free)
- MailChannels is pre-configured in the worker
- **Limitation**: Only works from Cloudflare Workers (not from your domain)
- **Cost**: Free up to 1000 emails/day

### Using Cloudflare Email Workers (Recommended for Custom Domain)
1. Add your domain to Cloudflare
2. Set up Email Routing in Cloudflare Dashboard
3. Configure SPF/DKIM records
4. Update the worker to use Cloudflare's Email API

## Update Your Frontend

Once deployed, update the `backendUrl` in your `payment1.html`:

```javascript
const backendUrl = 'https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev/api/payment-form';
```

## Testing

### Test the Worker
```bash
curl -X POST https://YOUR_WORKER_URL/api/payment-form \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "paymentMethod": "Zelle",
    "amount": "$100",
    "series": "4-Week Beginner Series"
  }'
```

### Check Logs
- Go to your Worker dashboard
- Click on "Logs" to see real-time activity
- Monitor email sending and error messages

## Advantages of Cloudflare Workers

✅ **Free Tier**: 100,000 requests/day  
✅ **Global Edge**: Fast worldwide performance  
✅ **No Server Management**: Serverless platform  
✅ **Built-in Email**: MailChannels integration  
✅ **Easy Deployment**: Simple dashboard interface  
✅ **Automatic Scaling**: Handles traffic spikes  

## Cost Comparison

| Service | Free Tier | Paid Plans |
|---------|-----------|------------|
| Cloudflare Workers | 100K requests/day | $5/10M requests |
| Railway | $5/month minimum | $0.000463/GB-hour |
| Render | 750 hours/month | $7/month |
| Vercel | 100GB-hours/month | $20/month |

## Next Steps

1. Deploy your worker to Cloudflare
2. Test with a sample form submission
3. Update your frontend with the worker URL
4. Monitor logs for any issues
5. Set up custom domain (optional)

# Cloudflare R2 Video Hosting Setup Guide

## Step 1: Create Cloudflare R2 Account
1. Go to https://cloudflare.com/
2. Sign up for Cloudflare account (free)
3. Navigate to R2 Object Storage
4. Create your first bucket (e.g., "queer-latin-dance-videos")

## Step 2: Upload Your Videos
```bash
# Video naming convention:
salsa-fundamentals/lesson-1-basic-steps.mp4
salsa-fundamentals/lesson-2-timing-rhythm.mp4
bachata-sensual/lesson-1-basics.mp4
```

## Step 3: Configure Public Access
- Set bucket to "Public" for course videos
- Or use signed URLs for premium security

## Step 4: Get Your Video URLs
Your videos will be accessible at:
```
https://your-bucket-name.r2.dev/salsa-fundamentals/lesson-1-basic-steps.mp4
```

## Step 5: Update Course Platform
Replace Google Drive URLs with your R2 URLs in course-app.js

## Cost Breakdown (for your needs):
- Storage: 500GB @ $0.015/GB = $7.50/month
- Bandwidth: UNLIMITED (included free)
- Requests: 1M requests/month = $0.36/month
- **Total: ~$8/month for unlimited 4K video streaming**

## Security Features:
- Custom domain (videos.queerlatindance.com)
- Access tokens for paid users
- Geographic restrictions
- Hotlink protection
- Usage analytics

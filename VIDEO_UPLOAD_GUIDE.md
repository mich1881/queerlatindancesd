# Video Upload Guide for Queer Latin Dance Website

## 📁 Folder Structure
Your website is now set up to handle local videos in the `/videos/` folder:

```
/videos/
  /salsa-fundamentals/
    lesson-1-basic-steps.mp4
    lesson-2-timing-rhythm.mp4
    lesson-3-partner-connection.mp4
    lesson-4-cross-body-lead.mp4
    lesson-5-spins-turns.mp4
    lesson-6-leading-following.mp4
    lesson-7-styling.mp4
    lesson-8-putting-together.mp4
  
  /bachata-sensual/
    lesson-1-basics.mp4
    lesson-2-hip-movement.mp4
    lesson-3-turn-patterns.mp4
    lesson-4-sensual-styling.mp4
    lesson-5-partner-connection.mp4
    lesson-6-performance-practice.mp4
  
  /advanced-salsa/
    lesson-1-complex-turns.mp4
    lesson-2-advanced-styling.mp4
```

## 🎥 How to Add Your Videos

### Step 1: Prepare Your Videos
- **Format**: MP4 (best compatibility)
- **Resolution**: Up to 4K (1920x1080 recommended for web)
- **Naming**: Use descriptive, URL-friendly names
- **Size**: Each video can be up to 2GB (browser limit)

### Step 2: Upload Process
1. **Drag & Drop**: Simply drag your MP4 files into the appropriate course folder
2. **FTP Upload**: If using web hosting, upload via FTP/SFTP
3. **File Manager**: Use your hosting provider's file manager

### Step 3: Update Course Data
After uploading videos, update the `course-app.js` file:

```javascript
// Example: Add a new lesson
{
    id: 9,
    title: 'New Advanced Technique',
    video: 'videos/salsa-fundamentals/lesson-9-advanced-technique.mp4',
    videoType: 'mp4',
    duration: '22:30',
    description: 'Learn this advanced salsa technique'
}
```

## 💾 Storage Limitations by Platform

### Local Development (Your Computer)
- ✅ **Unlimited**: Store as many videos as your hard drive allows
- ✅ **4K Support**: No restrictions on video quality
- ✅ **Instant Access**: Videos load immediately

### GitHub Pages (Free Hosting)
- ❌ **1GB Total**: Repository size limit
- ❌ **100MB Per File**: Individual file size limit
- ❌ **Not Suitable**: For multiple 4K videos

### Web Hosting (Paid)
- ✅ **10GB-Unlimited**: Depending on plan ($5-20/month)
- ✅ **4K Support**: No file size limits
- ✅ **Professional**: Your own domain

### CDN/Cloud Storage (Recommended for Production)
- ✅ **Unlimited**: Cloudflare R2 (~$8/month)
- ✅ **Global Speed**: Fast worldwide delivery
- ✅ **Scalable**: Handle thousands of students

## 🚀 Recommended Workflow

### Phase 1: Development (Your Computer)
1. Store all videos in `/videos/` folder
2. Test everything locally
3. Perfect your course content

### Phase 2: Production (Choose One)
**Option A: Small Scale (< 10GB)**
- Upload to web hosting provider
- Simple and affordable

**Option B: Large Scale (100+ hours of 4K)**
- Use Cloudflare R2 or AWS S3
- Professional and scalable

## 🔧 Technical Tips

### Video Optimization
```bash
# Compress 4K videos for web (using FFmpeg)
ffmpeg -i input-4k.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac output-web.mp4
```

### File Organization
- Use consistent naming: `lesson-01-basic-steps.mp4`
- Keep folder names URL-friendly: `salsa-fundamentals`
- Add version numbers if updating: `lesson-01-v2.mp4`

### Security Considerations
- Local videos are accessible via direct URL
- Add `.htaccess` rules to prevent hotlinking
- Consider signed URLs for premium content

## 📊 Storage Cost Comparison

| Storage Method | Cost/Month | Storage Limit | Bandwidth | Best For |
|----------------|------------|---------------|-----------|----------|
| Local Development | $0 | Unlimited | N/A | Testing |
| Web Hosting | $10-50 | 50GB-500GB | Included | Small scale |
| Cloudflare R2 | $8 | 500GB+ | Unlimited | Professional |
| AWS S3 | $12-100 | Unlimited | Pay per GB | Enterprise |

## 🎯 Next Steps

1. **Start Local**: Upload a few test videos to `/videos/` folder
2. **Test Platform**: Make sure everything works perfectly
3. **Choose Hosting**: Pick the storage solution that fits your budget
4. **Scale Up**: Upload your complete video library

Would you like me to help you with any of these steps?

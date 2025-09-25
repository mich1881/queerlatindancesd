# Content Manager Guide

## Overview
The Content Manager system allows you to easily manage events and lessons for your dance website without editing code. All changes are stored in JSON files that can be exported/imported.

## System Components

### 1. `admin.html` - Login Portal
- Password protected access (default: `YourSecurePassword123!`)
- Redirects to content manager after successful login
- Access: Open `admin.html` in a browser

### 2. `content-manager.html` - Main Management Interface
- Add/edit/delete events and lessons
- Export updated data as JSON files
- Real-time preview of content
- Access: Through admin.html or directly if testing locally

### 3. Data Files
- `events-data.json` - Stores all event data
- `lessons-data.json` - Stores all lesson data

## How to Use

### First Time Setup
1. **For Local Testing:**
   - Start a local server: `python3 -m http.server 8080`
   - Access: `http://localhost:8080/admin.html`
   - Login with default password

2. **For Live Website:**
   - Upload all files to your web server
   - Access: `https://yourdomain.com/admin.html`

### Adding New Events
1. Go to admin.html and login
2. Click "Events" tab in content manager
3. Fill out the event form:
   - **Title**: Event name
   - **Date**: YYYY-MM-DD format or "ongoing"
   - **Event Type**: Choose "upcoming" or "past"
   - **Flyer URL**: Path to image (e.g., `images/eventpage/newflyer.png`)
   - **Description**: Event details
4. Click "Add Event"
5. Event appears in the list immediately

### Adding New Lessons
1. Click "Lessons" tab in content manager
2. Fill out the lesson form:
   - **Title**: Lesson name
   - **Type**: dropin, series, private, online, workshop
   - **Date**: YYYY-MM-DD or "ongoing"
   - **Month**: Display abbreviation (e.g., "DROP", "4WK", "OCT")
   - **Day**: Display text (e.g., "IN", "SER", "15")
   - **Flyer URL**: Path to image
   - **Description**: Lesson details
   - **Link**: Page link (e.g., dropin.html) or leave empty
   - **Status**: "Available Now" or "Coming Soon"
3. Click "Add Lesson"
4. Lesson appears in the list immediately

### Exporting Data (IMPORTANT!)
1. **After making changes**, click "Export Events Data" or "Export Lessons Data"
2. A JSON file downloads to your Downloads folder
3. **For live website**: Replace the corresponding JSON file on your server with the downloaded file
4. **For local testing**: Replace the JSON file in your local folder

### File Management Workflow

**Local Development:**
1. Make changes in content manager
2. Export JSON files
3. Replace local JSON files with exported versions
4. Test changes by refreshing your pages

**Live Website:**
1. Make changes in content manager
2. Export JSON files
3. Upload exported JSON files to replace existing ones on server
4. Changes appear immediately on website

## Data Structure

### Events Data
```json
{
  "upcoming": [
    {
      "id": "unique-id",
      "date": "2025-09-21",
      "month": "SEP",
      "day": "21",
      "title": "Event Title",
      "flyerUrl": "images/eventpage/flyer.png",
      "description": "Event description"
    }
  ],
  "past": [...]
}
```

### Lessons Data
```json
{
  "upcoming": [
    {
      "id": "unique-id",
      "date": "ongoing",
      "month": "DROP",
      "day": "IN",
      "title": "Lesson Title",
      "flyerUrl": "images/eventpage/flyer.png",
      "description": "Lesson description",
      "type": "dropin",
      "link": "dropin.html"
    }
  ],
  "coming_soon": [...]
}
```

## Troubleshooting

### Export Not Working
- Check browser console for errors (F12)
- Ensure you're using a proper server (not file:// URLs)
- Look for the downloaded file in your Downloads folder
- Check that the exported JSON file contains your changes

### Changes Not Appearing on Website
- Ensure you've exported the JSON files after making changes
- Upload/replace the JSON files on your server
- Clear browser cache and refresh
- Check that the website is loading the updated JSON files

### Cannot Login to Admin
- Default password: `YourSecurePassword123!`
- To change password: Edit line in admin.html that says `const correctPassword = "YourSecurePassword123!";`

### Images Not Displaying
- Ensure image paths are correct (case-sensitive)
- Images should be relative to the website root
- Example: `images/eventpage/myflyer.png`
- Upload new flyer images to the appropriate folder on your server

### Local Testing Issues
- Use a local server: `python3 -m http.server 8080`
- Don't open HTML files directly (file:// URLs have restrictions)
- Access via: `http://localhost:8080/admin.html`

## Security Notes

1. **Change the default password** in admin.html
2. Consider adding HTTPS if handling sensitive content
3. The admin files don't need to be publicly linked from your main website
4. You can remove admin.html and content-manager.html from public access after setting up content

## File Locations

- **Admin/Manager Files**: `admin.html`, `content-manager.html`
- **Data Files**: `events-data.json`, `lessons-data.json`
- **Website Pages**: `Events.html`, `lessons.html` (updated to load from JSON)
- **Images**: Store in `images/eventpage/` or similar organized folders

## Support

If you need to make changes that aren't possible through the content manager:
1. You can manually edit the JSON files
2. Use proper JSON syntax and structure
3. Test your changes by refreshing the website pages
4. Always backup your JSON files before making manual changes

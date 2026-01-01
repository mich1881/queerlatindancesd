# 🎭 Admin Panel Demo Guide

This guide shows you how to access and use the admin features of the Queer Latin Dance course platform.

## 🔑 How to Access Admin Features

1. **Open the course platform**: Go to `courses.html`
2. **Use Admin Demo Login**: Click the "⭐ Admin Demo Login" button
   - This automatically logs you in as `michelle@queerlatindance.com`
   - Admin status is granted to this email address

## 👑 Admin Features Available

### Admin Course Cards

When logged in as admin, you'll see **different course cards** with special admin controls:

- **🎥 View Course** - Direct access to view course videos (no purchase needed)
- **📤 Upload Videos** - Open the video upload modal for course management  
- **✏️ Edit Course** - Modify course details and lesson structure
- **👑 Admin Badge** - Shows you're viewing as admin

### Admin Panel Access

- **Admin Button** - Appears in the top navigation when logged in as admin
- **Admin Panel** features:
  - 📋 Pending course payments review
  - ✅ Grant/deny course access to students
  - 📊 Course statistics dashboard
  - 🧪 Testing tools for creating sample payments
  - 🗑️ Cleanup tools for managing test data

### Video Upload Modal

The upload modal includes:
- **Add New Lesson**: Create new video lessons with title, description, and video URL
- **Edit Existing Lessons**: Modify lesson content and videos
- **Replace Videos**: Update video sources for existing lessons
- **Lesson Management**: Reorder or remove lessons

## 🎯 Quick Admin Test Steps

1. **Click "⭐ Admin Demo Login"** - Instant admin access
2. **Check the course cards** - Should show "View Course" and "Upload" buttons
3. **Click "Admin" button** - Access the full admin panel
4. **Try "📤 Upload Videos"** - Test the video management interface
5. **Create sample payments** - Use testing tools to simulate student purchases

## 📧 Admin Email Configuration

Admin access is granted to these email addresses:
- `michelle@queerlatindance.com`
- `admin@queerlatindance.com` 
- `admin@demo.com`

To add more admin emails, modify the `adminEmails` array in the `isAdmin()` function in `course-app.js`.

## 🎨 Admin UI Features

- **Golden admin badge** next to course titles
- **Colorful admin buttons** (blue View, green Upload, orange Edit)
- **Admin-specific styling** for course cards
- **Admin panel** with specialized management tools

## 🚀 Next Steps

The admin functionality provides:
- ✅ Immediate course access for admins
- ✅ Video upload interface  
- ✅ Course management tools
- ✅ Student payment approval workflow
- ✅ Testing and demo capabilities

All admin features are now fully functional and ready to use!

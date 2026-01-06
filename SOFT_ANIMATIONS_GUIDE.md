# Soft Animations Guide

## How to Add Soft Fade-In Effects to Your Pages

I've created a global CSS file that adds smooth, elegant fade-in animations and transitions across your entire website. Everything will feel softer and more polished!

### Step 1: Add the CSS Link to Your Pages

Add this line in the `<head>` section of each HTML page, right after your other CSS links:

```html
<link rel="stylesheet" href="styles/global.css">
```

### Step 2: What Gets Animated

The global.css file automatically adds soft animations to:

✨ **Page Load**: Entire page fades in smoothly (0.6s)
✨ **Sections**: All main sections slide up gently while fading in (0.8s)
✨ **Images**: Fade in smoothly when they load
✨ **Cards**: Event cards, lesson cards, and circular buttons slide up with stagger effect
✨ **Forms**: Form sections appear with soft transitions
✨ **Buttons & Links**: Smooth hover effects (0.3s)
✨ **Navigation**: Soft transitions on menu items
✨ **Gallery Items**: Smooth transforms and fades on hover
✨ **Text**: Headers and titles fade in with slight upward motion

### Step 3: Pages to Update

Add the CSS link to these pages:
- [ ] index.html
- [ ] gallery.html
- [ ] directory.html
- [ ] lessons.html
- [ ] Events.html
- [ ] michelle.html
- [ ] book-us.html
- [ ] private-events.html
- [ ] corporate-events.html (when created)
- [ ] workshops.html (when created)
- [ ] Any other custom pages

### Example Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Page Title</title>
  
  <!-- Your existing CSS -->
  <link rel="stylesheet" href="style.css">
  
  <!-- Add this line for soft animations -->
  <link rel="stylesheet" href="styles/global.css">
</head>
<body>
  <!-- Your content will now fade in smoothly! -->
</body>
</html>
```

### Customization Options

#### Want faster/slower animations?
Edit `styles/global.css` and change the animation duration:
- `0.6s` = fast
- `0.8s` = medium (default for most)
- `1.2s` = slow and dramatic

#### Want to disable animations for specific elements?
Add this to your page's CSS:
```css
.no-animation {
  animation: none !important;
}
```

#### Accessibility Note
The file includes `prefers-reduced-motion` support - users who have motion sensitivity settings enabled will see instant transitions instead of animations.

### Benefits

🌟 **Professional Feel**: Smooth transitions make your site feel polished
🌟 **Better UX**: Gradual appearance is easier on the eyes
🌟 **Staggered Loading**: Multiple items appear one after another (like the gallery)
🌟 **Consistent Experience**: Same smooth feel across all pages
🌟 **Mobile Optimized**: Works beautifully on all devices

### Need Help?

If you want different animation speeds or styles for specific pages, just let me know!

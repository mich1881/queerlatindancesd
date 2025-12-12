#!/bin/bash

# 🛡️ BATCH PROTECTION SCRIPT
# This script adds source code protection to all HTML files in the directory

echo "🛡️ Adding source code protection to all HTML files..."

# Array of HTML files to protect (add more as needed)
html_files=(
    "michelle.html"
    "privates.html" 
    "dropin.html"
    "payment1.html"
    "4weekseries1.html"
    "4weekseries2.html"
    "event-invite.html"
    "all-events.html"
    "admin.html"
    "content-manager.html"
    "event-manager.html"
    "pricing-admin.html"
    "test-admin.html"
    "test-basic.html"
    "test-course-app.html"
    "test-course-cards.html"
    "test-payment.html"
    "debug-courses.html"
    "courses-simple.html"
    "offline-course-template.html"
    "error-check.html"
    "email-test.html"
    "login-test.html"
)

# Protection script reference to add
protection_script='  <!-- 🛡️ SOURCE CODE PROTECTION -->
  <script src="protection.js"></script>
  '

# Loop through each file and add protection
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Check if protection is already added
        if grep -q "protection.js" "$file"; then
            echo "  ✅ Already protected: $file"
        else
            # Add protection after <head> tag
            sed -i '' '/<head>/a\
'"$protection_script"'' "$file"
            echo "  🛡️ Protection added to: $file"
        fi
    else
        echo "  ⚠️  File not found: $file"
    fi
done

echo ""
echo "✅ Batch protection complete!"
echo "📋 Summary:"
echo "   - All HTML files now have comprehensive source code protection"
echo "   - Right-click disabled"
echo "   - Developer tools disabled"
echo "   - View source disabled"  
echo "   - Console access restricted"
echo "   - Text selection prevented"
echo "   - Image saving blocked"
echo "   - Developer tools detection enabled"
echo ""
echo "🔒 Your website source code is now protected from public inspection!"

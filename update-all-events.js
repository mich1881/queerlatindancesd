// Quick script to update the all-events.html with the correct image array
const fs = require('fs');

// Read the generated galleries
const generatedGalleries = require('./generated-galleries.js');

// Read the current all-events.html file
let allEventsContent = fs.readFileSync('all-events.html', 'utf8');

// Create the new array content with proper formatting
const allEventsArray = generatedGalleries.allevents
  .map(img => `      "${img}"`)
  .join(',\n');

// Find the array start and end
const arrayStart = allEventsContent.indexOf('const allEventImages = [');
const arrayEnd = allEventsContent.indexOf('];', arrayStart) + 2;

if (arrayStart !== -1 && arrayEnd !== -1) {
  // Extract the parts before and after the array
  const beforeArray = allEventsContent.substring(0, arrayStart);
  const afterArray = allEventsContent.substring(arrayEnd);
  
  // Create the new content
  const newContent = beforeArray + 
    'const allEventImages = [\n' + 
    allEventsArray + '\n    ]' + 
    afterArray;
  
  // Write the updated file
  fs.writeFileSync('all-events.html', newContent);
  console.log('✅ Updated all-events.html with newest images sorted first!');
  console.log(`📊 Total images: ${generatedGalleries.allevents.length}`);
} else {
  console.log('❌ Could not find the array in all-events.html');
}

const fs = require('fs');
const path = require('path');

function generateGalleryConfig() {
  console.log('🎨 Building multi-gallery configuration...');
  
  // Define all gallery folders to scan
  const galleryFolders = {
    '4weekseries1': {
      folder: '4weekseries1',
      displayName: '4 Week Series',
      customSort: true // Use custom newest-first sorting
    },
    'queersalsasocial': {
      folder: 'Queer Salsa Social', 
      displayName: 'Queer Salsa Social',
      customSort: false // Use default chronological sorting
    },
    'workshops': {
      folder: 'SoberPrideRecap',
      displayName: 'Special Workshops', 
      customSort: false
    },
    'sunsets': {
      folder: 'SalsaSunsets',
      displayName: 'Queer Salsa Sunsets',
      customSort: false
    },
    'sundance': {
      folder: 'SunDanceDayFest',
      displayName: 'Sun Dance Day Fest',
      customSort: false
    },
    'qldla': {
      folder: 'QueerLatinDanceLA',
      displayName: 'Queer Latin Dance LA',
      customSort: false
    },
    'shefest': {
      folder: 'She Fest Salsa Workshop',
      displayName: '2025 She Fest Workshop',
      customSort: true // Use newest-first sorting for recent workshop
    }
  };
  
  const allGalleries = {};
  let totalImages = 0;
  let allEventImages = []; // Collect all images for "All Events" gallery
  
  // Process each gallery
  Object.entries(galleryFolders).forEach(([galleryKey, config]) => {
    const folderPath = path.join('./images', config.folder);
    
    if (!fs.existsSync(folderPath)) {
      console.log(`⚠️  Folder not found: ${folderPath} - skipping`);
      return;
    }
    
    // Read all files from the folder
    const allFiles = fs.readdirSync(folderPath)
      .filter(file => {
        // Only include image files, exclude .DS_Store and other non-images
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(file) && 
               !file.startsWith('.DS_Store');
      });
    
    console.log(`📁 Found ${allFiles.length} images in ${config.displayName} (${config.folder})`);
    
    // Sort files based on gallery type
    let sortedFiles;
    if (config.customSort && galleryKey === '4weekseries1') {
      sortedFiles = sort4WeekSeries(allFiles);
    } else {
      // Default chronological sorting (newest first by filename)
      sortedFiles = allFiles.sort((a, b) => {
        const getImageNumber = (filename) => {
          const match = filename.match(/IMG_(\d+)/i);
          return match ? parseInt(match[1]) : 0;
        };
        return getImageNumber(b) - getImageNumber(a);
      });
    }
    
    // Convert to full paths
    const imagePaths = sortedFiles.map(file => `images/${config.folder}/${file}`);
    allGalleries[galleryKey] = imagePaths;
    totalImages += imagePaths.length;
    
    // Add all images to the "All Events" collection with timestamps for sorting
    imagePaths.forEach(imagePath => {
      const filename = path.basename(imagePath);
      const match = filename.match(/IMG_(\d+)/i);
      const imageNumber = match ? parseInt(match[1]) : 0;
      
      // Add with sort priority for newest-first ordering
      allEventImages.push({
        path: imagePath,
        imageNumber: imageNumber,
        folder: config.folder
      });
    });
  });
  
  // Create "All Events" gallery by combining and sorting all images newest-first
  allEventImages.sort((a, b) => {
    // Sort by image number, newest (highest number) first
    return b.imageNumber - a.imageNumber;
  });
  
  // Add "All Events" gallery to the collection
  allGalleries['allevents'] = allEventImages.map(img => img.path);
  
  // Custom sorting function for 4weekseries1 (newest first)
  function sort4WeekSeries(files) {
    return files.sort((a, b) => {
      const getImageNumber = (filename) => {
        const match = filename.match(/IMG_(\d+)/i);
        return match ? parseInt(match[1]) : 0;
      };
      
      const aNum = getImageNumber(a);
      const bNum = getImageNumber(b);
      
      // Priority order: IMG_9900+ > IMG_9700+ > IMG_0500+ > IMG_8600+
      const getPriority = (num) => {
        if (num >= 9900) return 4; // Newest
        if (num >= 9700) return 3; // Recent
        if (num >= 500 && num < 1000) return 2; // Mid-range
        if (num >= 8600) return 1; // Original
        return 0; // Others
      };
      
      const aPriority = getPriority(aNum);
      const bPriority = getPriority(bNum);
      
      // First sort by priority (highest first)
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      // Within same priority, sort by number (newest first)
      return bNum - aNum;
    });
  }
  
  // Create the JavaScript object string
  const galleryArrays = Object.entries(allGalleries)
    .map(([key, images]) => {
      const imagesStr = images.map(path => `      "${path}"`).join(',\n');
      return `    '${key}': [\n${imagesStr}\n    ]`;
    })
    .join(',\n');
  
  // Write to output file
  const outputContent = `// Auto-generated gallery configuration for multiple galleries
// Generated on: ${new Date().toISOString()}
// Total galleries: ${Object.keys(allGalleries).length}
// Total images: ${totalImages}

const generatedGalleries = {
${galleryArrays}
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = generatedGalleries;
}
`;
  
  fs.writeFileSync('generated-galleries.js', outputContent);
  
  console.log('✅ Generated multi-gallery configuration:');
  console.log(`   📂 Output: generated-galleries.js`);
  console.log(`   🎨 Total galleries: ${Object.keys(allGalleries).length}`);
  console.log(`   🖼️  Total images: ${totalImages}`);
  console.log('');
  console.log('📊 Gallery breakdown:');
  Object.entries(allGalleries).forEach(([key, images]) => {
    if (key === 'allevents') {
      console.log(`   All Events: ${images.length} images`);
    } else {
      const config = galleryFolders[key];
      console.log(`   ${config.displayName}: ${images.length} images`);
    }
  });
  console.log('');
  console.log('🔧 Next steps:');
  console.log('   1. Check generated-galleries.js');
  console.log('   2. Replace the galleries object in script.js');
  console.log('   3. Test all galleries to make sure they work!');
}

// Run the generator
generateGalleryConfig();

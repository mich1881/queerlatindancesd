// Optional: Photo input upload (keep if you use it)
document.getElementById('photoInput')?.addEventListener('change', function(e) {
  const files = e.target.files;
  const gallery = document.getElementById('photoGallery');
  gallery.innerHTML = '';
  Array.from(files).forEach(file => {
    const url = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = url;
    gallery.appendChild(img);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.swipe-gallery .swipe-img');
  let current = 0;
  let autoSwipeInterval;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
  }
 
  function prevImage() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  }

  showImage(current);

  // Swipe support for touch devices
  let startX = 0;
  const swipeGallery = document.querySelector('.swipe-gallery');
  if (swipeGallery) {
    swipeGallery.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    swipeGallery.addEventListener('touchend', (e) => {
      let endX = e.changedTouches[0].clientX;
      if (endX < startX - 30) {
        nextImage();
      } else if (endX > startX + 30) {
        prevImage();
      }
    });
  }

  // Start continuous auto-swipe
  autoSwipeInterval = setInterval(nextImage, 2500);
});
// Newsletter Gallery - Separate from main gallery
document.addEventListener('DOMContentLoaded', function() {
  const newsletterGallery = document.querySelector('.newsletter-swipe-gallery');
  if (newsletterGallery) {
    const images = newsletterGallery.querySelectorAll('.swipe-img');
    let current = 0;
    let autoSwipeInterval;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }

    function nextImage() {
      current = (current + 1) % images.length;
      showImage(current);
    }

    showImage(current);

    // Auto-swipe every 3 seconds
    autoSwipeInterval = setInterval(nextImage, 3000);

    // Touch support
    let startX = 0;
    newsletterGallery.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    newsletterGallery.addEventListener('touchend', (e) => {
      let endX = e.changedTouches[0].clientX;
      if (endX < startX - 30) {
        nextImage();
      } else if (endX > startX + 30) {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
      }
    });
  }
});

// Sparkle background effect
document.addEventListener('DOMContentLoaded', function() {
  const sparkleBg = document.getElementById('sparkle-bg');
  if (sparkleBg) {
    const sparkleCount = 40; // Number of sparkles

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.top = Math.random() * 100 + 'vh';
      sparkle.style.left = Math.random() * 100 + 'vw';
      sparkle.style.animationDelay = (Math.random() * 2) + 's';
      sparkleBg.appendChild(sparkle);
    }
  }
});

// Workshop Gallery Modal Navigation

document.addEventListener('DOMContentLoaded', function() {
  // Auto-generated galleries from build-gallery.js - 7 galleries, 322 total images
  const galleries = {
    '4weekseries1': [
      "images/4weekseries1/IMG_9912.JPG",
      "images/4weekseries1/IMG_9911.JPG",
      "images/4weekseries1/IMG_9905.JPG",
      "images/4weekseries1/IMG_9793.JPG",
      "images/4weekseries1/IMG_9792.JPG",
      "images/4weekseries1/IMG_9791.JPG",
      "images/4weekseries1/IMG_9790.JPG",
      "images/4weekseries1/IMG_9789.JPG",
      "images/4weekseries1/IMG_9788.JPG",
      "images/4weekseries1/IMG_9787.JPG",
      "images/4weekseries1/IMG_9786.JPG",
      "images/4weekseries1/IMG_9785.JPG",
      "images/4weekseries1/IMG_9782.JPG",
      "images/4weekseries1/IMG_9781.JPG",
      "images/4weekseries1/IMG_9780.JPG",
      "images/4weekseries1/IMG_9779.JPG",
      "images/4weekseries1/IMG_9778.JPG",
      "images/4weekseries1/IMG_9777.JPG",
      "images/4weekseries1/IMG_0508.jpg",
      "images/4weekseries1/IMG_0507.jpg",
      "images/4weekseries1/IMG_0506.jpg",
      "images/4weekseries1/IMG_0505.jpg",
      "images/4weekseries1/IMG_0504.jpg",
      "images/4weekseries1/IMG_0502.jpg",
      "images/4weekseries1/IMG_0501.jpg",
      "images/4weekseries1/IMG_8675.JPG",
      "images/4weekseries1/IMG_8669.jpg",
      "images/4weekseries1/IMG_8667.jpg",
      "images/4weekseries1/IMG_8666.jpg",
      "images/4weekseries1/IMG_8664.JPG",
      "images/4weekseries1/IMG_8663.JPG",
      "images/4weekseries1/IMG_8662.jpg",
      "images/4weekseries1/IMG_8661.JPG",
      "images/4weekseries1/IMG_8660.JPG",
      "images/4weekseries1/IMG_8659.JPG",
      "images/4weekseries1/IMG_8658.JPG",
      "images/4weekseries1/IMG_8657.JPG",
      "images/4weekseries1/IMG_8656.JPG",
      "images/4weekseries1/IMG_8655.JPG",
      "images/4weekseries1/IMG_8654.JPG",
      "images/4weekseries1/IMG_8653.JPG",
      "images/4weekseries1/IMG_8652.JPG",
      "images/4weekseries1/IMG_8651.JPG",
      "images/4weekseries1/IMG_8650.JPG",
      "images/4weekseries1/IMG_8649.JPG",
      "images/4weekseries1/IMG_8648.JPG",
      "images/4weekseries1/IMG_8647.JPG",
      "images/4weekseries1/IMG_8646.JPG",
      "images/4weekseries1/IMG_8645.jpg",
      "images/4weekseries1/IMG_8644.jpg",
      "images/4weekseries1/IMG_8643.JPG",
      "images/4weekseries1/IMG_8642.jpg",
      "images/4weekseries1/IMG_8641.JPG",
      "images/4weekseries1/IMG_8640.JPG",
      "images/4weekseries1/IMG_8639.JPG",
      "images/4weekseries1/IMG_0370.png"
    ],
    'queersalsasocial': [
      "images/Queer Salsa Social/IMG_0399.jpg",
      "images/Queer Salsa Social/IMG_0398.jpg",
      "images/Queer Salsa Social/IMG_0397.jpg",
      "images/Queer Salsa Social/IMG_0396.jpg",
      "images/Queer Salsa Social/IMG_0395.jpg",
      "images/Queer Salsa Social/IMG_0394.jpg",
      "images/Queer Salsa Social/IMG_0393.jpg",
      "images/Queer Salsa Social/IMG_0392.jpg",
      "images/Queer Salsa Social/IMG_0391.jpg",
      "images/Queer Salsa Social/IMG_0390.jpg",
      "images/Queer Salsa Social/IMG_0280.PNG"
    ],
    workshops: [
      "images/SoberPrideRecap/Michelle_PridePic.png",
      "images/SoberPrideRecap/SoberP1.png",
      "images/SoberPrideRecap/SoberP2.png",
      "images/SoberPrideRecap/SoberP3.png",
      "images/SoberPrideRecap/SoberP4.png",
      "images/SoberPrideRecap/SoberP5.png",
      "images/SoberPrideRecap/SoberP6.png",
      "images/SoberPrideRecap/SoberP7.png",
      "images/SoberPrideRecap/SoberP8.png",
      "images/SoberPrideRecap/SoberP9.png",
      "images/SoberPrideRecap/SoberP10.png",
      "images/SoberPrideRecap/SoberP11.png"
    ],
    sunsets: [
      "images/SalsaSunsets/IMG_9239.JPG",
      "images/SalsaSunsets/IMG_9238.JPG",
      "images/SalsaSunsets/IMG_9237.JPG",
      "images/SalsaSunsets/IMG_9236.JPG",
      "images/SalsaSunsets/IMG_9235.JPG",
      "images/SalsaSunsets/IMG_9231.JPG",
      "images/SalsaSunsets/IMG_9230.JPG",
      "images/SalsaSunsets/IMG_9229.JPG",
      "images/SalsaSunsets/IMG_9228.JPG",
      "images/SalsaSunsets/IMG_9227.JPG",
      "images/SalsaSunsets/IMG_9226.JPG",
      "images/SalsaSunsets/IMG_9225.JPG",
      "images/SalsaSunsets/IMG_9224.JPG",
      "images/SalsaSunsets/IMG_9223.JPG",
      "images/SalsaSunsets/IMG_9222.JPG",
      "images/SalsaSunsets/IMG_9220.JPG",
      "images/SalsaSunsets/IMG_9219.JPG",
      "images/SalsaSunsets/IMG_9218.JPG",
      "images/SalsaSunsets/IMG_9217.JPG",
      "images/SalsaSunsets/IMG_9216.JPG",
      "images/SalsaSunsets/IMG_9215.JPG",
      "images/SalsaSunsets/IMG_9214.JPG",
      "images/SalsaSunsets/IMG_9213.JPG",
      "images/SalsaSunsets/IMG_9212.JPG",
      "images/SalsaSunsets/IMG_8475.JPG",
      "images/SalsaSunsets/IMG_7939.jpg",
      "images/SalsaSunsets/IMG_7858.JPG",
      "images/SalsaSunsets/IMG_7857.JPG",
      "images/SalsaSunsets/IMG_7856.JPG",
      "images/SalsaSunsets/IMG_7855.JPG",
      "images/SalsaSunsets/IMG_7854.JPG",
      "images/SalsaSunsets/IMG_7852.JPG",
      "images/SalsaSunsets/IMG_7851.JPG",
      "images/SalsaSunsets/IMG_7850.JPG",
      "images/SalsaSunsets/IMG_7849.JPG",
      "images/SalsaSunsets/IMG_7848.JPG",
      "images/SalsaSunsets/IMG_7847.JPG",
      "images/SalsaSunsets/IMG_7846.JPG",
      "images/SalsaSunsets/IMG_7845.JPG",
      "images/SalsaSunsets/IMG_7844.JPG",
      "images/SalsaSunsets/IMG_7843.JPG",
      "images/SalsaSunsets/IMG_7842.JPG",
      "images/SalsaSunsets/IMG_7841.JPG",
      "images/SalsaSunsets/IMG_7840.JPG",
      "images/SalsaSunsets/IMG_7524.jpg",
      "images/SalsaSunsets/qssjun1.png",
      "images/SalsaSunsets/qssjun12.png",
      "images/SalsaSunsets/qssjun13.png",
      "images/SalsaSunsets/qssjun14.png",
      "images/SalsaSunsets/qssjun16.png",
      "images/SalsaSunsets/qssjun18.png",
      "images/SalsaSunsets/qssjun22.png",
      "images/SalsaSunsets/qssjun23.png",
      "images/SalsaSunsets/qssjun24.png",
      "images/SalsaSunsets/qssjun25.png",
      "images/SalsaSunsets/qssjun26.png",
      "images/SalsaSunsets/qssjun29.png",
      "images/SalsaSunsets/qssjun4.png",
      "images/SalsaSunsets/qssjun5.jpg",
      "images/SalsaSunsets/qssjun5.png",
      "images/SalsaSunsets/qssjun6.png",
      "images/SalsaSunsets/qssjun7.png",
      "images/SalsaSunsets/qssjun8.png",
      "images/SalsaSunsets/qssmay1.png",
      "images/SalsaSunsets/qssmay10.png",
      "images/SalsaSunsets/qssmay11.png",
      "images/SalsaSunsets/qssmay12.png",
      "images/SalsaSunsets/qssmay13.png",
      "images/SalsaSunsets/qssmay15.png",
      "images/SalsaSunsets/qssmay16.png",
      "images/SalsaSunsets/qssmay18.png",
      "images/SalsaSunsets/qssmay2.png",
      "images/SalsaSunsets/qssmay20.png",
      "images/SalsaSunsets/qssmay22.png",
      "images/SalsaSunsets/qssmay23.png",
      "images/SalsaSunsets/qssmay24.png",
      "images/SalsaSunsets/qssmay26.png",
      "images/SalsaSunsets/qssmay27.png",
      "images/SalsaSunsets/qssmay28.png",
      "images/SalsaSunsets/qssmay29.png",
      "images/SalsaSunsets/qssmay3.png",
      "images/SalsaSunsets/qssmay31.png",
      "images/SalsaSunsets/qssmay4.png",
      "images/SalsaSunsets/qssmay5.png",
      "images/SalsaSunsets/qssmay6.png",
      "images/SalsaSunsets/qssmay7.png",
      "images/SalsaSunsets/qssmay8.png",
      "images/SalsaSunsets/qssmay9.png"
    ],
    sundance: [
      "images/SunDanceDayFest/sddf50.jpg",
      "images/SunDanceDayFest/sddf49.jpeg",
      "images/SunDanceDayFest/sddf48.jpg",
      "images/SunDanceDayFest/sddf47.jpeg",
      "images/SunDanceDayFest/sddf46.jpg",
      "images/SunDanceDayFest/sddf45.jpeg",
      "images/SunDanceDayFest/sddf44.jpg",
      "images/SunDanceDayFest/sddf43.jpg",
      "images/SunDanceDayFest/sddf42.jpg",
      "images/SunDanceDayFest/sddf41.jpg",
      "images/SunDanceDayFest/sddf40.PNG",
      "images/SunDanceDayFest/sddf39.jpg",
      "images/SunDanceDayFest/sddf38.PNG",
      "images/SunDanceDayFest/sddf37.jpg",
      "images/SunDanceDayFest/sddf36.jpg",
      "images/SunDanceDayFest/sddf35.jpg",
      "images/SunDanceDayFest/sddf34.jpg",
      "images/SunDanceDayFest/sddf33.jpg",
      "images/SunDanceDayFest/sddf32.jpg",
      "images/SunDanceDayFest/sddf31.jpg",
      "images/SunDanceDayFest/sddf30.jpg",
      "images/SunDanceDayFest/sddf29.jpg",
      "images/SunDanceDayFest/sddf28.jpg",
      "images/SunDanceDayFest/sddf27.jpg",
      "images/SunDanceDayFest/sddf26.jpg",
      "images/SunDanceDayFest/sddf25.jpg",
      "images/SunDanceDayFest/sddf24.jpg",
      "images/SunDanceDayFest/sddf23.jpg",
      "images/SunDanceDayFest/sddf22.jpg",
      "images/SunDanceDayFest/sddf21.jpg",
      "images/SunDanceDayFest/sddf20.jpg",
      "images/SunDanceDayFest/sddf19.jpg",
      "images/SunDanceDayFest/sddf18.png",
      "images/SunDanceDayFest/sddf17.png",
      "images/SunDanceDayFest/sddf16.png",
      "images/SunDanceDayFest/sddf15.png",
      "images/SunDanceDayFest/sddf14.png",
      "images/SunDanceDayFest/sddf13.png",
      "images/SunDanceDayFest/sddf12.png",
      "images/SunDanceDayFest/sddf11.png",
      "images/SunDanceDayFest/sddf10.png",
      "images/SunDanceDayFest/sddf9.png",
      "images/SunDanceDayFest/sddf8.png",
      "images/SunDanceDayFest/sddf7.png",
      "images/SunDanceDayFest/sddf6.png",
      "images/SunDanceDayFest/sddf5.png",
      "images/SunDanceDayFest/sddf4.png",
      "images/SunDanceDayFest/sddf3.png",
      "images/SunDanceDayFest/sddf2.png",
      "images/SunDanceDayFest/sddf1.png",
      "images/SunDanceDayFest/IMG_7675.jpg"
    ],
    qldla: [
      "images/QueerLatinDanceLA/IMG_7945.jpg",
      "images/QueerLatinDanceLA/IMG_7942.jpg",
      "images/QueerLatinDanceLA/IMG_7941.jpg",
      "images/QueerLatinDanceLA/IMG_7939.jpg",
      "images/QueerLatinDanceLA/IMG_7938.jpg",
      "images/QueerLatinDanceLA/IMG_7937.jpg",
      "images/QueerLatinDanceLA/IMG_7936.jpg",
      "images/QueerLatinDanceLA/IMG_7932.jpg",
      "images/QueerLatinDanceLA/IMG_7931.jpg",
      "images/QueerLatinDanceLA/IMG_7929 2.jpg",
      "images/QueerLatinDanceLA/IMG_7928.jpg",
      "images/QueerLatinDanceLA/IMG_7927.png",
      "images/QueerLatinDanceLA/IMG_7833.JPG",
      "images/QueerLatinDanceLA/IMG_7831.JPG",
      "images/QueerLatinDanceLA/IMG_7830.JPG",
      "images/QueerLatinDanceLA/IMG_7823.JPG",
      "images/QueerLatinDanceLA/IMG_7814.JPG",
      "images/QueerLatinDanceLA/IMG_7813.JPG",
      "images/QueerLatinDanceLA/IMG_7812.JPG",
      "images/QueerLatinDanceLA/IMG_7811.JPG",
      "images/QueerLatinDanceLA/IMG_7810.JPG",
      "images/QueerLatinDanceLA/IMG_7809.JPG",
      "images/QueerLatinDanceLA/IMG_7807.JPG",
      "images/QueerLatinDanceLA/IMG_7805.JPG",
      "images/QueerLatinDanceLA/IMG_7804.JPG",
      "images/QueerLatinDanceLA/IMG_7803.JPG",
      "images/QueerLatinDanceLA/IMG_7802.JPG",
      "images/QueerLatinDanceLA/IMG_7793.JPG",
      "images/QueerLatinDanceLA/IMG_7792.JPG",
      "images/QueerLatinDanceLA/IMG_7791.JPG",
      "images/QueerLatinDanceLA/IMG_7790.JPG",
      "images/QueerLatinDanceLA/IMG_7788.JPG",
      "images/QueerLatinDanceLA/IMG_7787.JPG"
    ],
    'shefest': [
      "images/She Fest Salsa Workshop/IMG_9698.JPG",
      "images/She Fest Salsa Workshop/IMG_9696.JPG",
      "images/She Fest Salsa Workshop/IMG_9695.JPG",
      "images/She Fest Salsa Workshop/IMG_9693.JPG",
      "images/She Fest Salsa Workshop/IMG_9692.JPG",
      "images/She Fest Salsa Workshop/IMG_9685.JPG",
      "images/She Fest Salsa Workshop/IMG_9684.JPG",
      "images/She Fest Salsa Workshop/IMG_9682.JPG",
      "images/She Fest Salsa Workshop/IMG_9680.JPG",
      "images/She Fest Salsa Workshop/IMG_9679.JPG",
      "images/She Fest Salsa Workshop/IMG_9674.JPG",
      "images/She Fest Salsa Workshop/IMG_9668.JPG",
      "images/She Fest Salsa Workshop/IMG_9667.JPG",
      "images/She Fest Salsa Workshop/IMG_9666.JPG",
      "images/She Fest Salsa Workshop/IMG_9665.JPG",
      "images/She Fest Salsa Workshop/IMG_9664.JPG",
      "images/She Fest Salsa Workshop/IMG_9663.JPG",
      "images/She Fest Salsa Workshop/IMG_9662.JPG",
      "images/She Fest Salsa Workshop/IMG_9660.JPG",
      "images/She Fest Salsa Workshop/IMG_9659.JPG",
      "images/She Fest Salsa Workshop/IMG_9658.JPG",
      "images/She Fest Salsa Workshop/IMG_9654.JPG",
      "images/She Fest Salsa Workshop/IMG_9653.JPG",
      "images/She Fest Salsa Workshop/IMG_9652.JPG",
      "images/She Fest Salsa Workshop/IMG_9651.JPG",
      "images/She Fest Salsa Workshop/IMG_9650.JPG",
      "images/She Fest Salsa Workshop/IMG_9649.JPG",
      "images/She Fest Salsa Workshop/IMG_9648.JPG",
      "images/She Fest Salsa Workshop/IMG_9647.JPG",
      "images/She Fest Salsa Workshop/IMG_9646.JPG",
      "images/She Fest Salsa Workshop/IMG_9645.JPG",
      "images/She Fest Salsa Workshop/IMG_9644.JPG",
      "images/She Fest Salsa Workshop/IMG_9643.JPG",
      "images/She Fest Salsa Workshop/IMG_9642.JPG",
      "images/She Fest Salsa Workshop/IMG_9641.JPG",
      "images/She Fest Salsa Workshop/IMG_9640.JPG",
      "images/She Fest Salsa Workshop/IMG_9639.JPG",
      "images/She Fest Salsa Workshop/IMG_9638.JPG",
      "images/She Fest Salsa Workshop/IMG_9636.JPG",
      "images/She Fest Salsa Workshop/IMG_9634.JPG",
      "images/She Fest Salsa Workshop/IMG_9633.JPG",
      "images/She Fest Salsa Workshop/IMG_9632.JPG",
      "images/She Fest Salsa Workshop/IMG_9631.JPG",
      "images/She Fest Salsa Workshop/IMG_9630.JPG",
      "images/She Fest Salsa Workshop/IMG_9629.JPG",
      "images/She Fest Salsa Workshop/IMG_9628.JPG",
      "images/She Fest Salsa Workshop/IMG_9627.JPG",
      "images/She Fest Salsa Workshop/IMG_9626.JPG",
      "images/She Fest Salsa Workshop/IMG_9625.JPG",
      "images/She Fest Salsa Workshop/IMG_9621.JPG",
      "images/She Fest Salsa Workshop/IMG_9620.JPG",
      "images/She Fest Salsa Workshop/IMG_9619.JPG",
      "images/She Fest Salsa Workshop/IMG_9554.JPG",
      "images/She Fest Salsa Workshop/IMG_9553.JPG",
      "images/She Fest Salsa Workshop/IMG_9550.JPG",
      "images/She Fest Salsa Workshop/IMG_9549.JPG",
      "images/She Fest Salsa Workshop/IMG_9547.JPG",
      "images/She Fest Salsa Workshop/IMG_9546.JPG",
      "images/She Fest Salsa Workshop/IMG_9544.JPG",
      "images/She Fest Salsa Workshop/IMG_9543.JPG",
      "images/She Fest Salsa Workshop/IMG_9541.JPG",
      "images/She Fest Salsa Workshop/IMG_9540.JPG",
      "images/She Fest Salsa Workshop/IMG_9539.JPG",
      "images/She Fest Salsa Workshop/IMG_9538.JPG",
      "images/She Fest Salsa Workshop/IMG_9537.JPG",
      "images/She Fest Salsa Workshop/IMG_9535.JPG",
      "images/She Fest Salsa Workshop/IMG_9533.JPG",
      "images/She Fest Salsa Workshop/IMG_9532.JPG"
    ],
    all: [
      // Add images for "All Events" if you want
    ]
  };

  document.querySelectorAll('.open-workshop-modal').forEach(img => {
    img.addEventListener('click', function(e) {
      e.preventDefault();
      const galleryType = img.getAttribute('data-gallery');
      const images = galleries[galleryType];
      if (!images || images.length === 0) return;

      // Set modal title
    document.getElementById('modalTitle').textContent =
      galleryType === 'workshops' ? 'Special Workshops' :
      galleryType === 'sunsets' ? 'Queer Salsa Sunsets' :
      galleryType === 'sundance' ? 'Sun Dance Day Fest' :
      galleryType === 'qldla' ? 'Queer Latin Dance LA' :
      galleryType === '4weekseries1' ? '4 Week Series' :
      galleryType === 'queersalsasocial' ? 'Queer Salsa Social' :
      galleryType === 'shefest' ? '2025 She Fest Workshop' :
      'Gallery';
      // Set main photo
      const mainPhoto = document.getElementById('mainWorkshopPhoto');
      mainPhoto.src = images[0];
      mainPhoto.setAttribute('data-gallery-type', galleryType);
      mainPhoto.setAttribute('data-current-index', 0);

      // Populate thumbnails (find the correct modal's thumbs-wrapper)
      const modal = document.getElementById('workshopGalleryModal');
      const thumbsWrapper = modal.querySelector('.thumbs-wrapper');
      thumbsWrapper.innerHTML = '';
      images.forEach((src, idx) => {
        const thumb = document.createElement('img');
        thumb.className = 'thumb';
        thumb.src = src;
        thumb.alt = `Thumb ${idx+1}`;
        thumb.addEventListener('click', () => {
          mainPhoto.src = src;
          mainPhoto.setAttribute('data-current-index', idx);
        });
        thumbsWrapper.appendChild(thumb);
      });

      document.getElementById('workshopGalleryModal').style.display = 'flex';
    });
  });

  document.getElementById('closeWorkshopModal').onclick = function() {
    document.getElementById('workshopGalleryModal').style.display = 'none';
    document.getElementById('lightboxOverlay')?.remove();
  };

  // Fullscreen Lightbox Overlay
  function openLightbox(galleryType, startIndex) {
    const images = galleries[galleryType];
    if (!images || images.length === 0) return;

    // Remove any existing overlay
    document.getElementById('lightboxOverlay')?.remove();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'lightboxOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.98)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;
    overlay.style.flexDirection = 'column';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '30px';
    closeBtn.style.right = '40px';
    closeBtn.style.fontSize = '3rem';
    closeBtn.style.background = 'none';
    closeBtn.style.color = '#fff';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.zIndex = 10001;
    closeBtn.setAttribute('aria-label', 'Close');
    overlay.appendChild(closeBtn);

    // Image element
    const img = document.createElement('img');
    img.style.width = '100vw';
    img.style.height = '100vh';
    img.style.objectFit = 'contain';
    img.style.boxShadow = '0 0 40px #000';
    img.style.borderRadius = '0';
    img.style.background = 'black';
    overlay.appendChild(img);

    // Navigation
    const leftBtn = document.createElement('button');
    leftBtn.textContent = '‹';
    leftBtn.style.position = 'absolute';
    leftBtn.style.left = '30px';
    leftBtn.style.top = '50%';
    leftBtn.style.transform = 'translateY(-50%)';
    leftBtn.style.fontSize = '3rem';
    leftBtn.style.background = 'none';
    leftBtn.style.color = '#fff';
    leftBtn.style.border = 'none';
    leftBtn.style.cursor = 'pointer';
    leftBtn.style.zIndex = 10001;
    overlay.appendChild(leftBtn);

    const rightBtn = document.createElement('button');
    rightBtn.textContent = '›';
    rightBtn.style.position = 'absolute';
    rightBtn.style.right = '30px';
    rightBtn.style.top = '50%';
    rightBtn.style.transform = 'translateY(-50%)';
    rightBtn.style.fontSize = '3rem';
    rightBtn.style.background = 'none';
    rightBtn.style.color = '#fff';
    rightBtn.style.border = 'none';
    rightBtn.style.cursor = 'pointer';
    rightBtn.style.zIndex = 10001;
    overlay.appendChild(rightBtn);

    let currentIndex = startIndex;
    function updateImage() {
      img.src = images[currentIndex];
      // Disable left arrow if at first image
      leftBtn.disabled = currentIndex === 0;
      leftBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      // Disable right arrow if at last image
      rightBtn.disabled = currentIndex === images.length - 1;
      rightBtn.style.opacity = currentIndex === images.length - 1 ? '0.5' : '1';
    }
    updateImage();

    function showPrev() {
      if (currentIndex > 0) {
        currentIndex--;
        updateImage();
      }
    }
    function showNext() {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImage();
      }
    }

    leftBtn.onclick = showPrev;
    rightBtn.onclick = showNext;

    // Fullscreen API logic
    function requestFullscreen(elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
    function exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    // When overlay is added to DOM, request fullscreen
    document.body.appendChild(overlay);
    setTimeout(() => requestFullscreen(overlay), 0);

    // Close logic
    function closeLightbox() {
      overlay.remove();
      exitFullscreen();
    }
    closeBtn.onclick = closeLightbox;

    // Keyboard navigation
    function keyHandler(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && currentIndex > 0) showPrev();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) showNext();
    }
    setTimeout(() => document.addEventListener('keydown', keyHandler), 0);
    // Remove event on close
    overlay.addEventListener('DOMNodeRemoved', function(e) {
      if (e.target === overlay) document.removeEventListener('keydown', keyHandler);
    });

    // Also close on fullscreen exit (user presses ESC in fullscreen)
    function fullscreenChangeHandler() {
      if (!document.fullscreenElement && document.getElementById('lightboxOverlay')) {
        overlay.remove();
      }
    }
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    // Clean up fullscreen event on close
    overlay.addEventListener('DOMNodeRemoved', function(e) {
      if (e.target === overlay) document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    });
  }

  // Clicking the main image opens the lightbox
  const mainPhoto = document.getElementById('mainWorkshopPhoto');
  if (mainPhoto) {
    mainPhoto.addEventListener('click', function() {
      const galleryType = mainPhoto.getAttribute('data-gallery-type');
      let idx = parseInt(mainPhoto.getAttribute('data-current-index')) || 0;
      openLightbox(galleryType, idx);
    });
  }
});
document.getElementById('thumbs-scroll-left')?.addEventListener('click', function() {
  document.querySelector('.thumbs-wrapper').scrollBy({ left: -200, behavior: 'smooth' });
});
document.getElementById('thumbs-scroll-right')?.addEventListener('click', function() {
  document.querySelector('.thumbs-wrapper').scrollBy({ left: 200, behavior: 'smooth' });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-nav-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu nav a');

  if (mobileToggle && mobileMenu) {
    // Toggle menu when hamburger is clicked
    mobileToggle.addEventListener('click', function() {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }
});

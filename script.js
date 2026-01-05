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
  // Use the generatedGalleries object from generated-galleries.js
  if (typeof generatedGalleries === 'undefined') {
    console.error('generatedGalleries is not defined! Make sure generated-galleries.js is loaded BEFORE script.js in your HTML.');
    return;
  }
  const galleries = generatedGalleries;

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
        galleryType === 'allevents' ? 'All Events' :
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

// COMPREHENSIVE HTML/SOURCE CODE PROTECTION
// This script protects your website from inspection, copying, and unauthorized access

(function() {
    'use strict';
    
    // DEVELOPER MODE TOGGLE
    // Set to true to disable protection for testing/development
    // Remember to set to false before going live!
    const DEVELOPER_MODE = false; // Change to true to disable protection
    
    // Early exit if in developer mode
    if (DEVELOPER_MODE) {
        console.log('%cDEVELOPER MODE: Protection disabled for testing', 'color: orange; font-size: 16px; font-weight: bold;');
        console.log('%cRemember to set DEVELOPER_MODE = false before going live!', 'color: orange; font-size: 14px;');
        return; // Exit entire protection script
    }
    
    // Check if we're on mobile to disable certain protections
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768 ||
                     'ontouchstart' in window;

    // 10. WARNING DISPLAY FUNCTION (Define early) - Less intrusive on mobile
    function showProtectionWarning(message) {
        // Skip warnings on mobile to avoid constant popups
        if (isMobile) {
            console.log('Protection: ' + message);
            return;
        }
        
        // Create or update warning overlay
        let overlay = document.getElementById('protection-warning');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'protection-warning';
            overlay.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #333333, #000000);
                color: white;
                padding: 10px 15px;
                border-radius: 6px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                z-index: 999999;
                font-family: Arial, sans-serif;
                font-size: 12px;
                font-weight: normal;
                max-width: 250px;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(overlay);
        }
        
        overlay.textContent = message;
        
        // Auto-hide after 1.5 seconds (much shorter)
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (overlay && overlay.parentNode) {
                        overlay.remove();
                    }
                }, 300);
            }
        }, 2000);
    }

    // 1. DISABLE RIGHT-CLICK CONTEXT MENU
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showProtectionWarning('Content protected');
        return false;
    });
    
    // 2. DISABLE DEVELOPER TOOLS KEYBOARD SHORTCUTS
    document.addEventListener('keydown', function(e) {
        // F12 - Developer Tools
        if (e.keyCode === 123) {
            e.preventDefault();
            showProtectionWarning('Protected content');
            return false;
        }
        
        // Ctrl+Shift+I - Developer Tools
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            showProtectionWarning('Protected content');
            return false;
        }
        
        // Ctrl+Shift+J - Console
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            showProtectionWarning('Protected content');
            return false;
        }
        
        // Ctrl+U - View Source
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            showProtectionWarning('Protected content');
            return false;
        }
        
        // Ctrl+Shift+C - Element Inspector
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            showProtectionWarning('Protected content');
            return false;
        }
        
        // Ctrl+A - Select All (prevents copying entire page)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            showProtectionWarning('Selection disabled');
            return false;
        }
        
        // Ctrl+S - Save Page
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            showProtectionWarning('Protected content');
            return false;
        }
        
        // Ctrl+P - Print (can reveal source)
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
            showProtectionWarning('Protected content');
            return false;
        }
        
        // Ctrl+Shift+K - Firefox console
        if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
            e.preventDefault();
            showProtectionWarning('Protected content');
            return false;
        }
        
        // F1 - Help (can sometimes open dev tools)
        if (e.keyCode === 112) {
            e.preventDefault();
            return false;
        }
    });
    
    // 3. DISABLE TEXT SELECTION
    document.addEventListener('selectstart', function(e) {
        // Allow selection in input fields and textareas
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        e.preventDefault();
        return false;
    });
    
    // 4. DISABLE DRAG AND DROP
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 5. DEVELOPER TOOLS DETECTION (Improved for mobile)
    let devtools = {
        open: false,
        orientation: null
    };
    
    function detectDevTools() {
        // Skip detection on mobile devices to prevent false positives
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         window.innerWidth <= 768 ||
                         'ontouchstart' in window;
        
        if (isMobile) {
            return; // Skip detection on mobile devices
        }
        
        const threshold = 200; // Increased threshold to reduce false positives
        const heightDiff = window.outerHeight - window.innerHeight;
        const widthDiff = window.outerWidth - window.innerWidth;
        
        // Only trigger if both dimensions suggest dev tools are open
        if (heightDiff > threshold && widthDiff > 50) {
            if (!devtools.open) {
                devtools.open = true;
                showProtectionWarning('� Developer tools detected.');
                
                // Less aggressive - just show warning, don't reload
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
            }
        } else {
            devtools.open = false;
        }
    }
    
    // Check for dev tools less frequently to reduce performance impact
    setInterval(detectDevTools, 2000);
    
    // 6. DISABLE CONSOLE ACCESS
    function disableConsole() {
        const methods = ['log', 'warn', 'error', 'info', 'debug', 'clear', 'dir', 'trace', 'assert', 'time', 'timeEnd'];
        const dummy = function() {};
        
        Object.defineProperty(window, 'console', {
            value: methods.reduce((acc, method) => {
                acc[method] = dummy;
                return acc;
            }, {}),
            writable: false,
            configurable: false
        });
    }
    
    // 7. CONSOLE WARNING MESSAGE
    setTimeout(() => {
        console.log('%cSTOP! Authorized access only', 'color: red; font-size: 50px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers.', 'color: red; font-size: 16px;');
        console.log('%cUnauthorized access to this system is prohibited and may be subject to legal action.', 'color: red; font-size: 14px; font-weight: bold;');
        console.log('%cAll activities are logged and monitored.', 'color: red; font-size: 14px;');
    }, 100);
    
    // Apply console protection after initial warning
    setTimeout(disableConsole, 3000);
    
    // 8. COMPREHENSIVE IMAGE PROTECTION
    function protectImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Disable right-click on images
            img.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                showProtectionWarning('Image saving is disabled.');
                return false;
            });
            
            // Disable dragging
            img.addEventListener('dragstart', function(e) {
                e.preventDefault();
                showProtectionWarning('Image dragging is disabled.');
                return false;
            });
            
            // Disable various selection methods
            img.draggable = false;
            img.style.userSelect = 'none';
            img.style.webkitUserSelect = 'none';
            img.style.mozUserSelect = 'none';
            img.style.msUserSelect = 'none';
            img.style.webkitUserDrag = 'none';
            img.style.khtmlUserDrag = 'none';
            img.style.mozUserDrag = 'none';
            img.style.oUserDrag = 'none';
            
            // Add transparent overlay to prevent direct access
            img.style.position = 'relative';
            
            // Create invisible overlay div to block access
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                z-index: 10;
                pointer-events: none;
            `;
            
            // Make the overlay capture events instead of the image
            overlay.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                showProtectionWarning('Image access is disabled.');
                return false;
            });
            
            // Wrap image in a container if not already wrapped
            if (img.parentNode.tagName !== 'DIV' || !img.parentNode.classList.contains('img-protection-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'img-protection-wrapper';
                wrapper.style.cssText = `
                    position: relative;
                    display: inline-block;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                `;
                
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
                wrapper.appendChild(overlay);
                
                // Protect the wrapper too
                wrapper.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    showProtectionWarning('Image access is disabled.');
                    return false;
                });
            }
        });
        
        // Also protect background images
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            const bgImage = window.getComputedStyle(element).backgroundImage;
            if (bgImage && bgImage !== 'none') {
                element.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    showProtectionWarning('Background image access is disabled.');
                    return false;
                });
                element.style.userSelect = 'none';
                element.style.webkitUserSelect = 'none';
            }
        });
    }
    
    // 8.5. BLOCK IMAGE SAVE SHORTCUTS AND ACCESS METHODS
    function blockImageSaveMethods() {
        // Block Ctrl+S on images specifically
        document.addEventListener('keydown', function(e) {
            const target = e.target;
            
            // If focused on an image or its container
            if (target.tagName === 'IMG' || target.querySelector('img') || target.closest('.img-protection-wrapper')) {
                if (e.ctrlKey && e.keyCode === 83) { // Ctrl+S
                    e.preventDefault();
                    showProtectionWarning('Saving images is disabled.');
                    return false;
                }
            }
        });
        
        // Intercept and block common image access methods
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
            const element = originalCreateElement.call(this, tagName);
            
            if (tagName.toLowerCase() === 'a') {
                // Block download links that might target images
                const originalSetAttribute = element.setAttribute;
                element.setAttribute = function(name, value) {
                    if (name === 'download' && /\.(jpg|jpeg|png|gif|svg|webp|bmp)$/i.test(value)) {
                        showProtectionWarning('Image downloads are disabled.');
                        return;
                    }
                    return originalSetAttribute.call(this, name, value);
                };
            }
            
            return element;
        };
        
        // Monitor for attempts to open image URLs directly
        const originalOpen = window.open;
        window.open = function(url, target, features) {
            if (url && /\.(jpg|jpeg|png|gif|svg|webp|bmp)$/i.test(url)) {
                showProtectionWarning('Direct image access is disabled.');
                return null;
            }
            return originalOpen.call(this, url, target, features);
        };
        
        // Protect against programmatic image access
        const originalImage = window.Image;
        window.Image = function() {
            const img = new originalImage();
            
            // Override src setting to detect access attempts
            const originalSrcSetter = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src').set;
            Object.defineProperty(img, 'src', {
                set: function(value) {
                    // Allow legitimate internal image loading
                    if (value.includes(window.location.origin) || !value.startsWith('http')) {
                        return originalSrcSetter.call(this, value);
                    }
                    return originalSrcSetter.call(this, value);
                },
                get: function() {
                    return Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src').get.call(this);
                }
            });
            
            return img;
        };
    }
    
    // 8.6. ADVANCED IMAGE SAVE BLOCKING
    function advancedImageProtection() {
        // Block ALL right-click context menu on images (including "Open image in new tab")
        document.addEventListener('contextmenu', function(e) {
            if (e.target.tagName === 'IMG' || e.target.closest('.img-protection-wrapper')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                showProtectionWarning('Image access is completely disabled.');
                return false;
            }
        }, true); // Use capture phase
        
        // Also block on bubble phase to catch any that slip through
        document.addEventListener('contextmenu', function(e) {
            if (e.target.tagName === 'IMG' || e.target.closest('.img-protection-wrapper')) {
                e.preventDefault();
                e.stopPropagation();
                showProtectionWarning('All image interactions are blocked.');
                return false;
            }
        }, false);
        
        // Intercept fetch requests that might download images
        if (window.fetch) {
            const originalFetch = window.fetch;
            window.fetch = function(resource, options) {
                if (typeof resource === 'string' && /\.(jpg|jpeg|png|gif|svg|webp|bmp)$/i.test(resource)) {
                    // Allow legitimate internal requests but log external ones
                    if (!resource.startsWith('/') && !resource.includes(window.location.hostname)) {
                        showProtectionWarning('External image access blocked.');
                        return Promise.reject(new Error('Image access denied'));
                    }
                }
                return originalFetch.apply(this, arguments);
            };
        }
        
        // Override XMLHttpRequest for image downloads
        const originalXHROpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
            if (typeof url === 'string' && /\.(jpg|jpeg|png|gif|svg|webp|bmp)$/i.test(url)) {
                if (!url.startsWith('/') && !url.includes(window.location.hostname)) {
                    showProtectionWarning('Image download attempt blocked.');
                    throw new Error('Image access denied');
                }
            }
            return originalXHROpen.apply(this, arguments);
        };
        
        // Block attempts to create download links for images
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.getAttribute('href')) {
                const href = link.getAttribute('href');
                if (/\.(jpg|jpeg|png|gif|svg|webp|bmp)$/i.test(href)) {
                    if (link.getAttribute('download') !== null) {
                        e.preventDefault();
                        e.stopPropagation();
                        showProtectionWarning('Image downloads are blocked.');
                        return false;
                    }
                }
            }
        }, true);
        
        // Block direct navigation to image URLs
        const originalLocation = window.location;
        const imageExtensions = /\.(jpg|jpeg|png|gif|svg|webp|bmp)$/i;
        
        // Override window.open to block opening images in new tabs
        const originalWindowOpen = window.open;
        window.open = function(url, target, features) {
            if (url && imageExtensions.test(url)) {
                showProtectionWarning('Opening images in new tabs is blocked.');
                return null;
            }
            return originalWindowOpen.call(this, url, target, features);
        };
        
        // Block middle-click on images (which opens in new tab)
        document.addEventListener('mousedown', function(e) {
            if ((e.target.tagName === 'IMG' || e.target.closest('.img-protection-wrapper')) && e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                showProtectionWarning('Middle-click on images is disabled.');
                return false;
            }
        }, true);
        
        // Block Ctrl+Click on images (opens in new tab)
        document.addEventListener('click', function(e) {
            if ((e.target.tagName === 'IMG' || e.target.closest('.img-protection-wrapper')) && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                e.stopPropagation();
                showProtectionWarning('Ctrl+Click on images is disabled.');
                return false;
            }
        }, true);
        
        // Block attempts to navigate directly to the current page's images
        window.addEventListener('beforeunload', function(e) {
            // This won't prevent navigation but will warn
            if (imageExtensions.test(window.location.pathname)) {
                e.preventDefault();
                showProtectionWarning('Direct image access detected.');
                return "Image access is not permitted.";
            }
        });
    }
    
    // 8.7. DIRECT IMAGE URL ACCESS PROTECTION
    function protectDirectImageAccess() {
        // Check if current page URL is an image file
        const currentURL = window.location.pathname.toLowerCase();
        const imageExtensions = /\.(jpg|jpeg|png|gif|svg|webp|bmp)$/i;
        
        if (imageExtensions.test(currentURL)) {
            // If someone accessed an image URL directly, redirect them back to homepage
            showProtectionWarning('Direct image access is not permitted. Redirecting...');
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 2000);
            
            // Blur the page content while redirecting
            document.body.style.filter = 'blur(10px)';
            document.body.style.pointerEvents = 'none';
            
            // Add overlay message
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999;
                font-family: Arial, sans-serif;
                font-size: 18px;
                text-align: center;
            `;
            overlay.innerHTML = `
                <div>
                    <h2>Protected Content</h2>
                    <p>Direct image access is not permitted.</p>
                    <p>Redirecting you back to the website...</p>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        
        // Monitor for attempts to change the URL to an image
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = function(state, title, url) {
            if (url && imageExtensions.test(url.toString())) {
                showProtectionWarning('Image URL navigation blocked.');
                return;
            }
            return originalPushState.apply(this, arguments);
        };
        
        history.replaceState = function(state, title, url) {
            if (url && imageExtensions.test(url.toString())) {
                showProtectionWarning('Image URL navigation blocked.');
                return;
            }
            return originalReplaceState.apply(this, arguments);
        };
    }

    // 9. OBFUSCATE HTML STRUCTURE
    function obfuscateHTML() {
        // Remove comments
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_COMMENT,
            null,
            false
        );
        
        const comments = [];
        let node;
        while (node = walker.nextNode()) {
            comments.push(node);
        }
        comments.forEach(comment => comment.remove());
        
        // Randomize non-critical IDs and classes
        setTimeout(() => {
            const elements = document.querySelectorAll('*[id], *[class]');
            elements.forEach(el => {
                // Don't touch critical elements needed by the app
                const criticalIds = [
                    'course-app', 'loading-screen', 'auth-screen', 'dashboard-screen',
                    'login-form', 'register-form', 'admin-panel', 'course-player',
                    'photoGallery', 'testimonialForm', 'sparkle-bg'
                ];
                
                if (el.id && !criticalIds.includes(el.id) && !el.id.startsWith('obf_')) {
                    el.dataset.originalId = el.id;
                    el.id = 'obf_' + Math.random().toString(36).substring(2, 15);
                }
            });
        }, 2000);
    }
    

    
    // 11. ADD PROTECTION CSS STYLES
    function addProtectionStyles() {
        if (document.getElementById('protection-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'protection-styles';
        style.textContent = `
            /* Disable text selection globally */
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }
            
            /* Allow text selection only for inputs and textareas */
            input, textarea, [contenteditable="true"] {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
            
            /* Comprehensive image protection */
            img {
                -webkit-user-drag: none !important;
                -khtml-user-drag: none !important;
                -moz-user-drag: none !important;
                -o-user-drag: none !important;
                user-drag: none !important;
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
                draggable: false !important;
            }
            
            /* Block image right-click and interaction overlays */
            .img-protection-wrapper {
                position: relative !important;
                display: inline-block !important;
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            
            /* Prevent image selection highlighting */
            img::-moz-selection,
            img::selection {
                background: transparent !important;
            }
            
            /* Disable context menu on background images */
            [style*="background-image"] {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
            }
            
            /* Hide scrollbars that might reveal page structure */
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 4px;
            }
            
            /* Animation for warning messages */
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            /* Blur protection for sensitive content */
            .blur-protect {
                filter: blur(5px);
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 12. DETECT DEBUGGER ATTEMPTS
    function detectDebugger() {
        try {
            // This will pause execution if debugger is open
            debugger;
        } catch (e) {
            // Ignore errors
        }
    }
    
    // Run debugger detection periodically
    setInterval(detectDebugger, 1000);
    
    // 13. INITIALIZE PROTECTION ON PAGE LOAD
    function initializeProtection() {
        protectDirectImageAccess(); // Check direct access first
        addProtectionStyles();
        protectImages();
        blockImageSaveMethods(); // Add new image protection
        advancedImageProtection(); // Add advanced image protection
        monitorImageAccess(); // Monitor image access attempts
        obfuscateHTML();
        
        // Re-protect images when new ones are added
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    protectImages();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeProtection);
    } else {
        initializeProtection();
    }
    
    // 14. PREVENT IFRAME EMBEDDING (Clickjacking protection)
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // 15. DISABLE CERTAIN BROWSER FEATURES
    window.addEventListener('beforeunload', function(e) {
        // This doesn't prevent leaving but makes it slightly more difficult
        return 'Are you sure you want to leave?';
    });
    
})();

// 16. ADDITIONAL GLOBAL PROTECTIONS
// Disable common debugging methods
window.eval = function() { 
    console.log('Code evaluation is disabled.');
    return null; 
};

window.Function = function() { 
    console.log('Function constructor is disabled.');
    return function() {}; 
};

// Override common console methods immediately
(function() {
    const originalLog = console.log;
    console.log = function() {
        originalLog('%cConsole access restricted', 'color: red; font-weight: bold;');
    };
})();    // 8.8. MONITOR IMAGE ACCESS ATTEMPTS
    function monitorImageAccess() {
        // Monitor attempts to access image URLs via JavaScript
        const originalGetAttribute = Element.prototype.getAttribute;
        Element.prototype.getAttribute = function(name) {
            if (this.tagName === 'IMG' && (name === 'src' || name === 'data-src')) {
                showProtectionWarning('Programmatic image access blocked.');
                return null;
            }
            return originalGetAttribute.call(this, name);
        };
        
        // Block attempts to copy image URLs from the DOM
        document.addEventListener('copy', function(e) {
            const selection = window.getSelection().toString();
            if (selection.match(/\.(jpg|jpeg|png|gif|svg|webp|bmp)/i)) {
                e.preventDefault();
                showProtectionWarning('Copying image URLs is blocked.');
                return false;
            }
        });
    }

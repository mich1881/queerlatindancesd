// 🛡️ COMPREHENSIVE HTML/SOURCE CODE PROTECTION
// This script protects your website from inspection, copying, and unauthorized access

(function() {
    'use strict';
    
    // 🔧 DEVELOPER MODE TOGGLE
    // Set to true to disable protection for testing/development
    // Remember to set to false before going live!
    const DEVELOPER_MODE = false; // Change to true to disable protection
    
    // Early exit if in developer mode
    if (DEVELOPER_MODE) {
        console.log('%c🔧 DEVELOPER MODE: Protection disabled for testing', 'color: orange; font-size: 16px; font-weight: bold;');
        console.log('%c⚠️ Remember to set DEVELOPER_MODE = false before going live!', 'color: orange; font-size: 14px;');
        return; // Exit entire protection script
    }
    
    // 10. WARNING DISPLAY FUNCTION (Define early)
    function showProtectionWarning(message) {
        // Create or update warning overlay
        let overlay = document.getElementById('protection-warning');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'protection-warning';
            overlay.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ff4444, #cc0000);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                z-index: 999999;
                font-family: Arial, sans-serif;
                font-size: 14px;
                font-weight: bold;
                max-width: 300px;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(overlay);
        }
        
        overlay.textContent = message;
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (overlay && overlay.parentNode) {
                        overlay.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    // 1. DISABLE RIGHT-CLICK CONTEXT MENU
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showProtectionWarning('Right-click disabled for content protection.');
        return false;
    });
    
    // 2. DISABLE DEVELOPER TOOLS KEYBOARD SHORTCUTS
    document.addEventListener('keydown', function(e) {
        // F12 - Developer Tools
        if (e.keyCode === 123) {
            e.preventDefault();
            showProtectionWarning('Developer tools are disabled.');
            return false;
        }
        
        // Ctrl+Shift+I - Developer Tools
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            showProtectionWarning('Inspector is disabled.');
            return false;
        }
        
        // Ctrl+Shift+J - Console
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            showProtectionWarning('Console access is disabled.');
            return false;
        }
        
        // Ctrl+U - View Source
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            showProtectionWarning('View source is disabled.');
            return false;
        }
        
        // Ctrl+Shift+C - Element Inspector
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            showProtectionWarning('Element inspector is disabled.');
            return false;
        }
        
        // Ctrl+A - Select All (prevents copying entire page)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            showProtectionWarning('Select all is disabled.');
            return false;
        }
        
        // Ctrl+S - Save Page
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            showProtectionWarning('Saving page is disabled.');
            return false;
        }
        
        // Ctrl+P - Print (can reveal source)
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
            showProtectionWarning('Printing is disabled.');
            return false;
        }
        
        // Ctrl+Shift+K - Firefox console
        if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
            e.preventDefault();
            showProtectionWarning('Console access is disabled.');
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
    
    // 5. DEVELOPER TOOLS DETECTION
    let devtools = {
        open: false,
        orientation: null
    };
    
    function detectDevTools() {
        const threshold = 160;
        
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            
            if (!devtools.open) {
                devtools.open = true;
                showProtectionWarning('🚫 Developer tools detected! This content is protected.');
                
                // Optional: Redirect or blur content
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } else {
            devtools.open = false;
        }
    }
    
    // Check for dev tools every 500ms
    setInterval(detectDevTools, 500);
    
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
        console.log('%c🚫 STOP! Authorized access only', 'color: red; font-size: 50px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers.', 'color: red; font-size: 16px;');
        console.log('%cUnauthorized access to this system is prohibited and may be subject to legal action.', 'color: red; font-size: 14px; font-weight: bold;');
        console.log('%c⚖️ All activities are logged and monitored.', 'color: red; font-size: 14px;');
    }, 100);
    
    // Apply console protection after initial warning
    setTimeout(disableConsole, 3000);
    
    // 8. DISABLE IMAGE CONTEXT MENU AND DRAGGING
    function protectImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                showProtectionWarning('Image saving is disabled.');
                return false;
            });
            
            img.draggable = false;
            img.style.userSelect = 'none';
            img.style.webkitUserSelect = 'none';
            img.style.mozUserSelect = 'none';
            img.style.msUserSelect = 'none';
            img.style.pointerEvents = 'none';
            img.style.webkitUserDrag = 'none';
            img.style.khtmlUserDrag = 'none';
            img.style.mozUserDrag = 'none';
            img.style.oUserDrag = 'none';
        });
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
            
            /* Prevent image dragging and selection */
            img {
                pointer-events: none !important;
                -webkit-user-drag: none !important;
                -khtml-user-drag: none !important;
                -moz-user-drag: none !important;
                -o-user-drag: none !important;
                user-drag: none !important;
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
        addProtectionStyles();
        protectImages();
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
    showProtectionWarning('Code evaluation is disabled.');
    return null; 
};

window.Function = function() { 
    showProtectionWarning('Function constructor is disabled.');
    return function() {}; 
};

// Override common console methods immediately
(function() {
    const originalLog = console.log;
    console.log = function() {
        originalLog('%c🛡️ Console access restricted', 'color: red; font-weight: bold;');
    };
})();

// Debug script for course loading issues

// Global debug function
function debugCourses() {
    console.log('🔍 Debug: Checking course platform state...');
    
    if (window.courseApp) {
        console.log('✅ courseApp exists');
        console.log('📚 Courses available:', Object.keys(window.courseApp.courses));
        console.log('👤 Current user:', window.courseApp.currentUser);
        console.log('👑 Is admin?', window.courseApp.isAdmin ? window.courseApp.isAdmin() : 'method not found');
        
        // Check DOM elements
        const myCoursesGrid = document.getElementById('my-courses-grid');
        const availableCoursesGrid = document.getElementById('available-courses-grid');
        console.log('📋 DOM elements:', {
            'my-courses-grid': !!myCoursesGrid,
            'available-courses-grid': !!availableCoursesGrid
        });
        
        // Check screen visibility
        const dashboardScreen = document.getElementById('dashboard-screen');
        console.log('🖥️ Dashboard screen:', {
            exists: !!dashboardScreen,
            visible: dashboardScreen && !dashboardScreen.classList.contains('hidden')
        });
        
        // Force re-render
        if (window.courseApp.renderCourses) {
            console.log('🔄 Force re-rendering courses...');
            window.courseApp.renderCourses();
        }
    } else {
        console.error('❌ courseApp not found');
    }
}

// Auto-run debug after page loads
setTimeout(debugCourses, 2000);

// Make it available globally
window.debugCourses = debugCourses;

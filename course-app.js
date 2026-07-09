// Queer Latin Dance Course Platform
// Student Registration & Login System
// Google Apps Script URL — update this if you redeploy
const APPS_SCRIPT_URL = 'https://bitter-forest-4b9b.michf18.workers.dev';
class CoursePlatform {
    constructor() {
        this.currentUser = null;
        this.currentCourse = null;
        this.currentLesson = null;
        this.lessonProgress = {};
        this.courseAccess = {};
        this.courses = {
            'recap-library': {
                id: 'recap-library',
                title: 'In Person Classes: Recap Videos',
                description: 'Practice outside of the studio at home or with other students in class and prepare you for the next lessons.',
                price: 10,
                icon: 'images/4weekseries1/IMG_9905.JPG',
                duration: '4 hours',
                lessons: 12,
                    learning: [
                        'Build strong beginner Salsa fundamentals',
                        'Learn basic steps, timing, and rhythm',
                        'Practice partner connection and leading/following skills',
                        'Train at your own pace with on-demand lessons'
                    ],
                level: 'Salsa Level 1',
                videoLessons: [
                    //SALSA VARIATION A
                    {
                        id: 'A1',
                        title: 'Salsa Week 1A',
                        video: 'https://drive.google.com/file/d/1t0ofE40PeO3gxxdGUeG_l3Uf3Utln9Ks/preview',
                        videoType: 'googledrive',
                        duration: '03:42',
                        description: 'Salsa basic drills and timing'
                    },
                    {
                        id: 'A2',
                        title: 'Salsa Week 2A',
                        video: 'https://drive.google.com/file/d/1Q7iX8nipE2TYvx5VgZMEkrk82_J4VLwJ/preview',
                        videoType: 'googledrive',
                        duration: '01:17',
                        description: 'Salsa rhythm and basic variations'
                    },
                    {
                        id: 'A3',
                        title: 'Salsa Week 3A',
                        video: 'https://drive.google.com/file/d/1TkDTNKCdtjJ3RMTEVUOef4y8dPpgBTf9/preview',
                        videoType: 'googledrive',
                        duration: '01:18',
                        description: 'How to connect with your dance partner'
                    },
                    {
                        id: 'A4',
                        title: 'Salsa Week 4A',
                        video: 'https://drive.google.com/file/d/1dyCFI5aAlD8o4W0mL9rOLg_g6TnrPZXb/preview',
                        videoType: 'googledrive',
                        duration: '03:06',
                        description: 'The most important move in salsa dancing'
                    },
                    //SALSA VARIATION B
                    {
                        id: 'B1',
                        title: 'Salsa Week 1B',
                        video: 'https://drive.google.com/file/d/1t0ofE40PeO3gxxdGUeG_l3Uf3Utln9Ks/preview',
                        videoType: 'googledrive',
                        duration: '03:42',
                        description: 'Learn the fundamental salsa steps and timing'
                    },
                    {
                        id: 'B2',
                        title: 'Salsa Week 2B',
                        video: 'https://drive.google.com/file/d/15_P7Dv04rc1-0BduLcDh-T3kttzlCOjv/preview',
                        videoType: 'googledrive',
                        duration: '01:17',
                        description: 'Understanding salsa rhythm and musical timing'
                    },
                    {
                        id: 'B3',
                        title: 'Salsa Week 3B',
                        video: 'https://drive.google.com/file/d/1zcW0HZETnvyI5nJ2sHXFMxuAk0DacxTs/preview',
                        videoType: 'googledrive',
                        duration: '01:18',
                        description: 'How to connect with your dance partner'
                    },
                    {
                        id: 'B4',
                        title: 'Salsa Week 4B',
                        video: 'https://drive.google.com/file/d/1xZiR7tUobJvK1FeXy2GnLbqWDIA8mwIq/preview',
                        videoType: 'googledrive',
                        duration: '03:06',
                        description: 'The most important move in salsa dancing'
                    },
                    //SALSA VARIATION C
                    {
                        id: 'C1',
                        title: 'Salsa Week 1C',
                        video: 'https://drive.google.com/file/d/1t0ofE40PeO3gxxdGUeG_l3Uf3Utln9Ks/preview',
                        videoType: 'googledrive',
                        duration: '03:42',
                        description: 'Learn the fundamental salsa steps and timing'
                    },
                    {
                        id: 'C2',
                        title: 'Salsa Week 2C',
                        video: 'https://drive.google.com/file/d/18fIoQ6V75s1Vu66med0_3Wlj_ZVqkBqz/preview',
                        videoType: 'googledrive',
                        duration: '01:47',
                        description: 'Understanding salsa rhythm and musical timing'
                    },
                    {
                        id: 'C3',
                        title: 'Salsa Week 3C',
                        video: 'https://drive.google.com/file/d/1SmogXNnqD6CuD5ulxJjrAdCVk9nVuYWi/preview',
                        videoType: 'googledrive',
                        duration: '01:32',
                        description: 'How to connect with your dance partner'
                    },
                    {
                        id: 'C4',
                        title: 'Salsa Week 4C',
                        video: 'https://drive.google.com/file/d/1L1CJt6Mbh0e_KV1MwGGS6xoZNsbNw3x1/preview',
                        videoType: 'googledrive',
                        duration: '01:02',
                        description: 'The most important move in salsa dancing'
                    },
                ]
            },
            'salsa-fundamentals': {
                id: 'salsa-fundamentals',
                title: 'Salsa Fundamentals',
                description: 'Learn the basics, strengthen, build a strong Salsa foundation.',
                price: 20,
                icon: 'images/4weekseries1/IMG_8661.JPG',
                duration: '4 hours',
                lessons: 8,
                level: 'Beginner',
                videoLessons: [
                    {
                        id: 1,
                        title: 'Welcome & Basic Steps',
                        video: 'https://pub-f5414e507f874cda9f93105c49892fc8.r2.dev/Salsa%20Videos%20Level%201/video-output-E439A4E8-B730-4FF9-95FB-3DB36582BF7A-1.mp4',
                        videoType: 'mp4',
                        duration: '01:55',
                        description: 'Introduction: Goals & Expectations'
                    },
                    {
                        id: 2,
                        title: 'Basic Timing & Rhythm',
                        video: 'https://drive.google.com/uc?export=download&id=1UHWNUdTdOHKSqqbmFoEZGJcynn27dO6m',
                        videoType: 'mp4',
                        duration: '18:45',
                        description: 'Understanding salsa rhythm and musical timing'
                    },
                    {
                        id: 3,
                        title: 'Partner Connection Basics',
                        video: 'https://drive.google.com/file/d/1UHWNUdTdOHKSqqbmFoEZGJcynn27dO6m/preview',
                        videoType: 'mp4',
                        duration: '22:15',
                        description: 'How to connect with your dance partner'
                    },
                    {
                        id: 4,
                        title: 'Cross Body Lead',
                        video: 'videos/salsa-fundamentals/lesson-4-cross-body-lead.mp4',
                        videoType: 'mp4',
                        duration: '20:00',
                        description: 'The most important move in salsa dancing'
                    },
                    {
                        id: 5,
                        title: 'Basic Spins & Turns',
                        video: 'videos/salsa-fundamentals/lesson-5-spins-turns.mp4',
                        videoType: 'mp4',
                        duration: '19:30',
                        description: 'Adding flair with spins and turns'
                    },
                    {
                        id: 6,
                        title: 'Leading & Following',
                        video: 'videos/salsa-fundamentals/lesson-6-leading-following.mp4',
                        videoType: 'mp4',
                        duration: '17:45',
                        description: 'Communication through dance'
                    },
                    {
                        id: 7,
                        title: 'Basic Styling',
                        video: 'videos/salsa-fundamentals/lesson-7-styling.mp4',
                        videoType: 'mp4',
                        duration: '21:20',
                        description: 'Adding your personal style to salsa'
                    },
                    {
                        id: 8,
                        title: 'Putting It All Together',
                        video: 'videos/salsa-fundamentals/lesson-8-putting-together.mp4',
                        videoType: 'mp4',
                        duration: '25:10',
                        description: 'Practice session with all techniques'
                    }
                ]
            },
            'bachata-fundamentals': {
                id: 'bachata-fundamentals',
                title: 'Bachata Fundamentals',
                description: 'Learn the romantic and expressive movements of bachata. Focus on body movement, isolations, and creating beautiful connection with your partner.',
                price: 39,
                icon: 'images/4weekseries1/IMG_9905.JPG',
                duration: '3 hours',
                lessons: 6,
                level: 'Beginner',
                videoLessons: [
                    {
                        id: 1,
                        title: 'Bachata Basics',
                        video: 'videos/bachata/lesson1.mp4',
                        duration: '16:20',
                        description: 'Learn the basic bachata step and rhythm'
                    },
                    {
                        id: 2,
                        title: 'Hip Movement & Body Motion',
                        video: 'videos/bachata/lesson2.mp4',
                        duration: '19:30',
                        description: 'Master the signature bachata hip movement'
                    },
                    {
                        id: 3,
                        title: 'Basic Turn Patterns',
                        video: 'videos/bachata/lesson3.mp4',
                        duration: '18:15',
                        description: 'Simple but beautiful turn combinations'
                    },
                    {
                        id: 4,
                        title: 'Sensual Styling',
                        video: 'videos/bachata/lesson4.mp4',
                        duration: '22:45',
                        description: 'Add sensuality and expression to your dance'
                    },
                    {
                        id: 5,
                        title: 'Partner Connection',
                        video: 'videos/bachata/lesson5.mp4',
                        duration: '20:10',
                        description: 'Creating intimate connection in bachata'
                    },
                    {
                        id: 6,
                        title: 'Performance Practice',
                        video: 'videos/bachata/lesson6.mp4',
                        duration: '24:00',
                        description: 'Put together a beautiful bachata routine'
                    }
                ]
            },
            'all-access': {
                id: 'all-access',
                title: 'All Access Pass',
                description: 'Unlock all courses and exclusive content with the All Access Pass. Perfect for dedicated dancers looking to improve their skills.',
                price: 35,
                icon: 'images/4weekseries1/IMG_0505.JPG',
                duration: 'Unlimited',
                lessons: 50,
                level: 'All Levels',
                videoLessons: [
                    {
                        id: 1,
                        title: 'Complex Turn Patterns',
                        video: 'videos/advanced-salsa/lesson1.mp4',
                        duration: '25:30',
                        description: 'Multi-turn combinations and complex patterns'
                    },
                    {
                        id: 2,
                        title: 'Advanced Styling Techniques',
                        video: 'videos/advanced-salsa/lesson2.mp4',
                        duration: '22:15',
                        description: 'Professional-level styling and flair'
                    }
                ]
            }
        };

        this.init();
    }

     async checkCourseAccess(courseId) {
    if (!this.currentUser?.email) return false;
    try {
        const response = await fetch('https://restless-feather-b6a9.michf18.workers.dev/api/course-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.currentUser.email, courseId })
        });
        const data = await response.json();
        const hasAccess = data.hasAccess === true; // 👈 actually read it
        this.courseAccess[courseId] = hasAccess;   // 👈 save it correctly
        return hasAccess;
    } catch (e) {
        console.error('checkCourseAccess error:', e);
        return false;
    }
}

    init() {
        console.log('🚀 Initializing Course Platform...');
        this.initializeSecurity(); // Enable security measures
        this.setupEventListeners();
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            this.checkAuthStatus();
            console.log('🎵 Course Platform Initialized!');
        }, 100);
    }
async checkAllCourseAccess() {
    if (!this.currentUser?.email) return;

    const courseIds = Object.keys(this.courses);

    const results = await Promise.all(
        courseIds.map(id => this.checkCourseAccess(id))
    );

    console.log('🔐 All course access loaded:', this.courseAccess);

    return results;
}
    setupEventListeners() {
        // Authentication forms
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('register-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Video events
        const video = document.getElementById('course-video');
        if (video) {
            video.addEventListener('timeupdate', () => this.trackVideoProgress());
            video.addEventListener('ended', () => this.handleVideoComplete());
            video.addEventListener('contextmenu', (e) => e.preventDefault()); // Basic protection
        }
    }

    // ===== AUTHENTICATION SYSTEM =====

    async checkAuthStatus() {
    console.log('🔍 Checking authentication status...');

    const savedUser = localStorage.getItem('currentUser');
    console.log('💾 Saved user data:', savedUser ? 'Found' : 'None');

    if (savedUser) {
        try {
            this.currentUser = JSON.parse(savedUser);
            console.log('✅ Found saved user:', this.currentUser.name);
            this.isAdmin();

            // 🔥 important: wait for permissions BEFORE UI loads
            await this.checkAllCourseAccess();
            this.showSuccess(`Welcome back, ${this.currentUser.name}! 💃`);
            this.showDashboard();

        } catch (error) {
            console.error('❌ Error loading saved user:', error);
            this.showAuthScreen();
        }
    } else {
        console.log('👤 No saved user, showing auth screen');
        this.showAuthScreen();
    }
}

    async handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            this.showError('Please enter both email and password');
            return;
        }
        this.showLoading('Signing you in...');

        try {
            const url = `${APPS_SCRIPT_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();

if (result.success) {
    this.currentUser = result.user;
    // IMPORTANT: rehydrate course access from KV
    try {
const response = await fetch('https://restless-feather-b6a9.michf18.workers.dev/api/course-access', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    courseId: courseId
  })
});
        const data = await response.json();
        this.currentUser.ownedCourses = data.courses || [];
    } catch (err) {
        console.log('⚠️ Failed to load course access:', err);
        this.currentUser.ownedCourses = this.currentUser.ownedCourses || [];
    }
    this.saveCurrentUser();
    this.showSuccess(`Welcome back, ${this.currentUser.name}! 🎉`);
    setTimeout(() => this.showDashboard(), 1000);
            } else {
                this.showError(result.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('Connection error. Please try again.');
        }
    }

    async handleRegister() {
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;

        if (!name || !email || !password) {
            this.showError('Please fill in all fields');
            setTimeout(() => this.showAuthScreen(), 1500);
            return;
        }
        if (password.length < 6) {
            this.showError('Password must be at least 6 characters');
            setTimeout(() => this.showAuthScreen(), 1500);
            return;
        }

        this.showLoading('Creating your account...');

        try {
            const url = `${APPS_SCRIPT_URL}?action=register&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();

            if (result.success) {
                this.currentUser = result.user;
                this.saveCurrentUser();
                this.showSuccess(`Welcome to our dance community, ${name}! 🎉`);
                setTimeout(() => this.showDashboard(), 1500);
            } else {
                this.showError(result.error || 'Registration failed. Please try again.');
                setTimeout(() => this.showAuthScreen(), 1500);
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showError('Connection error. Please try again.');
            setTimeout(() => this.showAuthScreen(), 1500);
        }
    }
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showSuccess('See you later! Keep dancing! 💃🕺');
        setTimeout(() => this.showAuthScreen(), 1000);
    }


    // ===== USER INTERFACE =====

    showScreen(screenId) {
        console.log('🔄 Switching to screen:', screenId);
        
        // Hide all screens first
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.classList.add('hidden');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
            console.log('✅ Screen switched successfully to:', screenId);
            console.log('🔍 Target screen classes:', targetScreen.className);
        } else {
            console.error('❌ Screen not found:', screenId);
        }
    }

    showLoading(message = 'Loading...') {
        document.querySelector('.loading-content h2').textContent = message;
        this.showScreen('loading-screen');
    }

    showAuthScreen() {
        this.showScreen('auth-screen');
    }

    showDashboard() {
        console.log('📱 showDashboard() called');
        
        // Refresh course access from server - DISABLED for debugging
        // this.refreshCourseAccess();
        
        this.showScreen('dashboard-screen');
        this.updateUserWelcome();
        this.renderCourses();
        
        // Show admin button if user is admin
        const adminBtn = document.getElementById('admin-btn');
        if (adminBtn) {
            if (this.isAdmin()) {
                adminBtn.style.display = 'inline-block';
                adminBtn.onclick = () => this.showAdminPanel();
                console.log('✅ Admin button enabled for:', this.currentUser.email);
            } else {
                adminBtn.style.display = 'none';
                console.log('ℹ️ Admin button hidden for non-admin user');
            }
        } else {
            console.error('❌ Admin button element not found!');
        }
    }

    updateUserWelcome() {
        const welcomeElement = document.getElementById('user-welcome');
        if (welcomeElement && this.currentUser) {
            const adminLabel = this.isAdmin() ? ' 👑 (Admin)' : '';
            welcomeElement.textContent = `Welcome, ${this.currentUser.name}!${adminLabel}`;
        }
    }

    renderCourses() {
        console.log('🎯 renderCourses() called');
        console.log('🎯 Current screen:', document.querySelector('.screen:not(.hidden)')?.id || 'none visible');
        
        const myCoursesGrid = document.getElementById('my-courses-grid');
        const availableCoursesGrid = document.getElementById('available-courses-grid');
        
        console.log('📋 DOM Elements:', { 
            myCoursesGrid: !!myCoursesGrid, 
            availableCoursesGrid: !!availableCoursesGrid,
            dashboardVisible: !document.getElementById('dashboard-screen')?.classList.contains('hidden')
        });
        
        if (!myCoursesGrid || !availableCoursesGrid) {
            console.error('❌ Required DOM elements not found!');
            console.error('❌ Available elements:', {
                'my-courses-grid': !!document.getElementById('my-courses-grid'),
                'available-courses-grid': !!document.getElementById('available-courses-grid'),
                'dashboard-screen': !!document.getElementById('dashboard-screen')
            });
            return;
        }

        // Hide welcome hero and "My Courses" sections completely for admins
        const welcomeHero = document.querySelector('.welcome-hero');
        const myCoursesSection = myCoursesGrid.closest('.course-section');
        const availableCoursesSection = availableCoursesGrid.closest('.course-section');
        const availableCoursesTitle = availableCoursesSection?.querySelector('.section-title');
        
        if (this.isAdmin()) {
            // Hide welcome hero section for admins
            if (welcomeHero) {
                welcomeHero.style.display = 'none';
            }
            // Hide "My Courses" section for admins
            if (myCoursesSection) {
                myCoursesSection.style.display = 'none';
            }
            // Update section title for admins
            if (availableCoursesTitle) {
                availableCoursesTitle.textContent = 'Course Management Dashboard 👑';
            }
        } else {
            // Show both sections for regular users
            if (welcomeHero) {
                welcomeHero.style.display = 'block';
            }
            if (myCoursesSection) {
                myCoursesSection.style.display = 'block';
            }
            // Reset section title for regular users
            if (availableCoursesTitle) {
                availableCoursesTitle.textContent = 'Available Courses';
            }
        }

        // Clear existing content
        myCoursesGrid.innerHTML = '';
        availableCoursesGrid.innerHTML = '';

        let hasPurchasedCourses = false;

        console.log('📚 Available courses:', Object.keys(this.courses));
        console.log('👤 Current user:', this.currentUser);
        console.log('🔢 Course count:', Object.keys(this.courses).length);

        if (Object.keys(this.courses).length === 0) {
            console.error('❌ No courses defined!');
            availableCoursesGrid.innerHTML = '<p style="color: red; padding: 20px;">❌ No courses available. Please contact support.</p>';
            return;
        }
        
        // Clear any existing content
        availableCoursesGrid.innerHTML = '';

        Object.values(this.courses).forEach(course => {
            console.log(`🎓 Processing course: ${course.title}`);
            const courseCard = this.createCourseCard(course);
            
            // For admins, put all courses in the "Available Courses" section since they manage all courses
            if (this.isAdmin()) {
                console.log(`👑 Admin managing course: ${course.id}`);
                availableCoursesGrid.appendChild(courseCard);
            } else if (this.userOwnsCourse(course.id)) {
                console.log(`✅ User owns course: ${course.id}`);
                myCoursesGrid.appendChild(courseCard);
                hasPurchasedCourses = true;
            } else {
                console.log(`🛒 Course available for purchase: ${course.id}`);
                availableCoursesGrid.appendChild(courseCard);
            }
        });

        // Show "no courses" message if needed (but not for admins)
        if (!hasPurchasedCourses && !this.isAdmin()) {
            myCoursesGrid.innerHTML = `
                <div class="no-courses-message">
                    <div class="no-courses-icon">📚</div>
                    <h3>No courses yet!</h3>
                    <p>Purchase your first course below to start your dance journey</p>
                </div>
            `;
        }
        // For admins, keep the "My Courses" section empty - they use admin buttons below
        
        console.log('✅ renderCourses() completed');
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        const isOwned = this.userOwnsCourse(course.id);
        const progress = this.getCourseProgress(course.id);
        const isAdmin = this.isAdmin();

        // Admin gets different card design with management tools
        if (isAdmin) {
            card.innerHTML = `
                <div class="course-image"><img src="${course.icon}" alt="${course.title}" class="course-card-image" onerror="this.style.display='none'; this.parentNode.innerHTML='<div style=\\'font-size:4em;\\'>💃</div>'"></div>
                <div class="course-content">
                    <h3 class="course-title">${course.title} <span class="admin-badge">👑 Admin</span></h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <span>📚 ${course.lessons} lessons</span>
                        <span>⏱️ ${course.duration}</span>
                        <span>📈 ${course.level}</span>
                        <span class="admin-price">💰 $${course.price}</span>
                    </div>
                    <div class="course-footer admin-footer">
                        <button class="course-btn btn-admin" onclick="courseApp.openCourse('${course.id}')">
                            🎥 View Course
                        </button>
                        <button class="course-btn btn-upload" onclick="courseApp.showUploadModal('${course.id}')">
                            📤 Upload Videos
                        </button>
                        <button class="course-btn btn-edit" onclick="courseApp.editCourse('${course.id}')">
                            ✏️ Edit Course
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Regular student view
            card.innerHTML = `
                <div class="course-image"><img src="${course.icon}" alt="${course.title}" class="course-card-image" onerror="this.style.display='none'; this.parentNode.innerHTML='<div style=\\'font-size:4em;\\'>💃</div>'"></div>
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <span>📚 ${course.lessons} lessons</span>
                        <span>⏱️ ${course.duration}</span>
                        <span>📈 ${course.level}</span>
                    </div>
                    <div class="course-footer">
                    ${isOwned ? `
                        <div class="course-progress-container">
                            <div class="course-progress-bar">
                                <div class="course-progress-fill" style="width: ${progress}%"></div>
                            </div>
                            <span class="progress-label">${progress > 0 ? `${progress}% complete` : 'Not started'}</span>
                        </div>
                        <div class="course-footer">
                            <span class="status-badge">✓ Purchased</span>
                            <button class="course-btn btn-success" onclick="courseApp.openCourse('${course.id}')">
                                ${progress > 0 ? '▶ Continue Learning' : 'Start Course'}
                            </button>
                        </div>
                    ` : `
                        <div class="course-footer">
                            <span class="course-price">$${course.price}</span>
                            <button class="course-btn btn-primary" onclick="courseApp.showPaymentInstructions('${course.id}')">
                                Buy Now - $${course.price}
                            </button>
                        </div>
                    `}
                    </div>
                </div>
            `;
        }
        return card;
    }

userOwnsCourse(courseId) {
    if (!this.currentUser?.email) {
    console.warn('No user logged in');
    return false;
}
    if (
        this.currentUser.ownedCourses &&
        this.currentUser.ownedCourses.includes(courseId)
    ) {
        return true;
    }

    return false;
}

    getCourseProgress(courseId) {
        if (!this.currentUser || !this.currentUser.progress || !this.currentUser.progress[courseId]) {
            return 0;
        }
        const courseProgress = this.currentUser.progress[courseId];
        const course = this.courses[courseId];
        if (!course || !course.videoLessons) return 0;
        const completedLessons = Object.values(courseProgress).filter(progress => progress >= 90).length;
        return Math.round((completedLessons / course.videoLessons.length) * 100);
    }

    // ===== COURSE PURCHASE (Demo Mode) =====

    purchaseCourse(courseId) {
        const course = this.courses[courseId];
        if (!course) return;

        // Check if user already owns the course
        if (this.userOwnsCourse(courseId)) {
            this.showError('You already own this course!');
            return;
        }

        // Show payment instructions
        this.showPaymentInstructions(course);
    }

    showCourseDownloadOptions(course) {
        const downloadChoice = confirm(`🎉 Purchase Complete!\n\nHow would you like to access "${course.title}"?\n\n✅ STREAM ONLINE - Watch now in browser\n📦 DOWNLOAD ZIP - Get complete offline course (recommended!)\n\nClick OK for online streaming, or Cancel to download ZIP file.`);
        
        if (downloadChoice) {
            // Online streaming
            this.showSuccess(`Welcome to "${course.title}"! You now have lifetime access.`);
            setTimeout(() => this.showDashboard(), 1500);
        } else {
            // ZIP download
            this.generateCourseDownload(course);
        }
    }

    generateCourseDownload(course) {
        this.showSuccess(`📦 Preparing your offline course package...\n\nDownload will include:\n• All video lessons in HD\n• Offline course player\n• Progress tracking\n• Bonus materials\n\nNo internet required after download!`);
        
        // In a real implementation, this would generate and serve the actual ZIP file
        setTimeout(() => {
            // Simulate download link
            const downloadUrl = `downloads/${course.id}-complete-course.zip`;
            this.showDownloadLink(course, downloadUrl);
            this.showDashboard();
        }, 3000);
    }
    showDownloadLink(course, downloadUrl) {
        // Create download notification
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                z-index: 9999;
                max-width: 400px;
                text-align: center;
            ">
                <h3 style="color: #667eea; margin-bottom: 1rem;">📦 Your Course is Ready!</h3>
                <p style="margin-bottom: 1.5rem; color: #555;">
                    <strong>${course.title}</strong><br>
                    Complete offline package (${this.estimateFileSize(course)})
                </p>
                <a href="#" onclick="alert('In demo mode - real download would start here!')" 
                   style="
                       display: inline-block;
                       background: linear-gradient(135deg, #667eea, #764ba2);
                       color: white;
                       padding: 12px 24px;
                       text-decoration: none;
                       border-radius: 8px;
                       font-weight: 600;
                       margin-bottom: 1rem;
                   ">
                    📥 Download Course (ZIP)
                </a>
                <p style="font-size: 0.9em; color: #888;">
                    Works offline • Yours forever • No monthly fees
                </p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            background: none;
                            border: none;
                            font-size: 1.2em;
                            cursor: pointer;
                        ">×</button>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 9998;
            " onclick="this.parentElement.remove()"></div>
        `;
        
        document.body.appendChild(notification);
    }

    estimateFileSize(course) {
        // Estimate ZIP file size based on course content
        const videoCount = course.videoLessons?.length || 8;
        const avgVideoSize = 300; // MB per lesson (compressed)
        const totalSize = videoCount * avgVideoSize;
        
        if (totalSize > 1000) {
            return `${(totalSize / 1000).toFixed(1)}GB`;
        } else {
            return `${totalSize}MB`;
        }
    }

    // ===== VIDEO PLAYER =====

    openCourse(courseId) {
        // Allow admins to view any course, regular users need to own it
        if (!this.isAdmin() && !this.userOwnsCourse(courseId)) {
            this.showError('You need to purchase this course first');
            return;
        }

        this.currentCourse = this.courses[courseId];
        if (!this.currentCourse) return;

        this.showScreen('player-screen');
        this.setupCoursePlayer();
    }

    setupCoursePlayer() {
        if (!this.currentCourse) return;

        // Update course title
        document.getElementById('current-course-title').textContent = this.currentCourse.title;
        
        // Set up watermark
        const watermark = document.getElementById('video-watermark');
        if (watermark && this.currentUser) {
            watermark.textContent = this.currentUser.email;
        }

        // Render lessons list
        this.renderLessonsList();
        
        // Load first lesson or last watched lesson
        const lastLesson = this.getLastWatchedLesson();
        this.loadLesson(lastLesson || 0);
        
        this.updateCourseProgress();
    }

    renderLessonsList() {
        const lessonsList = document.getElementById('lessons-list');
        if (!lessonsList || !this.currentCourse.videoLessons) return;

        lessonsList.innerHTML = '';

        this.currentCourse.videoLessons.forEach((lesson, index) => {
            const lessonElement = document.createElement('div');
            lessonElement.className = 'lesson-item';
            
            const isCompleted = this.isLessonCompleted(lesson.id);
            if (isCompleted) {
                lessonElement.classList.add('completed');
            }
            
            lessonElement.onclick = () => this.loadLesson(index);
            
            lessonElement.innerHTML = `
                <div class="lesson-info">
                    <h4>${lesson.title}</h4>
                    <div class="lesson-meta">${lesson.description}</div>
                </div>
                <span class="lesson-duration">${lesson.duration}</span>
            `;
            
            lessonsList.appendChild(lessonElement);
        });
    }

    async loadLesson(lessonIndex) {
        if (!this.currentCourse || !this.currentCourse.videoLessons[lessonIndex]) return;

        // Validate course access before loading lesson
        const hasAccess = await this.validateVideoAccess(this.currentCourse.id);
        
        if (!hasAccess) {
            this.showError('❌ Course access required. Please purchase this course to watch lessons.');
            this.showPaymentInstructions(this.currentCourse);
            return;
        }

        const lesson = this.currentCourse.videoLessons[lessonIndex];
        this.currentLesson = lesson;

        // Update video source based on type
        this.loadVideoSource(lesson);

        // Update lesson title
        const titleElement = document.getElementById('current-lesson-title');
        if (titleElement) {
            titleElement.textContent = lesson.title;
        }

        // Update active lesson in sidebar
        document.querySelectorAll('.lesson-item').forEach((item, index) => {
            if (index === lessonIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Save as last watched lesson
        this.saveLastWatchedLesson(lessonIndex);
        
        // Reset progress for new lesson
        this.updateVideoProgress(0);
    }

    trackVideoProgress() {
        const video = document.getElementById('course-video');
        if (!video || !this.currentLesson) return;

        const progress = (video.currentTime / video.duration) * 100;
        this.updateVideoProgress(progress);

        // Save progress to user data
        if (progress > 0) {
            this.saveLessonProgress(this.currentLesson.id, progress);
        }
    }

    updateVideoProgress(progress) {
        const progressFill = document.getElementById('lesson-progress');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${Math.round(progress)}% Complete`;
        }
    }

    handleVideoComplete() {
        if (this.currentLesson) {
            this.saveLessonProgress(this.currentLesson.id, 100);
            this.showSuccess('🎉 Lesson completed! Great job!');
            
            // Update lesson as completed in UI
            const activeLesson = document.querySelector('.lesson-item.active');
            if (activeLesson) {
                activeLesson.classList.add('completed');
            }
            
            this.updateCourseProgress();
            
            // Auto-advance to next lesson after 2 seconds
            setTimeout(() => {
                this.loadNextLesson();
            }, 2000);
        }
    }

    loadNextLesson() {
        if (!this.currentCourse) return;

        const currentIndex = this.currentCourse.videoLessons.findIndex(
            lesson => lesson.id === this.currentLesson.id
        );

        if (currentIndex < this.currentCourse.videoLessons.length - 1) {
            this.loadLesson(currentIndex + 1);
        } else {
            this.showSuccess('🏆 Congratulations! You\'ve completed the entire course!');
        }
    }

    updateCourseProgress() {
        const progressSummary = document.getElementById('course-progress-summary');
        if (!progressSummary || !this.currentCourse) return;

        const totalLessons = this.currentCourse.videoLessons.length;
        const completedLessons = this.currentCourse.videoLessons.filter(
            lesson => this.isLessonCompleted(lesson.id)
        ).length;

        progressSummary.textContent = `${completedLessons} of ${totalLessons} lessons`;
    }

    // ===== DATA MANAGEMENT =====

    saveLessonProgress(lessonId, progress) {
        if (!this.currentUser || !this.currentCourse) return;

        if (!this.currentUser.progress) {
            this.currentUser.progress = {};
        }

        if (!this.currentUser.progress[this.currentCourse.id]) {
            this.currentUser.progress[this.currentCourse.id] = {};
        }

        this.currentUser.progress[this.currentCourse.id][lessonId] = progress;
        this.saveCurrentUser();
        this.saveUserToDatabase();
    }

    isLessonCompleted(lessonId) {
        if (!this.currentUser || !this.currentCourse || !this.currentUser.progress) return false;
        
        const courseProgress = this.currentUser.progress[this.currentCourse.id];
        if (!courseProgress) return false;
        
        return (courseProgress[lessonId] || 0) >= 90; // 90% watched = completed
    }

    saveLastWatchedLesson(lessonIndex) {
        if (!this.currentUser || !this.currentCourse) return;

        if (!this.currentUser.lastWatched) {
            this.currentUser.lastWatched = {};
        }

        this.currentUser.lastWatched[this.currentCourse.id] = lessonIndex;
        this.saveCurrentUser();
    }

    getLastWatchedLesson() {
        if (!this.currentUser || !this.currentCourse || !this.currentUser.lastWatched) return 0;
        return this.currentUser.lastWatched[this.currentCourse.id] || 0;
    }

    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
    }

    saveUserToDatabase() {
        if (!this.currentUser) return;

        const users = JSON.parse(localStorage.getItem('QLDUsers') || '{}');
        users[this.currentUser.email] = this.currentUser;
        localStorage.setItem('QLDUsers', JSON.stringify(users));
    }

    // ===== PAYMENT SYSTEM =====

    showPaymentInstructions(courseId) {
        // If passed a string ID, get the course object
        const course = typeof courseId === 'string' ? this.courses[courseId] : courseId;
        
        if (!course) {
            console.error('❌ Course not found:', courseId);
            this.showError('Course not found. Please refresh and try again.');
            return;
        }
        
        // Store selected course for payment processing
        this.selectedCourse = course;
        
        // Update the payment overlay with course details
        const selectedSeries = document.getElementById('selectedSeries');
        const selectedPrice = document.getElementById('selectedPrice');
        const orderSummaryDetails = document.getElementById('orderSummaryDetails');
        const orderSummaryTotal = document.getElementById('orderSummaryTotal');
        const orderSummaryCalc = document.getElementById('orderSummaryCalc');
        
        if (selectedSeries) selectedSeries.textContent = course.title;
        if (selectedPrice) selectedPrice.textContent = `$${course.price}`;
        if (orderSummaryDetails) orderSummaryDetails.textContent = course.title;
        if (orderSummaryTotal) orderSummaryTotal.textContent = `$${course.price}`;
        if (orderSummaryCalc) orderSummaryCalc.textContent = `Course enrollment fee: $${course.price}`;
        
        // Pre-fill user email in all forms
        const emailInputs = document.querySelectorAll('.payment-form input[name="email"]');
        emailInputs.forEach(input => {
            if (this.currentUser && this.currentUser.email) {
                input.value = this.currentUser.email;
            }
        });
        
        // Show the payment overlay
        this.showPaymentOverlay();
    }

    showPaymentOverlay() {
        const overlay = document.getElementById('paymentOverlay');
        
        // Reset all forms
        this.closeAllForms();
        
        overlay.style.display = 'flex';
        
        // Set up payment method click handlers
        this.setupPaymentMethodHandlers();
        
        // Mobile enhancements
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        }
        
        setTimeout(() => {
            overlay.classList.add('show');
        }, 10);
    }
    
    setupPaymentMethodHandlers() {
        // Zelle button handler
        const zelleBtn = document.getElementById('zelleBtn');
        if (zelleBtn) {
            zelleBtn.onclick = (e) => {
                e.preventDefault();
                this.closeAllForms();
                const zelleForm = document.getElementById('zelleForm');
                if (zelleForm) {
                    zelleForm.classList.add('active');
                    zelleForm.style.display = 'block';
                }
            };
        }
        
        // Venmo button handler
        const venmoBtn = document.getElementById('venmoBtn');
        if (venmoBtn) {
            venmoBtn.onclick = (e) => {
                e.preventDefault();
                this.closeAllForms();
                const venmoForm = document.getElementById('venmoForm');
                if (venmoForm) {
                    venmoForm.classList.add('active');
                    venmoForm.style.display = 'block';
                }
            };
        }
        
        // PayPal button handler
        const paypalBtn = document.getElementById('paypalBtn');
        if (paypalBtn) {
            paypalBtn.onclick = (e) => {
                e.preventDefault();
                this.closeAllForms();
                const paypalForm = document.getElementById('paypalForm');
                if (paypalForm) {
                    paypalForm.classList.add('active');
                    paypalForm.style.display = 'block';
                }
            };
        }
        
        // Stripe button handler
        const stripeBtn = document.getElementById('stripeBtn');
        if (stripeBtn) {
            stripeBtn.onclick = (e) => {
                e.preventDefault();
                this.closeAllForms();
                // For now, show a message - you can implement Stripe later
                this.showError('Stripe integration coming soon! Please use Zelle, Venmo, or PayPal for now.');
            };
        }
        
        // Set up form submission handlers
        this.setupFormSubmissions();
    }
    
    setupFormSubmissions() {
        // Zelle form submission
        const zelleForm = document.getElementById('zelleFormInner');
        if (zelleForm) {
            zelleForm.onsubmit = (e) => {
                e.preventDefault();
                this.handlePaymentFormSubmission('zelle', zelleForm);
            };
        }
        
        // Venmo form submission
        const venmoForm = document.getElementById('venmoFormInner');
        if (venmoForm) {
            venmoForm.onsubmit = (e) => {
                e.preventDefault();
                this.handlePaymentFormSubmission('venmo', venmoForm);
            };
        }
        
        // PayPal form submission
        const paypalForm = document.getElementById('paypalFormInner');
        if (paypalForm) {
            paypalForm.onsubmit = (e) => {
                e.preventDefault();
                this.handlePaymentFormSubmission('paypal', paypalForm);
            };
        }
    }
    
    handlePaymentFormSubmission(paymentMethod, formElement) {
        if (!this.selectedCourse) {
            this.showError('No course selected. Please try again.');
            return;
        }
        
        // Get form data
        const formData = new FormData(formElement);
        const firstName = formData.get('firstName') || '';
        const lastName = formData.get('lastName') || '';
        const email = formData.get('email') || this.currentUser?.email || '';
        const phone = formData.get('phone') || '';
        const pronouns = formData.get('pronouns') || '';
        
        // Validate required fields
        if (!firstName || !lastName || !email) {
            this.showError('Please fill in all required fields (First Name, Last Name, Email).');
            return;
        }
        
        // Create payment request
        const paymentRequest = {
            id: 'payment_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            email: email,
            userEmail: email,
            firstName: firstName,
            lastName: lastName,
            name: `${firstName} ${lastName}`,
            phone: phone,
            pronouns: pronouns,
            courseName: this.selectedCourse.title,
            series: this.selectedCourse.title,
            courseId: this.selectedCourse.id,
            paymentMethod: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
            method: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
            timestamp: new Date().toISOString(),
            status: 'pending',
            amount: this.selectedCourse.price,
            price: this.selectedCourse.price,
            submittedAt: new Date().toISOString()
        };
        
        console.log('💳 Creating payment request:', paymentRequest);
        
        // Save to pending payments
        this.submitPaymentRequest(paymentRequest, paymentMethod);
    }
    
   async submitPaymentRequest(paymentRequest, paymentMethod) {
    try {
        await this.sendPaymentRequestToBackend(paymentRequest);

        this.closePaymentOverlay();
        this.showEmailConfirmationSuccess(paymentMethod, paymentRequest);

        console.log('✅ Payment request submitted to backend');

    } catch (error) {
        console.error('❌ Error submitting payment request:', error);
        this.showError('Failed to submit payment request. Please try again or contact support.');
    }
}
    async sendPaymentRequestToBackend(paymentRequest) {
        // Use the same backend as payment1.html
        const backendUrl = 'https://restless-feather-b6a9.michf18.workers.dev/api/payment-form';
        
        // Transform course app payment request to match payment1.html format
        const formData = {
            firstName: paymentRequest.firstName,
            lastName: paymentRequest.lastName,
            email: paymentRequest.email,
            phone: paymentRequest.phone || '',
            pronouns: paymentRequest.pronouns || '',
            paymentMethod: paymentRequest.paymentMethod,
            series: paymentRequest.courseName,
            amount: `$${paymentRequest.amount}`,
            timestamp: paymentRequest.timestamp,
            submissionId: 'course-' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            // Add course-specific data
            courseId: paymentRequest.courseId,
            courseType: 'online-course',
            platform: 'course-platform'
        };
        
        console.log('🔄 Sending payment request to backend:', formData);
        
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('✅ Backend response:', result);
        return result;
    }
    
    closePaymentOverlay() {
        const overlay = document.getElementById('paymentOverlay');
        if (overlay) {
            overlay.classList.remove('show');
            overlay.style.display = 'none';
        }
        
        // Restore body scroll on mobile
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'auto';
        }
    }
    
    showEmailConfirmationSuccess(paymentMethod, paymentRequest) {
        // Create payment method specific messages
        let paymentDetails = '';
        let recipient = '';
        let note = '';
        
        if (paymentMethod.toLowerCase() === 'zelle') {
            recipient = 'michelle@queerlatindance.com';
            note = `${paymentRequest.firstName} ${paymentRequest.lastName} - ${paymentRequest.courseName}`;
            paymentDetails = `
                <div style="background: #6c1cd1; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <strong>🏦 Zelle Payment Instructions:</strong><br>
                    • Recipient: <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 4px;">${recipient}</code><br>
                    • Amount: <strong>$${paymentRequest.amount}</strong><br>
                    • Memo: <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 4px;">${note}</code>
                </div>
            `;
        } else if (paymentMethod.toLowerCase() === 'venmo') {
            recipient = '@QueerLatinDance';
            note = `${paymentRequest.firstName} ${paymentRequest.lastName} - ${paymentRequest.courseName}`;
            paymentDetails = `
                <div style="background: #3d95ce; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <strong>📱 Venmo Payment Instructions:</strong><br>
                    • Recipient: <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 4px;">${recipient}</code><br>
                    • Amount: <strong>$${paymentRequest.amount}</strong><br>
                    • Note: <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 4px;">${note}</code>
                </div>
            `;
        } else if (paymentMethod.toLowerCase() === 'paypal') {
            recipient = 'michelle@queerlatindance.com';
            note = `${paymentRequest.firstName} ${paymentRequest.lastName} - ${paymentRequest.courseName}`;
            paymentDetails = `
                <div style="background: #0070ba; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <strong>💳 PayPal Payment Instructions:</strong><br>
                    • Recipient: <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 4px;">${recipient}</code><br>
                    • Amount: <strong>$${paymentRequest.amount}</strong><br>
                    • Note: <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 4px;">${note}</code>
                </div>
            `;
        }
        
        const successMessage = `
            <div style="max-width: 500px; margin: 0 auto; text-align: left;">
                <h3 style="color: #4CAF50; text-align: center; margin-bottom: 1rem;">✅ Payment Request Submitted!</h3>
                
                <div style="background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #667eea; margin-bottom: 1rem;">
                    <h4 style="margin: 0 0 1rem 0; color: #667eea;">📧 Check Your Email</h4>
                    <p style="margin: 0; line-height: 1.6;">We've sent detailed payment instructions to <strong>${paymentRequest.email}</strong> including:</p>
                    <ul style="margin: 0.5rem 0 0 1rem; line-height: 1.6;">
                        <li>Complete payment details</li>
                        <li>Course information</li>
                        <li>What happens next</li>
                    </ul>
                </div>
                
                ${paymentDetails}
                <div style="background: #fff3cd; border: 1px solid #ffeeba; color: #856404; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <strong>⏱️ Next Steps:</strong><br>
                    1. Complete your payment using the details above<br>
                    2. We'll verify your payment within 24 hours<br>
                    3. You'll receive course access confirmation<br>
                    4. Start learning! 🎉
                </div>
                <div style="text-align: center; margin-top: 1.5rem;">
                    <p style="color: #666; font-size: 0.9rem; margin: 0;">
                        Questions? Contact us at <a href="mailto:michelle@queerlatindance.com" style="color: #667eea;">michelle@queerlatindance.com</a>
                    </p>
                </div>
            </div>
        `;
        
        // Show the detailed success message
        this.showSuccess(successMessage);
        console.log('📧 Email confirmation sent to:', paymentRequest.email);
        console.log('👑 Payment request now available for admin review');
    }

    closeAllForms() {
        const forms = document.querySelectorAll('.payment-form');
        forms.forEach(form => {
            form.classList.remove('active');
            form.style.display = 'none';
        });
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showWarning(message) {
        this.showNotification(message, 'warning');
    }

    showNotification(message, type = 'success') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <strong>${type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅'}</strong>
            ${message}
        `;

        container.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);

        // Make it removable on click
        notification.addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }

    loadVideoSource(lesson) {
        const videoWrapper = document.querySelector('.video-wrapper');
        if (!videoWrapper) {
            console.error('❌ Video wrapper not found!');
            return;
        }
        
        const videoType = lesson.videoType || 'mp4';
        console.log('🎥 Loading video:', lesson.title, 'Type:', videoType, 'URL:', lesson.video);
        
        // Clear existing content
        videoWrapper.innerHTML = '';
        
        // Create secure video environment
        this.createSecureVideoEnvironment(lesson);
        
        if (videoType === 'youtube') {
            // YouTube embed
            const iframe = document.createElement('iframe');
            iframe.src = lesson.video;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            videoWrapper.appendChild(iframe);
            
        } else if (videoType === 'googledrive') {
            // Google Drive embed with improved compatibility
            console.log('🔧 Creating Google Drive iframe for:', lesson.video);
            
            const iframe = document.createElement('iframe');
            iframe.src = lesson.video;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.allow = 'autoplay; encrypted-media';
            iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;';
            
            // Add right-click protection
            iframe.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showWarning('🔒 Content is protected');
                return false;
            });
            
            videoWrapper.appendChild(iframe);
            
            // Create overlay to hide Google Drive controls (optional)
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                right: 0;
                width: 60px;
                height: 60px;
                background: rgba(0,0,0,0.8);
                z-index: 100;
                pointer-events: none;
            `;
            videoWrapper.appendChild(overlay);

            
        } else if (videoType === 'vimeo') {
            // Vimeo embed
            const iframe = document.createElement('iframe');
            iframe.src = lesson.video;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.allow = 'autoplay; fullscreen; picture-in-picture';
            videoWrapper.appendChild(iframe);
            
        } else {
            // Regular MP4/video file
            console.log('🔧 Creating video element for MP4:', lesson.video);
            
            const video = document.createElement('video');
            video.id = 'course-video';
            video.controls = true;
            video.controlsList = 'nodownload noremoteplayback';
            video.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;';
            
            const source = document.createElement('source');
            source.src = lesson.video;
            source.type = 'video/mp4';
            
            video.appendChild(source);
            video.appendChild(document.createTextNode('Your browser doesn\'t support video playback.'));
            
            // Add event listeners for MP4 videos
            video.addEventListener('timeupdate', () => this.trackVideoProgress());
            video.addEventListener('ended', () => this.handleVideoComplete());
            video.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });
            
            videoWrapper.appendChild(video);
        }
        
        // Add watermark overlay
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        overlay.innerHTML = `<div class="watermark" id="video-watermark">${this.currentUser?.email || 'Student Portal'}</div>`;
        videoWrapper.appendChild(overlay);
        
        console.log('✅ Video loaded successfully:', videoType);
        
        // Initialize security measures
        this.initializeSecurity();
    }

    // ===== ENHANCED SECURITY MEASURES =====

    initializeSecurity() {
        // Disable common developer shortcuts
        document.addEventListener('keydown', (e) => {
            // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
                (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
                (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) ||
                (e.ctrlKey && (e.key === 'U' || e.key === 'u'))) {
                e.preventDefault();
                e.stopPropagation();
                this.showWarning('🔒 Developer tools are disabled for security reasons');
                return false;
            }
        });

        // Disable right-click globally on course pages
        document.addEventListener('contextmenu', (e) => {
            if (document.body.classList.contains('course-page')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });

        // Monitor for attempts to modify iframe src or navigate away
        this.monitorVideoSecurity();

        // Add body class for security styling
        document.body.classList.add('course-page');
    }

    monitorVideoSecurity() {
        // Set up a mutation observer to watch for suspicious changes
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && 
                        mutation.target.tagName === 'IFRAME' &&
                        mutation.attributeName === 'src') {
                        // Log potential security breach attempt
                        console.warn('🚨 Security alert: Video iframe modification detected');
                      }
                });
            });

            // Start observing video wrapper for changes
            const videoWrapper = document.querySelector('.video-wrapper');
            if (videoWrapper) {
                observer.observe(videoWrapper, {
                    attributes: true,
                    childList: true,
                    subtree: true
                });
            }
        }
    }

    preventVideoDownload(videoElement) {
        if (!videoElement) return;

        // Disable download attribute
        videoElement.removeAttribute('download');
        
        // Prevent right-click context menu
        videoElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        // Disable common keyboard shortcuts for video
        videoElement.addEventListener('keydown', (e) => {
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                this.showWarning('🔒 Video download is not permitted');
                return false;
            }
        });
    }

    createSecureVideoEnvironment(lesson) {
        // For subscription model, you might want to:
        // 1. Tokenize video URLs with expiration
        // 2. Use signed URLs that expire after session
        // 3. Implement server-side video streaming with authentication
        
        const securityNotice = document.createElement('div');
        securityNotice.className = 'security-notice';
        securityNotice.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                font-size: 11px;
                z-index: 9999;
                max-width: 200px;
                opacity: 0.7;
            ">
                🔒 Content protected<br>
                Licensed to: ${this.currentUser?.email || 'Student'}
            </div>
        `;
        
        document.body.appendChild(securityNotice);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (securityNotice.parentNode) {
                securityNotice.parentNode.removeChild(securityNotice);
            }
        }, 5000);
    }

    // ===== END SECURITY MEASURES =====

    // ===== FUTURE SUBSCRIPTION SECURITY RECOMMENDATIONS =====
    /*
    For a production subscription-based platform, consider implementing:
    
    1. SERVER-SIDE VIDEO STREAMING:
       - Host videos on a secure server (not Google Drive)
       - Use signed URLs with expiration times
       - Implement HLS/DASH streaming with token authentication
    
    2. ADVANCED VIDEO PROTECTION:
       - Use DRM (Digital Rights Management) for premium content
       - Implement video watermarking with user information
       - Use CDN with geographic and time-based restrictions
    
    3. ACCESS CONTROL:
       - Server-side subscription validation before video access
       - Rate limiting to prevent abuse
       - Session-based tokens that expire
    
    4. MONITORING & ANALYTICS:
       - Track video viewing patterns
       - Detect suspicious download attempts
       - Monitor for screen recording (though this is technically challenging)
    
    5. LEGAL PROTECTION:
       - Clear terms of service regarding content usage
       - DMCA protection and takedown procedures
       - User agreements with penalties for sharing
    
    Example secure video URL structure:
    https://your-secure-cdn.com/video/course1-lesson1.m3u8?token=eyJ0eXAiOi...&expires=1638360000&user=user_id
    */

    // Example: Generate secure video token (for future implementation)
    generateSecureVideoToken(lessonId, userId) {
        // This would be implemented server-side in production
        const payload = {
            lessonId: lessonId,
            userId: userId,
            expires: Date.now() + (60 * 60 * 1000), // 1 hour expiry
            permissions: ['view'] // Could include 'download', 'share', etc.
        };
        
        // In production, use proper JWT signing with server-side secret
        return btoa(JSON.stringify(payload));
    }

    // Validate video access with server-side checking
    async validateVideoAccess(courseId, lessonId) {
        if (!this.currentUser) {
            console.log('❌ No user logged in');
            return false;
        }
        if (this.isAdmin()) {
            console.log('👑 Admin access granted for course:', courseId);
            return true;
        }

        try {
            const response = await fetch('https://restless-feather-b6a9.michf18.workers.dev/api/course-access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.currentUser.email,
                    courseId: courseId
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ Course access checked via backend:', result);
                
                // Update local user data with server response
                this.currentUser.ownedCourses = result.courses;
                this.currentUser.accessType = result.accessType;
                this.saveCurrentUser();
                
                console.log("ACCESS RESPONSE", result);
                return result.hasAccess;
            } else {
                console.error('❌ Course access error:', result.error);
                return false;
            }
            
        } catch (error) {
            console.log('⚠️ Backend not available, using demo mode for access check:', error.message);
            // Fall back to local storage check for demo mode
            const localAccess = this.userOwnsCourse(courseId);
            console.log(`📱 Demo mode access check for ${courseId}:`, localAccess);
            return localAccess;
        }
    }

    // Check if user owns a course (local fallback)
userOwnsCourse(courseId) {
    if (!this.currentUser?.email) {
        console.warn('No user logged in');
        return false;
    }

    // ✅ Also check this.courseAccess (populated by checkAllCourseAccess on login)
    if (this.courseAccess && this.courseAccess[courseId] === true) {
        return true;
    }

    // ✅ Handle BOTH string format AND object format { courseId, expiresAt }
    if (this.currentUser.ownedCourses) {
        return this.currentUser.ownedCourses.some(c => {
            if (typeof c === 'string') return c === courseId;
            if (typeof c === 'object') return c.courseId === courseId;
            return false;
        });
    }

    return false;
}

    // Update course access from server
    async refreshCourseAccess() {
        if (!this.currentUser) return;
        try {
            const response = await fetch('https://restless-feather-b6a9.michf18.workers.dev/api/course-access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.currentUser.email
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                
                if (result.success) {
                    console.log('🔄 Course access refreshed:', result.courses);
                    this.currentUser.ownedCourses = result.courses;
                    this.currentUser.accessType = result.accessType;
                    this.saveCurrentUser();
                    
                    // Update UI to show owned courses
                    this.updateCourseAccessUI();
                    return result.courses;
                }
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
        } catch (error) {
            console.log('⚠️ Backend not available for course access, using demo mode:', error.message);
            // Demo mode: use local storage or default access
            const localAccess = this.userOwnsCourse('salsa-fundamentals') ? ['salsa-fundamentals'] : [];
            console.log('🎭 Demo course access:', localAccess);
            return localAccess;
        }
        
        return [];
    }

    // Update UI to show which courses the user owns
    updateCourseAccessUI() {
    if (!this.currentUser || !this.currentUser.ownedCourses) return;
    if (!user) {
    console.log("⚠️ No user found, creating session fallback");

    this.currentUser = {
        email: email,
        ownedCourses: [],
        isDemo: true
    };

    this.saveCurrentUser();
    this.showDashboard();
    return;
}   
    const ownedCourses = this.currentUser.ownedCourses;
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        const courseId = card.dataset.courseId;
        const buyButton = card.querySelector('.buy-btn');
        const existingIndicator = card.querySelector('.access-indicator');

        // 🔥 FIX: support BOTH string + object format
        const courseData = ownedCourses.find(c =>
            typeof c === "string"
                ? c === courseId
                : c.courseId === courseId
        );

        const hasAccess = !!courseData;
        if (hasAccess) {
            // User owns this course
            if (buyButton) {
                buyButton.textContent = '✅ Access Granted';
                buyButton.style.backgroundColor = '#4CAF50';
                buyButton.onclick = () => this.startCourse(courseId);
            }
            // remove old indicator if it exists (prevents duplicates)
            if (existingIndicator) existingIndicator.remove();
            const indicator = document.createElement('div');
            indicator.className = 'access-indicator owned';
            let expiryHTML = `🎓 You own this course`;

            if (typeof courseData === "object" && courseData.expiresAt) {
                const expiryDate = new Date(courseData.expiresAt);
                const now = new Date();

                const msLeft = expiryDate - now;
                const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

                // 🔴 EXPIRED
                if (msLeft <= 0) {
                    expiryHTML = `⛔ <strong>Access expired</strong>`;

                    if (buyButton) {
                        buyButton.textContent = '❌ Expired';
                        buyButton.style.backgroundColor = '#999';
                        buyButton.onclick = () => this.purchaseCourse(courseId);
                    }
                }
                // 🔴 EXPIRING SOON
                else if (daysLeft <= 3) {
                    expiryHTML = `⚠️ <strong>${daysLeft} day${daysLeft === 1 ? '' : 's'} remaining</strong>`;
                    indicator.style.color = "#ff3b30";
                    indicator.style.fontWeight = "600";
                }
                // 🟡 NORMAL
                else {
                    expiryHTML = `⏳ ${daysLeft} days remaining`;
                }
            }
            // 👑 ADMIN VIEW (optional but powerful)
            if (this.isAdmin && this.isAdmin()) {
                expiryHTML += `<br><small style="opacity:0.7">🛠 admin view</small>`;
            }

            indicator.innerHTML = expiryHTML;
            card.appendChild(indicator);
            console.log("🔥 ENTERED ACCESS BLOCK");
            console.log("hasAccess:", hasAccess);
            console.log("card:", card);
            console.log("courseData:", courseData);
        }
    });
}

    // ===== COURSE ACCESS & NAVIGATION =====

    async startCourse(courseId) {
        // Check if user has access to this course
        const hasAccess = await this.validateVideoAccess(courseId);
        
        if (!hasAccess) {
            this.showError('❌ Course access required. Please purchase this course first.');
            const course = this.courses[courseId];
            if (course) {
                this.showPaymentInstructions(course);
            }
            return;
        }
        
        // User has access - load the course
        this.currentCourse = this.courses[courseId];
        if (!this.currentCourse) {
            this.showError('❌ Course not found');
            return;
        }
        
        // Navigate to course screen
        this.showScreen('course-screen');
        
        // Load course data
        this.showCourseDetails(courseId);
        
        // Start with first lesson or last watched
        const lastWatched = this.getLastWatchedLesson();
        this.loadLesson(lastWatched);
        
        this.showSuccess(`🎉 Welcome to ${this.currentCourse.title}! Enjoy your lessons.`);
    }

    // ===== ADMIN PANEL FUNCTIONALITY =====

    showAdminPanel() {
        if (!this.currentUser || !this.isAdmin()) {
            this.showError('❌ Admin access required');
            return;
        }
        
        console.log('🔧 Showing admin panel...');
        this.showScreen('admin-panel');
        
        // Ensure the admin panel UI is ready before loading data
        setTimeout(() => {
            this.loadPendingPayments();
            this.loadAllUsers(); // Load user management data
        }, 100);
    }

    isAdmin() {
        // Simple admin check - in production, implement proper role management
        const adminEmails = [
            'michelle@queerlatindance.com',
            'admin@queerlatindance.com',
            'admin@demo.com',  // Demo admin for testing
            // Add other admin emails here
        ];
        
        const isAdminUser = this.currentUser && adminEmails.includes(this.currentUser.email.toLowerCase());
        console.log('🔍 Admin check:', {
            currentUser: this.currentUser?.email,
            adminEmails: adminEmails,
            isAdmin: isAdminUser
        });
        
        return isAdminUser;
    }

    // ===== ADMIN COURSE MANAGEMENT =====

    showUploadModal(courseId) {
        if (!this.isAdmin()) {
            this.showError('❌ Admin access required');
            return;
        }

        const course = this.courses[courseId];
        if (!course) {
            this.showError('Course not found');
            return;
        }

        // Create upload modal
        const modal = document.createElement('div');
        modal.className = 'upload-modal';
        modal.innerHTML = `
            <div class="upload-modal-overlay"></div>
            <div class="upload-modal-content">
                <div class="upload-modal-header">
                    <h2>📤 Upload Videos - ${course.title}</h2>
                    <button class="modal-close-btn" onclick="this.closest('.upload-modal').remove()">×</button>
                </div>
                
                <div class="upload-section">
                    <h3>Current Lessons (${course.videoLessons.length})</h3>
                    <div class="lessons-list">
                        ${course.videoLessons.map((lesson, index) => `
                            <div class="lesson-item" data-lesson-id="${lesson.id}">
                                <span class="lesson-number">${index + 1}</span>
                                <div class="lesson-info">
                                    <strong>${lesson.title}</strong>
                                    <div class="lesson-meta">${lesson.description}</div>
                                    <div class="lesson-video-info">
                                        <span class="video-type">${lesson.videoType || 'mp4'}</span>
                                        <span class="video-duration">${lesson.duration}</span>
                                    </div>
                                </div>
                                <div class="lesson-actions">
                                    <button onclick="courseApp.editLesson('${courseId}', ${lesson.id})" class="btn-edit-lesson">✏️ Edit</button>
                                    <button onclick="courseApp.replaceVideo('${courseId}', ${lesson.id})" class="btn-replace-video">🔄 Replace Video</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="upload-section">
                    <h3>Add New Lesson</h3>
                    <form class="new-lesson-form" onsubmit="courseApp.handleNewLessonUpload(event, '${courseId}')">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Lesson Title</label>
                                <input type="text" name="title" required placeholder="e.g., Basic Steps & Timing">
                            </div>
                            <div class="form-group">
                                <label>Duration</label>
                                <input type="text" name="duration" required placeholder="e.g., 15:30">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="description" required placeholder="Brief description of what students will learn..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Video Source</label>
                            <select name="videoType" onchange="courseApp.toggleVideoInput(this)">
                                <option value="googledrive">Google Drive</option>
                                <option value="youtube">YouTube</option>
                                <option value="vimeo">Vimeo</option>
                                <option value="mp4">Upload MP4</option>
                            </select>
                        </div>
                        
                        <div class="form-group video-input-group">
                            <div class="video-input-googledrive">
                                <label>Google Drive Share Link</label>
                                <input type="url" name="googledriveUrl" placeholder="https://drive.google.com/file/d/...">
                                <small>Make sure the file is set to "Anyone with the link can view"</small>
                            </div>
                            <div class="video-input-youtube" style="display: none;">
                                <label>YouTube Embed URL</label>
                                <input type="url" name="youtubeUrl" placeholder="https://www.youtube.com/embed/...">
                            </div>
                            
                            <div class="video-input-vimeo" style="display: none;">
                                <label>Vimeo Embed URL</label>
                                <input type="url" name="vimeoUrl" placeholder="https://player.vimeo.com/video/...">
                            </div>
                            
                            <div class="video-input-mp4" style="display: none;">
                                <label>Upload MP4 File</label>
                                <input type="file" name="mp4File" accept="video/mp4">
                                <small>For now, you'll need to upload to a server and provide the URL</small>
                                <input type="url" name="mp4Url" placeholder="https://your-server.com/videos/lesson.mp4" style="margin-top: 10px;">
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" onclick="this.closest('.upload-modal').remove()" class="btn-cancel">Cancel</button>
                            <button type="submit" class="btn-upload">📤 Add Lesson</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Add modal styles
        if (!document.querySelector('#upload-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'upload-modal-styles';
            styles.textContent = `
                .upload-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                .upload-modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    cursor: pointer;
                }
                
                .upload-modal-content {
                    background: white;
                    border-radius: 12px;
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    z-index: 1;
                }
                
                .upload-modal-header {
                    padding: 20px 20px 0 20px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-close-btn {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                    padding: 5px;
                }
                
                .upload-section {
                    padding: 20px;
                }
                
                .lessons-list {
                    max-height: 300px;
                    overflow-y: auto;
                    border: 1px solid #eee;
                    border-radius: 8px;
                }
                
                .lesson-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                }
                
                .lesson-number {
                    background: #667eea;
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 14px;
                }
                
                .lesson-info {
                    flex: 1;
                }
                
                .lesson-meta {
                    color: #666;
                    font-size: 14px;
                    margin: 5px 0;
                }
                
                .lesson-video-info {
                    display: flex;
                    gap: 10px;
                    font-size: 12px;
                }
                
                .video-type {
                    background: #f0f0f0;
                    padding: 2px 6px;
                    border-radius: 4px;
                }
                
                .lesson-actions {
                    display: flex;
                    gap: 8px;
                }
                
                .btn-edit-lesson, .btn-replace-video {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 6px 10px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                }
                
                .btn-replace-video {
                    background: #ff9500;
                }
                
                .form-row {
                    display: flex;
                    gap: 15px;
                }
                
                .form-group {
                    margin-bottom: 15px;
                    flex: 1;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #333;
                }
                
                .form-group input, .form-group textarea, .form-group select {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 14px;
                }
                
                .form-group textarea {
                    height: 80px;
                    resize: vertical;
                }
                
                .form-group small {
                    color: #666;
                    font-size: 12px;
                }
                
                .form-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                }
                
                .btn-cancel {
                    background: #ccc;
                    color: #666;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                }
                
                .btn-upload {
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                }
                
                .btn-upload:hover {
                    background: #45a049;
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to DOM
        document.body.appendChild(modal);

        // Close on overlay click
        modal.querySelector('.upload-modal-overlay').onclick = () => modal.remove();
    }

    toggleVideoInput(selectElement) {
        const container = selectElement.closest('.form-group').querySelector('.video-input-group');
        const allInputs = container.querySelectorAll('[class^="video-input-"]');
        
        // Hide all inputs
        allInputs.forEach(input => input.style.display = 'none');
        
        // Show selected input
        const selectedInput = container.querySelector(`.video-input-${selectElement.value}`);
        if (selectedInput) {
            selectedInput.style.display = 'block';
        }
    }

    handleNewLessonUpload(event, courseId) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const lessonData = {
            title: formData.get('title'),
            duration: formData.get('duration'),
            description: formData.get('description'),
            videoType: formData.get('videoType')
        };

        // Get video URL based on type
        switch (lessonData.videoType) {
            case 'googledrive':
                const driveUrl = formData.get('googledriveUrl');
                if (driveUrl) {
                    // Convert sharing URL to embed URL
                    const fileId = this.extractGoogleDriveFileId(driveUrl);
                    lessonData.video = `https://drive.google.com/file/d/${fileId}/preview`;
                }
                break;
            case 'youtube':
                lessonData.video = formData.get('youtubeUrl');
                break;
            case 'vimeo':
                lessonData.video = formData.get('vimeoUrl');
                break;
            case 'mp4':
                lessonData.video = formData.get('mp4Url');
                break;
        }

        if (!lessonData.video) {
            this.showError('Please provide a video URL');
            return;
        }

        // Add lesson to course
        this.addLessonToCourse(courseId, lessonData);
    }

    extractGoogleDriveFileId(url) {
        const regex = /\/d\/([a-zA-Z0-9-_]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    addLessonToCourse(courseId, lessonData) {
        const course = this.courses[courseId];
        if (!course) return;

        // Generate new lesson ID
        const newLessonId = Math.max(...course.videoLessons.map(l => l.id), 0) + 1;
        
        const newLesson = {
            id: newLessonId,
            title: lessonData.title,
            video: lessonData.video,
            videoType: lessonData.videoType,
            duration: lessonData.duration,
            description: lessonData.description
        };

        course.videoLessons.push(newLesson);
        course.lessons = course.videoLessons.length;

        // Save to localStorage (in production, save to database)
        localStorage.setItem('courses', JSON.stringify(this.courses));

        this.showSuccess(`✅ Added "${lessonData.title}" to ${course.title}`);
        
        // Close modal and refresh if needed
        document.querySelector('.upload-modal')?.remove();
        
        // If we're on the dashboard, refresh it
        if (!document.getElementById('dashboard-screen').classList.contains('hidden')) {
            this.renderCourses();
        }
    }

    editCourse(courseId) {
        if (!this.isAdmin()) {
            this.showError('❌ Admin access required');
            return;
        }

        const course = this.courses[courseId];
        if (!course) {
            this.showError('Course not found');
            return;
        }

        this.showEditCourseModal(courseId, course);
    }

    showEditCourseModal(courseId, course) {
        // Create edit course modal
        const modal = document.createElement('div');
        modal.className = 'edit-course-modal';
        modal.innerHTML = `
            <div class="edit-modal-overlay"></div>
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h2>📝 Edit Course - ${course.title}</h2>
                    <button class="modal-close-btn" onclick="this.closest('.edit-course-modal').remove()">×</button>
                </div>
                
                <form class="edit-course-form" onsubmit="courseApp.handleCourseEdit(event, '${courseId}')">
                    <div class="form-group">
                        <label>Course Title</label>
                        <input type="text" name="title" value="${course.title}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Course Description</label>
                        <textarea name="description" required rows="4">${course.description}</textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Price ($)</label>
                            <input type="number" name="price" value="${course.price}" required min="0" step="0.01">
                        </div>
                        <div class="form-group">
                            <label>Duration</label>
                            <input type="text" name="duration" value="${course.duration}" required placeholder="e.g., 3.5 hours">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Level</label>
                            <select name="level" required>
                                <option value="Beginner" ${course.level === 'Beginner' ? 'selected' : ''}>Beginner</option>
                                <option value="Intermediate" ${course.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                                <option value="Advanced" ${course.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
                                <option value="All Levels" ${course.level === 'All Levels' ? 'selected' : ''}>All Levels</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Course Image</label>
                            <input type="text" name="icon" value="${course.icon}" required placeholder="images/example.jpg">
                        </div>
                    </div>
                    
                    <div class="course-stats">
                        <h3>📊 Course Statistics</h3>
                        <div class="stats-row">
                            <div class="stat-item">
                                <strong>Total Lessons:</strong> ${course.videoLessons.length}
                            </div>
                            <div class="stat-item">
                                <strong>Course ID:</strong> ${courseId}
                            </div>
                        </div>
                    </div>
                    
                    <div class="lessons-preview">
                        <h3>📹 Lessons Preview</h3>
                        <div class="lessons-preview-list">
                            ${course.videoLessons.map((lesson, index) => `
                                <div class="lesson-preview-item">
                                    <span class="lesson-number">${index + 1}.</span>
                                    <span class="lesson-title">${lesson.title}</span>
                                    <span class="lesson-duration">${lesson.duration}</span>
                                </div>
                            `).join('')}
                        </div>
                        <p class="lessons-note">💡 Use "Upload Videos" to add/edit individual lessons</p>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" onclick="this.closest('.edit-course-modal').remove()" class="btn-cancel">Cancel</button>
                        <button type="submit" class="btn-save-course">💾 Save Course Changes</button>
                    </div>
                </form>
            </div>
        `;

        // Add modal styles if not already present
        if (!document.querySelector('#edit-course-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'edit-course-modal-styles';
            styles.textContent = `
                .edit-course-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                .edit-course-modal .edit-modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    cursor: pointer;
                }
                
                .edit-course-modal .edit-modal-content {
                    background: white;
                    border-radius: 12px;
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    z-index: 1;
                }
                
                .edit-course-form {
                    padding: 0 20px 20px 20px;
                }
                
                .edit-course-form .form-group {
                    margin-bottom: 15px;
                }
                
                .edit-course-form .form-row {
                    display: flex;
                    gap: 15px;
                }
                
                .edit-course-form .form-row .form-group {
                    flex: 1;
                }
                
                .edit-course-form label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #333;
                }
                
                .edit-course-form input, .edit-course-form textarea, .edit-course-form select {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 14px;
                    box-sizing: border-box;
                }
                
                .edit-course-form textarea {
                    resize: vertical;
                }
                
                .course-stats {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                    border-left: 4px solid #28a745;
                }
                
                .course-stats h3 {
                    margin: 0 0 10px 0;
                    color: #28a745;
                }
                
                .stats-row {
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                
                .stat-item {
                    font-size: 14px;
                    color: #555;
                }
                
                .lessons-preview {
                    background: #fff7e6;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                    border-left: 4px solid #ffa500;
                }
                
                .lessons-preview h3 {
                    margin: 0 0 10px 0;
                    color: #ffa500;
                }
                
                .lessons-preview-list {
                    max-height: 150px;
                    overflow-y: auto;
                    margin-bottom: 10px;
                }
                
                .lesson-preview-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 5px 0;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 14px;
                }
                
                .lesson-number {
                    font-weight: bold;
                    color: #ffa500;
                    min-width: 25px;
                }
                
                .lesson-title {
                    flex: 1;
                    color: #333;
                }
                
                .lesson-duration {
                    color: #666;
                    font-size: 12px;
                }
                
                .lessons-note {
                    margin: 0;
                    font-size: 12px;
                    color: #888;
                    font-style: italic;
                }
                
                .btn-save-course {
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 14px;
                }
                
                .btn-save-course:hover {
                    background: #218838;
                }
                
                .form-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                }
                
                @media (max-width: 768px) {
                    .edit-course-form .form-row {
                        flex-direction: column;
                        gap: 0;
                    }
                    
                    .stats-row {
                        flex-direction: column;
                        gap: 10px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to DOM
        document.body.appendChild(modal);

        // Close on overlay click
        modal.querySelector('.edit-modal-overlay').onclick = () => modal.remove();
    }

    handleCourseEdit(event, courseId) {
        event.preventDefault();
        
        if (!this.isAdmin()) {
            this.showError('❌ Admin access required');
            return;
        }

        const formData = new FormData(event.target);
        const updatedCourse = {
            title: formData.get('title'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            duration: formData.get('duration'),
            level: formData.get('level'),
            icon: formData.get('icon')
        };

        // Validate required fields
        if (!updatedCourse.title || !updatedCourse.description || !updatedCourse.price || !updatedCourse.duration || !updatedCourse.level || !updatedCourse.icon) {
            this.showError('Please fill in all required fields');
            return;
        }

        // Update course in courses data
        this.updateCourseData(courseId, updatedCourse);
    }

    updateCourseData(courseId, updatedData) {
        const course = this.courses[courseId];
        if (!course) return;

        // Update the course with new data (preserve existing data like videoLessons)
        this.courses[courseId] = {
            ...course,
            ...updatedData,
            // Update lessons count based on actual videoLessons
            lessons: course.videoLessons.length
        };

        // Save to localStorage (in production, save to database)
        localStorage.setItem('courses', JSON.stringify(this.courses));

        this.showSuccess(`✅ Course "${updatedData.title}" updated successfully!`);
        
        // Close modal
        document.querySelector('.edit-course-modal')?.remove();
        
        // Refresh dashboard if we're on it
        if (!document.getElementById('dashboard-screen').classList.contains('hidden')) {
            this.renderCourses();
        }

        console.log('📝 Course updated:', {
            courseId,
            updatedData,
            fullCourse: this.courses[courseId]
        });
    }

    editLesson(courseId, lessonId) {
        if (!this.isAdmin()) {
            this.showError('❌ Admin access required');
            return;
        }

        const course = this.courses[courseId];
        if (!course) {
            this.showError('Course not found');
            return;
        }

        const lesson = course.videoLessons.find(l => l.id == lessonId);
        if (!lesson) {
            this.showError('Lesson not found');
            return;
        }

        this.showEditLessonModal(courseId, lesson);
    }

    showEditLessonModal(courseId, lesson) {
        // Create edit modal
        const modal = document.createElement('div');
        modal.className = 'edit-lesson-modal';
        modal.innerHTML = `
            <div class="edit-modal-overlay"></div>
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h2>✏️ Edit Lesson - ${lesson.title}</h2>
                    <button class="modal-close-btn" onclick="this.closest('.edit-lesson-modal').remove()">×</button>
                </div>
                
                <form class="edit-lesson-form" onsubmit="courseApp.handleLessonEdit(event, '${courseId}', ${lesson.id})">
                    <div class="form-group">
                        <label>Lesson Title</label>
                        <input type="text" name="title" value="${lesson.title}" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Duration</label>
                            <input type="text" name="duration" value="${lesson.duration}" required placeholder="e.g., 15:30">
                        </div>
                        <div class="form-group">
                            <label>Video Type</label>
                            <select name="videoType" onchange="courseApp.toggleEditVideoInput(this)">
                                <option value="googledrive" ${lesson.videoType === 'googledrive' ? 'selected' : ''}>Google Drive</option>
                                <option value="youtube" ${lesson.videoType === 'youtube' ? 'selected' : ''}>YouTube</option>
                                <option value="vimeo" ${lesson.videoType === 'vimeo' ? 'selected' : ''}>Vimeo</option>
                                <option value="mp4" ${lesson.videoType === 'mp4' ? 'selected' : ''}>MP4 URL</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" required>${lesson.description}</textarea>
                    </div>
                    
                    <div class="form-group video-input-group">
                        <div class="video-input-googledrive" style="display: ${lesson.videoType === 'googledrive' ? 'block' : 'none'};">
                            <label>Google Drive URL</label>
                            <input type="url" name="googledriveUrl" value="${lesson.videoType === 'googledrive' ? lesson.video : ''}" placeholder="https://drive.google.com/file/d/...">
                            <small>Make sure the file is set to "Anyone with the link can view"</small>
                        </div>
                        <div class="video-input-youtube" style="display: ${lesson.videoType === 'youtube' ? 'block' : 'none'};">
                            <label>YouTube Embed URL</label>
                            <input type="url" name="youtubeUrl" value="${lesson.videoType === 'youtube' ? lesson.video : ''}" placeholder="https://www.youtube.com/embed/...">
                        </div>
                        <div class="video-input-vimeo" style="display: ${lesson.videoType === 'vimeo' ? 'block' : 'none'};">
                            <label>Vimeo Embed URL</label>
                            <input type="url" name="vimeoUrl" value="${lesson.videoType === 'vimeo' ? lesson.video : ''}" placeholder="https://player.vimeo.com/video/...">
                        </div>
                        <div class="video-input-mp4" style="display: ${lesson.videoType === 'mp4' ? 'block' : 'none'};">
                            <label>MP4 Video URL</label>
                            <input type="url" name="mp4Url" value="${lesson.videoType === 'mp4' ? lesson.video : ''}" placeholder="https://your-server.com/videos/lesson.mp4">
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" onclick="this.closest('.edit-lesson-modal').remove()" class="btn-cancel">Cancel</button>
                        <button type="submit" class="btn-save">💾 Save Changes</button>
                    </div>
                </form>
            </div>
        `;

        // Add modal styles if not already present
        if (!document.querySelector('#edit-lesson-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'edit-lesson-modal-styles';
            styles.textContent = `
                .edit-lesson-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                .edit-modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    cursor: pointer;
                }
                
                .edit-modal-content {
                    background: white;
                    border-radius: 12px;
                    max-width: 700px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    z-index: 1;
                }
                
                .edit-modal-header {
                    padding: 20px 20px 0 20px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                
                .edit-lesson-form {
                    padding: 0 20px 20px 20px;
                }
                
                .edit-lesson-form .form-group {
                    margin-bottom: 15px;
                }
                
                .edit-lesson-form label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #333;
                }
                
                .edit-lesson-form input, .edit-lesson-form textarea, .edit-lesson-form select {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 14px;
                    box-sizing: border-box;
                }
                
                .edit-lesson-form textarea {
                    height: 80px;
                    resize: vertical;
                }
                
                .btn-save {
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                }
                
                .btn-save:hover {
                    background: #45a049;
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to DOM
        document.body.appendChild(modal);

        // Close on overlay click
        modal.querySelector('.edit-modal-overlay').onclick = () => modal.remove();
    }

    toggleEditVideoInput(selectElement) {
        const container = selectElement.closest('.form-group').parentElement.querySelector('.video-input-group');
        const allInputs = container.querySelectorAll('[class^="video-input-"]');
        
        // Hide all inputs
        allInputs.forEach(input => input.style.display = 'none');
        
        // Show selected input
        const selectedInput = container.querySelector(`.video-input-${selectElement.value}`);
        if (selectedInput) {
            selectedInput.style.display = 'block';
        }
    }

    handleLessonEdit(event, courseId, lessonId) {
        event.preventDefault();
        
        if (!this.isAdmin()) {
            this.showError('❌ Admin access required');
            return;
        }

        const formData = new FormData(event.target);
        const updatedLesson = {
            title: formData.get('title'),
            duration: formData.get('duration'),
            description: formData.get('description'),
            videoType: formData.get('videoType')
        };

        // Get video URL based on type
        switch (updatedLesson.videoType) {
            case 'googledrive':
                const driveUrl = formData.get('googledriveUrl');
                if (driveUrl) {
                    // Convert sharing URL to embed URL if needed
                    const fileId = this.extractGoogleDriveFileId(driveUrl);
                    if (fileId) {
                        updatedLesson.video = `https://drive.google.com/file/d/${fileId}/preview`;
                    } else {
                        updatedLesson.video = driveUrl;
                    }
                }
                break;
            case 'youtube':
                updatedLesson.video = formData.get('youtubeUrl');
                break;
            case 'vimeo':
                updatedLesson.video = formData.get('vimeoUrl');
                break;
            case 'mp4':
                updatedLesson.video = formData.get('mp4Url');
                break;
        }

        if (!updatedLesson.video) {
            this.showError('Please provide a video URL');
            return;
        }

        // Update lesson in course
        this.updateLessonInCourse(courseId, lessonId, updatedLesson);
    }

    updateLessonInCourse(courseId, lessonId, updatedData) {
        const course = this.courses[courseId];
        if (!course) return;

        const lessonIndex = course.videoLessons.findIndex(l => l.id == lessonId);
        if (lessonIndex === -1) return;

        // Update the lesson with new data
        course.videoLessons[lessonIndex] = {
            ...course.videoLessons[lessonIndex],
            ...updatedData
        };

        // Save to localStorage (in production, save to database)
        localStorage.setItem('courses', JSON.stringify(this.courses));

        this.showSuccess(`✅ Updated "${updatedData.title}" successfully!`);
        
        // Close modal
        document.querySelector('.edit-lesson-modal')?.remove();
        
        // Refresh upload modal if it's open
        const uploadModal = document.querySelector('.upload-modal');
        if (uploadModal) {
            uploadModal.remove();
            this.showUploadModal(courseId);
        }

        // If we're currently viewing this course, refresh the lessons list
        if (this.currentCourse && this.currentCourse.id === courseId) {
            this.renderLessonsList();
        }
    }

    replaceVideo(courseId, lessonId) {
        if (!this.isAdmin()) {
            this.showError('❌ Admin access required');
            return;
        }

        const course = this.courses[courseId];
        if (!course) {
            this.showError('Course not found');
            return;
        }

        const lesson = course.videoLessons.find(l => l.id == lessonId);
        if (!lesson) {
            this.showError('Lesson not found');
            return;
        }

        // For now, just open the edit modal focused on video replacement
        this.showVideoReplaceModal(courseId, lesson);
    }

    showVideoReplaceModal(courseId, lesson) {
        // Create video replace modal (simplified version of edit modal)
        const modal = document.createElement('div');
        modal.className = 'video-replace-modal';
        modal.innerHTML = `
            <div class="edit-modal-overlay"></div>
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h2>🔄 Replace Video - ${lesson.title}</h2>
                    <button class="modal-close-btn" onclick="this.closest('.video-replace-modal').remove()">×</button>
                </div>
                
                <form class="video-replace-form" onsubmit="courseApp.handleVideoReplace(event, '${courseId}', ${lesson.id})">
                    <div class="current-video-info">
                        <h3>Current Video</h3>
                        <p><strong>Type:</strong> ${lesson.videoType || 'mp4'}</p>
                        <p><strong>URL:</strong> <code style="word-break: break-all;">${lesson.video}</code></p>
                    </div>
                    
                    <h3>New Video</h3>
                    <div class="form-group">
                        <label>Video Type</label>
                        <select name="videoType" onchange="courseApp.toggleReplaceVideoInput(this)">
                            <option value="googledrive">Google Drive</option>
                            <option value="youtube">YouTube</option>
                            <option value="vimeo">Vimeo</option>
                            <option value="mp4">MP4 URL</option>
                        </select>
                    </div>
                    
                    <div class="form-group video-input-group">
                        <div class="video-input-googledrive">
                            <label>Google Drive URL</label>
                            <input type="url" name="googledriveUrl" placeholder="https://drive.google.com/file/d/...">
                            <small>Make sure the file is set to "Anyone with the link can view"</small>
                        </div>
                        <div class="video-input-youtube" style="display: none;">
                            <label>YouTube Embed URL</label>
                            <input type="url" name="youtubeUrl" placeholder="https://www.youtube.com/embed/...">
                        </div>
                        <div class="video-input-vimeo" style="display: none;">
                            <label>Vimeo Embed URL</label>
                            <input type="url" name="vimeoUrl" placeholder="https://player.vimeo.com/video/...">
                        </div>
                        <div class="video-input-mp4" style="display: none;">
                            <label>MP4 Video URL</label>
                            <input type="url" name="mp4Url" placeholder="https://your-server.com/videos/lesson.mp4">
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" onclick="this.closest('.video-replace-modal').remove()" class="btn-cancel">Cancel</button>
                        <button type="submit" class="btn-replace">🔄 Replace Video</button>
                    </div>
                </form>
            </div>
        `;

        // Add specific styles for video replace modal
        if (!document.querySelector('#video-replace-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'video-replace-modal-styles';
            styles.textContent = `
                .video-replace-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                .video-replace-modal .edit-modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    cursor: pointer;
                }
                
                .video-replace-modal .edit-modal-content {
                    background: white;
                    border-radius: 12px;
                    max-width: 700px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    z-index: 1;
                }
                
                .video-replace-modal .edit-modal-header {
                    padding: 20px 20px 0 20px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                
                .video-replace-form {
                    padding: 0 20px 20px 20px;
                }
                
                .video-replace-form .form-group {
                    margin-bottom: 15px;
                }
                
                .video-replace-form label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #333;
                }
                
                .video-replace-form input, .video-replace-form textarea, .video-replace-form select {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 14px;
                    box-sizing: border-box;
                }
                
                .video-replace-form .form-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                }
                
                .current-video-info {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    border-left: 4px solid #007bff;
                }
                
                .current-video-info h3 {
                    margin: 0 0 10px 0;
                    color: #007bff;
                }
                
                .current-video-info p {
                    margin: 5px 0;
                    font-size: 14px;
                }
                
                .btn-replace {
                    background: #ff9500;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                }
                
                .btn-replace:hover {
                    background: #e6851a;
                }
                
                .btn-cancel {
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                }
                
                .btn-cancel:hover {
                    background: #5a6268;
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to DOM
        document.body.appendChild(modal);

        // Close on overlay click
        modal.querySelector('.edit-modal-overlay').onclick = () => modal.remove();
    }

    toggleReplaceVideoInput(selectElement) {
        const container = selectElement.closest('.form-group').parentElement.querySelector('.video-input-group');
        const allInputs = container.querySelectorAll('[class^="video-input-"]');
        
        // Hide all inputs
        allInputs.forEach(input => input.style.display = 'none');
        
        // Show selected input
        const selectedInput = container.querySelector(`.video-input-${selectElement.value}`);
        if (selectedInput) {
            selectedInput.style.display = 'block';
        }
    }

    handleVideoReplace(event, courseId, lessonId) {
        event.preventDefault();
        
        if (!this.isAdmin()) {
            this.showError('❌ Admin access required');
            return;
        }

        const formData = new FormData(event.target);
        const videoType = formData.get('videoType');
        let videoUrl = '';

        // Get video URL based on type
        switch (videoType) {
            case 'googledrive':
                const driveUrl = formData.get('googledriveUrl');
                if (driveUrl) {
                    const fileId = this.extractGoogleDriveFileId(driveUrl);
                    if (fileId) {
                        videoUrl = `https://drive.google.com/file/d/${fileId}/preview`;
                    } else {
                        videoUrl = driveUrl;
                    }
                }
                break;
            case 'youtube':
                videoUrl = formData.get('youtubeUrl');
                break;
            case 'vimeo':
                videoUrl = formData.get('vimeoUrl');
                break;
            case 'mp4':
                videoUrl = formData.get('mp4Url');
                break;
        }

        if (!videoUrl) {
            this.showError('Please provide a video URL');
            return;
        }

        // Update only video-related properties
        const updatedData = {
            video: videoUrl,
            videoType: videoType
        };

        this.updateLessonInCourse(courseId, lessonId, updatedData);
        
        // Close the replace modal
        document.querySelector('.video-replace-modal')?.remove();
    }

    async loadPendingPayments() {
    console.log('🔧 loadPendingPayments() started');

    try {
        // Try backend first (no fake demo key logic needed)
        const response = await fetch(
            'https://restless-feather-b6a9.michf18.workers.dev/api/admin/pending-payments',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adminKey: 'demo' }) // replace later with real auth
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Backend error');
        }

        const payments = result.pendingPayments || [];

        console.log('✅ Loaded pending payments from backend:', payments.length);
        this.displayPendingPayments(payments, false);

    } catch (error) {
        console.log('⚠️ Backend failed, using local fallback:', error.message);
    }
}

    displayPendingPayments(payments) {
    console.log('🎯 displayPendingPayments() called with:', { payments: payments.length });

    const container = document.getElementById('pendingPaymentsList');
    if (!container) {
        console.error('❌ pendingPaymentsList element not found!');
        return;
    }

    console.log('✅ Found pendingPaymentsList container');

    if (payments.length === 0) {
        container.innerHTML = '<p class="no-payments">No pending course payments found.</p>';
        console.log('✅ Displayed no-payments message');
        return;
    }

    const html = payments.map(payment => {
        console.log('🔍 Processing payment:', payment);

        const firstName = payment.firstName || payment.name?.split(' ')[0] || payment.email?.split('@')[0] || 'Student';
        const lastName = payment.lastName || payment.name?.split(' ')[1] || '';
        const email = payment.email || payment.userEmail || 'unknown@email.com';

        let courseName = payment.courseName || payment.series;
        let courseId = payment.courseId;
        let amount = payment.amount || payment.price;

        if (!courseName || courseName === 'Unknown Course') {
            const courseMapping = {
                'salsa-recap-lvl1': { name: 'Salsa Recap (Level 1)', price: 49 },
                'salsa-fundamentals': { name: 'Salsa Fundamentals', price: 49 },
                'bachata-sensual': { name: 'Bachata Sensual', price: 59 },
                'advanced-salsa': { name: 'Advanced Salsa', price: 69 },
                'bachata-basics': { name: 'Bachata Basics', price: 49 }
            };

            if (courseId && courseMapping[courseId]) {
                courseName = courseMapping[courseId].name;
                if (!amount || amount === 0) {
                    amount = courseMapping[courseId].price;
                }
            } else {
                courseName = 'Unknown Course';
                courseId = courseId || 'unknown-course';
                amount = amount || 0;
            }
        }

        const method = payment.paymentMethod || payment.method || 'Unknown';
        const timestamp = payment.timestamp || new Date().toISOString();
        const status = payment.status || 'Pending';

        const cardHtml = `
            <div class="payment-item" data-email="${email}" data-course="${courseId}">
                <div class="payment-info">
                    <h4>${firstName} ${lastName}</h4>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Course:</strong> ${courseName}</p>
                    <p><strong>Amount:</strong> $${amount}</p>
                    <p><strong>Method:</strong> ${method}</p>
                    <p><strong>Date:</strong> ${new Date(timestamp).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> <span class="status pending">${status}</span></p>
                </div>
                <div class="payment-actions">
                    <button onclick="courseApp.grantCourseAccess('${email}', '${courseId}', '${courseName}')" 
                            class="btn-grant">✅ Grant Access</button>
                    <button onclick="courseApp.denyPayment('${email}', '${courseId}')" 
                            class="btn-deny">❌ Deny</button>
                </div>
            </div>
        `;

        return cardHtml;
    }).join('');

    container.innerHTML = html;
    console.log('✅ displayPendingPayments completed - HTML set');
}

    async denyPayment(email, courseId) {
    const response = await fetch('/api/admin/grant-access', {
        method: 'POST',
        body: JSON.stringify({
            email,
            courseId,
            action: 'deny'

        })
    });

    const result = await response.json();

    if (result.success) {
        this.showSuccess(`❌ Payment denied for ${email}`);
        this.loadPendingPayments();
    } else {
        this.showError('❌ Failed to deny payment');
    }
}
    // ===== END ADMIN PANEL =====

    // ===== END FUTURE RECOMMENDATIONS =====

    // ===== UTILITY FUNCTIONS FOR ADMIN =====

    removeDuplicatePayments() {
        console.log('🧹 Removing duplicate payments...');
        const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]');
        console.log('🔍 Before cleanup - Total payments:', pendingPayments.length);
        
        // Create a map to store unique payments by email+courseId combination
        const uniquePayments = new Map();
        
        pendingPayments.forEach(payment => {
            const email = payment.email || payment.userEmail;
            const courseId = payment.courseId;
            const key = `${email}-${courseId}`;
            
            // Only keep the most recent payment for each email+course combination
            if (!uniquePayments.has(key) || 
                new Date(payment.timestamp) > new Date(uniquePayments.get(key).timestamp)) {
                uniquePayments.set(key, payment);
            }
        });
        
        const cleanedPayments = Array.from(uniquePayments.values());
        console.log('🔍 After cleanup - Unique payments:', cleanedPayments.length);
        console.log('✅ Removed duplicates:', pendingPayments.length - cleanedPayments.length);
        
        // Save the cleaned payments
        localStorage.setItem('pendingPayments', JSON.stringify(cleanedPayments));
        
        return cleanedPayments;
    }

    clearAllTestPayments() {
        console.log('🧹 Clearing all test payments...');
        localStorage.removeItem('pendingPayments');
        this.showSuccess('🗑️ All test payments cleared successfully');
        
        // Refresh admin panel if it's open
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel && !adminPanel.classList.contains('hidden')) {
            setTimeout(() => this.loadPendingPayments(), 500);
        }
    }

    clearAllUsers() {
        console.log('🧹 Clearing all user data...');
        localStorage.removeItem('QLDUsers');
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.showSuccess('🗑️ All user data cleared successfully');
        
        // Hide any user-specific UI elements
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const courseAccess = document.getElementById('course-access');
        const adminPanel = document.getElementById('admin-panel');
        
        if (loginForm) loginForm.classList.remove('hidden');
        if (registerForm) registerForm.classList.add('hidden');
        if (courseAccess) courseAccess.classList.add('hidden');
        if (adminPanel) adminPanel.classList.add('hidden');
        
        console.log('✅ All user data and UI reset complete');
    }

    // ===== USER MANAGEMENT & SUBSCRIPTION SYSTEM =====

    loadAllUsers() {
        console.log('👥 Loading all users for management...');
        const users = JSON.parse(localStorage.getItem('QLDUsers') || '{}');
        const userList = Object.values(users);
        
        console.log('📊 Found users:', userList.length);
        
        this.renderUserManagementList(userList);
        this.updateUserStats(userList);
    }

    renderUserManagementList(users, filter = 'all', courseFilter = 'all') {
        const userManagementList = document.getElementById('userManagementList');
        if (!userManagementList) return;

        if (users.length === 0) {
            userManagementList.innerHTML = `
                <div class="no-users-message">
                    <h3>No users found</h3>
                    <p>Users will appear here once they register for courses</p>
                </div>
            `;
            return;
        }

        // Filter users based on selected filters
        let filteredUsers = users;
        
        if (filter !== 'all') {
            filteredUsers = filteredUsers.filter(user => {
                const status = this.getUserSubscriptionStatus(user);
                return status === filter;
            });
        }

        if (courseFilter !== 'all') {
            filteredUsers = filteredUsers.filter(user => {
                return this.userHasAccessToCourse(user, courseFilter);
            });
        }

        userManagementList.innerHTML = '';

        filteredUsers.forEach(user => {
            const userCard = this.createUserManagementCard(user);
            userManagementList.appendChild(userCard);
        });

        if (filteredUsers.length === 0) {
            userManagementList.innerHTML = `
                <div class="no-users-message">
                    <h3>No users match the current filters</h3>
                    <p>Try adjusting your filter settings</p>
                </div>
            `;
        }
    }

    createUserManagementCard(user) {
        const card = document.createElement('div');
        card.className = 'user-card';
        
        const status = this.getUserSubscriptionStatus(user);
        const userCourses = this.getUserCourseAccess(user);
        
        card.innerHTML = `
            <div class="user-card-header">
                <div class="user-info">
                    <h3 class="user-name">${user.name}</h3>
                    <p class="user-email">${user.email}</p>
                    <p class="user-join-date">Joined: ${new Date(user.joinDate || user.registeredAt || Date.now()).toLocaleDateString()}</p>
                </div>
                <div class="user-status">
                    <span class="status-badge status-${status}">${this.getStatusLabel(status)}</span>
                </div>
            </div>
            
            <div class="user-courses">
                <div class="user-courses-title">Course Access:</div>
                <div class="user-course-list">
                    ${userCourses.map(course => `
                        <div class="course-access-badge ${course.status}">
                            ${course.title}
                            ${course.expiresAt ? `<span class="access-expires">expires ${new Date(course.expiresAt).toLocaleDateString()}</span>` : ''}
                        </div>
                    `).join('')}
                    ${userCourses.length === 0 ? '<span class="no-courses">No course access</span>' : ''}
                </div>
            </div>
            
            <div class="user-actions">
                <button class="btn-details" onclick="courseApp.showUserDetails('${user.email}')">
                    📊 View Details
                </button>
                <button class="btn-extend" onclick="courseApp.showExtendAccessModal('${user.email}')">
                    ➕ Extend Access
                </button>
                <button class="btn-revoke" onclick="courseApp.revokeUserAccess('${user.email}')">
                    🚫 Revoke Access
                </button>
            </div>
        `;
        
        return card;
    }

    getUserSubscriptionStatus(user) {
        const courses = this.getUserCourseAccess(user);
        
        if (courses.length === 0) {
            return 'never-purchased';
        }
        
        const hasActiveAccess = courses.some(course => course.status === 'active');
        return hasActiveAccess ? 'active' : 'expired';
    }

    getStatusLabel(status) {
        switch (status) {
            case 'active': return 'Active';
            case 'expired': return 'Expired';
            case 'never-purchased': return 'Never Purchased';
            default: return 'Unknown';
        }
    }

    getUserCourseAccess(user) {
        const courseAccess = [];
        
        // Check approved courses (server-side simulation)
        const approvedStudents = this.getApprovedStudents();
        const userApproved = approvedStudents[user.email.toLowerCase()];
        
        if (userApproved && userApproved.courses) {
            userApproved.courses.forEach(courseId => {
                const course = this.courses[courseId];
                if (course) {
                    const expiresAt = userApproved.expiresAt || this.calculateExpirationDate(userApproved.grantedAt);
                    const isExpired = expiresAt && new Date(expiresAt) < new Date();
                    
                    courseAccess.push({
                        id: courseId,
                        title: course.title,
                        status: isExpired ? 'expired' : 'active',
                        grantedAt: userApproved.grantedAt,
                        expiresAt: expiresAt
                    });
                }
            });
        }

        // Also check local purchased courses (for demo/testing)
        if (user.purchasedCourses) {
            user.purchasedCourses.forEach(courseId => {
                if (!courseAccess.find(c => c.id === courseId)) {
                    const course = this.courses[courseId];
                    if (course) {
                        courseAccess.push({
                            id: courseId,
                            title: course.title,
                            status: 'active',
                            grantedAt: user.joinDate || user.registeredAt,
                            expiresAt: null // Local purchases don't expire for demo
                        });
                    }
                }
            });
        }

        return courseAccess;
    }

    userHasAccessToCourse(user, courseId) {
        const courses = this.getUserCourseAccess(user);
        return courses.some(course => course.id === courseId);
    }

    calculateExpirationDate(grantedAt, monthsToAdd = 1) {
        if (!grantedAt) return null;
        
        const date = new Date(grantedAt);
        date.setMonth(date.getMonth() + monthsToAdd);
        return date.toISOString();
    }

    updateUserStats(users) {
        const stats = {
            total: users.length,
            active: 0,
            expired: 0,
            neverPurchased: 0
        };

        users.forEach(user => {
            const status = this.getUserSubscriptionStatus(user);
            if (status === 'active') stats.active++;
            else if (status === 'expired') stats.expired++;
            else stats.neverPurchased++;
        });

        // Update stats in the admin panel if elements exist
        this.updateStatCard('Active Students', stats.active);
        this.updateStatCard('Expired Access', stats.expired);
        this.updateStatCard('Never Purchased', stats.neverPurchased);
    }

    updateStatCard(label, value) {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            const labelElement = card.querySelector('.stat-label');
            if (labelElement && labelElement.textContent === label) {
                const numberElement = card.querySelector('.stat-number');
                if (numberElement) {
                    numberElement.textContent = value;
                }
            }
        });
    }

    filterUsers() {
        const statusFilter = document.getElementById('userFilterStatus')?.value || 'all';
        const courseFilter = document.getElementById('userFilterCourse')?.value || 'all';
        
        const users = JSON.parse(localStorage.getItem('QLDUsers') || '{}');
        const userList = Object.values(users);
        
        this.renderUserManagementList(userList, statusFilter, courseFilter);
    }

    showUserDetails(email) {
        const users = JSON.parse(localStorage.getItem('QLDUsers') || '{}');
        const user = users[email];
        
        if (!user) {
            this.showError('User not found');
            return;
        }

        const courses = this.getUserCourseAccess(user);
        const status = this.getUserSubscriptionStatus(user);
        
        const detailsHtml = `
            <div style="max-width: 500px;">
                <h3>👤 User Details</h3>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Status:</strong> <span class="status-badge status-${status}">${this.getStatusLabel(status)}</span></p>
                <p><strong>Joined:</strong> ${new Date(user.joinDate || user.registeredAt || Date.now()).toLocaleDateString()}</p>
                <h4>Course Access:</h4>
                ${courses.length > 0 ? 
                    courses.map(course => `
                        <div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
                            <strong>${course.title}</strong><br>
                            Status: <span class="status-badge status-${course.status}">${course.status}</span><br>
                            ${course.grantedAt ? `Granted: ${new Date(course.grantedAt).toLocaleDateString()}<br>` : ''}
                            ${course.expiresAt ? `Expires: ${new Date(course.expiresAt).toLocaleDateString()}` : 'No expiration'}
                        </div>
                    `).join('') : 
                    '<p>No course access</p>'
                }
            </div>
        `;
        
        this.showNotification(detailsHtml, 'success');
    }

    showExtendAccessModal(email) {
        const courses = Object.keys(this.courses);
        
        const modalHtml = `
            <div style="max-width: 400px;">
                <h3>➕ Extend Access</h3>
                <p>Grant or extend monthly access for: <strong>${email}</strong></p>
                
                <div style="margin: 20px 0;">
                    <label>Course:</label><br>
                    <select id="extendCourse" style="width: 100%; padding: 8px; margin: 5px 0;">
                        ${courses.map(courseId => 
                            `<option value="${courseId}">${this.courses[courseId].title}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div style="margin: 20px 0;">
                    <label>Duration:</label><br>
                    <select id="extendDuration" style="width: 100%; padding: 8px; margin: 5px 0;">
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">12 Months</option>
                    </select>
                </div>
                
                <div style="margin: 20px 0; text-align: center;">
                    <button onclick="courseApp.confirmExtendAccess('${email}')" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-right: 10px;">
                        ✅ Grant Access
                    </button>
                    <button onclick="document.querySelector('.notification').remove()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                        Cancel
                    </button>
                </div>
            </div>
        `;
        
        this.showNotification(modalHtml, 'success');
    }

    confirmExtendAccess(email) {
        const courseId = document.getElementById('extendCourse')?.value;
        const duration = parseInt(document.getElementById('extendDuration')?.value) || 1;
        
        if (!courseId) {
            this.showError('Please select a course');
            return;
        }

        // Get current approved students
        const approvedStudents = this.getApprovedStudents();
        
        // Initialize user if not exists
        if (!approvedStudents[email.toLowerCase()]) {
            approvedStudents[email.toLowerCase()] = {
                email: email,
                courses: [],
                grantedAt: new Date().toISOString()
            };
        }

        const userApproved = approvedStudents[email.toLowerCase()];
        
        // Add course if not already there
        if (!userApproved.courses.includes(courseId)) {
            userApproved.courses.push(courseId);
        }
        
        // Update expiration date
        const currentExpiry = userApproved.expiresAt ? new Date(userApproved.expiresAt) : new Date();
        const newExpiry = new Date(Math.max(currentExpiry.getTime(), new Date().getTime()));
        newExpiry.setMonth(newExpiry.getMonth() + duration);
        
        userApproved.expiresAt = newExpiry.toISOString();
        userApproved.lastExtended = new Date().toISOString();
        
        // Save changes
        this.saveApprovedStudents(approvedStudents);
        
        // Close modal and refresh
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        this.showSuccess(`✅ Access extended for ${email} - ${this.courses[courseId].title} until ${newExpiry.toLocaleDateString()}`);
        
        // Refresh user list
        setTimeout(() => this.loadAllUsers(), 500);
    }

    revokeUserAccess(email) {
        const confirmed = confirm(`⚠️ Are you sure you want to revoke ALL course access for ${email}?\n\nThis action cannot be undone.`);
        
        if (!confirmed) return;

        // Remove from approved students
        const approvedStudents = this.getApprovedStudents();
        delete approvedStudents[email.toLowerCase()];
        this.saveApprovedStudents(approvedStudents);

        // Also clear local purchased courses if it's the current user
        const users = JSON.parse(localStorage.getItem('QLDUsers') || '{}');
        if (users[email]) {
            users[email].purchasedCourses = [];
            users[email].ownedCourses = [];
            localStorage.setItem('QLDUsers', JSON.stringify(users));
        }

        this.showSuccess(`🚫 All course access revoked for ${email}`);
        
        // Refresh user list
        setTimeout(() => this.loadAllUsers(), 500);
    }

    checkExpiredSubscriptions() {
        const approvedStudents = this.getApprovedStudents();
        const now = new Date();
        let expiredCount = 0;
        
        Object.keys(approvedStudents).forEach(email => {
            const user = approvedStudents[email];
            if (user.expiresAt && new Date(user.expiresAt) < now) {
                expiredCount++;
            }
        });
        
        if (expiredCount > 0) {
            this.showWarning(`⏰ Found ${expiredCount} expired subscriptions. Review user list to manage expired access.`);
        } else {
            this.showSuccess('✅ No expired subscriptions found');
        }
        
        // Refresh user list to show current status
        this.loadAllUsers();
    }
}

// ===== GLOBAL FUNCTIONS (for onclick handlers) =====

function switchAuthTab(tab) {
    console.log('🔄 Switching auth tab to:', tab);
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.querySelector('.tab-btn:first-child');
    const registerTab = document.querySelector('.tab-btn:last-child');
    
    if (tab === 'login') {
        loginForm?.classList.remove('hidden');
        registerForm?.classList.add('hidden');
        loginTab?.classList.add('active');
        registerTab?.classList.remove('active');
    } else if (tab === 'register') {
        loginForm?.classList.add('hidden');
        registerForm?.classList.remove('hidden');
        loginTab?.classList.remove('active');
        registerTab?.classList.add('active');
    }
}

function showAdminPanel() {
    console.log('👑 Show Admin Panel clicked');
    if (window.courseApp) {
        window.courseApp.showAdminPanel();
    }
}

function logout() {
    console.log('🚪 Logout clicked');
    if (window.courseApp) {
        window.courseApp.logout();
    }
}

function showDashboard() {
    console.log('🏠 Show Dashboard clicked');
    if (window.courseApp) {
        window.courseApp.showDashboard();
    }
}

function markPaymentSent() {
    console.log('✅ Mark Payment Sent clicked');
    if (window.courseApp) {
        window.courseApp.markPaymentSent();
    }
}

function grantCourseAccess() {
    console.log('✅ Grant Course Access clicked');
    const email = document.getElementById('admin-student-email')?.value;
    const courseId = document.getElementById('admin-course-select')?.value;
    const courseName = document.getElementById('admin-course-select')?.selectedOptions[0]?.text || courseId;
    
    if (!email || !courseId) {
        alert('Please enter both email and select a course');
        return;
    }
    
    if (window.courseApp) {
        window.courseApp.grantCourseAccess(email, courseId, courseName);
    }
}

function closePaymentOverlay() {
    console.log('❌ Close Payment Overlay clicked');
    const overlay = document.getElementById('paymentOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Debug and testing methods
window.debugUserPassword = function(email) {
    if (window.courseApp) {
        return window.courseApp.debugUserPassword(email);
    } else {
        console.error('❌ courseApp not available');
    }
};

window.resetUserPassword = function(email, newPassword) {
    if (window.courseApp) {
        return window.courseApp.resetUserPassword(email, newPassword);
    } else {
        console.error('❌ courseApp not available');
    }
};

window.fixMyLogin = function(email, desiredPassword) {
    if (window.courseApp) {
        return window.courseApp.fixUserLogin(email, desiredPassword);
    } else {
        console.error('❌ courseApp not available');
    }
};


// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing CoursePlatform...');
    try {
        window.courseApp = new CoursePlatform();
        console.log('✅ CoursePlatform initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing CoursePlatform:', error);
        // Fallback: show auth screen if initialization fails
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const authScreen = document.getElementById('auth-screen');
            if (loadingScreen) loadingScreen.classList.remove('active');
            if (authScreen) authScreen.classList.add('active');
        }, 1000);
    }
});

document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!user?.email) return;

        try {
            const res = await fetch(
                `https://restless-feather-b6a9.michf18.workers.dev/api/course-access`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: user.email,
                        courseId: "all"
                    })
                }
            );

            const data = await res.json();

            if (!user.ownedCourses) user.ownedCourses = [];

            if (data.hasAccess && data.reg?.series) {
                const course = data.reg.series.toLowerCase();
                if (!user.ownedCourses.includes(course)) {
                    user.ownedCourses.push(course);
                }
            }

            localStorage.setItem('currentUser', JSON.stringify(user));

            if (window.courseApp) {
                window.courseApp.currentUser = user;

                // ✅ Only update UI if user is NOT currently watching a lesson
                const onPlayerScreen = document.getElementById('player-screen')?.classList.contains('active');
                if (!onPlayerScreen) {
                    window.courseApp.updateCourseAccessUI?.();
                }
            }

        } catch (err) {
            console.log('sync failed:', err);
        }
    }
});

// Backup initialization in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM is still loading, DOMContentLoaded will fire
} else {
    // DOM is already loaded
    console.log('🚀 DOM already loaded, initializing CoursePlatform...');
    setTimeout(() => {
        if (typeof window.courseApp === 'undefined') {
            try {
                window.courseApp = new CoursePlatform();
                console.log('✅ CoursePlatform initialized successfully (backup)');
            } catch (error) {
                console.error('❌ Error initializing CoursePlatform (backup):', error);
                // Fallback: show auth screen if initialization fails
                const loadingScreen = document.getElementById('loading-screen');
                const authScreen = document.getElementById('auth-screen');
                if (loadingScreen) loadingScreen.classList.remove('active');
                if (authScreen) authScreen.classList.add('active');
            }
        }
    }, 100);
}

function getAdminToken() {
  return localStorage.getItem('adminToken');
}

async function adminFetch(url, options = {}) {
  const token = getAdminToken();

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  async function checkKVAccess(email) {
    try {

        const response = await fetch(
            'https://restless-feather-b6a9.michf18.workers.dev/api/course-access',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            }
        );

        const data = await response.json();

        return data;

    } catch (err) {

        console.error('Access check failed:', err);

        return {
            success: false,
            hasAccess: false
        };
    }
}
}
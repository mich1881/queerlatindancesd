// Queer Latin Dance Course Platform
// Student Registration & Login System

class CoursePlatform {
    constructor() {
        this.currentUser = null;
        this.currentCourse = null;
        this.currentLesson = null;
        this.lessonProgress = {};
        
        // Define your courses here - easy to modify!
        this.courses = {
            'salsa-fundamentals': {
                id: 'salsa-fundamentals',
                title: 'Salsa Fundamentals',
                description: 'Master the basic steps, timing, and partner connection in salsa dancing. Perfect for absolute beginners who want to build a strong foundation.',
                price: 49,
                icon: '💃',
                duration: '4 hours',
                lessons: 8,
                level: 'Beginner',
                videoLessons: [
                    {
                        id: 1,
                        title: 'Welcome & Basic Steps',
                        video: 'https://drive.google.com/file/d/1UHWNUdTdOHKSqqbmFoEZGJcynn27dO6m/preview',
                        videoType: 'googledrive',
                        duration: '15:30',
                        description: 'Learn the fundamental salsa steps and timing'
                    },
                    {
                        id: 2,
                        title: 'Basic Timing & Rhythm',
                        video: 'https://drive.google.com/uc?export=download&id=1UHWNUdTdOHKSqqbmFoEZGJcynn27dO6m',
                        videoType: 'googledrive',
                        duration: '18:45',
                        description: 'Understanding salsa rhythm and musical timing'
                    },
                    {
                        id: 3,
                        title: 'Partner Connection Basics',
                        video: 'https://drive.google.com/file/d/1UHWNUdTdOHKSqqbmFoEZGJcynn27dO6m/preview',
                        videoType: 'googledrive',
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
            'bachata-sensual': {
                id: 'bachata-sensual',
                title: 'Bachata Sensual',
                description: 'Learn the romantic and expressive movements of bachata. Focus on body movement, isolations, and creating beautiful connection with your partner.',
                price: 39,
                icon: '🔥',
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
            'advanced-salsa': {
                id: 'advanced-salsa',
                title: 'Advanced Salsa Combinations',
                description: 'Take your salsa to the next level with complex patterns, advanced styling, and performance-level techniques. For experienced dancers only.',
                price: 69,
                icon: '⚡',
                duration: '5 hours',
                lessons: 10,
                level: 'Advanced',
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

    checkAuthStatus() {
        console.log('🔍 Checking authentication status...');
        const savedUser = localStorage.getItem('QLDUser');
        console.log('💾 Saved user data:', savedUser ? 'Found' : 'None');
        
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                console.log('✅ Found saved user:', this.currentUser.name);
                
                // Check if user is admin
                this.checkAdminAccess();
                
                console.log('🎯 About to show dashboard...');
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

    checkAdminAccess() {
        // Simple admin check - you can change this email to your admin email
        const adminEmails = ['michelle@queerlatindance.com', 'admin@queerlatindance.com'];
        const isAdmin = adminEmails.includes(this.currentUser.email.toLowerCase());
        
        const adminBtn = document.getElementById('admin-btn');
        if (adminBtn) {
            adminBtn.style.display = isAdmin ? 'block' : 'none';
        }
        
        this.currentUser.isAdmin = isAdmin;
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
            // Get existing users from storage
            const users = JSON.parse(localStorage.getItem('QLDUsers') || '{}');
            
            if (users[email]) {
                // Check password (in real app, this would be properly hashed)
                if (this.verifyPassword(password, users[email].passwordHash)) {
                    this.currentUser = users[email];
                    this.saveCurrentUser();
                    this.showSuccess(`Welcome back, ${this.currentUser.name}! 🎉`);
                    setTimeout(() => this.showDashboard(), 1000);
                } else {
                    this.showError('Invalid password. Please try again.');
                }
            } else {
                // Demo mode: Create a temporary user for any email/password combination
                console.log('🎬 Demo mode: Creating temporary user for', email);
                this.currentUser = {
                    name: email.split('@')[0], // Use part of email as name
                    email: email,
                    passwordHash: this.hashPassword(password),
                    registeredAt: new Date().toISOString(),
                    ownedCourses: []
                };
                
                // Save to storage for consistency
                users[email] = this.currentUser;
                localStorage.setItem('QLDUsers', JSON.stringify(users));
                this.saveCurrentUser();
                
                this.showSuccess(`Welcome, ${this.currentUser.name}! 🎉 (Demo Mode)`);
                setTimeout(() => this.showDashboard(), 1000);
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('Login failed. Please try again.');
        }
    }

    async handleRegister() {
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;

        if (!name || !email || !password) {
            this.showError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters');
            return;
        }

        this.showLoading('Creating your account...');

        try {
            const users = JSON.parse(localStorage.getItem('QLDUsers') || '{}');
            
            if (users[email]) {
                this.showError('Account with this email already exists');
                return;
            }

            // Create new user
            const newUser = {
                id: this.generateUserId(),
                name: name,
                email: email,
                passwordHash: this.hashPassword(password),
                purchasedCourses: [],
                progress: {},
                joinDate: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            // Save to storage
            users[email] = newUser;
            localStorage.setItem('QLDUsers', JSON.stringify(users));

            // Set as current user
            this.currentUser = newUser;
            this.saveCurrentUser();

            this.showSuccess(`Welcome to our dance community, ${name}! 🎉`);
            setTimeout(() => this.showDashboard(), 1500);

        } catch (error) {
            console.error('Registration error:', error);
            this.showError('Registration failed. Please try again.');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('QLDUser');
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
        
        // Refresh course access from server
        this.refreshCourseAccess();
        
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
        
        // Add a loading indicator temporarily
        availableCoursesGrid.innerHTML = '<p style="color: blue; padding: 20px;">🔄 Loading courses...</p>';

        Object.values(this.courses).forEach(course => {
            console.log(`🎓 Processing course: ${course.title}`);
            const courseCard = this.createCourseCard(course);
            
            if (this.userOwnsCourse(course.id)) {
                console.log(`✅ User owns course: ${course.id}`);
                myCoursesGrid.appendChild(courseCard);
                hasPurchasedCourses = true;
            } else {
                console.log(`🛒 Course available for purchase: ${course.id}`);
                availableCoursesGrid.appendChild(courseCard);
            }
        });

        // Show "no courses" message if needed
        if (!hasPurchasedCourses) {
            myCoursesGrid.innerHTML = `
                <div class="no-courses-message">
                    <div class="no-courses-icon">📚</div>
                    <h3>No courses yet!</h3>
                    <p>Purchase your first course below to start your dance journey</p>
                </div>
            `;
        }
        
        console.log('✅ renderCourses() completed');
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        
        const isOwned = this.userOwnsCourse(course.id);
        const progress = this.getCourseProgress(course.id);

        card.innerHTML = `
            <div class="course-image">${course.icon}</div>
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
                        <span class="status-badge">✓ Purchased ${progress > 0 ? `(${progress}% complete)` : ''}</span>
                        <button class="course-btn btn-success" onclick="courseApp.openCourse('${course.id}')">
                            ${progress > 0 ? 'Continue Learning' : 'Start Course'}
                        </button>
                    ` : `
                        <span class="course-price">$${course.price}</span>
                        <button class="course-btn btn-primary" onclick="courseApp.showPaymentInstructions('${course.id}')">
                            Buy Now - $${course.price}
                        </button>
                    `}
                </div>
            </div>
        `;

        return card;
    }

    userOwnsCourse(courseId) {
        if (!this.currentUser) return false;
        
        // Check local purchased courses (for demo/testing)
        if (this.currentUser.purchasedCourses && this.currentUser.purchasedCourses.includes(courseId)) {
            return true;
        }
        
        // Check server-side approved courses
        const approvedStudents = this.getApprovedStudents();
        const studentEmail = this.currentUser.email.toLowerCase();
        
        return approvedStudents[studentEmail] && 
               approvedStudents[studentEmail].courses.includes(courseId);
    }

    getApprovedStudents() {
        // In a real implementation, this would fetch from your server
        // For now, we'll use localStorage to simulate server-side approval
        return JSON.parse(localStorage.getItem('approvedStudents') || '{}');
    }

    saveApprovedStudents(studentsData) {
        localStorage.setItem('approvedStudents', JSON.stringify(studentsData));
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
        if (!this.userOwnsCourse(courseId)) {
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
        const hasAccess = await this.validateVideoAccess(this.currentCourse.id, lessonIndex);
        
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
            localStorage.setItem('QLDUser', JSON.stringify(this.currentUser));
        }
    }

    saveUserToDatabase() {
        if (!this.currentUser) return;

        const users = JSON.parse(localStorage.getItem('QLDUsers') || '{}');
        users[this.currentUser.email] = this.currentUser;
        localStorage.setItem('QLDUsers', JSON.stringify(users));
    }

    // ===== PAYMENT SYSTEM =====

    showPaymentInstructions(course) {
        // Store selected course for payment processing
        this.selectedCourse = course;
        
        // Update the payment overlay with course details
        document.getElementById('selectedSeries').textContent = course.title;
        document.getElementById('selectedPrice').textContent = `$${course.price}`;
        document.getElementById('orderSummaryDetails').textContent = course.title;
        document.getElementById('orderSummaryTotal').textContent = `$${course.price}`;
        document.getElementById('orderSummaryCalc').textContent = `Course enrollment fee: $${course.price}`;
        
        // Pre-fill user email in all forms
        const emailInputs = document.querySelectorAll('.payment-form input[name="email"]');
        emailInputs.forEach(input => {
            input.value = this.currentUser.email;
        });
        
        // Show the payment overlay
        this.showPaymentOverlay();
    }

    showPaymentOverlay() {
        const overlay = document.getElementById('paymentOverlay');
        
        // Reset all forms
        this.closeAllForms();
        
        overlay.style.display = 'flex';
        
        // Mobile enhancements
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        }
        
        setTimeout(() => {
            overlay.classList.add('show');
        }, 10);
    }

    closeAllForms() {
        const forms = document.querySelectorAll('.payment-form');
        forms.forEach(form => {
            form.classList.remove('active');
        });
    }

    hashPassword(password) {
        // Simple hash for demo purposes (in production, use proper hashing)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    verifyPassword(password, hash) {
        return this.hashPassword(password) === hash;
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
        if (!this.currentUser) return false;
        
        // Check if user has locally stored access
        const localAccess = this.currentUser.ownedCourses || [];
        return localAccess.includes(courseId);
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
        
        const ownedCourses = this.currentUser.ownedCourses;
        
        // Update course cards to show access status
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            const courseId = card.dataset.courseId;
            const buyButton = card.querySelector('.buy-btn');
            const accessIndicator = card.querySelector('.access-indicator');
            
            if (ownedCourses.includes(courseId)) {
                // User owns this course
                if (buyButton) {
                    buyButton.textContent = '✅ Access Granted';
                    buyButton.style.backgroundColor = '#4CAF50';
                    buyButton.onclick = () => this.startCourse(courseId);
                }
                
                // Add access indicator if it doesn't exist
                if (!accessIndicator) {
                    const indicator = document.createElement('div');
                    indicator.className = 'access-indicator owned';
                    indicator.innerHTML = '🎓 You own this course';
                    card.appendChild(indicator);
                }
            } else {
                // User doesn't own this course
                if (accessIndicator && accessIndicator.classList.contains('owned')) {
                    accessIndicator.remove();
                }
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

    async loadPendingPayments() {
        console.log('🔧 loadPendingPayments() started');
        try {
            // For demo mode, just ask for any key
            const adminKey = prompt('Enter admin key (for demo, use "demo"):');
            if (!adminKey) {
                console.log('❌ Admin key cancelled by user');
                return;
            }
            console.log('✅ Admin key entered:', adminKey);
            
            let payments = [];
            let isDemo = false;
            
            // Try backend first
            try {
                const response = await fetch('https://restless-feather-b6a9.michf18.workers.dev/api/admin/pending-payments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ adminKey })
                });
                
                if (response.ok) {
                    const result = await response.json();
                    
                    if (result.success) {
                        payments = result.pendingPayments;
                        console.log('✅ Loaded pending payments from backend');
                    } else {
                        throw new Error(result.error || 'Backend error');
                    }
                } else {
                    throw new Error(`HTTP ${response.status}: Backend endpoint not found`);
                }
                
            } catch (backendError) {
                console.log('⚠️ Backend not available, using demo mode:', backendError.message);
                isDemo = true;
                
                // Use local storage for demo
                const localPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]');
                payments = localPayments.filter(payment => 
                    payment.status === 'demo-pending' || payment.status === 'pending-confirmation'
                );
            }
            
            if (isDemo && payments.length === 0) {
                // Add sample data for demo
                payments = [{
                    email: this.currentUser.email,
                    firstName: this.currentUser.name.split(' ')[0],
                    lastName: this.currentUser.name.split(' ')[1] || 'User',
                    courseName: 'Salsa Fundamentals',
                    courseId: 'salsa-fundamentals',
                    paymentMethod: 'zelle',
                    timestamp: new Date().toISOString(),
                    status: 'demo-pending',
                    amount: 49
                }];
                
                console.log('✅ Created demo payment:', payments[0]);
                this.showSuccess('🎬 Demo Mode: Showing sample pending payment. In production, this would show real payment requests.');
            }
            
            console.log('📊 Final payments to display:', payments);
            
            this.displayPendingPayments(payments, isDemo);
            
        } catch (error) {
            console.error('❌ Error loading pending payments:', error);
            this.showError('❌ Error loading pending payments');
            
            // Fallback: show basic admin panel even if payments fail to load
            const container = document.getElementById('pendingPaymentsList');
            if (container) {
                container.innerHTML = '<p class="error-message">❌ Error loading pending payments. Please try again or contact support.</p>';
            }
        }
    }

    displayPendingPayments(payments, isDemo = false) {
        console.log('🎯 displayPendingPayments() called with:', { payments: payments.length, isDemo });
        const container = document.getElementById('pendingPaymentsList');
        if (!container) {
            console.error('❌ pendingPaymentsList element not found!');
            return;
        }
        console.log('✅ Found pendingPaymentsList container');
        
        if (payments.length === 0) {
            const message = isDemo 
                ? '<p class="no-payments">Demo Mode: No pending payments. Purchase a course to see pending payments here.</p>'
                : '<p class="no-payments">No pending course payments found.</p>';
            container.innerHTML = message;
            console.log('✅ Displayed no-payments message');
            return;
        }
        
        const html = payments.map(payment => `
            <div class="payment-item" data-email="${payment.email}" data-course="${payment.courseId}">
                <div class="payment-info">
                    <h4>${payment.firstName} ${payment.lastName}</h4>
                    <p><strong>Email:</strong> ${payment.email}</p>
                    <p><strong>Course:</strong> ${payment.courseName || payment.series}</p>
                    <p><strong>Amount:</strong> $${payment.amount || payment.price}</p>
                    <p><strong>Method:</strong> ${payment.paymentMethod}</p>
                    <p><strong>Date:</strong> ${new Date(payment.timestamp).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> <span class="status pending">${payment.status || 'Pending'}</span></p>
                </div>
                <div class="payment-actions">
                    <button onclick="courseApp.grantCourseAccess('${payment.email}', '${payment.courseId}', '${payment.courseName}')" 
                            class="btn-grant">✅ Grant Access</button>
                    <button onclick="courseApp.denyPayment('${payment.email}', '${payment.courseId}')" 
                            class="btn-deny">❌ Deny</button>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = html;
        console.log('✅ displayPendingPayments completed - HTML set');
    }

    async grantCourseAccess(email, courseId, courseName) {
        try {
            const adminKey = prompt('Enter admin key to confirm (for demo, use "demo"):');
            if (!adminKey) return;
            
            let success = false;
            
            // Try backend first
            try {
                const response = await fetch('https://restless-feather-b6a9.michf18.workers.dev/api/admin/grant-access', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        adminKey,
                        email,
                        courseId,
                        action: 'grant'
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    success = true;
                    console.log('✅ Access granted via backend');
                } else {
                    throw new Error(result.error || 'Backend error');
                }
                
            } catch (backendError) {
                console.log('⚠️ Backend not available, using demo mode:', backendError.message);
                
                // Demo mode - grant access locally
                if (adminKey === 'demo' || adminKey) {
                    // Update local storage to grant access
                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (currentUser && currentUser.email === email) {
                        if (!currentUser.ownedCourses) {
                            currentUser.ownedCourses = [];
                        }
                        if (!currentUser.ownedCourses.includes(courseId)) {
                            currentUser.ownedCourses.push(courseId);
                        }
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        this.currentUser = currentUser;
                    }
                    
                    // Update pending payments
                    const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]');
                    const updatedPayments = pendingPayments.map(payment => {
                        if (payment.userEmail === email && payment.courseId === courseId) {
                            return { ...payment, status: 'granted' };
                        }
                        return payment;
                    });
                    localStorage.setItem('pendingPayments', JSON.stringify(updatedPayments));
                    
                    success = true;
                    console.log('✅ Access granted in demo mode');
                }
            }
            
            if (success) {
                this.showSuccess(`✅ Course access granted to ${email} for ${courseName}${adminKey === 'demo' ? ' (Demo Mode)' : ''}`);
                this.loadPendingPayments(); // Refresh the list
                
                // Update UI if this is the current user
                if (this.currentUser && this.currentUser.email === email) {
                    this.updateCourseAccessUI();
                }
            } else {
                this.showError(`❌ Failed to grant access`);
            }
            
        } catch (error) {
            console.error('❌ Error granting access:', error);
            this.showError('❌ Error granting course access');
        }
    }

    async denyPayment(email, courseId) {
        if (!confirm(`Deny course access for ${email}?`)) return;
        
        try {
            const adminKey = prompt('Enter admin key to confirm:');
            if (!adminKey) return;
            
            const response = await fetch('https://restless-feather-b6a9.michf18.workers.dev/api/admin/grant-access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    adminKey,
                    email,
                    courseId,
                    action: 'deny'
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showSuccess(`❌ Payment denied for ${email}`);
                this.loadPendingPayments(); // Refresh the list
            } else {
                this.showError(`❌ ${result.error}`);
            }
            
        } catch (error) {
            console.error('❌ Error denying payment:', error);
            this.showError('❌ Error denying payment');
        }
    }

    // ===== END ADMIN PANEL =====

    // ===== END FUTURE RECOMMENDATIONS =====
}

// ===== GLOBAL FUNCTIONS (for onclick handlers) =====

function switchAuthTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
    
    document.querySelectorAll('.auth-form').forEach(form => form.classList.add('hidden'));
    document.getElementById(`${tab}-form`).classList.remove('hidden');
}

function logout() {
    courseApp.logout();
}

function showDashboard() {
    courseApp.showDashboard();
}

function showAdminPanel() {
    if (courseApp) {
        courseApp.showAdminPanel();
    }
}

// Payment overlay functions
function closePaymentOverlay() {
    const overlay = document.getElementById('paymentOverlay');
    overlay.classList.remove('show');
    
    setTimeout(() => {
        overlay.style.display = 'none';
        
        // Close all forms
        if (courseApp) {
            courseApp.closeAllForms();
        }
        
        // Restore body scrolling on mobile
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'auto';
        }
    }, 500);
}

// Payment method button handlers
document.addEventListener('DOMContentLoaded', function() {
    // Zelle button
    const zelleBtn = document.getElementById('zelleBtn');
    if (zelleBtn) {
        zelleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            courseApp.closeAllForms();
            document.getElementById('zelleForm').classList.add('active');
        });
    }
    
    // Venmo button
    const venmoBtn = document.getElementById('venmoBtn');
    if (venmoBtn) {
        venmoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            courseApp.closeAllForms();
            document.getElementById('venmoForm').classList.add('active');
        });
    }
    
    // Stripe button
    const stripeBtn = document.getElementById('stripeBtn');
    if (stripeBtn) {
        stripeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleStripePayment();
        });
    }

    // PayPal button
    const paypalBtn = document.getElementById('paypalBtn');
    if (paypalBtn) {
        paypalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            courseApp.closeAllForms();
            document.getElementById('paypalForm').classList.add('active');
        });
    }
    
    // Form submissions
    const zelleForm = document.getElementById('zelleFormInner');
    if (zelleForm) {
        zelleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitCoursePayment(zelleForm, 'zelle');
        });
    }
    
    const venmoForm = document.getElementById('venmoFormInner');
    if (venmoForm) {
        venmoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitCoursePayment(venmoForm, 'venmo');
        });
    }
    
    const paypalForm = document.getElementById('paypalFormInner');
    if (paypalForm) {
        paypalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitCoursePayment(paypalForm, 'paypal');
        });
    }
});

function handleStripePayment() {
    if (!courseApp || !courseApp.selectedCourse) return;
    
    const course = courseApp.selectedCourse;
    const userEmail = courseApp.currentUser.email;
    
    // Use actual Stripe Payment Links from payment1.html
    let stripeLink = '';
    
    // Map course prices to actual Stripe Payment Links
    switch (course.price) {
        case 26:
            stripeLink = 'https://buy.stripe.com/4gM14o3Gq1W0gSL1kE0Ny0d'; // $26 drop-in
            break;
        case 52:
            stripeLink = 'https://buy.stripe.com/bJe28s2Cm9osfOHgfy0Ny0e'; // $52 drop-in both
            break;
        case 80:
            stripeLink = 'https://buy.stripe.com/fZu00k4KugQU1XR2oI0Ny0c'; // $80 series single
            break;
        case 85:
            stripeLink = 'https://buy.stripe.com/fZu00k4KugQU1XR2oI0Ny0c'; // $85 private single
            break;
        case 144:
            stripeLink = 'https://buy.stripe.com/4gM4gA4Kuasw31V8N60Ny0b'; // $144 series both
            break;
        case 170:
            stripeLink = 'https://buy.stripe.com/4gM4gA4Kuasw31V8N60Ny0b'; // $170 private both
            break;
        default:
            // Default to the most common pricing
            if (course.price <= 30) {
                stripeLink = 'https://buy.stripe.com/4gM14o3Gq1W0gSL1kE0Ny0d'; // $26 link for lower prices
            } else if (course.price <= 60) {
                stripeLink = 'https://buy.stripe.com/bJe28s2Cm9osfOHgfy0Ny0e'; // $52 link for mid prices
            } else if (course.price <= 100) {
                stripeLink = 'https://buy.stripe.com/fZu00k4KugQU1XR2oI0Ny0c'; // $80-85 link
            } else {
                stripeLink = 'https://buy.stripe.com/4gM4gA4Kuasw31V8N60Ny0b'; // $144-170 link for higher prices
            }
            break;
    }
    
    // Close payment overlay and redirect to Stripe
    closePaymentOverlay();
    
    // Show notification before redirect
    courseApp.showSuccess(`Redirecting to Stripe to complete payment for "${course.title}"...`);
    
    // Track the payment attempt
    const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]');
    pendingPayments.push({
        courseId: course.id,
        courseName: course.title,
        userEmail: userEmail,
        amount: course.price,
        method: 'stripe',
        timestamp: new Date().toISOString(),
        stripeLink: stripeLink
    });
    localStorage.setItem('pendingPayments', JSON.stringify(pendingPayments));
    
    // Redirect to Stripe after a short delay
    setTimeout(() => {
        window.open(stripeLink, '_blank');
    }, 1000);
}

async function submitCoursePayment(form, paymentMethod) {
    if (!courseApp || !courseApp.selectedCourse) return;
    
    const course = courseApp.selectedCourse;
    const formData = new FormData(form);
    
    // Create the data object to send to backend
    const paymentData = {
        type: 'course',
        courseName: course.title,
        series: course.title, // Keep compatibility with existing backend
        paymentMethod: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
        amount: `$${course.price}`,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        pronouns: formData.get('pronouns') || '',
        registrationType: 'online-course',
        submissionId: `course-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    console.log('📤 Submitting course payment:', paymentData);
    
    try {
        // Show loading state
        const submitBtn = form.querySelector('.modal-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Try to submit to backend, with fallback for demo/testing
        let backendSuccess = false;
        
        try {
            // Use the existing working endpoint temporarily
            const response = await fetch('https://restless-feather-b6a9.michf18.workers.dev/api/payment-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...paymentData,
                    series: paymentData.courseName // Map courseName to series for existing backend
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('✅ Course payment submitted to backend:', result);
                backendSuccess = true;
            } else {
                console.log('⚠️ Backend endpoint not available, using demo mode');
            }
        } catch (networkError) {
            console.log('⚠️ Backend not accessible, using demo mode:', networkError.message);
        }
        
        // Always show success and track locally (works for both backend and demo mode)
        
        // Close the payment overlay
        closePaymentOverlay();
        
        // Show success message
        setTimeout(() => {
            const statusMessage = backendSuccess 
                ? `🎉 Course registration submitted! Check your email for payment instructions. You'll receive access within 24 hours after payment confirmation.`
                : `🎉 Demo Mode: Course registration recorded! In production, you would receive payment instructions via email. For testing, use the admin panel to grant yourself access.`;
                
            courseApp.showSuccess(statusMessage);
            
            // Track locally for admin panel
            const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]');
            pendingPayments.push({
                courseId: course.id,
                courseName: course.title,
                userEmail: paymentData.email,
                amount: course.price,
                method: paymentMethod,
                timestamp: new Date().toISOString(),
                status: backendSuccess ? 'pending-confirmation' : 'demo-pending'
            });
            localStorage.setItem('pendingPayments', JSON.stringify(pendingPayments));
            
            // In demo mode, also show payment instructions
            if (!backendSuccess) {
                setTimeout(() => {
                    courseApp.showPaymentInstructions(course);
                }, 3000);
            }
        }, 600);
        
    } catch (error) {
        console.error('❌ Unexpected error:', error);
        courseApp.showError(`❌ Unexpected error: ${error.message}. Please try again or contact support.`);
    } finally {
        // Reset button state
        const submitBtn = form.querySelector('.modal-submit');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function showPaymentDetails(method) {
    if (!courseApp || !courseApp.selectedCourse) return;
    
    const course = courseApp.selectedCourse;
    const userEmail = courseApp.currentUser.email;
    
    let details = '';
    let title = '';
    
    switch (method) {
        case 'zelle':
            title = '🏦 Zelle Payment Details';
            details = `
                <b>Send to:</b> michelle@queerlatindance.com<br>
                <b>Amount:</b> $${course.price}<br>
                <b>Memo:</b> ${userEmail} - ${course.title}<br><br>
                <b>Next Steps:</b><br>
                1. Open your banking app<br>
                2. Select Zelle<br>
                3. Send to michelle@queerlatindance.com<br>
                4. Include the memo above<br>
                5. You'll receive access within 24 hours!
            `;
            break;
        case 'venmo':
            title = '💰 Venmo Payment Details';
            details = `
                <b>Send to:</b> @QueerLatinDance<br>
                <b>Amount:</b> $${course.price}<br>
                <b>Note:</b> ${userEmail} - ${course.title}<br><br>
                <b>Next Steps:</b><br>
                1. Open Venmo app<br>
                2. Send to @QueerLatinDance<br>
                3. Include the note above<br>
                4. You'll receive access within 24 hours!
            `;
            break;
        case 'paypal':
            title = '💙 PayPal Payment Details';
            details = `
                <b>Send to:</b> michelle@queerlatindance.com<br>
                <b>Amount:</b> $${course.price}<br>
                <b>Note:</b> ${userEmail} - ${course.title}<br><br>
                <b>Next Steps:</b><br>
                1. Log in to PayPal<br>
                2. Send to michelle@queerlatindance.com<br>
                3. Include the note above<br>
                4. You'll receive access within 24 hours!<br><br>
                <em>Note: PayPal charges processing fees</em>
            `;
            break;
    }
    
    // Show payment overlay details (reusing the existing system)
    courseApp.showPaymentOverlay();
    
    setTimeout(() => {
        courseApp.showSuccess(`${title}\n\n${details.replace(/<[^>]*>/g, '\n')}`);
        closePaymentOverlay();
        
        // Track pending payment
        const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]');
        pendingPayments.push({
            courseId: course.id,
            courseName: course.title,
            userEmail: userEmail,
            amount: course.price,
            method: method,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('pendingPayments', JSON.stringify(pendingPayments));
    }, 500);
}

// Old payment functions removed - now using payment1.html style system

// ===== INITIALIZE APP =====

let courseApp;

document.addEventListener('DOMContentLoaded', () => {
    courseApp = new CoursePlatform();
    console.log('🕺💃 Queer Latin Dance Course Platform Ready!');
    
    // Debug: Check if courses are loaded
    console.log('📚 Courses loaded:', Object.keys(courseApp.courses).length);
    console.log('📚 Course names:', Object.keys(courseApp.courses));
    
    // Debug: Show current screen after a brief delay
    setTimeout(() => {
        const currentScreen = document.querySelector('.screen:not(.hidden)');
        console.log('🎯 Current visible screen:', currentScreen?.id || 'none visible');
        console.log('👤 Current user:', courseApp.currentUser);
        
        // If we're on the dashboard but no user is logged in, something's wrong
        if (currentScreen?.id === 'dashboard-screen' && !courseApp.currentUser) {
            console.warn('⚠️ On dashboard but no user logged in - this might be the issue');
        }
    }, 100);
});

// Helper to add test pending payment for admin testing
window.addTestPendingPayment = function() {
    const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]');
    pendingPayments.push({
        courseId: 'salsa-fundamentals',
        courseName: 'Salsa Fundamentals',
        userEmail: 'student@test.com',
        amount: 49,
        method: 'Zelle',
        timestamp: new Date().toISOString(),
        status: 'pending'
    });
    localStorage.setItem('pendingPayments', JSON.stringify(pendingPayments));
    console.log('✅ Added test pending payment');
};

// Direct admin panel test (bypass prompt and API)
window.testAdminPanel = function() {
    console.log('🧪 Direct admin panel test');
    if (!courseApp) {
        console.error('❌ courseApp not initialized');
        return;
    }
    
    if (!courseApp.isAdmin()) {
        console.error('❌ Not logged in as admin');
        console.log('Try running: window.adminDemoLogin()');
        return;
    }
    
    console.log('✅ Admin access confirmed, showing panel directly');
    courseApp.showScreen('admin-panel');
    
    // Add test content directly to bypass ALL issues
    setTimeout(() => {
        const container = document.getElementById('pendingPaymentsList');
        if (container) {
            container.innerHTML = `
                <div style="padding: 20px; border: 2px solid #007bff; border-radius: 10px; margin: 20px 0; background: #f8f9fa;">
                    <h4 style="color: #007bff; margin-top: 0;">🎭 Demo Pending Payment</h4>
                    <p><strong>Student:</strong> demo@example.com</p>
                    <p><strong>Course:</strong> Salsa Fundamentals ($49)</p>
                    <p><strong>Method:</strong> Zelle</p>
                    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                    <div style="margin-top: 15px;">
                        <button onclick="alert('✅ Access would be granted in production!')" 
                                style="background: #28a745; color: white; padding: 8px 15px; border: none; border-radius: 5px; margin-right: 10px; cursor: pointer;">
                            Grant Access
                        </button>
                        <button onclick="alert('❌ Access would be denied in production!')" 
                                style="background: #dc3545; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer;">
                            Deny Access
                        </button>
                    </div>
                </div>
                <div style="padding: 15px; background: #d4edda; border-radius: 5px; margin: 10px 0;">
                    <strong>🎬 Demo Mode Active</strong><br>
                    This is a demonstration of the admin panel. In production, you would see real pending course payments here.
                </div>
            `;
            console.log('✅ Demo admin panel content loaded with inline styles');
        } else {
            console.error('❌ pendingPaymentsList container still not found');
        }
    }, 100);
};

// Debug function to test course display
window.testCourseDisplay = function() {
    console.log('🧪 Manual course display test');
    if (!courseApp) {
        console.error('❌ courseApp not initialized');
        return;
    }
    
    console.log('📊 Platform state:');
    console.log('- Current user:', courseApp.currentUser);
    console.log('- Available courses:', Object.keys(courseApp.courses).length);
    console.log('- Current screen:', document.querySelector('.screen:not(.hidden)')?.id);
    
    // Try to render courses manually
    try {
        courseApp.renderCourses();
        console.log('✅ Manual renderCourses completed');
    } catch (error) {
        console.error('❌ Error rendering courses:', error);
    }
};

// Admin demo login function
window.adminDemoLogin = function() {
    console.log('⭐ Admin demo login initiated');
    if (!courseApp) {
        console.error('❌ courseApp not initialized');
        return;
    }
    
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    
    if (emailInput && passwordInput) {
        emailInput.value = 'admin@demo.com';
        passwordInput.value = 'admin123';
        courseApp.handleLogin();
    }
};

// Quick demo login function
window.demoLogin = function() {
    console.log('🎭 Demo login initiated');
    if (!courseApp) {
        console.error('❌ courseApp not initialized');
        return;
    }
    
    // Auto-fill demo credentials and login
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    
    if (emailInput && passwordInput) {
        emailInput.value = 'demo@example.com';
        passwordInput.value = 'demo123';
        
        // Trigger login by calling handleLogin directly
        courseApp.handleLogin();
    } else {
        console.error('❌ Login form elements not found');
        console.log('Available elements:', {
            'login-email': !!document.getElementById('login-email'),
            'login-password': !!document.getElementById('login-password')
        });
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoursePlatform;
}

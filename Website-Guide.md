# Queer Latin Dance Website - Standard Operating Procedures (SOP)

## 📁 PROJECT OVERVIEW

This is a comprehensive dance studio website with both in-person event management and online course platform capabilities. The project includes multiple interconnected systems for events, courses, payments, and administration.

## 🗂️ FILE STRUCTURE & FUNCTION GUIDE

### 📄 **ROOT HTML FILES**

#### `index.html`
- **Purpose**: Main homepage/landing page
- **Function**: Website entry point with navigation to all features
- **How to Use**: Primary visitor destination, showcases studio offerings
- **Dependencies**: `style.css`, `script.js`

#### `about.html`
- **Purpose**: About page for studio and instructors
- **Function**: Displays studio story, mission, instructor bios
- **How to Use**: Static content page, update with studio information

#### `contact.html`
- **Purpose**: Contact information and inquiry form
- **Function**: Displays contact details, location, inquiry form
- **How to Use**: Update contact info, customize form fields

#### `gallery.html`
- **Purpose**: Photo gallery of events and classes
- **Function**: Dynamic photo galleries organized by events
- **How to Use**: Photos auto-generated from `images/` folders
- **Dependencies**: `build-gallery.js`, `generated-galleries.js`

---

### 🎓 **COURSE PLATFORM FILES**

#### `courses.html`
- **Purpose**: Online course platform interface
- **Function**: Complete LMS with authentication, course browsing, video player
- **How to Use**: 
  - Students: Register → Browse → Purchase → Watch
  - Admins: Login → Manage courses → Upload videos
- **Dependencies**: `course-app.js`, `course-styles.css`
- **Key Features**:
  - User authentication system
  - Course cards with admin controls
  - Video player with progress tracking
  - Payment integration
  - Admin panel for course management

#### `course-app.js` 
- **Purpose**: Main application logic for course platform
- **Function**: Handles all course platform functionality
- **How to Use**: 
  - Core class: `CoursePlatform`
  - Auto-initializes on page load
  - Admin functions require admin email
- **Key Components**:
  - Authentication system (login/register)
  - Course management (view/edit/upload)
  - Payment processing
  - Video player with security
  - Admin panel functionality
  - Local storage management

#### `course-styles.css`
- **Purpose**: Styling for course platform
- **Function**: All CSS for courses.html interface
- **How to Use**: Modify colors, layouts, responsive design
- **Admin/Student View Separation**:
  - **JavaScript Logic**: `createCourseCard()` generates different HTML based on `isAdmin()`
  - **CSS Classes**: Admin-specific classes like `.admin-badge`, `.admin-footer`, `.btn-admin`
  - **Dynamic Hiding**: JavaScript hides/shows sections via `style.display` based on admin status
- **Key Styles**:
  - Course cards (student vs admin views)
  - Video player interface
  - Payment modals
  - Admin panel styling
  - Authentication forms

### 🎪 **EVENT MANAGEMENT FILES**

#### `Events.html` / `all-events.html`
- **Purpose**: Event listings and management
- **Function**: Display upcoming and past events
- **How to Use**: Events loaded from `events-data.json`
- **Dependencies**: `events-data.json`

#### `events-data.json`
- **Purpose**: Event database
- **Function**: Stores all event information
- **How to Use**: 
  - Add new events with: title, date, description, image, etc.
  - Update existing events
  - Control event visibility with status

#### `event-invite.html`
- **Purpose**: Event RSVP and registration page
- **Function**: Event-specific registration with payment
- **How to Use**: Link from event listings for registration

#### `event-manager.html`
- **Purpose**: Admin tool for event management
- **Function**: Create, edit, delete events
- **How to Use**: Admin interface to manage `events-data.json`

### 📚 **LESSON/CLASS FILES**

#### `lessons.html`
- **Purpose**: Class schedule and lesson listings
- **Function**: Display upcoming classes, series, and workshops
- **How to Use**: Shows classes from `lessons-data.json`
- **Dependencies**: `lessons-data.json`

#### `lessons-data.json`
- **Purpose**: Class/lesson database
- **Function**: Stores class schedules, pricing, descriptions
- **How to Use**: 
  - Update class schedules
  - Modify pricing and descriptions
  - Control class availability
- **Structure**:
  - `upcoming`: Active classes
  - `coming_soon`: Future classes
  - `previous`: Past classes

#### `4weekseries1.html` / `4weekseries2.html`
- **Purpose**: Specific course landing pages
- **Function**: Detailed course information and registration
- **How to Use**: Linked from lesson listings for course details

#### `dropin.html`
- **Purpose**: Drop-in class information
- **Function**: Info about casual classes and pricing
- **How to Use**: Update drop-in class details and pricing

#### `privates.html`
- **Purpose**: Private lesson booking information
- **Function**: Private lesson pricing and booking details
- **How to Use**: Update private lesson rates and availability

---

### 💳 **PAYMENT & ADMIN FILES**

#### `payment1.html`
- **Purpose**: Payment processing page
- **Function**: Handles course and event payments
- **How to Use**: 
  - Accepts Zelle, Venmo, PayPal, Stripe
  - Sends confirmation emails
  - Logs to Google Sheets
- **Dependencies**: Backend API for processing

#### `admin.html`
- **Purpose**: Admin dashboard for website management
- **Function**: Comprehensive admin control panel
- **How to Use**: Admin login required for access
- **Features**:
  - Event management
  - Payment review
  - User management
  - Content updates

#### `content-manager.html`
- **Purpose**: Content management interface
- **Function**: Edit website content without coding
- **How to Use**: Update text, images, and data files through UI

#### `pricing-admin.html`
- **Purpose**: Dynamic pricing management
- **Function**: Update course and event pricing
- **How to Use**: Admin tool to modify `pricing-config.json`

#### `pricing-config.json`
- **Purpose**: Centralized pricing database
- **Function**: Stores all pricing for courses and events
- **How to Use**: Update prices, discount codes, special offers

---

### 🛠️ **UTILITY & SUPPORT FILES**

#### `script.js`
- **Purpose**: General website JavaScript
- **Function**: Homepage functionality, navigation, utilities
- **How to Use**: Add global JavaScript functions here

#### `style.css` / `style_organized.css`
- **Purpose**: Main website styling
- **Function**: CSS for all non-course pages
- **How to Use**: Modify website appearance, colors, layouts

#### `build-gallery.js`
- **Purpose**: Photo gallery generation script
- **Function**: Scans image folders and creates gallery data
- **How to Use**: Run to update photo galleries
- **Command**: `node build-gallery.js`

#### `generated-galleries.js`
- **Purpose**: Auto-generated gallery data
- **Function**: Contains photo gallery configuration
- **How to Use**: Auto-updated by `build-gallery.js`

#### `update-all-events.js`
- **Purpose**: Event data maintenance script
- **Function**: Updates and cleans event data
- **How to Use**: Run periodically to maintain event database

---

### 🖼️ **ASSETS & MEDIA**

#### `images/` Directory Structure:
```
images/
├── home/                    # Homepage images
├── about/                   # About page images  
├── lessons/                 # Class/lesson flyers
├── eventpage/               # Event promotional images
├── icons/                   # Website icons and logos
├── business-logos/          # Partner/sponsor logos
├── logos/                   # Studio logos
├── [Event Folders]/         # Event-specific photo galleries
└── [Individual Images]      # Misc promotional images
```

#### `fonts/` Directory:
- **Purpose**: Custom web fonts
- **Function**: Typography for website branding
- **Contents**: Cherry Bomb One, Lilita One, Nunito, Passion One, Signika

#### `videos/` Directory:
- **Purpose**: Course video storage
- **Function**: Organized by course for video lessons
- **Structure**:
  ```
  videos/
  ├── salsa-fundamentals/
  ├── bachata/
  ├── bachata-sensual/
  └── advanced-salsa/
  ```

#### `downloads/` Directory:
- **Purpose**: Downloadable course materials
- **Function**: Offline course packages (future feature)
- **Contents**: `COURSE_DOWNLOAD_GUIDE.md`

---

### 🔧 **BACKEND & API**

#### `backend/` Directory Contents:

##### `server.js`
- **Purpose**: Local development server
- **Function**: Node.js server for development
- **How to Use**: `npm start` or `node server.js`

##### `cloudflare-worker.js`
- **Purpose**: Production API backend
- **Function**: Handles payments, emails, data processing
- **How to Use**: Deploy to Cloudflare Workers
- **Features**:
  - Payment form processing
  - Email notifications
  - Google Sheets integration
  - CORS handling

##### `google-apps-script-deduplication.js`
- **Purpose**: Google Sheets automation
- **Function**: Processes form submissions, prevents duplicates
- **How to Use**: Deploy to Google Apps Script
- **Features**:
  - Form data processing
  - Duplicate prevention
  - Email automation
  - Data validation

##### Configuration Files:
- `package.json` / `package-cloudflare.json`: Dependencies
- `wrangler.toml`: Cloudflare deployment config
- `*.md` files: Setup and deployment guides

---

### 📋 **TEST & DEVELOPMENT FILES**

#### Test Pages:
- `test-admin.html`: Admin panel testing
- `test-basic.html`: Basic functionality tests
- `test-course-app.html`: Course platform testing
- `test-payment.html`: Payment system testing
- `email-test.html`: Email functionality testing

#### Offline Templates:
- `offline-course-template.html`: Offline course player template
- `courses-simple.html`: Simplified course interface

---

### 📖 **DOCUMENTATION FILES**

#### Setup & Deployment:
- `DEPLOYMENT_GUIDE.md`: Production deployment instructions
- `CLOUDFLARE_DEPLOYMENT.md`: Cloudflare-specific setup
- `COURSE_ACCESS_SETUP.md`: Course platform configuration
- `EMAIL_SETUP_GUIDE.md`: Email system setup
- `VIDEO_UPLOAD_GUIDE.md`: Video management guide

#### User Guides:
- `ADMIN_DEMO_GUIDE.md`: Admin panel walkthrough
- `ADMIN_TEST_GUIDE.md`: Admin testing procedures  
- `CONTENT_MANAGER_GUIDE.md`: Content management instructions
- `COURSE_DOWNLOAD_GUIDE.md`: Offline course setup

#### Technical Docs:
- `DIY_CDN_ANALYSIS.md`: Content delivery network analysis
- `DUPLICATE_PREVENTION_SOLUTION.md`: Data integrity solutions
- `QUICK_EMAIL_FIX.md`: Email troubleshooting

---

## 🔄 **COMMON WORKFLOWS**

### Adding New Course:
1. Edit course object in `course-app.js`
2. Add course videos to `videos/[course-name]/`
3. Update course images in `images/lessons/`
4. Test admin upload functionality
5. Configure pricing in admin panel

### Managing Events:
1. Update `events-data.json` with new events
2. Add event images to `images/eventpage/`
3. Use `event-manager.html` for admin management
4. Create event photo galleries in `images/[event-name]/`

### Payment Processing:
1. Student submits payment via `payment1.html`
2. Data sent to Cloudflare Worker backend
3. Emails sent to student and admin
4. Data logged to Google Sheets
5. Admin reviews in admin panel
6. Access granted via admin controls

### Content Updates:
1. Use `content-manager.html` for non-technical updates
2. Edit JSON files for data changes
3. Modify HTML files for structural changes
4. Update CSS for styling changes
5. Use admin panels for routine management

---

## 🚨 **EMERGENCY PROCEDURES**

### Site Down:
1. Check Cloudflare Worker status
2. Verify Google Sheets API connectivity
3. Check domain DNS settings
4. Review error logs in Cloudflare dashboard

### Payment Issues:
1. Check backend API endpoints
2. Verify Google Apps Script deployment
3. Test email delivery system
4. Review Google Sheets integration

### Course Access Problems:
1. Check admin panel functionality
2. Verify Google Sheets data integrity
3. Test authentication system
4. Review video hosting status

## 🎯 **BEST PRACTICES**

### Development:
- Test locally before deployment
- Use git for version control
- Document all changes
- Backup data regularly

### Content Management:
- Use admin panels when available
- Keep images optimized
- Maintain consistent naming conventions
- Update documentation after changes

### Security:
- Regularly update admin credentials
- Monitor for unauthorized access
- Keep backups of configuration files
- Review access logs periodically

---

*This SOP covers the complete Queer Latin Dance website ecosystem. For specific technical details, refer to the individual documentation files listed above.*

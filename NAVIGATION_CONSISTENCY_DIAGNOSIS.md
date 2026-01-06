# Navigation Bar Consistency Issues - Diagnosis

## 🔍 Issues Found

### 1. **index.html** ✅ CORRECT
```html
<header>
  <a href="index.html">
    <img src="images/logos/logo1.png" alt="Queer Latin Dance SD Logo" class="logo1" />
  </a>
  <nav>
    <a href="team.html">Team</a>
    <a href="Events.html">Events</a>
    <a href="gallery.html">Gallery</a> 
    <a href="directory.html">Directory</a>
    <a href="lessons.html">Lessons</a>
    <a href="book-us.html">Book Us</a>
  </nav>
  <button class="mobile-nav-toggle" aria-label="Toggle navigation">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>
```
**Status**: ✅ Perfect structure

---

### 2. **team.html** ❌ ERRORS
```html
<header>
  <a href="index.html">
    <img src="images/logos/logo1.png" alt="Queer Latin Dance SD Logo" class="logo1" />
  </a>
  <nav>
    <a href="team.html">Team</a>
    <a href="Events.html">Events</a>
    <a href="gallery.html">Gallery</a>
    <a href="directory.html">Directory</a>
    <a href="lessons.html">Lessons</a>
    <a href="book-us.html">Book Us</a>
    </div>   <!-- ❌ EXTRA CLOSING DIV TAG -->
  </nav>
```
**Problems**:
- Extra `</div>` closing tag inside `<nav>`
- Extra `</div>` tags in mobile menu
- Duplicate `</header>` tag

---

### 3. **Events.html** ❌ ERRORS
```html
<header>
  <a href="index.html">
    <img src="images/logos/logo1.png" alt="Queer Latin Dance SD Logo" class="logo1" />
    <!-- ❌ MISSING </a> CLOSING TAG -->
  <nav>
    <a href="team.html">Team</a>
    ...
  </nav>
```
**Problems**:
- Missing `</a>` closing tag for logo link
- Poor indentation
- Duplicate `</header>` tag

---

### 4. **gallery.html** ✅ CORRECT
```html
<header>
  <a href="index.html">
    <img src="images/logos/logo1.png" alt="Queer Latin Dance SD Logo" class="logo1" />
  </a>
  <nav>
    ...
  </nav>
```
**Status**: ✅ Correct structure (but has duplicate `</header>`)

---

### 5. **directory.html** ✅ CORRECT
```html
<header>
  <a href="index.html">
    <img src="images/logos/logo1.png" alt="Queer Latin Dance SD Logo" class="logo1" />
  </a>
  <nav>
    ...
  </nav>
```
**Status**: ✅ Perfect structure

---

### 6. **lessons.html** ⚠️ MINOR ISSUE
```html
<header>
  <a href="index.html">
    <img src="images/logos/logo1.png" alt="Queer Latin Dance SD Logo" class="logo1" />
  </a>
  <nav>
    <a href="team.html">Team</a>  <!-- Good -->
```
BUT in mobile menu:
```html
<a href="Team.html">Team</a>  <!-- ❌ Capital T in Team.html -->
```
**Problem**: Inconsistent capitalization in mobile menu (`Team.html` vs `team.html`)

---

## 📊 Summary of Issues

| Page | Missing Tags | Extra Tags | Case Issues | Status |
|------|-------------|-----------|-------------|---------|
| index.html | None | None | None | ✅ Perfect |
| team.html | None | `</div>` x3, `</header>` x1 | None | ❌ Needs Fix |
| Events.html | `</a>` | `</header>` x1 | None | ❌ Needs Fix |
| gallery.html | None | `</header>` x1 | None | ⚠️ Minor Fix |
| directory.html | None | None | None | ✅ Perfect |
| lessons.html | None | None | `Team.html` | ⚠️ Minor Fix |

---

## 🔧 Required Fixes

### team.html
- Remove extra `</div>` tag inside desktop nav
- Remove extra `</div>` tags in mobile menu
- Remove duplicate `</header>` tag

### Events.html
- Add missing `</a>` tag after logo
- Fix indentation
- Remove duplicate `</header>` tag

### gallery.html
- Remove duplicate `</header>` tag

### lessons.html
- Fix case: change `Team.html` to `team.html` in mobile menu

---

## ✅ Standard Navigation Template

All pages should use this exact structure:

```html
<header>
  <a href="index.html">
    <img src="images/logos/logo1.png" alt="Queer Latin Dance SD Logo" class="logo1" />
  </a>
  <!-- Desktop Navigation -->
  <nav>
    <a href="team.html">Team</a>
    <a href="Events.html">Events</a>
    <a href="gallery.html">Gallery</a>
    <a href="directory.html">Directory</a>
    <a href="lessons.html">Lessons</a>
    <a href="book-us.html">Book Us</a>
  </nav>
  <!-- Mobile Navigation Toggle -->
  <button class="mobile-nav-toggle" aria-label="Toggle navigation">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<!-- Mobile Navigation Menu -->
<div class="mobile-nav-menu">
  <nav>
    <a href="team.html">Team</a>
    <a href="Events.html">Events</a>
    <a href="gallery.html">Gallery</a>
    <a href="directory.html">Directory</a>
    <a href="lessons.html">Lessons</a>
    <a href="book-us.html">Book Us</a>
  </nav>
</div>
```

---

## 🎯 Impact

These HTML errors can cause:
1. **Layout issues**: Extra/missing tags break CSS styling
2. **Inconsistent sizing**: Malformed HTML affects header height
3. **Browser rendering differences**: Different browsers handle errors differently
4. **Accessibility problems**: Screen readers get confused
5. **JavaScript errors**: Mobile menu toggle may not work properly

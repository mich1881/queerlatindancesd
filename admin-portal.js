// ══════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════
const WORKER_URL = 'https://restless-feather-b6a9.michf18.workers.dev';
const VIDEO_WORKER_URL ='https://qldsd-video-uploads.michf18.workers.dev';
let adminToken = localStorage.getItem('adminToken') || '';
let allRegistrations = [];
// ══════════════════════════════════════════
// LOGIN / LOGOUT
// ══════════════════════════════════════════
async function doLogin() {
  const pw = document.getElementById('passwordInput').value;
  const errEl = document.getElementById('lockError');
  errEl.textContent = '';
  if (!pw) { errEl.textContent = 'Please enter a password.'; return; }

  try {
    const res = await fetch(`${WORKER_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    const data = await res.json();
    if (data.success) {
      adminToken = data.token;
      localStorage.setItem('adminToken', adminToken);
      document.getElementById('lockScreen').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      loadRegistrations();
    } else {
      errEl.textContent = '❌ Wrong password. Try again.';
      document.getElementById('passwordInput').value = '';
    }
  } catch (err) {
    errEl.textContent = '⚠️ Connection error. Make sure the Worker is deployed.';
  }
}

function signOut() {
  adminToken = '';
  localStorage.removeItem('adminToken');
  document.getElementById('app').style.display = 'none';
  document.getElementById('lockScreen').style.display = 'flex';
  document.getElementById('passwordInput').value = '';
}

// Auto-login if token exists in localStorage
if (adminToken) {
  document.getElementById('lockScreen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  // loadRegistrations();
  // loadOnlineStudents();
  // loadVideoLibrary();
}

// ══════════════════════════════════════════
// TABS
// ══════════════════════════════════════════

let compactView = true;
function toggleCompactView() {

  compactView = !compactView;

  document.getElementById('compactToggleBtn').textContent =
    compactView
      ? '📋 Detailed View'
      : '📱 Compact View';

  renderAttendance();
}

// ══════════════════════════════════════════
// LOAD REGISTRATIONS FROM WORKER
// ══════════════════════════════════════════
async function loadRegistrations() {
  try {
    const res = await fetch(`${WORKER_URL}/api/admin/registrations`, {
      headers: { 'Authorization': 'Bearer ' + adminToken }
    });
    if (res.status === 401) { signOut(); return; }
    allRegistrations = await res.json();
    // Sort newest first
    allRegistrations.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    renderPending();
    renderAttendance();
    renderStats();
  } catch (err) {
    document.getElementById('pendingList').innerHTML = `<div class="empty">⚠️ Could not load registrations. Is the Worker deployed?</div>`;
  }
}

// ══════════════════════════════════════════
// STATS
// ══════════════════════════════════════════
function renderStats() {
  const pending = allRegistrations.filter(r => r.status === 'pending').length;
  const verified = allRegistrations.filter(r => r.status === 'verified').length;
  const total = allRegistrations.length;
  document.getElementById('pendingStats').innerHTML = `
    <div class="stat-box"><div class="num">${total}</div><div class="lbl">Total Registrations</div></div>
    <div class="stat-box"><div class="num" style="color:#f39c12">${pending}</div><div class="lbl">Awaiting Verification</div></div>
    <div class="stat-box"><div class="num" style="color:#27ae60">${verified}</div><div class="lbl">Verified & Active</div></div>
  `;
}

// ══════════════════════════════════════════
// TAB 1: PENDING REGISTRATIONS
// ══════════════════════════════════════════
function renderPending() {
  const q = (document.getElementById('pendingSearch').value || '').toLowerCase();
  const filter = document.getElementById('pendingFilter').value;

  let regs = allRegistrations.filter(r => {
    const matchQ = !q || `${r.firstName} ${r.lastName} ${r.email} ${r.series} ${r.seriesKey}`.toLowerCase().includes(q);
    const matchF = filter === 'all' || r.status === filter;
    return matchQ && matchF;
  });

  document.getElementById('pendingCount').textContent = `${regs.length} shown`;

  if (!regs.length) {
    document.getElementById('pendingList').innerHTML = '<div class="empty">No registrations found.</div>';
    return;
  }

  document.getElementById('pendingList').innerHTML = regs.map(r => pendingCard(r)).join('');
}

function pendingCard(r) {
  const date = r.submittedAt ? new Date(r.submittedAt).toLocaleString() : '—';
  const badgeCls = r.status === 'verified' ? 'verified' : 'pending';
  const badgeLabel = r.status === 'verified' ? '✅ Verified' : '⏳ Pending';

  // Credit options based on series type
  const creditOptions = [1,2,3,4,5,6,7,8].map(n => `<option value="${n}">${n} credits</option>`).join('');

  const verifyBlock = r.status === 'pending' ? `
  <div class="credits-selector">
    <label>Assign credits:</label>
    <select id="credits-${r.id}">
      <option value="4">4 credits (4-week)</option>
      <option value="8">8 credits (8-week)</option>
      ${creditOptions}
    </select>
  </div>

  <div class="actions">
    <button class="btn btn-verify"
      onclick="event.stopPropagation(); verifyPayment('${r.id}')">
      ✅ Verify
    </button>

    <button class="btn btn-secondary"
      onclick="event.stopPropagation(); editRegistration('${r.id}')">
      Edit
    </button>

    <button class="btn btn-danger"
      onclick="event.stopPropagation(); deleteRegistration('${r.id}')">
      Delete
    </button>
  </div>
` : `
  <div class="actions">

    <span style="color:#27ae60;font-size:0.8rem;">
      ✅ Payment verified ${r.creditsTotal} credits
    </span>

    <button class="btn btn-danger"
      onclick="event.stopPropagation(); deleteRegistration('${r.id}')">
      🗑️ Delete
    </button>

  </div>
`;

  return `
    <div class="reg-card ${r.status}" id="regcard-${r.id}" ondblclick="editRegistration('${r.id}')">
      <div class="reg-header">
        <div>
          <div class="reg-name">${r.firstName} ${r.lastName}</div>
          <div class="reg-series">${r.series || '—'}</div>
          <div class="reg-series">${r.seriesKey || '—'}</div>
          <div class="reg-detail">📧 ${r.email}${r.phone ? ' · 📞 ' + r.phone : ''}${r.pronouns ? ' · ' + r.pronouns : ''}${r.role ? ' · ' + r.role : ''}</div>
          <div class="reg-detail">💰 ${r.amount || '—'} via ${r.paymentMethod || '—'} · Submitted: ${date}</div>
        </div>
        <span class="badge ${badgeCls}">${badgeLabel}</span>
      </div>
      ${verifyBlock}
    </div>
  `;
}

async function verifyPayment(regId) {
  const selectEl = document.getElementById('credits-' + regId);
  const credits = selectEl ? parseInt(selectEl.value) : 4;

  try {
    const res = await fetch(`${WORKER_URL}/api/admin/verify-payment`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + adminToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ regId, credits })
    });

    const data = await res.json();

    if (data.success) {
      await loadRegistrations(); // 🔥 THIS is what refreshes Pending + Verified
      alert(`✅ Payment verified! ${credits} credits assigned.`);
    } else {
      alert('❌ Error: ' + (data.error || 'Unknown error'));
    }

  } catch (err) {
    alert('❌ Network error: ' + err.message);
  }
}

async function quickAddRegistration() {

  const firstName = prompt("First name:");
  if (!firstName) return;

  const lastName = prompt("Last name:");
  if (!lastName) return;

  const email = prompt("Email:");
  if (!email) return;

  const series = prompt(
    "Series (4 Week, 8 Week, Drop-in, Private):",
    "4 Week"
  );

  const seriesKey = prompt(
    "Series Key:",
    ""
  );

  try {

    const res = await fetch(
      `${WORKER_URL}/api/admin/manual-registration`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + adminToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          series,
          seriesKey,
          status: 'pending'
        })
      }
    );

    const data = await res.json();

    if (data.success) {
      await loadRegistrations();
      alert("✅ Registration added");
    } else {
      alert(data.error || "Failed");
    }

  } catch (err) {
    alert(err.message);
  }
}

// ══════════════════════════════════════════
// TAB 2: ATTENDANCE & CREDITS
// ══════════════════════════════════════════
// function renderAttendance() {
//   const q = (document.getElementById('attendSearch').value || '').toLowerCase();
//   const seriesFilter = document.getElementById('seriesFilter').value;

//   let regs = allRegistrations.filter(r => {
//     if (r.status !== 'verified') return false;
//     const matchQ = !q || `${r.firstName} ${r.lastName} ${r.email} ${r.series} ${r.seriesKey}`.toLowerCase().includes(q);
//     const matchS = seriesFilter === 'all' || (r.series || '').includes(seriesFilter);
//     const matchSK = seriesFilter === 'all' || (r.seriesKey || '').includes(seriesFilter);
//     return matchQ && matchS && matchSK;
//   });

//   document.getElementById('attendCount').textContent = `${regs.length} enrolled`;
//   if (!regs.length) {
//     document.getElementById('attendanceList').innerHTML = '<div class="empty">No verified students yet. Verify payments first in the Pending tab.</div>';
//     return;
//   }
//   document.getElementById('attendanceList').innerHTML = regs.map(r => attendanceCard(r)).join('');
// }

// ══════════════════════════════════════════
// SCHEDULE DATA / PAST STUDENT LOGIC
// ══════════════════════════════════════════

let scheduleData = {};

async function loadScheduleData() {
  try {
    const res = await fetch("calendar-data.json");

    if (!res.ok) {
      throw new Error("Could not load calendar-data.json");
    }

    scheduleData = await res.json();

    console.log("✅ Schedule data loaded");

  } catch (err) {
    console.error("❌ Schedule load error:", err);
  }
}


function getSeriesExpiration(seriesKey) {

  if (!seriesKey) return null;

  const series = scheduleData[seriesKey];

  if (!series) {
    console.log("Missing schedule key:", seriesKey);
    return null;
  }


  if (!Array.isArray(series.dates)) {
    return null;
  }


  const lastDate = series.dates[series.dates.length - 1];

  if (!lastDate) {
    return null;
  }


  const [month, day] = lastDate.split("/");


  return new Date(
    series.year,
    month - 1,
    day,
    23,
    59,
    59
  );
}


function isPastStudent(student) {

  // Condition 1: No credits left = past student
  if (Number(student.creditsRemaining) === 0) {
    return true;
  }

  // Condition 2: Expired series = past student
  const expiration = getSeriesExpiration(student.seriesKey);

  // No expiration date available = keep active
  if (!expiration) {
    return false;
  }

  return new Date() > expiration;
}

function renderAttendance() {

  const q = (document.getElementById('attendSearch').value || '').toLowerCase();
  const seriesFilter = document.getElementById('seriesFilter').value;

  const activeRegs = [];
  const pastRegs = [];

  allRegistrations
    .filter(r => r.status === "verified")
    .forEach(r => {

      const text = `
        ${r.firstName || ""}
        ${r.lastName || ""}
        ${r.email || ""}
        ${r.series || ""}
        ${r.seriesKey || ""}
      `.toLowerCase();

      const matchQ = !q || text.includes(q);

      const matchSeries =
        seriesFilter === "all" ||
        (r.series || "").includes(seriesFilter) ||
        (r.seriesKey || "").includes(seriesFilter);


      if (!matchQ || !matchSeries) return;


      if (isPastStudent(r)) {
        pastRegs.push(r);
      } else {
        activeRegs.push(r);
      }

    });


  document.getElementById("attendCount").textContent =
    `${activeRegs.length} enrolled`;


  document.getElementById("attendanceList").innerHTML =
    activeRegs.length
      ? activeRegs.map(r => attendanceCard(r)).join("")
      : `<div class="empty">No active students.</div>`;


  document.getElementById("pastStudentList").innerHTML =
    pastRegs.length
      ? pastRegs.map(r => attendanceCard(r)).join("")
      : `<div class="empty">No past students.</div>`;
}

function attendanceCard(r) {
  const total = r.creditsTotal || 0;
  const remaining = r.creditsRemaining || 0;
  const used = total - remaining;

  // Build credit dots
  const dots = Array.from({ length: total }, (_, i) => {
    const isUsed = i < used;
    return `<div class="credit-dot ${isUsed ? 'used' : ''}" title="${isUsed ? 'Class attended' : 'Credit remaining'}">${isUsed ? '✓' : (total - i)}</div>`;
  }).join('');

  // Attendance log
  const log = (r.attendance || []).map((a, i) =>
    `<div class="attendance-entry">Class ${i + 1}: ${new Date(a.date).toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}</div>`
  ).join('');

  const noCredits = remaining <= 0;
if (compactView) {

  return `
    <div class="reg-card compact-attendance">
      <div class="compact-row">
        <div class="compact-name">
          ${r.firstName} ${r.lastName}
        </div>
        <div class="compact-credits ${noCredits ? 'zero' : ''}">
          ${remaining}
        </div>
        <button
          class="btn btn-checkin"
          onclick="doCheckin('${r.id}')"
          ${noCredits ? 'disabled' : ''}>
          ✓
        </button>
      </div>
    </div>
  `;
}
  return `
    <div class="reg-card verified" id="attendcard-${r.id}">
      <div class="reg-header">
        <div>
          <div class="reg-name">${r.firstName} ${r.lastName}</div>
          <div class="reg-series">${r.series || '—'}</div>
          <div class="reg-seriesKey">${r.seriesKey || '—'}</div>
          <div class="reg-detail">📧 ${r.email}${r.role ? ' · ' + r.role : ''}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:1.4rem;font-weight:550;color:${noCredits ? '#e74c3c' : '#27ae60'}">${remaining}</div>
          <div style="font-size:0.75rem;color:#888;">credits left</div>
        </div>
      </div>

      <div class="credits-display">
        ${dots}
        <span class="credit-label">${used}/${total} classes attended</span>
      </div>

        ${log ? `
          <button
            id="attendance-btn-${r.id}"
            class="btn btn-attendance"
            onclick="toggleAttendanceLog('${r.id}')">
            📋 Attendance Log
          </button>

          <div
            id="attendance-log-${r.id}"
            class="attendance-log"
            style="display:none;">
              <h4>Attendance log:</h4>
              ${log}
          </div>
        ` : ''}

      <div class="actions">
        <button class="btn btn-checkin" onclick="doCheckin('${r.id}')" ${noCredits ? 'disabled' : ''}>
          ${noCredits ? '🚫 No Credits Left' : 'Check-in (-1)'}
        </button>
        <button class="btn btn-checkin" onclick="addCredits('${r.id}')">
            + Add Credits
        </button>
        ${used > 0 ? `<button class="btn btn-undo" onclick="doUndo('${r.id}')">↩️ Undo Last Check-in</button>` : ''}
        </div>
    </div>
  `;
}

async function doCheckin(regId) {
  const r = allRegistrations.find(x => x.id === regId);
  if (!r) return;
  if (!confirm(`Check in ${r.firstName} ${r.lastName}? This will deduct 1 credit (${r.creditsRemaining} → ${r.creditsRemaining - 1}).`)) return;

  const res = await fetch(`${WORKER_URL}/api/admin/checkin-credit`, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + adminToken, 'Content-Type': 'application/json' },
    body: JSON.stringify({ regId })
  });
  const data = await res.json();
  if (data.success) {
    await loadRegistrations();
    alert(`✅ ${r.firstName} ${r.lastName} checked in! Credits remaining: ${data.creditsRemaining}`);
  } else {
    alert('❌ Error: ' + (data.error || 'Unknown error'));
  }
}

async function doUndo(regId) {
  const r = allRegistrations.find(x => x.id === regId);
  if (!r) return;
  if (!confirm(`Undo last check-in for ${r.firstName} ${r.lastName}? This will add 1 credit back.`)) return;

  const res = await fetch(`${WORKER_URL}/api/admin/undo-checkin`, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + adminToken, 'Content-Type': 'application/json' },
    body: JSON.stringify({ regId })
  });
  const data = await res.json();
  if (data.success) {
    await loadRegistrations();
    alert(`↩️ Check-in undone. Credits remaining: ${data.creditsRemaining}`);
  } else {
    alert('❌ Error: ' + (data.error || 'Unknown error'));
  }

}

// ══════════════════════════════════════════
// TAB 3: ONLINE COURSE ACCESS
// ══════════════════════════════════════════
const COURSES_CONFIG = [
  { id: 'recap-library',       label: 'In-Person Recap Videos' },
  { id: 'salsa-fundamentals',     label: 'Salsa Fundamentals' },
  { id: 'bachata-fundamentals',   label: 'Bachata Fundamentals' },
  { id: 'all-access',         label: 'All Access' },
];

async function grantOnlineAccess() {
  const email = document.getElementById('grantEmail').value.trim().toLowerCase();
  const courseId = document.getElementById('grantCourse').value;

  if (!email || !courseId) {
    alert('Please enter an email and select a course.');
    return;
  }

  // const token = sessionStorage.getItem('adminToken');
  const token = localStorage.getItem('adminToken');
  if (!token) {
    alert('You are NOT logged into admin.');
    return;
  }

  try {
    const res = await fetch(`${WORKER_URL}/api/admin/grant-access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        email,
        courseId,
        action: 'grant'
      })
    });

    const data = await res.json();

    if (data.success) {
      alert(`✅ Access granted to ${email}`);
      document.getElementById('grantEmail').value = '';
      await loadOnlineStudents(); // refresh list
    } else {
      alert('❌ Error: ' + (data.error || 'Unknown'));
    }

  } catch (err) {
    alert('❌ Connection error: ' + err.message);
  }
}
async function revokeOnlineAccess(email, courseId) {
  const courseName = COURSES_CONFIG.find(c => c.id === courseId)?.label || courseId;
  if (!confirm(`Revoke access for ${email} from "${courseName}"?`)) return;

  try {
    const res = await fetch(`${WORKER_URL}/api/admin/grant-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
      body: JSON.stringify({ email, courseId, action: 'revoke' })
    });
    const data = await res.json();
    if (data.success) {
      alert(`✅ Access revoked for ${email}`);
      await loadOnlineStudents();
    } else {
      alert('❌ Error: ' + (data.error || 'Unknown'));
    }
  } catch (err) {
    alert('❌ Connection error: ' + err.message);
  }
}
function renderOnlineStudents(users) {
  const listEl = document.getElementById('onlineStudentsList');

  // Build courseId → [students] map
  const courseMap = {};
  COURSES_CONFIG.forEach(c => courseMap[c.id] = []);

  Object.entries(users).forEach(([email, userData]) => {
    (userData.ownedCourses || []).forEach(c => {
      const courseId = typeof c === 'string' ? c : c.courseId;
      const expiresAt = c.expiresAt || null;
      if (courseMap[courseId] !== undefined) {
        courseMap[courseId].push({ email, expiresAt });
      }
    });
  });
  listEl.innerHTML = COURSES_CONFIG.map(course => {
    const students = courseMap[course.id] || [];
    const rows = students.length === 0
      ? '<p style="color:#888;font-size:0.85rem;margin-top:0.5rem;">No students have access yet.</p>'
      : students.map(s => `
          <div class="online-student-card">
            <div>
              <div style="font-weight:700;color:#3a1f7a;font-size:0.9rem;">📧 ${s.email}</div>
              ${s.expiresAt ? `<div style="font-size:0.75rem;color:#888;">Expires: ${new Date(s.expiresAt).toLocaleDateString()}</div>` : ''}
            </div>
            <button class="btn btn-danger" onclick="revokeOnlineAccess('${s.email}', '${course.id}')">
              🚫 Revoke
            </button>
          </div>
        `).join('');

    return `
      <div style="background:#fff;border-radius:14px;padding:1rem 1.2rem;margin-bottom:1rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
          <h3 style="color:#4c38a6;font-size:1rem;">${course.label}</h3>
          <span style="background:#f4f0ff;color:#750ad9;padding:0.2rem 0.6rem;border-radius:10px;font-size:0.8rem;">
            ${students.length} student${students.length !== 1 ? 's' : ''}
          </span>
        </div>
        ${rows}
      </div>
    `;
  }).join('');
}
async function autoGrantInPersonStudents() {
  const inPersonStudents = allRegistrations.filter(r => r.status === 'verified');
  if (!inPersonStudents.length) { alert('No verified in-person students found.'); return; }
  if (!confirm(`Grant salsa-recap-lvl1 access to ${inPersonStudents.length} verified students?`)) return;

  let success = 0, failed = 0;
  for (const r of inPersonStudents) {
    try {
      const res = await fetch(`${WORKER_URL}/api/admin/grant-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
        body: JSON.stringify({ email: r.email.toLowerCase().trim(), courseId: 'recap-library', action: 'grant' })
      });
      const data = await res.json();
      data.success ? success++ : failed++;
    } catch { failed++; }
  }

  alert(`✅ Done! ${success} granted, ${failed} failed.`);
  await loadOnlineStudents();
}
async function adminLogin(password) {
  const res = await fetch("https://bitter-forest-4b9b.michf18.workers.dev/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });

  const data = await res.json();

  if (!data.success) {
    alert("❌ Wrong admin password");
    return;
  }

  localStorage.setItem("adminToken", data.token);

  alert("✅ Admin login successful");
  console.log("ADMIN TOKEN:", data.token);
}

//FUNCTIONS TO EDIT & DELETE
function editRegistration(regId) {

  const r = allRegistrations.find(x => x.id === regId);
  if (!r) return;

  document.getElementById("editRegId").value = r.id;

  document.getElementById("edit-firstName").value = r.firstName || "";
  document.getElementById("edit-lastName").value = r.lastName || "";
  document.getElementById("edit-email").value = r.email || "";
  document.getElementById("edit-phone").value = r.phone || "";
  document.getElementById("edit-pronouns").value = r.pronouns || "";
  document.getElementById("edit-series").value = r.series || "";
  document.getElementById("edit-seriesKey").value = r.seriesKey || "";
  document.getElementById("edit-role").value = r.role || "";
  document.getElementById("edit-amount").value = r.amount || "";
  document.getElementById("editModal").style.display = "block";
}
function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}
window.onclick = function(event) {
  const modal = document.getElementById("editModal");

  if (event.target === modal) {
    closeEditModal();
  }
}
async function saveStudentEdit() {

  const regId = document.getElementById("editRegId").value;

  const res = await fetch(
    `${WORKER_URL}/api/admin/edit-registration`,
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + adminToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        regId,

        firstName: document.getElementById("edit-firstName").value,
        lastName: document.getElementById("edit-lastName").value,
        email: document.getElementById("edit-email").value,
        phone: document.getElementById("edit-phone").value,
        pronouns: document.getElementById("edit-pronouns").value,
        series: document.getElementById("edit-series").value,
        seriesKey: document.getElementById("edit-seriesKey").value,
        role: document.getElementById("edit-role").value,
        amount: document.getElementById("edit-amount").value
      })
    }
  );

  const data = await res.json();
  if (data.success) {
    alert("✅ Registration updated!");
    closeEditModal();
    await loadRegistrations();
  } else {

    alert("❌ Update failed: " + (data.error || "Unknown error"));
    console.log(data);
  }
}
async function deleteRegistration(regId) {
  if (!confirm("Delete this registration?")) return;
  const res = await fetch(
    `${WORKER_URL}/api/admin/delete-registration`,
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + adminToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ regId })
    }
  );
  const data = await res.json();
  if (data.success) {
    await loadRegistrations();
  } else {
    alert(data.error || "Delete failed");
  }
}
// FUNCTION TO ADD CREDITS MANUALLY
async function addCredits(regId) {
  const amount = prompt("How many credits to add? (e.g. 1, 4, 8)");

  if (!amount) return;

  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${WORKER_URL}/api/admin/add-credits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      regId,
      creditsToAdd: Number(amount)
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Error adding credits");
    return;
  }

  alert("Credits added!");
  location.reload();
}

function toggleAttendanceLog(regId) {
  const logEl = document.getElementById(`attendance-log-${regId}`);
  const btnEl = document.getElementById(`attendance-btn-${regId}`);
  if (!logEl || !btnEl) return;
  const isHidden = logEl.style.display === 'none';
  logEl.style.display = isHidden ? 'block' : 'none';
  btnEl.textContent = isHidden
    ? '📋 Hide Attendance Log'
    : '📋 Show Attendance Log';
}
// ...existing code...
function switchTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  event.target.classList.add('active');
  if (name === 'online') loadOnlineStudents(); // 👈 add this line
}

// 👇 This whole function was missing — add it
async function loadOnlineStudents() {
  const listEl = document.getElementById('onlineStudentsList');
  listEl.innerHTML = '<div class="empty">Loading…</div>';

  try {
    const res = await fetch(`${WORKER_URL}/api/admin/online-students`, {
      headers: { 'Authorization': 'Bearer ' + adminToken }
    });
    if (!res.ok) {
      listEl.innerHTML = '<div class="empty">⚠️ Worker endpoint not found. Make sure you added it.</div>';
      return;
    }
    const data = await res.json();
    renderOnlineStudents(data.users || {});
  } catch (err) {
    listEl.innerHTML = `<div class="empty">⚠️ Error: ${err.message}</div>`;
  }
}

/// ═══════════════════THIS IS FOR VIDEO UPLOADS ════════════════════════
// async function uploadVideo(){
  
//     const file = document.getElementById("videoFile").files[0];
//     const title = document.getElementById("videoTitle").value.trim();
//     const courseId = document.getElementById("videoCourse").value.trim();
//     const lesson = document.getElementById("videoLesson").value.trim();
//     if(!file){
//         alert("Choose a video.");
//         return;
//     }
//     if(!courseId || !lesson || !title){
//         alert("Fill all fields.");
//         return;
//     }
//     const status = document.getElementById("uploadStatus");
//     status.innerText = "Creating upload link...";
//     try {

//         const response = await fetch(
//             `${VIDEO_WORKER_URL}/api/admin/video-upload-url`,
//             {
//                 method:"POST",
//                 headers:{
//                     "Content-Type":"application/json",
//                     "Authorization":"Bearer " + adminToken
//                 },
//                 body:JSON.stringify({
//                     filename:file.name,
//                     contentType:file.type,
//                     courseId,
//                     lesson,
//                     title
//                 })
//             }
//         );

async function uploadVideo(){
  
    const files = Array.from(
        document.getElementById("videoFiles").files
    );

    if(files.length === 0){
        alert("Choose a video(s).");
        return;
    }

    const status = document.getElementById("uploadStatus");
    const progressContainer = document.getElementById("uploadProgressContainer");
    const progressBar = document.getElementById("uploadProgressBar");
    const progressText = document.getElementById("uploadProgressText");

    progressContainer.style.display = "block";
    progressBar.style.width = "0%";
    progressText.innerText = "0%";
    status.innerText = "Creating upload link...";
    const totalVideos = files.length;
    let uploadedVideos = 0;

    try {
        for (const file of files) {
        if (file.name === ".DS_Store") continue;
        if (!file.type.startsWith("video/")) continue;

        const path = file.webkitRelativePath || file.name;
        const parts = path.split("/");

        const courseId = document.getElementById("videoCourse").value.trim();
        const lesson = document.getElementById("videoLesson").value.trim();

        const title = file.name.replace(/\.[^/.]+$/, "");

        const response = await fetch(
            `${VIDEO_WORKER_URL}/api/admin/video-upload-url`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + adminToken
                },
                body:JSON.stringify({
                    filename:file.name,
                    contentType:file.type,
                    courseId,
                    lesson,
                    title
                })
            }
        );
        const data = await response.json();
        console.log("UPLOAD URL RESPONSE:", data);
        if(!data.success){
            throw new Error(data.error);
        }
        status.innerText = `Uploading ${uploadedVideos + 1} of ${totalVideos} to R2: ${file.name}`;

        const upload = await fetch(
            data.uploadUrl,
            {
                method:"PUT",
                headers:{
                    "Content-Type":file.type
                },
                body:file
            }
        );
        if(!upload.ok){
            throw new Error("R2 upload failed");
        }
        const complete = await fetch(
          `${VIDEO_WORKER_URL}/api/admin/video-upload-complete`,
          {
              method:"POST",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer " + adminToken
              },
              body:JSON.stringify({
                  courseId,
                  lesson,
                  title,
                  filename:file.name,
                  key:data.key,
                  contentType:file.type
              })
          }
      );
      const completeData = await complete.json();
      console.log(
          "VIDEO DATABASE RESPONSE:",
          completeData
      );
      if(!completeData.success){
          throw new Error(
              "Video metadata save failed"
          );
      }
        uploadedVideos++;

        const percent = Math.round((uploadedVideos / totalVideos) * 100);

        progressBar.style.width = `${percent}%`;
        progressText.innerText = `${percent}%`;

        status.innerText =
        `✅ Uploaded ${uploadedVideos} of ${totalVideos}: ${file.name}`;
    }
    } catch(err){
        console.error(err);
        status.innerText="❌ " + err.message;

    }
}

async function uploadSingleVideo() {
    const file = document.getElementById("singleVideoFile").files[0];

    if (!file) {
        alert("Choose a video");
        return;
    }
    const courseId = document.getElementById("singleCourseId").value.trim();
    const lesson = document.getElementById("singleLesson").value.trim();
    const title = file.name.replace(/\.[^/.]+$/, "");
    try {

        const response = await fetch(
            `${VIDEO_WORKER_URL}/api/admin/video-upload-url`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + adminToken
                },
                body:JSON.stringify({
                    filename:file.name,
                    contentType:file.type,
                    courseId,
                    lesson,
                    title
                })
            }
        );

        const data = await response.json();

        if(!data.success){
            throw new Error(data.error);
        }


        const upload = await fetch(
            data.uploadUrl,
            {
                method:"PUT",
                headers:{
                    "Content-Type":file.type
                },
                body:file
            }
        );


        if(!upload.ok){
            throw new Error("R2 upload failed");
        }


        await fetch(
            `${VIDEO_WORKER_URL}/api/admin/video-upload-complete`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + adminToken
                },
                body:JSON.stringify({
                    courseId,
                    lesson,
                    title,
                    filename:file.name,
                    key:data.key,
                    contentType:file.type
                })
            }
        );


        alert("✅ Video uploaded!");

    } catch(err){
        console.error(err);
        alert("❌ " + err.message);
    }
}

async function loadVideoLibrary() {

    const response = await fetch(
        `${VIDEO_WORKER_URL}/api/admin/videos`,
        {
            headers:{
                "Authorization":"Bearer " + adminToken
            }
        }
    );


    const data = await response.json();


    console.log("Data:", data);


    const container =
    document.getElementById("videoLibrary");


    container.innerHTML = "";


    data.videos.forEach(video=>{

        console.log("Rendering:", video);

        container.innerHTML += `

        <div class="video-card">

            <h3>${video.title}</h3>

            <p>
            Course: ${video.course_id}
            </p>

            <p>
            Lesson: ${video.lesson}
            </p>

            <p>
            File: ${video.filename}
            </p>

            <button onclick="deleteVideo(${video.id}, '${video.r2_key}')">
            🗑 Delete Video
        </button>

        </div>

        `;

    });

}

// ══════════════════════════════════════════
// INITIALIZE ADMIN PORTAL
// ══════════════════════════════════════════

document.addEventListener("DOMContentLoaded", async () => {

  await loadScheduleData();

  await loadRegistrations();

  await loadVideoLibrary();

});

let pastStudentsVisible = false;

function togglePastStudents() {

  pastStudentsVisible = !pastStudentsVisible;

  const list = document.getElementById("pastStudentList");
  const btn = document.getElementById("pastToggleBtn");

  if (!list || !btn) return;

  list.style.display = pastStudentsVisible ? "block" : "none";

  btn.textContent = pastStudentsVisible
    ? "👥 Hide Past Students"
    : "👥 Show Past Students";
}

/// ═════════════════════Delete Function Front End Videos═════════════════════

async function deleteVideo(videoId, r2Key) {
    const confirmed = confirm("Are you sure you want to delete this video?");
    if (!confirmed) return;

    const response = await fetch(
        `${VIDEO_WORKER_URL}/api/admin/video-delete`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + adminToken
            },
            body: JSON.stringify({
                id: videoId,
                r2_key: r2Key
            })
        }
    );

    const data = await response.json();
    console.log("DELETE RESPONSE:", data);

    if (response.ok && data.success) {
        alert("Video deleted successfully.");
        loadVideoLibrary();
    } else {
        alert("Failed to delete video.");
    }
}


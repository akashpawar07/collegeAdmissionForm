//////////////// 1. SIDEBAR TOGGLE LOGIC //////////////////////////////
const menuBtn = document.getElementById("menubar");
const sidebar = document.getElementById("sidebar-nav");
const closeBtn = document.getElementById("close-crossbar");

if (menuBtn) {
    menuBtn.onclick = function () {
        sidebar.style.display = "flex";
        sidebar.classList.add("active");
        closeBtn.style.display = "block";
        menuBtn.style.display = "none";
    };
}

if (closeBtn) {
    closeBtn.onclick = function () {
        sidebar.classList.remove("active");
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";
        setTimeout(() => {
            if (!sidebar.classList.contains("active")) sidebar.style.display = "";
        }, 300);
    };
}

// Active Link Highlighting
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const sidebarItems = document.querySelectorAll('.sidebar-child');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href') || (item.querySelector('a') && item.querySelector('a').getAttribute('href'));
        if (href && (href === currentPath || (currentPath.includes(href) && href !== '/'))) {
            item.classList.add('active');
        }
    });
});

//////////////// 2. AUTO-FETCH DATA ON PAGE LOAD //////////////////////////////

let realStudents = [];
let fullDatabaseRawData = [];

// This event listener runs AUTOMATICALLY as soon as the DOM (HTML) loads. No clicking needed!
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('/admin-dashboard/students');

        if (!response.ok) throw new Error("Failed to fetch data");

        const dbData = await response.json();
        fullDatabaseRawData = dbData;
        // console.log("getting data: ", dbData);

        // 1. Format the database data
        realStudents = dbData.map(student => {
            return {
                rawId: student._id, // NEW: Keep the raw DB ID to look them up later
                id: student._id ? `SYCET-${student._id.toString().slice(-6).toUpperCase()}` : "N/A",
                name: `${student.firstName || ''} ${student.surname || ''}`.trim(),
                course: student.courses || "N/A",
                branch: student.branch || "N/A",
                date: student.dateOfBirth || "N/A",
                status: student.status || "Pending"
            };
        });

        // 2. Render the table and update the top stats immediately
        renderTable(realStudents);
        updateStats(realStudents);

        // 3. Setup the search bar listener
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", debouncedSearch);
        }

    } catch (error) {
        console.error("Error loading dashboard data:", error.message);
    }
});

//////////////// 3. TABLE & STATS LOGIC //////////////////////////////

function updateStats(dbData) {
    const total = dbData.length;

    const btech = dbData.filter(s => {
        if (!s.courses || s.courses === "N/A") return false;
        const normalized = s.courses.toUpperCase().replace(/[\s.]/g, '');
        return normalized.includes("BTECH");
    }).length;

    const mtech = dbData.filter(s => {
        if (!s.courses || s.courses === "N/A") return false;
        const normalized = s.courses.toUpperCase().replace(/[\s.]/g, '');
        return normalized.includes("MTECH");
    }).length;

    const mba = dbData.filter(s => {
        if (!s.courses || s.courses === "N/A") return false;
        const normalized = s.courses.toUpperCase().replace(/[\s.]/g, '');
        return normalized.includes("MBA");
    }).length;


    if (document.getElementById("totalCount")) document.getElementById("totalCount").textContent = total;
    if (document.getElementById("btechCount")) document.getElementById("btechCount").textContent = btech;
    if (document.getElementById("mtechCount")) document.getElementById("mtechCount").textContent = mtech;
    if (document.getElementById("mbaCount")) document.getElementById("mbaCount").textContent = mba;
}

//////////////// 3. TABLE & STATS LOGIC //////////////////////////////

function updateStats(data) {
    const total = data.length;

    const btech = data.filter(s => String(s.course).toUpperCase().replace(/[\s.]/g, '').includes("BTECH")).length;
    const mtech = data.filter(s => String(s.course).toUpperCase().replace(/[\s.]/g, '').includes("MTECH")).length;
    const mba = data.filter(s => String(s.course).toUpperCase().replace(/[\s.]/g, '').includes("MBA")).length;

    if (document.getElementById("totalCount")) document.getElementById("totalCount").textContent = total;
    if (document.getElementById("btechCount")) document.getElementById("btechCount").textContent = btech;
    if (document.getElementById("mtechCount")) document.getElementById("mtechCount").textContent = mtech;
    if (document.getElementById("mbaCount")) document.getElementById("mbaCount").textContent = mba;
}

function renderTable(data) {
    const tbody = document.getElementById("tableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    data.forEach(student => {
        const tr = document.createElement("tr");
        const statusClass = student.status.toLowerCase();

        tr.innerHTML = `
            <td><strong>${student.id}</strong></td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.branch}</td>
            <td>${student.date}</td>
            <td><span class="status ${statusClass}">${student.status}</span></td>
            <td><button class="action-btn" onclick="viewDetails('${student.rawId}')">View</button></td>
        `;
        tbody.appendChild(tr);
    });

    const showingCount = document.getElementById("showingCount");
    if (showingCount) showingCount.textContent = data.length;
}

//////////////// 5. MODAL / POPUP LOGIC //////////////////////////////

// Helper to safely format base64 images from MongoDB
function getImageSrc(imgObj) {
    if (!imgObj) return '/images/default-avatar.png'; // Fallback
    if (typeof imgObj === 'string') return imgObj; // If it's a direct URL

    if (imgObj.data) {
        if (typeof imgObj.data === 'string') {
            return `data:${imgObj.contentType || 'image/jpeg'};base64,${imgObj.data}`;
        }

        // If MongoDB sent it as a Buffer array
        if (imgObj.data.data) {
            let binary = '';
            const bytes = new Uint8Array(imgObj.data.data);
            const len = bytes.byteLength;

            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }

            return `data:${imgObj.contentType || 'image/jpeg'};base64,${window.btoa(binary)}`;
        }
    }
    return '/images/default-avatar.png';
}


function viewDetails(rawId) {
    const student = fullDatabaseRawData.find(s => s._id === rawId);
    if (!student) return alert("Student data not found!");

    const modal = document.getElementById('viewModal');
    const modalBody = document.getElementById('modalBody');
    const modalStatus = document.getElementById('modalStatus');

    const stat = student.status || "Pending";
    modalStatus.textContent = stat.toUpperCase();
    modalStatus.className = `status ${stat.toLowerCase()}`;

    // Notice the ACTION BUTTONS section added to the bottom of this HTML string!
    modalBody.innerHTML = `
        <div class="data-grid">
            <div class="data-item">
                <label>Full Name</label>
                <span>${student.firstName || ''} ${student.fatherName || ''} ${student.surname || ''}</span>
            </div>
            <div class="data-item">
                <label>Mother's Name</label>
                <span>${student.motherName || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Course & Branch</label>
                <span>${student.courses || 'N/A'} - ${student.branch || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Admission Through</label>
                <span>${student.addmissionThrough || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Class</label>
                <span>${student.class || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Date of Birth</label>
                <span>${student.dateOfBirth || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Gender</label>
                <span>${student.gender || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Category / Caste</label>
                <span>${student.category || 'N/A'} / ${student.caste || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Religion / Nationality</label>
                <span>${student.religion || 'N/A'} / ${student.nationality || 'Indian'}</span>
            </div>
            <div class="data-item">
                <label>ABC ID</label>
                <span>${student.abcId || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Aadhar No</label>
                <span>${student.aadharNo || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Email</label>
                <span>${student.email || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Student Contact</label>
                <span>${student.studentContact || 'N/A'}</span>
            </div>
            <div class="data-item">
                <label>Parents Contact</label>
                <span>${student.parentsContact || 'N/A'}</span>
            </div>
            <div class="data-item full-width">
                <label>Full Address</label>
                <span>${student.village || ''}, ${student.taluka || ''}, ${student.dist || ''}, ${student.state || ''} - ${student.address || ''}</span>
            </div>
        </div>

        <div class="modal-images">
            <div class="img-box">
                <label>Profile Image</label>
                <img src="${getImageSrc(student.studentProfileImage)}" alt="Profile">
            </div>
            <div class="img-box">
                <label>Signature</label>
                <img src="${getImageSrc(student.studentSign)}" alt="Signature">
            </div>
        </div>

        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid var(--border-color); display: flex; gap: 15px; justify-content: flex-end;">
            <button class="action-btn" style="background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5;" onclick="changeStudentStatus('${student._id}', 'Rejected')">
                <i class="fa-solid fa-xmark"></i> Reject
            </button>
            <button class="action-btn" style="background: #f0fdf4; color: #16a34a; border: 1px solid #86efac;" onclick="changeStudentStatus('${student._id}', 'Approved')">
                <i class="fa-solid fa-check"></i> Approve
            </button>
        </div>
    `;

    modal.classList.add('show');
}


async function changeStudentStatus(studentId, newStatus) {
    const isConfirmed = confirm(`Are you sure you want to mark this application as ${newStatus.toUpperCase()}?`);

    if (!isConfirmed) return;

    try {
        // If your routes are prefixed with /admin-dashboard in index.js, keep it like this:
        const response = await fetch(`/admin-dashboard/update-status/${studentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });
        console.log("resp-",response)

        const result = await response.json();

        if (response.ok) {
            closeModal();
            window.location.reload(); // Reloads page to show updated table instantly
        } else {
            alert("Failed to update status: " + result.message);
        }

    } catch (error) {
        console.error("Error updating student status:", error);
        alert("An error occurred while updating the status.");
    }
}



function closeModal() {
    const modal = document.getElementById('viewModal');
    modal.classList.remove('show');
}

// Close modal if user clicks on the blurry background
window.onclick = function (event) {
    const modal = document.getElementById('viewModal');
    if (event.target === modal) {
        closeModal();
    }
}

//////////////// 4. DEBOUNCE SEARCH LOGIC //////////////////////////////

function debounce(fn, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

function performSearch(event) {
    const term = event.target.value.toLowerCase();

    // Search through the real fetched data
    const filteredData = realStudents.filter(student =>
        student.name.toLowerCase().includes(term) ||
        student.id.toLowerCase().includes(term) ||
        student.course.toLowerCase().includes(term) ||
        student.branch.toLowerCase().includes(term)
    );

    renderTable(filteredData);
}

const debouncedSearch = debounce(performSearch, 700);



/// handle logout functionality ///////////////
async function handleLogout() {
    try {
        // 1. Send a POST request to match your backend route
        const response = await fetch("/logout", {
            method: "POST"
        });

        if (response.ok || response.redirected) {
            sessionStorage.clear();
            window.location.href = "/login";

        } else {
            console.log("Logout failed on the server.");
        }

    } catch (error) {
        console.log("Error while logging out:", error);
    }
}

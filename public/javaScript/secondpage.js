//////////////// SIDEBAR TOGGLE LOGIC (UPDATED) //////////////////////////////
const menuBtn = document.getElementById("menubar");
const sidebar = document.getElementById("sidebar-nav");
const closeBtn = document.getElementById("close-crossbar");

// Open logic
if (menuBtn) {
    menuBtn.onclick = function () {
        sidebar.style.display = "flex"; // Force display for mobile
        sidebar.classList.add("active");
        closeBtn.style.display = "block";
        menuBtn.style.display = "none";
    };
}

// Close logic
if (closeBtn) {
    closeBtn.onclick = function () {
        sidebar.classList.remove("active");
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";

        // Slight delay to allow CSS transform animation to finish before hiding
        setTimeout(() => {
            if (!sidebar.classList.contains("active")) {
                sidebar.style.display = "";
            }
        }, 300);
    };
}

// Function for getting current URL (Active Tab Highlighting)
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;

    // Select the links directly since they ARE the .sidebar-child now
    const sidebarItems = document.querySelectorAll('.sidebar-child');

    sidebarItems.forEach(item => {
        item.classList.remove('active'); // Clear any hardcoded active classes

        const href = item.getAttribute('href');

        // Exact match for the active page
        if (href === currentPath) {
            item.classList.add('active');
        }
    });
});


//////////////// FORM VALIDATION //////////////////////////////
const submitForm = document.getElementById("submitForm");

if (submitForm) {
    submitForm.addEventListener("submit", ((e) => {
        let studentNamee = document.getElementById("stu-name").value;
        let GuardianName = document.getElementById("parent-name").value;

        // .trim() to prevent users from just entering spaces
        if (studentNamee.trim() === "" || GuardianName.trim() === "") {
            e.preventDefault();
            alert("All fields are compulsory. Please check all necessary fields before submitting.");
        }
    }));
}


/////////////// FORM INPUT AUTO-FILL (Keep existing logic) ///////////////
const surname = sessionStorage.getItem("surname");
const firstName = sessionStorage.getItem("firstName");
const fatherName = sessionStorage.getItem("fatherName");

// Check if session data exists to avoid "null null" appearing
if (surname && firstName && fatherName) {
    const safeSetValue = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
    };

    safeSetValue("parent-name", fatherName + " " + surname);
    safeSetValue("stu-name", firstName + " " + surname);
    safeSetValue("parent-name2", fatherName + " " + surname);
    safeSetValue("stu-name2", firstName + " " + surname);
}
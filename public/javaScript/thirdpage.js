//////////////// SIDEBAR TOGGLE LOGIC (UPDATED) //////////////////////////////
const menuBtn = document.getElementById("menubar");
const sidebar = document.getElementById("sidebar-nav");
const closeBtn = document.getElementById("close-crossbar");

// Open logic
if (menuBtn) {
    menuBtn.onclick = function () {
        sidebar.classList.add("active");
        sidebar.style.display = "flex"; // Force flex for mobile
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

        // Wait for CSS slide transition to finish before hiding display
        setTimeout(() => {
            if (!sidebar.classList.contains("active")) {
                sidebar.style.display = "";
            }
        }, 300);
    };
}

// Active Link Highlighting (UPDATED)
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const sidebarItems = document.querySelectorAll('.sidebar-child');

    sidebarItems.forEach(item => {
        item.classList.remove('active');

        // Get href either directly from item (if unified HTML) or from nested <a>
        const href = item.getAttribute('href') || (item.querySelector('a') && item.querySelector('a').getAttribute('href'));

        if (href && (href === currentPath || (currentPath.includes(href) && href !== '/'))) {
            item.classList.add('active');
        }
    });
});

/////////////// FORM AUTO-FILL LOGIC (UNTOUCHED) ///////////////
// Set Date
const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const dateOfMonth = String(date.getDate()).padStart(2, '0');

const dateInput = document.getElementById('date');
if (dateInput) {
    dateInput.value = `${year}-${month}-${dateOfMonth}`;
}

// Retrieve Session Data
const surname = sessionStorage.getItem("surname") || "";
const firstName = sessionStorage.getItem("firstName") || "";
const fatherName = sessionStorage.getItem("fatherName") || "";
const village = sessionStorage.getItem("birthPalce") || "";
const tahsil = sessionStorage.getItem("tq") || "";
const district = sessionStorage.getItem("dist") || "";
const state = sessionStorage.getItem("state") || "";
const Address = sessionStorage.getItem("address") || "";

// Fill Fields
const safeSetValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
};

safeSetValue("stu-name", firstName + " " + surname);
safeSetValue("parent-name", fatherName + " " + surname);
safeSetValue("stu-name2", firstName + " " + surname);
safeSetValue("parent-name2", fatherName + " " + surname);
safeSetValue("place", "Chhatrapti Sambhajinagar");

// Fill Address
const addressEl = document.getElementById("address");
if (addressEl) {
    addressEl.value = Address;
}

/////////////// SUBMIT VALIDATION (UNTOUCHED) ///////////////
const dispBtn = document.getElementById("disp");
if (dispBtn) {
    dispBtn.addEventListener("click", function (event) {
        let fees1 = document.getElementById("fees").value.trim();
        let fees2 = document.getElementById("fees2").value.trim();
        let studentNamee = document.getElementById("stu-name").value;
        let GuardianName = document.getElementById("parent-name").value;
        let address = document.getElementById("address").value;
        let place = document.getElementById("place").value;

        if (fees1 === "" || fees2 === "" || studentNamee.trim() === "" || GuardianName.trim() === ""
            || address.trim() === "") {

            alert("All fields are compulsary, please fill form carefully");
            event.preventDefault(); // This is what stops the form submission
            return false;
        }
    });
}
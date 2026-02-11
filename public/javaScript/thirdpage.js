//////////////// SIDEBAR TOGGLE LOGIC //////////////////////////////
const menuBtn = document.getElementById("menubar");
const sidebar = document.getElementById("sidebar-nav");
const closeBtn = document.getElementById("close-crossbar");

// Open logic
menuBtn.onclick = function () {
    sidebar.classList.add("active");
    closeBtn.style.display = "block";
    menuBtn.style.display = "none";
};

// Close logic
closeBtn.onclick = function () {
    sidebar.classList.remove("active");
    closeBtn.style.display = "none";
    menuBtn.style.display = "block";
};

// Active Link Highlighting
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const sidebarItems = document.querySelectorAll('.sidebar-child');
    sidebarItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });
});

/////////////// FORM AUTO-FILL LOGIC ///////////////
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
    addressEl.value = Address
}


document.getElementById("disp").addEventListener("click", function(event) {
    let fees1 = document.getElementById("fees").value.trim();
    let fees2 = document.getElementById("fees2").value.trim(); // Fixed ID: was 'fee2' in your JS, 'fees2' in HTML

    if (fees1 === "" || fees2 === "") {
        alert("Please enter fees");
        event.preventDefault(); // This is what stops the form submission
        return false;
    }
});

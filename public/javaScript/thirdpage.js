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


document.getElementById("disp").addEventListener("click", function (event) {
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

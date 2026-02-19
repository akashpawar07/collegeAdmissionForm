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

// Active Link Highlighting 
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

/////////////// FORM AUTO-FILL LOGIC ///////////////

// Set Date (Check session storage first, otherwise generate today's date)
const dateInput = document.getElementById('date');
const savedDate = sessionStorage.getItem("presentDate");

if (savedDate) {
    if (dateInput) dateInput.value = savedDate;
} else {
    // Generate today's date if nothing is saved
    const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dateOfMonth = String(date.getDate()).padStart(2, '0');

    if (dateInput) {
        dateInput.value = `${year}-${month}-${dateOfMonth}`;
        sessionStorage.setItem("presentDate", dateInput.value); // Save default to session
    }
}

// Retrieve Session Data for read-only fields
const surname = sessionStorage.getItem("surname") || "";
const firstName = sessionStorage.getItem("firstName") || "";
const fatherName = sessionStorage.getItem("fatherName") || "";
const village = sessionStorage.getItem("birthPalce") || "";
const tahsil = sessionStorage.getItem("tq") || "";
const district = sessionStorage.getItem("dist") || "";
const state = sessionStorage.getItem("state") || "";
const Address = sessionStorage.getItem("address") || "";

// Retrieve saved Fees
const savedPresentFees = sessionStorage.getItem("presentFees") || "";
const savedProposedFees = sessionStorage.getItem("praposedFees") || "";

// Fill Fields Function
const safeSetValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
};

// Populate the read-only and retrieved fields
safeSetValue("stu-name", firstName + " " + surname);
safeSetValue("parent-name", fatherName + " " + surname);
safeSetValue("stu-name2", firstName + " " + surname);
safeSetValue("parent-name2", fatherName + " " + surname);
safeSetValue("place", "Chhatrapti Sambhajinagar");
safeSetValue("fees", savedPresentFees);   // Loads Present Fees
safeSetValue("fees2", savedProposedFees); // Loads Proposed Fees

// Fill Address
const addressEl = document.getElementById("address");
if (addressEl) {
    addressEl.value = Address;
}

/////////////// REAL-TIME SESSION STORAGE SAVING ///////////////
// This saves the data to sessionStorage the moment the user types it in,
// so if they click the "Next" button without clicking "Submit", it is still saved!

const feesEl = document.getElementById("fees");
const fees2El = document.getElementById("fees2");
const placeEl = document.getElementById("place");

if (feesEl) {
    feesEl.addEventListener("input", function () {
        sessionStorage.setItem("presentFees", this.value);
    });
}

if (fees2El) {
    fees2El.addEventListener("input", function () {
        sessionStorage.setItem("praposedFees", this.value);
    });
}

if (dateInput) {
    dateInput.addEventListener("change", function () {
        sessionStorage.setItem("presentDate", this.value);
    });
}

/////////////// SUBMIT VALIDATION ///////////////
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

            alert("All fields are compulsory, please fill the form carefully");
            event.preventDefault(); // This stops the form submission
            return false;
        }

        // Just as a backup, save data right before submit
        sessionStorage.setItem("presentFees", fees1);
        sessionStorage.setItem("praposedFees", fees2);
        sessionStorage.setItem("presentDate", document.getElementById("date").value);
    });
}


function handleNextPage() {
    const warningMessage = 
        "⚠️ Have you submitted your form?\n\n" +
        "• If YES: Click 'OK' to proceed to the next page.\n" +
        "• If NO: Click 'Cancel' and submit your form first.\n\n" +
        "Any unsaved data will be lost at your own risk!";

    if (confirm(warningMessage)) {
        window.location.href = "/idCard";
    }
}
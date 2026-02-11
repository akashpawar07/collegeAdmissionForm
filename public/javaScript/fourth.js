//////////////// 1. SIDEBAR TOGGLE //////////////////////////////
const menuBtn = document.getElementById("menubar");
const sidebar = document.getElementById("sidebar-nav");
const closeBtn = document.getElementById("close-crossbar");

if (menuBtn) {
  menuBtn.onclick = function () {
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
  };
}

//////////////// 2. DATA POPULATION & SYNC //////////////////
document.addEventListener("DOMContentLoaded", function () {
  // Highlight sidebar active link
  const currentPath = window.location.pathname;
  const sidebarItems = document.querySelectorAll('.sidebar-child');
  sidebarItems.forEach(item => {
    if (item.getAttribute('href') === currentPath) {
      item.classList.add('active');
    }
  });

  // Fill the ID card and the Hidden Form Fields
  populateIDCard();
});

function populateIDCard() {
  // Helper to get session data
  const getVal = (key) => sessionStorage.getItem(key) || "N/A";

  // --- 1. DATA RETRIEVAL ---
  const fname = getVal('firstName');
  const sname = getVal('surname');
  const dobRaw = getVal('dateOfBirth');
  const studentMob = getVal('studentc');
  const parentMob = getVal('parentsc');
  const course = getVal('selectedCourse');
  const branch = getVal('selectedBranch');
  const currentClass = getVal('classes');
  const address = getVal('address');

  // --- 2. CALCULATE ACADEMIC YEAR ---
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  let academicYear = (currentMonth >= 7) ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

  // --- 3. UPDATE VISUAL ID CARD (UI) ---
  document.getElementById('cardName').textContent = `${fname} ${sname}`.toUpperCase();
  document.getElementById('cardCourse').textContent = `${course} - ${branch}`.toUpperCase();
  document.getElementById('cardDob').textContent = dobRaw.split('-').reverse().join('/');
  document.getElementById('studentMobile').textContent = studentMob;
  document.getElementById('cardParentContact').textContent = parentMob;
  document.getElementById('class').textContent = currentClass;
  document.getElementById("academic-year").textContent = `Academic Year: ${academicYear}`;

  // Address UI (Truncate if too long for card display)
  let displayAddress = address;
  if (displayAddress.length > 80) displayAddress = displayAddress.substring(0, 80) + "...";
  document.getElementById('cardAddress').textContent = displayAddress.toUpperCase();

  // --- 4. UPDATE HIDDEN INPUTS (For Database Submission) ---
  // These IDs must match the "id" attributes of the hidden inputs in your HTML
  document.getElementById('hiddenFname').value = fname;
  document.getElementById('hiddenSname').value = sname;
  document.getElementById('hiddenDob').value = dobRaw;
  document.getElementById('hiddenCourse').value = course;
  document.getElementById('hiddenClass').value = currentClass;
  document.getElementById('hiddenStudentMobile').value = studentMob;
  document.getElementById('hiddenParentContact').value = parentMob;
  document.getElementById('hiddenAddress').value = address;
  document.getElementById('hiddenAcademicYear').value = academicYear;
}




//////////////// 3. PHOTO PREVIEW & VALIDATION //////////////////

// Photo Upload Preview
const profileInput = document.getElementById('profilePicInput');
const cardImage = document.getElementById('cardProfileImage');
if (profileInput) {
  profileInput.addEventListener('change', function () {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        cardImage.src = e.target.result;
      }
      reader.readAsDataURL(this.files[0]);
    }
  });
}

// handle submit and form validation 
const finalForm = document.getElementById('finalSubmitForm');

if (finalForm) {
  finalForm.onsubmit = function (e) {
    const photoFile = document.getElementById('profilePicInput').files.length;
    const bloodGroup = document.getElementById('bloodGroupSelect').value;

    // 1. Validation Checks
    if (photoFile === 0) {
      alert("Please upload your profile photo first!");
      e.preventDefault();
      return false;
    }

    if (bloodGroup === "") {
      alert("Please select your Blood Group!");
      e.preventDefault();
      return false;
    }

    // 2. Clear Session Data
    // We use a tiny timeout so the browser has time to "grab" the data 
    // for the POST request before the memory is wiped.
    setTimeout(() => {
      sessionStorage.clear();
      console.log("Session storage cleared successfully.");
    }, 3000);

    return true;
  };
}
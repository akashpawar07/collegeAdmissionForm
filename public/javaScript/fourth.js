//////////////// 1. SIDEBAR TOGGLE //////////////////////////////
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
      if (!sidebar.classList.contains("active")) {
        sidebar.style.display = "";
      }
    }, 300);
  };
}

//////////////// 2. DATA POPULATION & SYNC //////////////////
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

  populateIDCard();
});

function populateIDCard() {
  const getVal = (key) => sessionStorage.getItem(key)

  // --- 1. DATA RETRIEVAL ---
  const fname = getVal('firstName')
  const sname = getVal('surname');
  const dobRaw = getVal('dateOfBirth');
  const studentMob = getVal('studentc');
  const parentMob = getVal('parentsc');
  const course = getVal('selectedCourse');
  const branch = getVal('selectedBranch');
  const currentClass = getVal('classes');
  const address = getVal('address');
  const bloodGroup = getVal('BloodGroup'); // ADDED BLOOD GROUP
  
  const profileImgBase64 = getVal('profileImage');

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
  document.getElementById('cardBloodGroup').textContent = bloodGroup || 'N/A'; // ADDED BLOOD GROUP TO UI

  const cardImage = document.getElementById('cardProfileImage');
  const iconPlaceholder = document.getElementById('iconPlaceholder');
  if (profileImgBase64 && cardImage) {
      cardImage.src = profileImgBase64;
      cardImage.style.display = 'block';
      if (iconPlaceholder) iconPlaceholder.style.display = 'none';
  }

  let displayAddress = address;
  if (displayAddress && displayAddress.length > 80) displayAddress = displayAddress.substring(0, 80) + "...";
  document.getElementById('cardAddress').textContent = (displayAddress || "").toUpperCase();

  // --- 4. UPDATE HIDDEN INPUTS (For Database Submission) ---
  document.getElementById('hiddenFname').value = fname;
  document.getElementById('hiddenSname').value = sname;
  document.getElementById('hiddenDob').value = dobRaw;
  document.getElementById('hiddenCourse').value = course;
  document.getElementById('hiddenClass').value = currentClass;
  document.getElementById('hiddenStudentMobile').value = studentMob;
  document.getElementById('hiddenParentContact').value = parentMob;
  document.getElementById('hiddenAddress').value = address;
  document.getElementById('hiddenAcademicYear').value = academicYear;
  document.getElementById('hiddenBloodGroup').value = bloodGroup || ''; // ADDED BLOOD GROUP INPUT
}

//////////////// 3. FORM VALIDATION & SUBMIT //////////////////
const finalForm = document.getElementById('finalSubmitForm');

if (finalForm) {
  finalForm.onsubmit = function (e) {

    const firstname = document.getElementById("hiddenFname").value.trim();
    const surrname = document.getElementById("hiddenSname").value.trim();
    const std_course = document.getElementById("hiddenCourse").value.trim();
    const current_Class = document.getElementById("hiddenClass").value.trim();
    const dateOFBirth = document.getElementById("hiddenDob").value.trim();
    const stuContact = document.getElementById("hiddenStudentMobile").value.trim();
    const parContact = document.getElementById("hiddenParentContact").value.trim();
    const stuAddress = document.getElementById("hiddenAddress").value.trim();
    const bg = document.getElementById("hiddenBloodGroup").value.trim();

    if (firstname === "" || surrname === "" || std_course === "" ||
      current_Class === "" || dateOFBirth === "" ||
      stuContact === "" || parContact === "" || stuAddress === "" || bg === "") {

      alert("All fields are compulsory! Some data is missing from the Registration Form. Please go back and fill in your details.");
      e.preventDefault();
      return false;
    }

    setTimeout(() => {
      sessionStorage.clear();
      console.log("Session storage cleared successfully.");
    }, 3000);

    return true;
  };
}
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
  const getVal = (key) => sessionStorage.getItem(key);

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
  const bloodGroup = getVal('BloodGroup');

  const profileImgBase64 = getVal('profileImageBase64') || getVal('profileImage');

  // --- 2. CALCULATE ACADEMIC YEAR ---
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  let academicYear = (currentMonth >= 7) ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

  // --- 3. UPDATE VISUAL ID CARD (UI) ---
  document.getElementById('cardName').textContent = `${fname || ''} ${sname || ''}`.toUpperCase();
  document.getElementById('cardCourse').textContent = `${course || ''} - ${branch || ''}`.toUpperCase();

  if (dobRaw) {
    document.getElementById('cardDob').textContent = dobRaw.split('-').reverse().join('/');
  }

  document.getElementById('studentMobile').textContent = studentMob || '';
  document.getElementById('cardParentContact').textContent = parentMob || '';
  document.getElementById('class').textContent = currentClass || '';
  document.getElementById("academic-year").textContent = `Academic Year: ${academicYear}`;
  document.getElementById('cardBloodGroup').textContent = bloodGroup || 'N/A';

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
  document.getElementById('hiddenFname').value = fname || '';
  document.getElementById('hiddenSname').value = sname || '';
  document.getElementById('hiddenDob').value = dobRaw || '';
  document.getElementById('hiddenCourse').value = course || '';
  document.getElementById('hiddenClass').value = currentClass || '';
  document.getElementById('hiddenStudentMobile').value = studentMob || '';
  document.getElementById('hiddenParentContact').value = parentMob || '';
  document.getElementById('hiddenAddress').value = address || '';
  document.getElementById('hiddenAcademicYear').value = academicYear;
  document.getElementById('hiddenBloodGroup').value = bloodGroup || '';
}

//////////////// 3. FINAL COMPREHENSIVE SUBMIT VALIDATION //////////////////
const finalForm = document.getElementById('finalSubmitForm');

// Mapped array of your 31 exact sessionStorage keys with user-friendly names for the popup
const requiredSessionKeys = [
  { key: 'applicationId', name: 'Application ID' },
  { key: 'selectedCourse', name: 'Course Selection' },
  { key: 'AdmissionBy', name: 'Admission Type' },
  { key: 'classes', name: 'Class' },
  { key: 'selectedBranch', name: 'Branch Name' },
  { key: 'surname', name: 'Surname' },
  { key: 'firstName', name: 'First Name' },
  { key: 'fatherName', name: 'Father\'s Name' },
  { key: 'motherName', name: 'Mother\'s Name' },
  { key: 'dateOfBirth', name: 'Date of Birth' },
  { key: 'Gender', name: 'Gender' },
  { key: 'BloodGroup', name: 'Blood Group' },
  { key: 'birthPalce', name: 'Place of Birth' },
  { key: 'tq', name: 'Taluka' },
  { key: 'dist', name: 'District' },
  { key: 'state', name: 'State' },
  { key: 'abcid', name: 'ABC ID' },
  { key: 'adhar', name: 'Aadhar Card No.' },
  { key: 'emailid', name: 'Email ID' },
  { key: 'nationality', name: 'Nationality' },
  { key: 'religion', name: 'Religion' },
  { key: 'category', name: 'Category' },
  { key: 'caste', name: 'Caste' },
  { key: 'address', name: 'Full Address' },
  { key: 'studentc', name: 'Student Mobile No.' },
  { key: 'parentsc', name: 'Parent Mobile No.' },
  { key: 'profileImage', name: 'Profile Image' },
  { key: 'profileSignature', name: 'Signature' },
  { key: 'presentFees', name: 'Present Fees (Fees Undertaking)' },
  { key: 'praposedFees', name: 'Proposed Fees (Fees Undertaking)' },
  { key: 'presentDate', name: 'Form Date (Fees Undertaking)' }
];

if (finalForm) {
  finalForm.onsubmit = function (e) {
    let missingFields = [];

    // Loop through the strict list of 31 keys to check if they exist and are not empty
    for (let item of requiredSessionKeys) {
      let value = sessionStorage.getItem(item.key);

      // Failsafe: Check alternative keys for images just in case
      if (item.key === 'profileImage' && (!value || value === 'null')) {
        value = sessionStorage.getItem('profileImageBase64');
      }
      if (item.key === 'profileSignature' && (!value || value === 'null')) {
        value = sessionStorage.getItem('signatureBase64');
      }

      // If the value is completely missing or is an empty string
      if (!value || value.trim() === "") {
        missingFields.push(item.name);
      }
    }

    // If any fields are missing, block submission and show the exact list
    if (missingFields.length > 0) {
      e.preventDefault();

      const formattedMissingList = missingFields.join("\n- ");
      alert(`⚠️ INCOMPLETE APPLICATION\n\nThe following required fields are missing or empty in your application:\n\n- ${formattedMissingList}\n\nPlease go back to the relevant pages and complete these fields before submitting.`);

      return false;
    }

    // Session clearing is safely handled on the Success Page
    return true;
  };
}
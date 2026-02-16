//////////////// SIDEBAR & TOGGLE LOGIC //////////////////////////////
const menuBtn = document.getElementById("menubar");
const sidebar = document.getElementById("sidebar-nav");
const closeBtn = document.getElementById("close-crossbar");

// Open Sidebar (Mobile)
if (menuBtn) {
    menuBtn.onclick = function () {
        sidebar.classList.add("active");
        closeBtn.style.display = "block";
        menuBtn.style.display = "none";
    };
}

// Close Sidebar (Mobile)
if (closeBtn) {
    closeBtn.onclick = function () {
        sidebar.classList.remove("active");
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";
    };
}

//////////////// ON PAGE LOAD (RESTORE DATA & ACTIVE LINK) //////////////////
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Set Active Link Dynamically
    const currentPath = window.location.pathname;
    const sidebarItems = document.querySelectorAll('.sidebar-child');
    
    sidebarItems.forEach(item => {
        item.classList.remove('active'); // Clear any hardcoded active classes
        const href = item.getAttribute('href');
        
        // Exact match for the active page
        if (href === currentPath) {
            item.classList.add('active');
        }
    });

    // Fallback if path is just root
    if (currentPath === "" || currentPath === "/") {
        const homeLink = document.querySelector('.sidebar-child[href="/"]');
        if(homeLink) homeLink.classList.add('active');
    }

    // 2. RESTORE FORM DATA FROM SESSION STORAGE
    restoreFormData();
});


//////////////// ELEMENT REFERENCES //////////////////
const profileInputFile = document.getElementById("profilePicture");
const SignInputFile = document.getElementById("profileSignature");
const profileImagePlaceholder = document.getElementById("profile-pic-placeholder");
const signPlaceholder = document.getElementById("sign-placeholder");
const previewProfileImg = document.getElementById('previewProfileImage');
const previewProfileSign = document.getElementById('previewProfileSign');

//////////////// VALIDATION ARRAYS //////////////////
const InputFieldvalidationOrder = [
    { key: "profileInputFile", label: "candidate profile Image", message: "file" },
    { key: "SignInputFile", label: "candidate signature", message: "file" },
    { key: "selectedCourse", label: "Course", message: "select" },
    { key: "AdmissionBy", label: "Admission Type", message: "select" },
    { key: "classes", label: "Class", message: "select" },
    { key: "selectedBranch", label: "Branch", message: "enter" },
    { key: "surname", label: "Surname", message: "enter" },
    { key: "firstName", label: "First Name", message: "enter" },
    { key: "fatherName", label: "Father Name", message: "enter" },
    { key: "motherName", label: "Mother Name", message: "enter" },
    { key: "dateOfBirth", label: "Date of Birth", message: "select" },
    { key: "Gender", label: "Gender", message: "select" },
    { key: "birthPalce", label: "Birth Place", message: "enter" },
    { key: "tq", label: "Tahsil(Taluka)", message: "enter" },
    { key: "dist", label: "District", message: "enter" },
    { key: "state", label: "State", message: "enter" },
    { key: "abcid", label: "ABC ID", message: "enter" },
    { key: "adhar", label: "Aadhar Card Number", message: "enter" },
    { key: "emailid", label: "Email ID", message: "enter" },
    { key: "nationality", label: "Nationality", message: "enter" },
    { key: "religion", label: "Religion", message: "enter" },
    { key: "category", label: "Category", message: "enter" },
    { key: "caste", label: "Caste", message: "enter" },
    { key: "address", label: "Address", message: "enter" },
    { key: "studentc", label: "Student mobile number", message: "enter" },
    { key: "parentsc", label: "Parents mobile number", message: "enter" },
];

const documentValidation = [
    { key: "sscdoc", label: "SSC Marksheet" },
    { key: "hscdoc", label: "HSC / Diploma / Graduation Marksheet" },
    { key: "tcdoc", label: "School Leaving or Transfer Certificate" },
    { key: "castedoc", label: "Caste Certificate or EWS Certificate" },
    { key: "cvaliditydoc", label: "Caste Validity Certificate" },
    { key: "domeciledoc", label: "Domicile or Nationality Certificate" },
    { key: "ncldoc", label: "Non-Creamy Layer Certificate" },
    { key: "scorecarddoc", label: "CET / JEE / GATE Scorecard" },
    { key: "addconfirmationdoc", label: "Admission Confirmation Letter" },
    { key: "incomeDoc", label: "Income Certificate" },
    { key: "rationdoc", label: "Ration Card" },
    { key: "adhardoc", label: "Aadhaar Card and Bank Passbook (Combined)" },
    { key: "declarationdoc", label: "Declaration Form" },
    { key: "hosteldoc", label: "Hostel Fee Receipt" },
];


//////////////// SESSION STORAGE LOGIC (SAVE & RESTORE) //////////////////

// 1. Function to Restore Data (Called on Page Load)
function restoreFormData() {
    const setVal = (id, key) => {
        const val = sessionStorage.getItem(key);
        if (val) document.getElementById(id).value = val;
    };

    setVal('surname', 'surname');
    setVal('fname', 'firstName');
    setVal('father_name', 'fatherName');
    setVal('mother_name', 'motherName');
    setVal('date', 'dateOfBirth');
    setVal('Gender', 'Gender');
    setVal('brnch', 'selectedBranch');
    setVal('birthPlace', 'birthPalce');
    setVal('tahsil', 'tq');
    setVal('dist', 'dist');
    setVal('state', 'state');
    setVal('abc', 'abcid');
    setVal('email', 'emailid');
    setVal('aadhar', 'adhar');
    setVal('nationality', 'nationality');
    setVal('religion', 'religion');
    setVal('caste', 'caste');
    setVal('category', 'category');
    setVal('selfaddress', 'address');
    setVal('stdContact', 'studentc');
    setVal('parentsCon', 'parentsc');

    const restoreRadio = (name, key) => {
        const savedValue = sessionStorage.getItem(key);
        if (savedValue) {
            const radio = document.querySelector(`input[name="${name}"][value="${savedValue}"]`);
            if (radio) radio.checked = true;
        }
    };

    restoreRadio('course', 'selectedCourse');
    restoreRadio('AdmissionThrough', 'AdmissionBy');
    restoreRadio('classes', 'classes');
}

// 2. Function to Save Data (Called on Input Change)
function saveToSession() {
    const dataMap = {
        'surname': 'surname',
        'fname': 'firstName',
        'father_name': 'fatherName',
        'mother_name': 'motherName',
        'date': 'dateOfBirth',
        'Gender': 'Gender',
        'brnch': 'selectedBranch',
        'birthPlace': 'birthPalce',
        'tahsil': 'tq',
        'dist': 'dist',
        'state': 'state',
        'abc': 'abcid',
        'email': 'emailid',
        'aadhar': 'adhar',
        'nationality': 'nationality',
        'religion': 'religion',
        'caste': 'caste',
        'category': 'category',
        'selfaddress': 'address',
        'stdContact': 'studentc',
        'parentsCon': 'parentsc'
    };

    for (const [id, key] of Object.entries(dataMap)) {
        const element = document.getElementById(id);
        if (element) {
            sessionStorage.setItem(key, element.value.trim());
        }
    }

    const saveRadio = (name, key) => {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        if (checked) sessionStorage.setItem(key, checked.value);
    };

    saveRadio('course', 'selectedCourse');
    saveRadio('AdmissionThrough', 'AdmissionBy');
    saveRadio('classes', 'classes');
}

// 3. Add Event Listener to Auto-Save on any change
document.getElementById('studentForm').addEventListener('input', function(e) {
    if(e.target.type !== 'file') {
        saveToSession();
    }
});


//////////////// FORM SUBMIT HANDLER //////////////////
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        surname: document.getElementById('surname').value.trim(),
        firstName: document.getElementById('fname').value.trim(),
        fatherName: document.getElementById('father_name').value.trim(),
        motherName: document.getElementById('mother_name').value.trim(),
        dateOfBirth: document.getElementById('date').value.trim(),
        Gender: document.getElementById('Gender').value.trim(),
        selectedCourse: document.querySelector('input[name="course"]:checked')?.value || "",
        AdmissionBy: document.querySelector('input[name="AdmissionThrough"]:checked')?.value || "",
        classes: document.querySelector('input[name="classes"]:checked')?.value || "",
        selectedBranch: document.getElementById("brnch").value.trim(),
        birthPalce: document.getElementById('birthPlace').value.trim(),
        tq: document.getElementById('tahsil').value.trim(),
        dist: document.getElementById('dist').value.trim(),
        state: document.getElementById('state').value.trim(),
        abcid: document.getElementById('abc').value.trim(),
        emailid: document.getElementById('email').value.trim(),
        adhar: document.getElementById('aadhar').value.trim(),
        nationality: document.getElementById('nationality').value.trim(),
        religion: document.getElementById('religion').value.trim(),
        caste: document.getElementById('caste').value.trim(),
        category: document.getElementById('category').value.trim(),
        address: document.getElementById('selfaddress').value.trim(),
        studentc: document.getElementById('stdContact').value.trim(),
        parentsc: document.getElementById('parentsCon').value.trim()
    };

    // Input Validation
    for (const field of InputFieldvalidationOrder) {
        if (field.message === "file") {
            const fileInput = field.key === "profileInputFile" ? profileInputFile : SignInputFile;
            if (!fileInput.files.length) {
                alert(`Please upload ${field.label}`);
                return;
            }
        } else {
            if (!formData[field.key]) {
                const action = field.message === "select" ? "select" : "enter";
                alert(`Please ${action} ${field.label}`);
                return;
            }
        }
    }

    // Document Validation
    for (const doc of documentValidation) {
        const input = document.getElementById(doc.key);
        if (!input || !input.files || !input.files.length) {
            alert(`Please upload ${doc.label}`);
            input?.focus();
            return;
        }
    }

    saveToSession();
    this.submit();
});

function handleNextPage() {
    if (confirm("Are you sure you want to move to the next page?")) {
        window.location.href = "/studentUndertaking";
    }
}

//////////////// PREVIEW LOGIC //////////////////
profileInputFile.onchange = function () {
    if (this.files.length) {
        const url = URL.createObjectURL(this.files[0]);
        profileImagePlaceholder.src = url;
        previewProfileImg.src = url;
    }
};

SignInputFile.onchange = function () {
    if (this.files.length) {
        const url = URL.createObjectURL(this.files[0]);
        signPlaceholder.src = url;
        previewProfileSign.src = url;
    }
};

// Open Preview
document.getElementById('preview-Btn').addEventListener('click', () => {
    
    // Hide mobile sidebar if open
    sidebar.classList.remove("active");
    if(closeBtn) closeBtn.style.display = "none";
    if(menuBtn) menuBtn.style.display = "block";

    document.getElementById('SURNAME').value = document.getElementById('surname').value;
    document.getElementById('FIRSTNAME').value = document.getElementById('fname').value;
    document.getElementById('MIDDLENAME').value = document.getElementById('father_name').value;
    document.getElementById('MOTHERNAME').value = document.getElementById('mother_name').value;
    document.getElementById('DOB').value = document.getElementById('date').value;
    document.getElementById('gender').value = document.getElementById('Gender').value;
    
    document.getElementById('courses').value = document.querySelector('input[name="course"]:checked')?.value || "";
    document.getElementById('AdmissionTh').value = document.querySelector('input[name="AdmissionThrough"]:checked')?.value || "";
    document.getElementById('AdmissionForClass').value = document.querySelector('input[name="classes"]:checked')?.value || "";
    
    document.getElementById("branches").value = document.getElementById('brnch').value;
    document.getElementById('placeOfBirth').value = document.getElementById('birthPlace').value;
    document.getElementById('taluka').value = document.getElementById('tahsil').value;
    document.getElementById('district').value = document.getElementById('dist').value;
    document.getElementById('State').value = document.getElementById('state').value;
    document.getElementById('abcID').value = document.getElementById('abc').value;
    document.getElementById('emailID').value = document.getElementById('email').value;
    document.getElementById('addharCard').value = document.getElementById('aadhar').value;
    document.getElementById('Nationality').value = document.getElementById('nationality').value;
    document.getElementById('Religion').value = document.getElementById('religion').value;
    document.getElementById('Caste').value = document.getElementById('caste').value;
    document.getElementById('Category').value = document.getElementById('category').value;
    document.getElementById('address').value = document.getElementById('selfaddress').value;
    document.getElementById('studentContact').value = document.getElementById('stdContact').value;
    document.getElementById('parentsContact').value = document.getElementById('parentsCon').value;

    const getFileName = (id) => document.getElementById(id)?.files[0]?.name || "Not Uploaded";
    
    document.getElementById('ssc').value = getFileName('sscdoc');
    document.getElementById('hsc').value = getFileName('hscdoc');
    document.getElementById('Tc').value = getFileName('tcdoc');
    document.getElementById('Castecert').value = getFileName('castedoc');
    document.getElementById('validity').value = getFileName('cvaliditydoc');
    document.getElementById('Domicile').value = getFileName('domeciledoc');
    document.getElementById('non-creamylayer').value = getFileName('ncldoc');
    document.getElementById('gap').value = getFileName('gapdoc');
    document.getElementById('scorecard').value = getFileName('scorecarddoc');
    document.getElementById('admission').value = getFileName('addconfirmationdoc');
    document.getElementById('Income').value = getFileName('incomeDoc');
    document.getElementById('Ration').value = getFileName('rationdoc');
    document.getElementById('Adhar').value = getFileName('adhardoc');
    document.getElementById('Declaration').value = getFileName('declarationdoc');
    document.getElementById('Hostel').value = getFileName('hosteldoc');
    document.getElementById('Death').value = getFileName('deathdoc');

    document.getElementById('preview_from').style.display = 'block';
    document.querySelector(".formContainer").classList.add("blur");
});

// Close Preview
function cancelPreview() {
    document.getElementById('preview_from').style.display = 'none';
    document.querySelector(".formContainer").classList.remove("blur");
}

// Income Validation
// function extractAndValidate() {
//     var fileInput = document.getElementById('incomeDoc');
//     var file = fileInput.files[0];
//     var reader = new FileReader();

//     reader.onload = function (event) {
//         var typedarray = new Uint8Array(event.target.result);
//         if (typeof pdfjsLib !== 'undefined') {
//             pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
//                 var text = "";
//                 pdf.getPage(1).then(function (page) {
//                     page.getTextContent().then(function (textContent) {
//                         textContent.items.forEach(function (item) {
//                             text += item.str + " ";
//                         });
//                         if (text.includes("तहसीलदार")) {
//                             alert('Valid PDF: This is an Income Certificate.');
//                         } else {
//                             alert('Invalid PDF: This is not an Income Certificate.');
//                         }
//                     });
//                 });
//             }).catch(function (error) {
//                 alert('Error loading PDF: ' + error.message);
//             });
//         }
//     };
//     if(file) reader.readAsArrayBuffer(file);
// }
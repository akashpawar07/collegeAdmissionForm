//////////////// ELEMENT REFERENCES //////////////////

const profileInputFile = document.getElementById("profilePicture");
const SignInputFile = document.getElementById("profileSignature");

const profileImagePlaceholder = document.getElementById("profile-pic-placeholder");
const signPlaceholder = document.getElementById("sign-placeholder");

const previewProfileImg = document.getElementById('previewProfileImage');
const previewProfileSign = document.getElementById('previewProfileSign');



//////////////// VALIDATION ORDER //////////////////
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
    // { key: "gapdoc", label: "Gap Certificate" },
    { key: "scorecarddoc", label: "CET / JEE / GATE Scorecard" },
    { key: "addconfirmationdoc", label: "Admission Confirmation Letter" },
    { key: "incomeDoc", label: "Income Certificate" },
    { key: "rationdoc", label: "Ration Card" },
    { key: "adhardoc", label: "Aadhaar Card and Bank Passbook (Combined)" },
    { key: "declarationdoc", label: "Declaration Form" },
    { key: "hosteldoc", label: "Hostel Fee Receipt" },
    // { key: "deathdoc", label: "Death or Divorce Certificate" } 
];


//////////////// Handle Submit //////////////////////////////////////////////////////////////////////

document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // 🔹 ALWAYS READ VALUES HERE
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

    // 🔹 ONE-BY-ONE VALIDATION FOR INPUTS
    for (const field of InputFieldvalidationOrder) {

        if (field.message === "file") {
            const fileInput = field.key === "profileInputFile"
                ? profileInputFile
                : SignInputFile;

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

    // 🔹 DOCUMENT VALIDATION (ONE BY ONE)
    for (const doc of documentValidation) {
        const input = document.getElementById(doc.key);

        if (!input || !input.files || !input.files.length) {
            alert(`Please upload ${doc.label}`);
            input?.focus();
            return;
        }
    }

    // ✅ VALIDATION PASSED → SUBMIT FORM
    this.submit();
});


///////////////////////// FORM PREVIEW SECTION //////////////////////////////////////

// Profile preview
profileInputFile.onchange = function () {
    if (this.files.length) {
        const url = URL.createObjectURL(this.files[0]);
        profileImagePlaceholder.src = url;
        previewProfileImg.src = url;
    }
};

// Signature preview
SignInputFile.onchange = function () {
    if (this.files.length) {
        const url = URL.createObjectURL(this.files[0]);
        signPlaceholder.src = url;
        previewProfileSign.src = url;
    }
};


document.getElementById('preview-Btn').addEventListener('click', () => {

    // 🔹 INPUT FIELD ASSIGN TO PREVIEW FIELDS
    // Left getting for preview    =  Right input values comming from admision form
    document.getElementById('SURNAME').value = document.getElementById('surname').value;
    document.getElementById('FIRSTNAME').value = document.getElementById('fname').value;
    document.getElementById('MIDDLENAME').value = document.getElementById('father_name').value;
    document.getElementById('MOTHERNAME').value = document.getElementById('mother_name').value;
    document.getElementById('DOB').value = document.getElementById('date').value;
    document.getElementById('gender').value = document.getElementById('Gender').value; // Ensure HTML ID is lowercase
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

    // 🔹 DOCUMENT FILE NAMES
    // Left getting for preview    =    Right document values comming from admision form
    document.getElementById('ssc').value = document.getElementById('sscdoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('hsc').value = document.getElementById('hscdoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('Tc').value = document.getElementById('tcdoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('Castecert').value = document.getElementById('castedoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('validity').value = document.getElementById('cvaliditydoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('Domicile').value = document.getElementById('domeciledoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('non-creamylayer').value = document.getElementById('ncldoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('gap').value = document.getElementById('gapdoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('scorecard').value = document.getElementById('scorecarddoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('admission').value = document.getElementById('addconfirmationdoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('Income').value = document.getElementById('incomeDoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('Ration').value = document.getElementById('rationdoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('Adhar').value = document.getElementById('adhardoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('Declaration').value = document.getElementById('declarationdoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('Hostel').value = document.getElementById('hosteldoc')?.files[0]?.name || "Not Uploaded";
    document.getElementById('Death').value = document.getElementById('deathdoc')?.files[0]?.name || "Not Uploaded";


    // 🔹 SHOW PREVIEW
    document.getElementById('preview_from').style.display = 'block';
    document.querySelector(".formContainer").classList.add("blur");
});

// Cancel ❌  Preview
function cancelPreview() {
    document.getElementById('preview_from').style.display = 'none';
    document.querySelector(".formContainer").classList.remove("blur");
}



///////////////////////// INCOME VALIDATION SECTION //////////////////////////////////////
function extractAndValidate() {
    var fileInput = document.getElementById('incomeDoc');

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var typedarray = new Uint8Array(event.target.result);

        // Load PDF
        pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
            // Extract text
            var text = "";
            var pageNumber = 1; // Page number to extract text from
            pdf.getPage(pageNumber).then(function (page) {
                page.getTextContent().then(function (textContent) {
                    textContent.items.forEach(function (item) {
                        text += item.str + " ";
                    });
                    // textOutput.textContent = text;

                    // Check if the extracted text contains the word "तहसीलदार"
                    if (text.includes("तहसीलदार")) {
                        alert('Valid PDF This is an Income Certificate.');
                    } else {
                        alert('Invalid PDF This is not a Income Certificate.');

                    }
                });
            });
        }).catch(function (error) {
            alert('Error loading PDF: ' + error.message);
        });
    };

    reader.readAsArrayBuffer(file);
}
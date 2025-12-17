//////////////////// VALIDATION ORDER ////////////////////

const idCardValidation = [
  { key: "academic", id: "accYear", label: "Academic Year", type: "enter" },
  { key: "fname", id: "fname", label: "First Name", type: "enter" },
  { key: "mname", id: "mname", label: "Middle Name", type: "enter" },
  { key: "sname", id: "sname", label: "Surname", type: "enter" },

  { key: "DOB", id: "date", label: "Date of Birth", type: "select" },
  { key: "Gender", id: "Gender", label: "Gender", type: "select" },
  { key: "BloodGroup", id: "BloodGroup", label: "Blood Group", type: "select" },

  { key: "course", label: "Course", type: "radio" },
  { key: "classes", label: "Class", type: "radio" },
  { key: "branches", label: "Branch", type: "radio" },

  { key: "stdContact", id: "std_contact", label: "Student Contact", type: "enter" },
  { key: "pContact", id: "p_contact", label: "Parent Contact", type: "enter" },
  { key: "stdAddress", id: "std_address", label: "Address", type: "enter" }
];

//////////////////// UPDATED VALIDATION FUNCTION ////////////////////
function validateIdCardForm() {
  for (const field of idCardValidation) {

    if (field.type === "radio") {
      const selected = document.querySelector(
        `input[name="${field.key}"]:checked`
      );
      if (!selected) {
        alert(`Please select ${field.label}`);
        return false;
      }

    } else {
      // Use id property if it exists, otherwise use key
      const elementId = field.id || field.key;
      const el = document.getElementById(elementId);
      if (!el || !el.value.trim()) {
        const action = field.type === "select" ? "select" : "enter";
        alert(`Please ${action} ${field.label}`);
        el?.focus();
        return false;
      }
    }
  }
  return true;
}



//////////////////// SUBMIT FUNCTION ////////////////////

document.getElementById('idCardForm').addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validateIdCardForm()) return;
  

  // ✅ Submit the actual form element safely
  HTMLFormElement.prototype.submit.call(this);
});


const getValue = id =>
  document.getElementById(id)?.value.trim() || "";

const getRadio = name =>
  document.querySelector(`input[name="${name}"]:checked`)?.value || "";

//////////////////// PREVIEW FUNCTION ////////////////////

document.getElementById('previewPage').addEventListener('click', () => {

  document.getElementById('FNAME').value = getValue('fname');
  document.getElementById('MNAME').value = getValue('mname');
  document.getElementById('SNAME').value = getValue('sname');
  document.getElementById('DATE').value = getValue('date');

  document.getElementById('SCONTACT').value = getValue('std_contact');
  document.getElementById('PCONTACT').value = getValue('p_contact');

  document.getElementById('ADDRESS').value = getValue('std_address');
  document.getElementById('GENDER').value = getValue('Gender');
  document.getElementById('B_GROUP').value = getValue('BloodGroup');

  document.getElementById('course-name').value = getRadio('course');
  document.getElementById('class-name').value = getRadio('classes');
  document.getElementById('branch-name').value = getRadio('branches');

  document.getElementById('preview_from').style.display = 'block';
  document.getElementById('formContainer').classList.add('blur');
});



//////////////////// CANCEL PREVIEW ////////////////////

function cancelPreview() {
  document.getElementById('preview_from').style.display = 'none';
  document.getElementById('formContainer').classList.remove('blur');
}



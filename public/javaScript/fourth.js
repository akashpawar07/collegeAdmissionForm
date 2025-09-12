function run() {
  alert("Data Submited succesfully...!")
}

document.getElementById('preview-Btn').addEventListener('click', () => {
  // Getting the value of input fields
  let fname = document.getElementById('fname').value.trim();
  let mname = document.getElementById('mname').value.trim();
  let sname = document.getElementById('sname').value.trim();
  let date = document.getElementById('date').value.trim();

  let c1 = document.getElementById('std_contact').value.trim();
  let c2 = document.getElementById('p_contact').value.trim();

  let address = document.getElementById('std_address').value.trim();
  let Gender = document.getElementById('Gender').value.trim();
  let Bgroup = document.getElementById('BloodGroup').value.trim();

  // For radio inputs, check if a selection was made
  let selectedCourse = document.querySelector('input[name="course"]:checked');
  let selectedClass = document.querySelector('input[name="classes"]:checked');
  let selectedBranch = document.querySelector('input[name="branches"]:checked');

  // Validation: If any field is empty/unchecked, show alert and stop
  if (
    !fname || !mname || !sname || !date ||
    !c1 || !c2 || !address || !Gender || !Bgroup ||
    !selectedCourse || !selectedClass || !selectedBranch
  ) {
    alert("All fields are compulsory");
    return; // Prevent preview if validation fails
  }

  // Proceed as before (set values & show preview)
  document.getElementById('FNAME').value = fname;
  document.getElementById('MNAME').value = mname;
  document.getElementById('SNAME').value = sname;
  document.getElementById('DATE').value = date;

  document.getElementById('SCONTACT').value = c1;
  document.getElementById('PCONTACT').value = c2;

  document.getElementById('ADDRESS').value = address;
  document.getElementById('GENDER').value = Gender;
  document.getElementById('B-GROUP').value = Bgroup;

  document.getElementById('course-name').value = selectedCourse.value;
  document.getElementById('class-name').value = selectedClass.value;
  document.getElementById('branch-name').value = selectedBranch.value;

  document.getElementById('preview_from').style.display = 'block';

  var formContainer = document.querySelector("#formContainer");
  formContainer.classList.add("blur");
});


function cancelPreview() {
  document.getElementById('preview_from').style.display = 'none';

  var formContainer = document.querySelector("#formContainer")
  formContainer.classList.remove("blur");
}

 function run(){
   alert("Data Submited succesfully...!")
 }

document.getElementById('preview-Btn').addEventListener('click', () => {

    //     // Getting the value of input fields
 
    let fname = document.getElementById('fname').value
    let mname = document.getElementById('mname').value
    let sname = document.getElementById('sname').value
     let date = document.getElementById('date').value

    let c1 = document.getElementById('std_contact').value
    let c2 = document.getElementById('p_contact').value

    let address = document.getElementById('std_address').value
    let Gender = document.getElementById('Gender').value
    let Bgroup = document.getElementById('BloodGroup').value

    let selectedCourse = document.querySelector('input[name="course"]:checked').value
    let selectedClass = document.querySelector('input[name="classes"]:checked').value
    let selectedBranch = document.querySelector('input[name="branches"]:checked').value

 
 
 
    // console.log(selectedCourse)
  // Asigning the value 
 
    document.getElementById('FNAME').value = fname
    document.getElementById('MNAME').value = mname
    document.getElementById('SNAME').value = sname
    document.getElementById('DATE').value = date

    document.getElementById('SCONTACT').value = c1
    document.getElementById('PCONTACT').value = c2

    document.getElementById('ADDRESS').value = address
    document.getElementById('GENDER').value = Gender
    document.getElementById('B-GROUP').value = Bgroup


    document.getElementById('course-name').value = selectedCourse
    document.getElementById('class-name').value = selectedClass
    document.getElementById('branch-name').value = selectedBranch

    
    document.getElementById('preview_from').style.display = 'block';
 
    var formContainer = document.querySelector("#formContainer")
    formContainer.classList.add("blur");
 
 })
 
 function cancelPreview() {
    document.getElementById('preview_from').style.display = 'none';
 
    var formContainer = document.querySelector("#formContainer")
    formContainer.classList.remove("blur");
 }

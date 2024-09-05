
document.getElementById('preview-Btn').addEventListener('click', () =>{

    // Getting the value of input fields
   let date = document.getElementById('date').value
   let pname = document.getElementById('parent-name').value
   let sname = document.getElementById('stu-name').value
   let institute = document.getElementById('institute-name').value
   let day = document.getElementById('day').value
   let month = document.getElementById('month').value
   let year = document.getElementById('year').value
   let pname2 = document.getElementById('parent-name2').value
   let sname2 = document.getElementById('stu-name2').value
   let sign = document.getElementById('sign').value


   // Asigning the value 
   document.getElementById('DATE').value = date
   document.getElementById('PARENT-NAME').value= pname
   document.getElementById('STU-NAME').value= sname
   document.getElementById('INSTITUTE-NAME').value= institute
   document.getElementById('DAY').value= day
   document.getElementById('MONTH').value= month
   document.getElementById('YEAR').value= year
   document.getElementById('PARENT-NAME2').value= pname2
   document.getElementById('STU-NAME2').value= sname2
   document.getElementById('SIGN').value=sign

   document.getElementById('preview_from').style.display = 'block';

   var formContainer = document.querySelector(".formContainer")
   formContainer.classList.add("blur");
})

function cancelPreview() {
   document.getElementById('preview_from').style.display = 'none';

   var formContainer = document.querySelector(".formContainer")
   formContainer.classList.remove("blur");
}

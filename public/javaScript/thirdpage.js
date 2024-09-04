
document.getElementById('preview-Btn').addEventListener('click', () => {

    //     // Getting the value of input fields
 
    let sname = document.getElementById('stu-name').value
    let pname = document.getElementById('parent-name').value
    let fees = document.getElementById('fees').value
    let fees2 = document.getElementById('fees2').value
    let sname2 = document.getElementById('stu-name2').value
    let pname2 = document.getElementById('parent-name2').value
    let address = document.getElementById('address').value
    let c1 = document.getElementById('Personal').value
    let c2 = document.getElementById('Fathers').value
    let c3 = document.getElementById('Mothers').value
    let c4 = document.getElementById('Relative').value
 
    let place = document.getElementById('place').value
    let date = document.getElementById('date').value

 
 
    // console.log(address)
  // Asigning the value 
 
    document.getElementById('STU-NAME').value = sname
    document.getElementById('PARENT-NAME').value = pname
    document.getElementById('FEES').value = fees
    document.getElementById('FEES2').value = fees2
    document.getElementById('STU-NAME2').value = sname2
    document.getElementById('PARENT-NAME2').value = pname2
    document.getElementById('ADDRESS').value = address
    document.getElementById('PERSONAL').value = c1
    document.getElementById('FATHERS').value = c2
    document.getElementById('MOTHERS').value = c3
    document.getElementById('RELATIVE').value = c4
    document.getElementById('PLACE').value = place
    document.getElementById('DATE').value = date
 
 
 
    document.getElementById('preview_from').style.display = 'block';
 
    var formContainer = document.querySelector(".formContainer")
    formContainer.classList.add("blur");
 
 })
 
 function cancelPreview() {
    document.getElementById('preview_from').style.display = 'none';
 
    var formContainer = document.querySelector(".formContainer")
    formContainer.classList.remove("blur");
 }
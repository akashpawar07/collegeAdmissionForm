let profilePic = document.getElementById("profile-pic")
let inputFile = document.getElementById("upload-image")

let previewProfileImg = document.getElementById('previewProfileImage')
let previewProfileSign = document.getElementById('previewProfileSign')

let profilePic2 = document.getElementById("profile-sign")
let inputFile2 = document.getElementById("upload-sign")

// this is for Profile Iamge preview
inputFile.onchange = function () {
    profilePic.src = URL.createObjectURL(inputFile.files[0])
    previewProfileImg.src = URL.createObjectURL(inputFile.files[0])
}
// this is for singnature preview
inputFile2.onchange = function () {
    profilePic2.src = URL.createObjectURL(inputFile2.files[0])
    previewProfileSign.src = URL.createObjectURL(inputFile2.files[0])
}


///////////////////////// INCOME VALIDATION //////////////////////////////////////
function extractAndValidate() {
    var fileInput = document.getElementById('fileInput');

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



//...................... Form PRIVIEW SECTION --------------------- 

document.getElementById('preview-Btn').addEventListener('click', () => {

    // Getting the value of input fields, with trim and radio checks
    let surname = document.getElementById('surname').value.trim();
    let firstName = document.getElementById('fname').value.trim();
    let fatherName = document.getElementById('father_name').value.trim();
    let motherName = document.getElementById('mother_name').value.trim();
    let dateOfBirth = document.getElementById('date').value.trim();
    let Gender = document.getElementById('Gender').value.trim();

    let selectedCourseEl = document.querySelector('input[name="course"]:checked');
    let selectedCourse = selectedCourseEl ? selectedCourseEl.value : null;

    let AdmissionByEl = document.querySelector('input[name="AdmissionThrough"]:checked');
    let AdmissionBy = AdmissionByEl ? AdmissionByEl.value : null;

    let classesEl = document.querySelector('input[name="classes"]:checked');
    let classes = classesEl ? classesEl.value : null;

    let selectedBranch = document.getElementById("brnch").value.trim();
    let birthPalce = document.getElementById('birthPlace').value.trim();
    let tq = document.getElementById('tahsil').value.trim();
    let dist = document.getElementById('dist').value.trim();
    let state = document.getElementById('state').value.trim();
    let abcid = document.getElementById('abc').value.trim();
    let emailid = document.getElementById('email').value.trim();
    let adhar = document.getElementById('aadhar').value.trim();
    let nationality = document.getElementById('nationality').value.trim();
    let religion = document.getElementById('religion').value.trim();
    let caste = document.getElementById('caste').value.trim();
    let category = document.getElementById('category').value.trim();
    let address = document.getElementById('selfaddress').value.trim();
    let studentc = document.getElementById('stdContact').value.trim();
    let parentsc = document.getElementById('parentsCon').value.trim();

    // Now check for any empty field
    if (
        !surname || !firstName || !fatherName || !motherName ||
        !dateOfBirth || !Gender || !selectedCourse || !AdmissionBy || !classes || !selectedBranch ||
        !birthPalce || !tq || !dist || !state || !abcid || !emailid || !adhar || !nationality ||
        !religion || !caste || !category || !address || !studentc || !parentsc
    ) {
        alert("All fields are compulsory!");
        return;
    }


    // documets input fields
    let sscdoc = document.getElementById('sscdoc').value
    let hscdoc = document.getElementById('hscdoc').value
    let tcdoc = document.getElementById('tcdoc').value
    let castedoc = document.getElementById('castedoc').value
    let cvaliditydoc = document.getElementById('cvaliditydoc').value
    let domeciledoc = document.getElementById('domeciledoc').value
    let ncldoc = document.getElementById('ncldoc').value
    let gapdoc = document.getElementById('gapdoc').value
    let scorecarddoc = document.getElementById('scorecarddoc').value
    let addconfirmationdoc = document.getElementById('addconfirmationdoc').value
    let incomedoc = document.getElementById('fileInput').value
    let rationdoc = document.getElementById('rationdoc').value
    let adhardoc = document.getElementById('adhardoc').value
    let declarationdoc = document.getElementById('declarationdoc').value
    let hosteldoc = document.getElementById('hosteldoc').value
    let deathdoc = document.getElementById('deathdoc').value


    // Asigning the value 
    document.getElementById('SURNAME').value = surname
    document.getElementById('FIRSTNAME').value = firstName
    document.getElementById('MIDDLENAME').value = fatherName
    document.getElementById('MOTHERNAME').value = motherName
    document.getElementById('DOB').value = dateOfBirth
    document.getElementById('gender').value = Gender

    document.getElementById('courses').value = selectedCourse
    document.getElementById('AdmissionTh').value = AdmissionBy
    document.getElementById('AdmissionForClass').value = classes

    document.getElementById("branchess").value = selectedBranch
    document.getElementById('palceOfBirth').value = birthPalce
    document.getElementById('taluka').value = tq
    document.getElementById('district').value = dist
    document.getElementById('State').value = state
    document.getElementById('abcID').value = abcid
    document.getElementById('emailID').value = emailid
    document.getElementById('addharCard').value = adhar
    document.getElementById('Nationality').value = nationality
    document.getElementById('Religion').value = religion
    document.getElementById('Caste').value = caste
    document.getElementById('Category').value = category
    document.getElementById('address').value = address
    document.getElementById('studentContact').value = studentc
    document.getElementById('parentsContact').value = parentsc

    document.getElementById('ssc').value = sscdoc
    document.getElementById('hsc').value = hscdoc
    document.getElementById('Tc').value = tcdoc
    document.getElementById('Castecert').value = castedoc
    document.getElementById('validity').value = cvaliditydoc
    document.getElementById('Domicile').value = domeciledoc
    document.getElementById('non-creamylayer').value = ncldoc
    document.getElementById('gap').value = gapdoc
    document.getElementById('scorecard').value = scorecarddoc
    document.getElementById('addmission').value = addconfirmationdoc
    document.getElementById('Income').value = incomedoc
    document.getElementById('Ration').value = rationdoc
    document.getElementById('Adhar').value = adhardoc
    document.getElementById('Declaration').value = declarationdoc
    document.getElementById('Hostel').value = hosteldoc
    document.getElementById('Death').value = deathdoc


    document.getElementById('preview_from').style.display = 'block';

    var formContainer = document.querySelector(".formContainer")
    formContainer.classList.add("blur");

})

function cancelPreview() {
    document.getElementById('preview_from').style.display = 'none';

    var formContainer = document.querySelector(".formContainer")
    formContainer.classList.remove("blur");
}










function printableData() {
    var bodyData = document.body.innerHTML;
    var data = document.getElementById('preview_from').innerHTML;

    document.body.innerHTML = data;
    window.print()
    ddocument.body.innerHTML = data;
}
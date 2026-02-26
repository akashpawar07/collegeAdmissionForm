
document.addEventListener("DOMContentLoaded", function () {
    const getVal = (key) => sessionStorage.getItem(key) || 'N/A';

    // ---> FETCH AND DISPLAY APPLICATION ID <---
    const printAppId = document.getElementById('printAppId');
    if (printAppId) printAppId.textContent = getVal('applicationId');

    // 1. ACADEMIC DETAILS
    document.getElementById('printCourse').textContent = getVal('selectedCourse').toUpperCase();
    document.getElementById('printBranch').textContent = getVal('selectedBranch').toUpperCase();
    document.getElementById('printClass').textContent = getVal('classes').toUpperCase();
    document.getElementById('printAdmissionMode').textContent = getVal('AdmissionBy').toUpperCase();

    // 2. NAME FORMATTING
    const fname = getVal('firstName');
    const fatherName = getVal('fatherName');
    const sname = getVal('surname');

    const fullName = `${fname} ${fatherName} ${sname}`.replace(/N\/A/g, '').replace(/\s+/g, ' ').trim().toUpperCase();
    const parentName = `${fatherName} ${sname}`.replace(/N\/A/g, '').replace(/\s+/g, ' ').trim().toUpperCase();

    document.getElementById('printName').textContent = fullName;
    document.getElementById('printMother').textContent = getVal('motherName').toUpperCase();

    // Fill all instances of dynamic names
    document.querySelectorAll('.fill-student-name').forEach(el => el.textContent = fullName);
    document.querySelectorAll('.fill-parent-name').forEach(el => el.textContent = parentName);

    // 3. PERSONAL DETAILS
    document.getElementById('printDob').textContent = getVal('dateOfBirth');
    document.getElementById('printBirthPlace').textContent = getVal('birthPalce').toUpperCase();
    document.getElementById('printGenderBlood').textContent = `${getVal('Gender').toUpperCase()} / ${getVal('BloodGroup').toUpperCase()}`;
    document.getElementById('printCategoryCaste').textContent = `${getVal('category').toUpperCase()} / ${getVal('caste').toUpperCase()}`;
    document.getElementById('printReligion').textContent = getVal('religion').toUpperCase();
    document.getElementById('printNationality').textContent = getVal('nationality').toUpperCase();
    document.getElementById('printAadhar').textContent = getVal('adhar');
    document.getElementById('printAbc').textContent = getVal('abcid');
    document.getElementById('printMobile').textContent = getVal('studentc');
    document.getElementById('printParentMobile').textContent = getVal('parentsc');
    document.getElementById('printEmail').textContent = getVal('emailid');

    // 4. ADDRESS
    const addressParts = getVal('address');
    if (addressParts && addressParts !== 'N/A') {
        document.getElementById('printAddress').textContent = addressParts.toUpperCase();
    }

    // 5. FEES & DATES
    document.getElementById('printPresentFees').textContent = getVal('presentFees') === 'N/A' ? '________' : getVal('presentFees');
    document.getElementById('printProposedFees').textContent = getVal('praposedFees') === 'N/A' ? '________' : getVal('praposedFees');

    const pDate = getVal('presentDate');
    document.getElementById('printDate').textContent = pDate !== 'N/A' ? pDate.split('-').reverse().join('/') : 'DD/MM/YYYY';

    // 6. IMAGES 
    const profileImg = sessionStorage.getItem('profileImage');
    const signImg = sessionStorage.getItem('profileSignature');

    if (profileImg && profileImg !== 'null') {
        const pImg = document.getElementById('printProfileImg');
        if (pImg) {
            pImg.src = profileImg;
            pImg.style.display = "inline-block";
        }
    }
    if (signImg && signImg !== 'null') {
        const pSign = document.getElementById('printStudentSign2');
        if (pSign) {
            pSign.src = signImg;
            pSign.style.display = "inline-block";
        }
    }
});

function triggerPrint() {
    window.print();
}

function finishProcess() {
    sessionStorage.clear();
    window.location.href = "/";
}
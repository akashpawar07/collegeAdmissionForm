

const indexController = (req, res) => {
    res.render('index')
}

const studentSchema = require("../models/studentModels")

const indexPostController = async (req, res) => {
    students = new studentSchema({

        studentProfileImage:    req.files['profileImage'][0].path,
        studentSign:            req.files['signature']   [0].path,
        studentDocuments:       req.files['documents']   [0].path,

        courseName: req.body.course,
        admissionThrough: req.body.AdmissionThrough,
        branch: req.body.branches,
        applicationFor: req.body.classes,
        
        surname: req.body.sur_name,
        firstName: req.body.first_name,
        fatherName: req.body.father_name,
        motherName: req.body.mother_name,
        dateOfBirth: req.body.dob,
        
        gender: req.body.Gender,
        village:req.body.birthPlace,
        taluka:req.body.taluka,
        district:req.body.dist,
        state:req.body.state,
        ABCID:req.body.abcId,
        AadharNo:req.body.aadhar,
        email:req.body.email,
        nationality:req.body.nationality,
        religion:req.body.religion,
        category:req.body.category,
        caste:req.body.caste,
        address:req.body.address,
        studentContact:req.body.studentContact,
        parentsContact:req.body.parentsContact

    })

    const studentIsCreated = await students.save()
    res.send("saved")
}



module.exports = {indexController,indexPostController}
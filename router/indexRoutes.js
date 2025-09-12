const express = require("express");
const router = express.Router();
// const {loggedinUserOnly} = require('../middleware/authMiddlewares')

// Using middleware for get student profileImage, signature, documents
const upload = require("../middleware/indexMiddleware");
const docUploader = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: 'documents', maxCount: 16 }
]);

// Importing student schema from models folder
const studentSchema = require("../models/studentModels");

// Required fields validation mapping
const requiredFields = {
    course: 'Course',
    AdmissionThrough: 'Admission Through',
    classes: 'Class',
    branch: 'Branch',
    sur_name: 'Surname',
    first_name: 'First Name',
    father_name: 'Father Name',
    mother_name: 'Mother Name',
    dob: 'Date of Birth',
    Gender: 'Gender',
    Village: 'Village',
    Taluka: 'Taluka',
    District: 'District',
    State: 'State',
    abcid: 'ABC ID',
    Aadhar: 'Aadhar Number',
    Email: 'Email',
    Nationality: 'Nationality',
    Religion: 'Religion',
    Category: 'Category',
    Caste: 'Caste',
    Address: 'Address',
    StudentMN: 'Student Mobile Number',
    pcontact: 'Parent Contact Number'
};

// Validation function for required fields
const validateRequiredFields = (body) => {
    const missingFields = [];
    
    for (const [fieldKey, fieldName] of Object.entries(requiredFields)) {
        if (!body[fieldKey] || body[fieldKey].toString().trim() === '') {
            missingFields.push(`Please enter ${fieldName}`);
        }
    }
    
    return missingFields;
};

// Validation function for files
const validateRequiredFiles = (files) => {
    const missingFiles = [];
    
    if (!files['profileImage'] || files['profileImage'].length === 0) {
        missingFiles.push('Please upload Profile Image');
    }
    
    if (!files['signature'] || files['signature'].length === 0) {
        missingFiles.push('Please upload Signature');
    }
    
    if (!files['documents'] || files['documents'].length === 0) {
        missingFiles.push('Please upload at least one Document');
    }
    
    return missingFiles;
};

// POST route for creating student
router.post("/", docUploader, async (req, res) => {
    try {
        // Destructure request body
        const {
            course,
            AdmissionThrough,
            classes,
            branch,
            sur_name,
            first_name,
            father_name,
            mother_name,
            dob,
            Gender,
            Village,
            Taluka,
            District,
            State,
            abcid,
            Aadhar,
            Email,
            Nationality,
            Religion,
            Category,
            Caste,
            Address,
            StudentMN,
            pcontact
        } = req.body;

        // Validate required fields
        const fieldValidationErrors = validateRequiredFields(req.body);
        
        // Validate required files
        const fileValidationErrors = validateRequiredFiles(req.files);
        
        // Combine all validation errors
        const allErrors = [...fieldValidationErrors, ...fileValidationErrors];
        
        if (allErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: allErrors
            });
        }

        // Extract file paths safely
        const studentProfile = req.files['profileImage'][0].path;
        const studentSignature = req.files['signature'][0].path;
        const studentDoc = req.files['documents'];

        // Create new student instance
        const students = new studentSchema({
            courses: course,
            addmissionThrough: AdmissionThrough,
            class: classes,
            branch: branch,
            surname: sur_name,
            firstName: first_name,
            fatherName: father_name,
            motherName: mother_name,
            dateOfBirth: dob,
            gender: Gender,
            village: Village,
            taluka: Taluka,
            dist: District,
            state: State,
            abcId: abcid,
            aadharNo: Aadhar,
            email: Email,
            nationality: Nationality,
            religion: Religion,
            category: Category,
            caste: Caste,
            address: Address,
            studentContact: StudentMN,
            parentsContact: pcontact,
            studentProfileImage: studentProfile,
            studentSign: studentSignature,
            studentDocuments: studentDoc.map(doc => doc.path)
        });

        // Save student to database
        const studentIsCreated = await students.save();
        
        // Success response
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: {
                studentId: studentIsCreated._id,
                name: `${first_name} ${sur_name}`
            }
        });

    } catch (error) {
        console.error('Error creating student:', error);
        
        // Handle specific MongoDB validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Database validation failed',
                errors: validationErrors
            });
        }
        
        // Handle duplicate key errors
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyPattern)[0];
            return res.status(409).json({
                success: false,
                message: `${duplicateField} already exists`,
                errors: [`This ${duplicateField} is already registered`]
            });
        }
        
        // Generic server error
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            errors: ['Something went wrong while creating student record']
        });
    }
});

// GET route for accessing home page
router.get("/", (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error('Error rendering index page:', error);
        res.status(500).json({
            success: false,
            message: 'Error loading page'
        });
    }
});

// Exporting router
module.exports = router;
const express = require("express");
const router = express.Router();

// Using middleware for get student profileImage, signature, documents
const upload = require("../middleware/indexMiddleware");
const docUploader = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: 'documents', maxCount: 16 }
]);

// Importing student schema from models folder
const studentSchema = require("../models/studentModels");


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
            parentsContact: pcontact
        });

        // Save profile image if provided
        if (req.files && req.files['profileImage']) {
            students.studentProfileImage = {
                data: req.files['profileImage'][0].buffer,
                contentType: req.files['profileImage'][0].mimetype,
                filename: req.files['profileImage'][0].originalname
            };
        }

        // Save signature if provided
        if (req.files && req.files['signature']) {
            students.studentSign = {
                data: req.files['signature'][0].buffer,
                contentType: req.files['signature'][0].mimetype,
                filename: req.files['signature'][0].originalname
            };
        }

        // Save documents if provided
        if (req.files && req.files['documents']) {
            students.studentDocuments = req.files['documents'].map(doc => ({
                data: doc.buffer,
                contentType: doc.mimetype,
                filename: doc.originalname
            }));
        }

        // Save student to database
        const CreatedStudent = await students.save();

        // Success response
        res.status(200).render("indexPopup", {
            success: true,
            message: `Student ${first_name} ${sur_name} created successfully`,
            data: CreatedStudent
        });

        // console.log("Data saved successfully: ", CreatedStudent);

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
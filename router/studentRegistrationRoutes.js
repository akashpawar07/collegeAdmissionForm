const express = require("express");
const router = express.Router();
const { preventLoggedinUser } = require('../middleware/authMiddlewares')
const studentSchema = require("../models/studentModels");

// Using middleware for get student profileImage, signature, documents
const upload = require("../middleware/indexMiddleware");
const docUploader = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: 'documents', maxCount: 16 }
]);


// POST route for creating student
router.post("/", docUploader, async (req, res) => {
    try {
        // Destructure request body
        const {
            applicationId,
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
            BloodGroup,
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
            pcontact,
            profileImageBase64, // <--- GRABBING HIDDEN IMAGE DATA
            signatureBase64     // <--- GRABBING HIDDEN SIGNATURE DATA
        } = req.body;

        // Create new student instance 
        const students = new studentSchema({
            applicationId: applicationId,
            courses: course,
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
            bloodGroup: BloodGroup,
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

        // -------------------------------------------------------------
        // 1. SAVE PROFILE IMAGE (Check standard file upload first, then Base64 fallback)
        // -------------------------------------------------------------
        if (req.files && req.files['profileImage'] && req.files['profileImage'].length > 0) {
            students.studentProfileImage = {
                data: req.files['profileImage'][0].buffer,
                contentType: req.files['profileImage'][0].mimetype,
                filename: req.files['profileImage'][0].originalname
            };
        } else if (profileImageBase64) {
            // Convert Base64 string back to binary Buffer
            const base64Data = profileImageBase64.replace(/^data:image\/\w+;base64,/, "");
            const mimeTypeMatch = profileImageBase64.match(/^data:(image\/\w+);base64,/);
            const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';

            students.studentProfileImage = {
                data: Buffer.from(base64Data, 'base64'),
                contentType: mimeType,
                filename: 'profile_restored.jpg'
            };
        }

        // -------------------------------------------------------------
        // 2. SAVE SIGNATURE (Check standard file upload first, then Base64 fallback)
        // -------------------------------------------------------------
        if (req.files && req.files['signature'] && req.files['signature'].length > 0) {
            students.studentSign = {
                data: req.files['signature'][0].buffer,
                contentType: req.files['signature'][0].mimetype,
                filename: req.files['signature'][0].originalname
            };
        } else if (signatureBase64) {
            // Convert Base64 string back to binary Buffer
            const base64Data = signatureBase64.replace(/^data:image\/\w+;base64,/, "");
            const mimeTypeMatch = signatureBase64.match(/^data:(image\/\w+);base64,/);
            const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';

            students.studentSign = {
                data: Buffer.from(base64Data, 'base64'),
                contentType: mimeType,
                filename: 'signature_restored.jpg'
            };
        }

        // -------------------------------------------------------------
        // 3. SAVE DOCUMENTS
        // -------------------------------------------------------------
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


// PATCH route to update student status
router.patch("/update-status/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const { status } = req.body; // "Approved", "Rejected", or "Pending"

        // Find the student by ID and update their status field
        const updatedStudent = await studentSchema.findByIdAndUpdate(
            studentId,
            { status: status },
            { new: true } // Returns the updated document
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        console.log(`Student ${studentId} status updated to ${status}`);
        res.status(200).json({ success: true, message: "Status updated successfully" });

    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});





// GET route for accessing home page
router.get("/", preventLoggedinUser, (req, res) => {
    try {
        res.render('student-registration');
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
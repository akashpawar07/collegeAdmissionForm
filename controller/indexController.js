const mongoose = require('mongoose');
const StudentSchema = require("../models/studentModels");
const fs = require('fs').promises;

const indexController = (req, res) => {
    res.render('index');
};


const indexPostController = async (req, res) => {
    try {
        // Validate required fields
        const requiredFields = [
            'course', 'first_name', 'sur_name', 'email', 
            'studentContact', 'aadhar', 'dob'
        ];
        
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ 
                    error: `Missing required field: ${field}` 
                });
            }
        }

        // Validate file uploads
        if (!req.files || 
            !req.files['profileImage'] || 
            !req.files['signature'] || 
            !req.files['documents']) {
            return res.status(400).json({ 
                error: 'Missing required file uploads' 
            });
        }

        // Sanitize and validate input data
        const studentData = {
            // File paths
            studentProfileImage: req.files['profileImage'][0].path,
            studentSign: req.files['signature'][0].path,
            studentDocuments: req.files['documents'][0].path,

            // Course and Admission Details
            courseName: req.body.course,
            admissionThrough: req.body.AdmissionThrough,
            branch: req.body.branches,
            applicationFor: req.body.classes,
            
            // Personal Information
            surname: req.body.sur_name,
            firstName: req.body.first_name,
            fatherName: req.body.father_name,
            motherName: req.body.mother_name,
            dateOfBirth: req.body.dob,
            
            // Additional Details
            gender: req.body.Gender,
            village: req.body.birthPlace,
            taluka: req.body.taluka,
            district: req.body.dist,
            state: req.body.state,
            ABCID: req.body.abcId,
            AadharNo: req.body.aadhar,
            email: req.body.email.toLowerCase(), // Normalize email
            nationality: req.body.nationality,
            religion: req.body.religion,
            category: req.body.category,
            caste: req.body.caste,
            address: req.body.address,
            studentContact: req.body.studentContact,
            parentsContact: req.body.parentsContact
        };

        // Create new student record
        const newStudent = new StudentSchema(studentData);
        
        // Save student and handle potential database errors
        const savedStudent = await newStudent.save();
        
        // Send successful response
        res.status(201).json({ 
            message: 'Student record created successfully', 
            studentId: savedStudent._id 
        });

    } catch (error) {
        // Handle different types of errors
        console.error('Student registration error:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: error.errors 
            });
        }

        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({ 
                error: 'A student with this email or contact already exists' 
            });
        }

        // Generic server error
        res.status(500).json({ 
            error: 'Internal server error', 
            message: 'Could not complete student registration' 
        });
    }
};

module.exports = { indexController, indexPostController };
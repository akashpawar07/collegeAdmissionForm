# Project Documentation: SYCET Admission Portal (Campus-Connect)

🚀 **Live Project Link:** [SYCET Admission Portal](https://sycet-collegeadmissionform-in.onrender.com/)

## 1. Project Overview
The **SYCET Admission Portal** is a comprehensive, end-to-end digital admission system designed for Shreeyash College of Engineering & Technology. It transforms the traditional, paper-based admission process into a seamless, multi-step online experience.

## 2. Technology Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Storage:** Browser `sessionStorage`, Base64 image encoding, Multer

## 3. System Architecture & DFD

### System Architecture
The following diagram illustrates the structural flow between the Client (Frontend), Application Server (Backend), and the Database.

![System Architecture Diagram](images/system-architecture.jpg)

### Data Flow Diagram (Level 0)
Below is the Context Level Data Flow Diagram illustrating the interaction between the Student, the Admin, and the System.

![System Context DFD](images/system-dfd.png)

## 4. Key Features & Functionalities

### 🎓 For Students
* **Guided Registration Flow:** Clear, step-by-step guidelines ensure students have all necessary documents ready before starting.
  
  ![Registration Guidelines](images/registration-guidelines.png)

* **Smart ID Card Generation:** Upon successful submission, the system auto-generates a professional digital ID card with the student's photo and details.
  
  ![ID Card Preview](images/id-card-preview.png)

* **Other Features:**
    * Auto-Save & Session Persistence
    * Dynamic Application ID Generation
    * Smart Document Ledger with Validation

### 🛡️ For Administrators
* **Secure Login:** A protected entry point for college staff to access the dashboard.
  
  ![Admin Login](images/admin-login.jpg)

* **Admin Dashboard:** (Features include Live Statistics, Applicant Review System, Approval Workflow, and Search & Filter).

## 5. System Workflow
1. **Initiation:** Student reviews guidelines and starts the form.
2. **Data Entry:** Personal, academic, and document details are entered and saved to `sessionStorage`.
3. **Verification:** System validates 31 data points before submission.
4. **Completion:** Student receives their Digital ID Card and Printable Admission Form.
5. **Admin Review:** Admin logs in to approve or reject the application.

## 6. Future Scope
* **Email/SMS Integration:** Automated alerts for status updates.
* **Payment Gateway:** Online fee payment.
* **Data Export:** Excel/CSV export for university records.

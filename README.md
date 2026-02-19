# Project Documentation: SYCET Admission Portal (Campus-Connect)

🚀 **Live Project Link:** [SYCET Admission Portal](https://sycet-collegeadmissionform-in.onrender.com/)

## 1. Project Overview
The **SYCET Admission Portal** is a comprehensive, end-to-end digital admission system designed for Shreeyash College of Engineering & Technology. It transforms the traditional, paper-based admission process into a seamless, multi-step online experience. The system handles student data collection, document uploads, legal undertakings, ID card generation, and provides a robust Admin Dashboard for application management.

## 2. Technology Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Storage / State Management:** Browser `sessionStorage` for temporary state, Base64 image encoding, Multer for backend file handling
* **UI/UX Icons:** FontAwesome

## 3. Key Features & Functionalities

### For Students (User Facing):
* **Multi-Step Application Flow:** A guided, 4-step process (Registration -> Student Undertaking -> Fees Undertaking -> ID Card).
* **Auto-Save & Session Persistence:** Utilizes `sessionStorage` to save inputs in real-time. Students can navigate back and forth without losing any typed data or uploaded images.
* **Dynamic Application ID:** Auto-generates a unique, tracking ID (e.g., `SYCET-2026123456`) upon starting the form.
* **Smart Document Ledger:** A responsive, grid-based UI for uploading 16 different academic and personal documents, equipped with strict file-size validation (50KB for images, 100KB for documents).
* **Live Previews:** Users can generate a live preview modal of their entire application before submitting.
* **Printable A4 Application:** Upon success, the portal generates a pixel-perfect, 2-page formal A4 document using CSS print media queries, combining all data, photos, and legal undertakings.
* **Comprehensive Validation:** A final, strict validation check runs on 31 distinct data points before database submission to ensure zero incomplete applications are submitted.

### For Administrators (Admin Facing):
* **Secure Admin Dashboard:** A protected portal for college staff to review incoming applications.
* **Live Statistics:** Real-time counters showing Total Applications and breakdowns by course (B.Tech, M.Tech, MBA).
* **Applicant Review System:** Admins can open a detailed modal to view the student's complete profile, contact details, and uploaded signature/photo.
* **Approval/Rejection Workflow:** One-click functionality to update a student's admission status in the database natively from the dashboard.
* **Search & Filter:** A debounced search bar to instantly find students by Name, Application ID, Course, or Branch.

## 4. System Workflow
1. **Initiation:** The student opens the Registration Form. A unique Application ID and the current Academic Year are dynamically generated.
2. **Data Entry:** The student fills in personal, academic, and document details. Everything is saved to `sessionStorage` instantly.
3. **Undertakings:** The student navigates to the Student and Fees Undertaking pages. Checkboxes and digital signatures are logged.
4. **Final Review & ID Card:** The system compiles the data into a Digital ID Card preview. Upon clicking "Submit", a final loop checks all 31 required keys.
5. **Database Submission:** Data is sent to the Node.js backend. Images are passed either via `multipart/form-data` or safely restored from Base64 fallback strings.
6. **Success & Print:** The session is cleared, and the user is prompted to print their official Admission Document.
7. **Admin Processing:** The application appears on the Admin Dashboard for final review and approval.

## 5. Database Schema Highlights (MongoDB)
* **Unique Identifiers:** `applicationId` (String, Unique).
* **Personal Info:** Name, DoB, Gender, Blood Group, Address, Mobile, Email.
* **Academic Info:** Course, Branch, Admission Type, Class.
* **Status Tracking:** `status` field with Enum (`"Pending"`, `"Approved"`, `"Rejected"`).
* **Binary Storage:** Profile Image, Signature, and Documents are securely stored as `Buffer` data with their respective Content-Types.

## 6. Future Scope / Enhancements
* **Email/SMS Integration:** Send automated confirmation emails to students upon successful submission and status changes (Approved/Rejected).
* **Payment Gateway Integration:** Allow students to pay their proposed admission fees directly through the portal.
* **Export Feature:** Enable Admins to export the dashboard data to Excel/CSV for offline university records.

## Project Architecture and Screenshorts

### Registration Guidelines : Landing Page
<img width="1706" height="876" alt="Image" src="https://github.com/user-attachments/assets/b6bdb83e-516f-4f1d-92c4-2547a902b9cf" />

### Admin Login
<img width="1906" height="872" alt="Image" src="https://github.com/user-attachments/assets/4f1ebf37-bb2e-4924-a61b-d67a60366dcf" />

### Admin Dashboard


### System Generated ID-Card
<img width="771" height="657" alt="Image" src="https://github.com/user-attachments/assets/ab4b25cb-4d97-4787-9be2-da326bc727ff" />


### System Context DFD
<img width="1298" height="523" alt="Image" src="https://github.com/user-attachments/assets/baa3eb88-0960-43f1-9e2e-44ab9cd7191d" />

### System Architecture Diagram
<img width="3155" height="3712" alt="Image" src="https://github.com/user-attachments/assets/d2b34ac9-ed6c-4807-92d3-03f844acf455" />



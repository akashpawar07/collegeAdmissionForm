const multer = require("multer")

///////////////// NEW MIDDLEWARE  \\\\\\\\\\\\\ \\\\\\\\\\\\\\\

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    // File filter to specify which types of files should be accepted
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg') {
            cb(null, true)
        } else if (file.mimetype === "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error("Only supports JPG, JPEG, PNG and PDF files!"), false)
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
})
// exporting middleware module
module.exports = upload


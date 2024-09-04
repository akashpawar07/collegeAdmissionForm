const path = require("path")
const multer = require("multer")
const { error } = require("console")

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "profileImage") {
            return cb(null, "./uploads/profileImage")

        } else if (file.fieldname === "signature") {
            return cb(null, "./uploads/sign")

        } else if (file.fieldname === "documents") {
            return cb(null, "./uploads/studentDocs")
        }
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
     storage: storage,
    // this is specifies the which type of file should be stored in database
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            cb(null, true)
        } else if (file.mimetype === "applications /pdf") {
            cb(null, true)
        } else {
            cb(" -- Only supports JPG, JPEG,PNG and PDF file ! ", false)
        }
    },
    limits: {fileSize: 1024 * 1024 * 5}
})
// exporting indexmiddleware module
module.exports = upload
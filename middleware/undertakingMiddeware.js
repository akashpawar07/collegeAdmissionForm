const multer = require("multer")


/////////////////////////// OLD MIDDLEWARE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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




/////////////////////////// OLD MIDDLEWARE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if (file.fieldname === "guardianSign") {
//             return cb(null, "./uploads/parentsSignature")
//         }
//         else if (file.fieldname === "studentSign"){
//             return cb(null, "./uploads/parentsSignature")
//         }
//     },
//     filename: (req, file, cb) => {
//         return cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })

// const Upload = multer({
//      storage: storage,
//     // this is specifies the which type of file should be stored in database
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'application/pdf')
//          {
//             cb(null, true)
//         }
//     },
//     limits: { fileSize: 1024 * 1024 * 5}
// })


module.exports = upload
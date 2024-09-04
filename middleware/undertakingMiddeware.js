const path = require("path")
const multer = require("multer")
const { error } = require("console")

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "guardianSign") {
            return cb(null, "./uploads/parentsSignature")
        }
        else if (file.fieldname === "studentSign"){
            return cb(null, "./uploads/parentsSignature")
        }
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const Upload = multer({
     storage: storage,
    // this is specifies the which type of file should be stored in database
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'application/pdf')
         {
            cb(null, true)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})


module.exports = Upload
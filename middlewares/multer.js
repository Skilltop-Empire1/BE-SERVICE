const multer = require("multer")
const path = require("path")

const storage =  multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'..','/utils/image'))
    },
    filename:function(req,file,cb){
        const timestamp = Date.now()
        const cleanFileName = file.originalname.replace(/\s+/g, '-')
        cb(null,`${timestamp}-${cleanFileName}`)
    }
})

const fileFilter = function(req,file,cb){
    const ext = path.extname(file.originalname).toLowerCase()
    if(ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png"){
        return cb(new Error("File type is not supported",false))
    }
    cb(null,true)
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:5*1024*1024}
})

module.exports = upload
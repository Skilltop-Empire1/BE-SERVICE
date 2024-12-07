const nodemailer = require("nodemailer")


let mailTransporter = nodemailer.createTransport({
    host:"mail.skilltopims.com",
    secure:false,
    port:587,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },
    tls:{
        rejectUnauthorized:false
    }
})
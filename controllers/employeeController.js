const nodemailer = require("nodemailer")
const {User} = require("../models")
const genePass = require("../utils/geneatePassword")
const bcrypt = require("bcryptjs")
const cloudinary = require("../config/cloudinary")

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
exports.addEmployee = async (req,res) => {
    const {userId} = req.user

    const {firstName,lastName,email,role,dept,type,status,task,desc,note} = req.body
    try {
       let profileUrl = null
       if(req.file){
        const result =  await cloudinary.Uploader.upload(req.file.path,{
            folder:"image",
            width:300,
            crop:"scale"
        })
        profileUrl = result.url
       } 
       const createEmployee = await User.create({
        firstName,
        lastName,
        email,
        password:"",
        role,
        department:dept,
        employeeType:type,
        status,
        currentTask:task,
        additionalNotes:note,
        profileUrl
       })
       res.status(201).json({msg:"Employee has been added successfully"})
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
}


exports.inviteEmployee = async(req,res) =>{
    const {email} = req.body
    try {
        const userExist = await User.findOne({where:{email}})
        if(!userExist) return res.status(404).json({msg:"Email already exists"})
        const geneatePassword = genePass()
        console.log("pass",geneatePassword)
        const hashedPassword = await bcrypt.hash(geneatePassword,10)
        const createUser = await userExist.update({
            password:hashedPassword
    })
    let mailOption = {
        from:process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to the Company!",
        text: `Hi ${userExist.lastName},\n\nYour account has been created. Your login credentials are:\n\nEmail: ${email}\nPassword: ${geneatePassword}\n\nPlease log in and update your password.\n\nThank you!`,
      }
    
    mailTransporter.sendMail(mailOption);
        res.status(200).json({msg:"password generated successfully"})
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
}
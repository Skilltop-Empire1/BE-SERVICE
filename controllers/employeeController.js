const nodemailer = require("nodemailer")
const {User, Organization} = require("../models")
const genePass = require("../utils/geneatePassword")
const bcrypt = require("bcryptjs")
const cloudinary = require("../config/cloudinary")
const { Op } = require("sequelize")
const employeeValidation = require("../validations/employeeValidation")
const fs = require("fs")

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
    const user = await User.findByPk(userId)
    if(!user) return res.status(404).json({msg:"user not found"})
    const orgId = user.orgId
    const {firstName,lastName,email,role,dept,type,status,task,note,phoneNo} = req.body
    const {error} = employeeValidation.validate(req.body)
    if(error){
        return res.status(400).json(error.details[0].message)
    }

    try {
        const emailExist = await User.findOne({where:{email}})
        if(emailExist) return res.status(400).json({message:`A user with this email:${email} already exist`})
        
       let profileUrl = null
       if(req.file){
        const result =  await cloudinary.uploader.upload(req.file.path,{
            folder:"image",
            width:300,
            crop:"scale"
        })
        console.log("url",result.url)
        profileUrl = result.url
        fs.unlinkSync(req.file.path)
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
        profileUrl,
        phoneNo,
        orgId
       })
       res.status(201).json({msg:"Employee has been added successfully",data:createEmployee})
    } catch (error) {
        console.log("error",error.message)
        res.status(500).json({msg:error.message})
    }
}


exports.inviteEmployee = async(req,res) =>{
    const {email} = req.body
    try {
        console.log("pass")
        const userExist = await User.findOne({where:{email}})
        if(!userExist) return res.status(404).json({msg:"Email already does not exists"})
        console.log("user",userExist)
        const generatedPassword = genePass()
        console.log("pass",generatedPassword)
        const hashedPassword = await bcrypt.hash(generatedPassword,10)
        const createUser = await userExist.update({
            password:hashedPassword
    })
    let mailOption = {
        from:process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to the Company!",
        text: `Hi ${userExist.dataValues.lastName},\n\nYour account has been created. Your login credentials are:\n\nEmail: ${email}\nPassword: ${generatedPassword}\n\nPlease log in and update your password.\n\nThank you!`,
      }
    
    mailTransporter.sendMail(mailOption);
    res.status(200).json({msg:"password generated successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg:error.msg})
    }
}

exports.getAllEmployees = async (req,res) => {
    try {
        const {userId} = req.user
        const user = await User.findByPk(userId)
        if(!user) return res.status(404).json({msg:"user not found"})
        const orgId = user.orgId
        const getEmployees = await User.findAll({where:{orgId}})
        res.status(200).json({getEmployees})
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
}

exports.getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });
        const getEmployee = await User.findByPk(id);
        if (!getEmployee) return res.status(404).json({ msg: "Employee not found" });
        res.status(200).json({ data: getEmployee });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    const { firstName, lastName, email, role, dept, type, status, task, note,phoneNo } = req.body;
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });
        const employee = await User.findByPk(id);
        if (!employee) return res.status(404).json({ msg: "Employee not found" });
        let profileUrl = employee.profileUrl;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "image",
                width: 300,
                crop: "scale",
            });
            profileUrl = result.secure_url;
        }
        const updatedEmployee = await employee.update({
            firstName: firstName || employee.firstName,
            lastName: lastName || employee.lastName,
            email: email || employee.email,
            role: role || employee.role,
            department: dept || employee.department,
            employeeType: type || employee.employeeType,
            status: status || employee.status,
            currentTask: task || employee.currentTask,
            additionalNotes: note || employee.additionalNotes,
            phoneNo: phoneNo || employee.phoneNo,
            profileUrl,
        });
        res.status(200).json({ msg: "Employee updated successfully", data: updatedEmployee });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await User.findByPk(id);
        if (!employee) return res.status(404).json({ msg: "Employee not found" });
        await User.destroy({ where: { id } });
        res.status(200).json({ msg: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.searchEmployee = async (req,res) => {
    const {
        firstName,
        lastName,
        dept,
        phoneNo,
        sort,
        limit,
        page
    } = req.query
    try {
        const {userId} = req.user
        const user = await User.findByPk(userId)
        if(!user) return res.status(404).json("user not found")
        const orgId = user.orgId
        const employeeFilter = {orgId}
        if(firstName){
            employeeFilter.firstName = {[Op.iLike]:`%${firstName}`}
        }
        if(lastName){
            employeeFilter.lastName = {[Op.iLike]:`%${lastName}`}
        }
        if(dept){
            employeeFilter.department = dept
        }
        if(phoneNo){
            employeeFilter.phoneNo = phoneNo
        }
        let order = []
        if(sort){
            const [key,direction] = sort.split(':')
            order.push([key,direction.toUpperCase()])
        }
        const employeePerPage = limit? parseInt(limit) :10
        const currentPage = page? parseInt(page) : 1
        const offSet = (currentPage-1)*employeePerPage

        const searchEmployees = await User.findAll({
            where:employeeFilter,
            order,
            limit:employeePerPage,
            offSet
        })
        res.status(200).json(searchEmployees)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

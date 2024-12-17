const {Task,Service,User} = require("../models")
const cloudinary = require("../config/cloudinary")
const taskValiadtion = require("../validations/taskValidation")


const createTask = async function (req,res) {
    const {title,servName,email,priority,dueDate,taskStatus,desc} = req.body
    const {error} = taskValiadtion.validate(req.body)
    if(error){
        return res.status(404).json(error.details[0].message)
    }
    const serviName = await Service.findOne({where:{serviceName:servName}})
    if(!serviName){
        res.status(404).json({msg:"Service name not found"})
    }
    const assigned = await User.findOne({where:{email}})
    if(!assigned){
        res.status(404).json({msg:"AssignTo not found"})
    }
try {
    let fileUrl = null
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"image",
            width:300,
            crop:"scale"
        })
        fileUrl = result.url
    }    
    const task = await Task.create({
            taskTitle:title,
            service:serviName.serviceId,
            assignTo:assigned.userId,
            priority,
            dueDate,
            taskStatus,
            description:desc,
            fileUrl
        })
        res.status(201).json(task)
   
} catch (error) {
    res.status(500).json({"msg":error.message})
}
}

const getAllTask = async function (req,res){
    try {
        const tasks = await Task.findAll()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getTask = async function (req,res){
    try {
        const {id} =  req.params
        const task = await Task.findByPK(id)
        if(!task) return res.status(404).json({msg:"task not found"})
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const editTask = async function (req,res){
    const {title,servName,email,priority,dueDate,taskStatus,desc} = req.body
   try {
    const {id} = req.params
    const task = await Task.findByPK(id)
    if(!task) return res.status(404).json({msg:"Task not found"})
    const assigned = await User.findOne({where:{email}})
    const serviName = await Service.findOne({where:{serviceName:servName}})
    if(!assigned) return res.status(404).json({msg:"Assined to not found"})
    const fileUrl = task.fileUrl
    if(req.file){
        const result = await cloudinary.Uploader.upload(req.file.path,{
            folder:"image",
            width:300,
            crop:"scale"
        })
        fileUrl = result.url
    }
    const updateTask = await task.update({
        taskTitle:title || task.taskTitle,
        service:serviName.serviceId || task.service,
        assignTo:assigned.userId || task.assignTo,
        priority:priority || task.priority,
        dueDate:dueDate || task.dueDate,
        taskStatus:taskStatus || task.taskStatus,
        description:desc || task.description,
        fileUrl:fileUrl || task.fileUrl
})
    res.status(201).json({msg:"Task updated successfully",data:updateTask})
   } catch (error) {
    
   }
}

const deleteTask = async function (req,res){
    try {
        const {id} = req.params
        const task = await Task.destroy({where:{id}})
        if(!task) return res.status(404).json({msg:"Id not found"})
        res.status(200).json({msg:"task deleted successfully"})
    } catch (error) {
        res.status(500).json(error.message)  
    }
}
module.exports = {
    createTask,
    getAllTask,
    getTask,
    editTask,
    deleteTask
}
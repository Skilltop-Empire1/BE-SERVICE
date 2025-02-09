const {Task,Service,User} = require("../models")
const cloudinary = require("../config/cloudinary")
const taskValiadtion = require("../validations/taskValidation")
const { notifyUser, notifyUsers } = require("../controllers/notificationsController")




const createTask = async function (req,res) {
    const {taskTitle,servName,email,priority,dueDate,taskStatus,desc} = req.body
    const {error} = taskValiadtion.validate(req.body)
    if(error){
        return res.status(404).json(error.details[0].message)
    }
    const serviName = await Service.findOne({where:{serviceName:servName}})
    console.log("SER",serviName)
    if(!serviName){   
        res.status(404).json({msg:"Service name not found"})
    }
    const assigned = await User.findOne({where:{email}})
    console.log("assign",assigned)
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
            taskTitle:taskTitle,
            serviceId:serviName.serviceId,
            userId:assigned.userId,
            priority,
            dueDate,
            taskStatus,
            description:desc,
            fileUrl
        })
//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]     JAMES CODE  ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
        const assigner = req.user; 
        console.log("assigner is ======================", assigner);
        console.log("assignee", assigned);

// Define messages for each group (you can further customize these)
const assignerMessage = `You assigned a new task "${task.taskTitle}" to ${assigned.email}.`;
const assigneeMessage = `You have been assigned a new task: "${task.taskTitle}" by ${assigner.email}.`;
const generalMessage = `New task created: "${task.taskTitle}", assigned to "${assigned.email}".`;


// Notify assigner (if needed and if not the same as assignee)
if (assigner.userId !== assigned.userId) {
    await notifyUser(assigner.userId, assignerMessage, { type: "taskAssignment", task });
  }

// Notify assignee
await notifyUser(assigned.userId, assigneeMessage, { type: "taskAssignment", task });


// Notify every member (you might want to exclude duplicates if desired)
const allUsers = await User.findAll({ attributes: ["userId"] });
const allUserIds = allUsers.map((u) => u.userId);
await notifyUsers(allUserIds, generalMessage, { type: "taskAssignment", task });

//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
        res.status(201).json(task)
   
} catch (error) {
    res.status(500).json({"msg":error.message})
}
}

const getAllTask = async function (req,res){
    try {
        const tasks = await Task.findAll({
            include:[{
                model:Service,
                attributes:['serviceId','serviceName']
            },{
                model:User,
                attributes:['userId','firstName','lastName','phoneNo']
            }
        ],
        })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getTask = async function (req,res){
    try {
        const {id} =  req.params
        const task = await Task.findByPk(id,{
            include:[{
                model:Service,
                attributes:['serviceId','serviceName']
            },{
                model:User,
                attributes:['userId','firstName','lastName','phoneNo']
            }
        ],
        })
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

//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
const updater = req.user;
const assignee = await User.findByPk(updateTask.userId);

// Prepare messages
const updaterMessage = `You updated the task "${updateTask.taskTitle}".`;
const assigneeMessage =
  updater.userId === assignee.userId
    ? `You have updated your task status for "${updateTask.taskTitle}".`
    : `${updater.email} has updated your task status for "${updateTask.taskTitle}".`;
const generalMessage = `Task "${updateTask.taskTitle}" assigned to ${assignee.email} has been updated.`;

// Notify the assignee
await notifyUser(assignee.userId, assigneeMessage, { type: "taskUpdate", task: updateTask });

// Notify the updater if different from the assignee
if (updater.userId !== assignee.userId) {
  await notifyUser(updater.userId, updaterMessage, { type: "taskUpdate", task: updateTask });
}

// Notify all users 
const allUsers = await User.findAll({ attributes: ["userId"] });
const allUserIds = allUsers
  .map((u) => u.userId)
  .filter((id) => id !== updater.userId && id !== assignee.userId); // Avoid duplicate notifications

await notifyUsers(allUserIds, generalMessage, { type: "taskUpdate", task: updateTask });
//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]


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
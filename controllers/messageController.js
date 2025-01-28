const { Message } = require("../models")


exports.createMessage = async(req,res) =>{
    const {chatId,senderId,content} = req.body
   
    try {
        const message = await Message.create({
            chatId,
            senderId,
            content
        }) 
        res.status(200).json({"msg created":message}) 
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

exports.getMessages = async (req,res) =>{
    const {chatId} = req.params
    try {
        const message = await Message.findAll({
            where:{chatId}
        })
        res.status(200).json({"msg":message})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}
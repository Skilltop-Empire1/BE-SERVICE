// const { Message } = require("../models")


// exports.createMessage = async(req,res) =>{
//     const {chatId,senderId,content} = req.body
   
//     try {
//         const message = await Message.create({
//             chatId,
//             senderId,
//             content
//         }) 
//         res.status(200).json({"msg created":message}) 
//     } catch (error) {
//         console.log(error)
//         res.status(500).json("Internal server error")
//     }
// }

// exports.getMessages = async (req,res) =>{
//     const {chatId} = req.params
//     try {
//         const message = await Message.findAll({
//             where:{chatId}
//         })
//         res.status(200).json({"msg":message})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json("Internal Server Error")
//     }
// }

const { Message } = require("../models");

exports.createMessage = async (req, res) => {
  const { chatId, senderId, recipientId, content } = req.body;

  try {
    const message = await Message.create({
      chatId,
      senderId,
      recipientId,
      content,
    });

    res.status(200).json({ message: "Message created", message });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.findAll({
      where: { chatId },
      order: [["sentAt", "ASC"]], // Order by sent time
    });
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Specific Message
exports.getMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark Message as Read
exports.markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    message.read = true;
    await message.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Message
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await message.destroy();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

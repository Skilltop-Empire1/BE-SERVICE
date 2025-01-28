const { User,Message,Chat } = require("../models")
const {Op} = require('sequelize')
// exports.createChat = async(req,res) => {
//     const {firstId, secondId} = req.body
//     try {
//         const chat = await Chat.findOne({
//             // where:{
//             //     senderId:firstId,
//             //     recipientId:secondId
//             // }
//             members:{$all:{firstId,secondId}}
//         })
//         if (chat) return res.status(200).json({"chat exists":chat})
//         const newChat = await Chat.create({
//             memebers:[firstId,secondId]
//     })
// //     const newChat = await Message.create({
// //         senderId:firstId,
// //         recipientId:secondId
// // })
//     const response = newChat.save()
//     res.status(200).json({"new chat created":response})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error)
//     }
// }

exports.createChat = async (req, res) => {
    const { firstId, secondId } = req.body;
  
    try {
      const chat = await Chat.findOne({
        where: {
          members: {
            [Op.contains]: [firstId, secondId],  // Correct Sequelize array query
          }
        }
      });
      if (chat) {
        return res.status(200).json({ message: "Chat already exists", chat });
      }
      const newChat = await Chat.create({
        members: [firstId, secondId],  
      });
  
      res.status(200).json({ message: "New chat created", newChat });
    } catch (error) {
      console.error("Error creating chat:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// exports.findUserChat = async (req,res) => {
//     const {userId} = req.params
//     try {
//        const chat = await Chat.find({
//         memebers:{$in:[userId]}
//        })
//        res.status(200).json(chat)
//     } catch (error) {
//        console.log(error)
//        res.status(500).json(error)
//     }
//    }

exports.findUserChat = async (req, res) => {
    const { userId } = req.params;
    try {
      const chat = await Chat.findAll({
        where: {
          members: {
            [Op.contains]: [userId],  
          },
        },
      });
      res.status(200).json(chat);
    } catch (error) {
      console.error("Error finding user chat:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

//    exports.findChat = async (req,res) => {
//     const {firstId,secondId} = req.params
//     try {
//        const chat = await Chat.findOne({
//         memebers:{$all:[firstId,secondId]}
//        })
//        res.status(200).json(chat)
//     } catch (error) {
//        console.log(error)
//        res.status(500).json(error)
//     }
//    }

exports.findChat = async (req, res) => {
    const { firstId, secondId } = req.params;
    try {
      const chat = await Chat.findOne({
        where: {
          members: {
            [Op.contains]: [firstId, secondId],  // Checks if both IDs exist in the array
          },
        },
      });
  
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
  
      res.status(200).json(chat);
    } catch (error) {
      console.error("Error finding chat:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };




  




exports.findUser = async (req,res) => {
 const userId = req.user.userId
 try {
    const user = await User.findByPk(userId)
    res.status(200).json(user)
 } catch (error) {
    console.log(error)
    res.status(500).json(error)
 }
}

exports.getUsers = async (req,res) => {

    try {
       const users = await User.findAll()
       res.status(200).json(users)
    } catch (error) {
       console.log(error)
       res.status(500).json(error)
    }
   }

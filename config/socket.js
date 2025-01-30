// const {Server} = require("socket.io")
// const onlineUser = []
// const initializeSocket = (server) =>{
//     const io = new Server(server,{
//         cors:{
//             origin:'http://localhost:5173',
//             methods:["POST","GET"],
//             credentials:true
//         }
//     })
//     io.on("connection",(socket) =>{
//         socket.on("register",(userId) =>{
//             onlineUser.some(user =>user.userId === userId) &&
//             onlineUser.push[{
//                 userId,
//                 socketId:socket.id
//             }] 
//             console.log(`User ${userId} connected with socket id: ${socket.id}`);
//         })

//         socket.on("disconnect",() =>{
//             for (const [userId,socketId] of Object.entries(onlineUser)){
//                 if(socketId === socket.id){
//                     delete onlineUser(userId)
//                     console.log(`User ${userId} disconnected`);
//                 }
//             }
//         })
//     })
// return io
    
// }


// const getUserSocketMap = () => userSocketMap



// module.exports = {
//   initializeSocket,
//   getUserSocketMap,
// };






// const { Server } = require("socket.io");
// let onlineUser = [];

// const initializeSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["POST", "GET"],
//       credentials: true,
//     },
//   });
// //listen to new user register
//   io.on("connection", (socket) => {
//     socket.on("register", (userId) => {
//       // Check if userId is not already in the array before adding
//       const isUserOnline = onlineUser.some((user) => user.userId === userId);
//       if (!isUserOnline) {
//         onlineUser.push({
//           userId,
//           socketId: socket.id,
//         });
//         console.log(`User ${userId} connected with socket id: ${socket.id}`);
//       }
//       console.log("onlineUser",onlineUser)
//       io.emit("getOnlineUser",onlineUser)
//     });
// //send new message
//     socket.on("sendMessage",(message)=>{
//       const user = onlineUser.find((user) =>user.userId === message.recipientId)//reciepientId is from the frontend
//       if(user){
//         io.to(user.socketId).emit("getMessage",message)
//         io.to(user.socketId).emit("getNotification",{
//           senderId:message.senderId,
//           isRead:false,
//           date:new Date()
//         })
//       }
//     })

// // receive message

//     socket.on("disconnect", () => {
//       // onlineUser.forEach((user, index) => {
//       //   if (user.socketId === socket.id) {
//       //     console.log(`User ${user.userId} disconnected`);
//       //     onlineUser.splice(index, 1); // Remove the disconnected user
//       //   }
//       // });
//       onlineUser = onlineUser.filter((user)=>user.socketId !== socket.id)
//       io.emit("getOnlineUser",onlineUser)
//     });
//   });

//   return io;
// };


// const getOnlineUsers = () => onlineUser;

// module.exports = {
//   initializeSocket,
//   getOnlineUsers,
// };


const { Server } = require("socket.io");
const { Message, Chat, User } = require("../models");

let onlineUsers = [];

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["POST", "GET"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle user registration (saving socketId)
    socket.on("register", (userId) => {
      if (!onlineUsers.some((user) => user.userId === userId)) {
        onlineUsers.push({ userId, socketId: socket.id });
      }
      io.emit("getOnlineUsers", onlineUsers);
      console.log("User Registered:", onlineUsers);
    });

    // // Send private message
    // socket.on("sendMessage", async ({ senderId, recipientId, chatId, content }) => {
    //   const recipient = onlineUsers.find((user) => user.userId === recipientId);

    //   // Save message to DB
    //   const message = await Message.create({ senderId, chatId, content });

    //   if (recipient) {
    //     io.to(recipient.socketId).emit("getMessage", message);
    //   }

    //   io.to(socket.id).emit("messageSent", message);
    // });
    socket.on("sendMessage", async ({ senderId, recipientId, chatId, content }) => {
      try {
        if (!senderId || !chatId || !content.trim()) {
          return;
        }
    
        const recipient = onlineUsers.find((user) => user.userId === recipientId);
    
        // Save message to DB
        const message = await Message.create({ senderId, chatId, content });
    
        if (recipient) {
          io.to(recipient.socketId).emit("getMessage", message);
        }
    
        io.to(socket.id).emit("messageSent", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
    


    socket.on("createGroup", async ({ userId, groupName, members }) => {
      try {
        // Ensure the group name and members are valid
        if (!groupName || !members || members.length === 0) return;
    
        // Add the creator to the group
        if (!members.includes(userId)) members.push(userId);
    
        // Create the group in the database
        const groupChat = await Chat.create({
          isGroup: true,
          groupName,
          members,
          admins: [userId], // Creator is an admin
        });
    
        // Notify all group members
        members.forEach((memberId) => {
          const recipient = onlineUsers.find((user) => user.userId === memberId);
          if (recipient) {
            io.to(recipient.socketId).emit("newGroupCreated", groupChat);
          }
        });
    
        io.to(socket.id).emit("groupCreated", groupChat);
      } catch (error) {
        console.error(error);
      }
    });

    

    socket.on("joinChat", async ({ userId, chatId }) => {
      try {
        const chat = await Chat.findByPk(chatId);
        if (!chat) return;
    
        // Fetch last 50 messages (modify as needed)
        const messages = await Message.findAll({
          where: { chatId },
          order: [["createdAt", "ASC"]],
          limit: 50,
        });
    
        socket.emit("loadMessages", messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    });




    // // Send message in group chat
    // socket.on("sendGroupMessage", async ({ senderId, chatId, content }) => {
    //   const chat = await Chat.findByPk(chatId);
    //   if (!chat) return;

    //   // Save message to DB
    //   const message = await Message.create({ senderId, chatId, content });

    //   // Notify all group members
    //   chat.members.forEach((memberId) => {
    //     const recipient = onlineUsers.find((user) => user.userId === memberId);
    //     if (recipient) {
    //       io.to(recipient.socketId).emit("getMessage", message);
    //     }
    //   });
    // });
    socket.on("sendGroupMessage", async ({ senderId, chatId, content }) => {
      const chat = await Chat.findByPk(chatId);
      if (!chat || !chat.members.includes(senderId)) return; // Ensure sender is a member
    
      const message = await Message.create({ senderId, chatId, content });
    
      chat.members.forEach((memberId) => {
        const recipient = onlineUsers.find((user) => user.userId === memberId);
        if (recipient) {
          io.to(recipient.socketId).emit("getMessage", message);
        }
      });
    });
    


    socket.on("updateGroupAdmin", async ({ chatId, adminId, targetUserId, action }) => {
      try {
        const chat = await Chat.findByPk(chatId);
        if (!chat) return;
        
        // Ensure only an existing admin can update roles
        if (!chat.admins.includes(adminId)) return;
    
        if (action === "promote" && !chat.admins.includes(targetUserId)) {
          chat.admins = [...chat.admins, targetUserId]; // Properly update array
        } else if (action === "demote" && chat.admins.includes(targetUserId)) {
          // Prevent last admin from being removed
          if (chat.admins.length === 1) return; // Ensure at least one admin remains
          chat.admins = chat.admins.filter((id) => id !== targetUserId);
        }
    
        await chat.save();
    
        // Notify all group members about the change
        chat.members.forEach((memberId) => {
          const recipient = onlineUsers.find((user) => user.userId === memberId);
          if (recipient) {
            io.to(recipient.socketId).emit("groupUpdated", chat);
          }
        });
    
      } catch (error) {
        console.error("Error updating admin:", error);
      }
    });
    



    socket.on("leaveGroup", async ({ userId, chatId }) => {
      try {
        const chat = await Chat.findByPk(chatId);
        if (!chat) return;
        // Remove user from members
        chat.members = chat.members.filter((id) => id !== userId);
        // If user is an admin, remove them from the admins list
        chat.admins = chat.admins.filter((id) => id !== userId);
        // If no more admins, assign a new one (random member)
        if (chat.admins.length === 0 && chat.members.length > 0) {
          chat.admins.push(chat.members[0]); // Assign the first remaining member as admin
        }
        await chat.save();
        // Notify remaining group members
        chat.members.forEach((memberId) => {
          const recipient = onlineUsers.find((user) => user.userId === memberId);
          if (recipient) {
            io.to(recipient.socketId).emit("groupUpdated", chat);
          }
        });
        // Notify the user who left
        io.to(socket.id).emit("leftGroup", { chatId });
      } catch (error) {
        console.error("Error leaving group:", error);
      }
    });
    


    socket.on("markMessageAsRead", async ({ messageId }) => {
      try {
        const message = await Message.findByPk(messageId);
        if (message) {
          message.read = true;
          await message.save();
          io.emit("messageRead", message);
        }
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    });



    socket.on("typing", async ({ chatId, userId }) => {
      const chat = await Chat.findByPk(chatId);
      if (!chat) return;
    
      chat.members.forEach((memberId) => {
        if (memberId !== userId) {
          const recipient = onlineUsers.find((user) => user.userId === memberId);
          if (recipient) {
            io.to(recipient.socketId).emit("userTyping", { chatId, userId });
          }
        }
      });
    });
    
    socket.on("stopTyping", async ({ chatId, userId }) => {
      const chat = await Chat.findByPk(chatId);
      if (!chat) return;
    
      chat.members.forEach((memberId) => {
        if (memberId !== userId) {
          const recipient = onlineUsers.find((user) => user.userId === memberId);
          if (recipient) {
            io.to(recipient.socketId).emit("userStoppedTyping", { chatId, userId });
          }
        }
      });
    });
    

    // Remove user on disconnect
    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      io.emit("getOnlineUsers", onlineUsers);
    });
  });

  return io;
};

module.exports = { initializeSocket };

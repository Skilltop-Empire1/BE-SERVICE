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






const { Server } = require("socket.io");
let onlineUser = [];

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["POST", "GET"],
      credentials: true,
    },
  });
//listen to new user register
  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      // Check if userId is not already in the array before adding
      const isUserOnline = onlineUser.some((user) => user.userId === userId);
      if (!isUserOnline) {
        onlineUser.push({
          userId,
          socketId: socket.id,
        });
        console.log(`User ${userId} connected with socket id: ${socket.id}`);
      }
      console.log("onlineUser",onlineUser)
      io.emit("getOnlineUser",onlineUser)
    });
//send new message
    socket.on("sendMessage",(message)=>{
      const user = onlineUser.find((user) =>user.userId === message.recipientId)//reciepientId is from the frontend
      if(user){
        io.to(user.socketId).emit("getMessage",message)
        io.to(user.socketId).emit("getNotification",{
          senderId:message.senderId,
          isRead:false,
          date:new Date()
        })
      }
    })

// receive message

    socket.on("disconnect", () => {
      // onlineUser.forEach((user, index) => {
      //   if (user.socketId === socket.id) {
      //     console.log(`User ${user.userId} disconnected`);
      //     onlineUser.splice(index, 1); // Remove the disconnected user
      //   }
      // });
      onlineUser = onlineUser.filter((user)=>user.socketId !== socket.id)
      io.emit("getOnlineUser",onlineUser)
    });
  });

  return io;
};


const getOnlineUsers = () => onlineUser;

module.exports = {
  initializeSocket,
  getOnlineUsers,
};

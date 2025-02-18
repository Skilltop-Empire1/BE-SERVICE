// notificationService.js
const { Notification, User } = require("../models");
// const { getUserSocketMap } = require("../config/socket"); // Adjust the path if needed
const { getUserSocketMap, getIoInstance } = require("../config/socket");


/**
 * Creates a notification in the database and sends it via websockets.
 * @param {string} userId - The recipient's userId.
 * @param {string} message - The notification message.
 * @param {object} [payload] - Optional additional data.
 */
async function notifyUser(userId, message, payload = {}) {
    console.log ("USER :" ,userId)
  try {
    // Save notification in DB
    const notification = await Notification.create({ userId, message });

     // Send the notification via websocket if the user is online
     const onlineUsers = getUserSocketMap();
     const userSocket = onlineUsers.find((user) => user.userId === userId);
     if (userSocket) {
       // Use the getter function to get the actual io instance
       const io = getIoInstance();
       if (io) {
         io.to(userSocket.socketId).emit("newNotification", { notification, payload });
       } else {
         console.error("Socket.io instance not initialized.");
       }
     }
  } catch (error) {
    console.error("Notification Error:", error);
  }
}

/**
 * Notifies a list of users with the same message and payload.
 * @param {Array} userIds - Array of user IDs.
 * @param {string} message - Notification message.
 * @param {object} payload - Optional additional data.
 */
async function notifyUsers(userIds, message, payload = {}) {
  for (const id of userIds) {
    await notifyUser(id, message, payload);
  }
}

module.exports = {
  notifyUser,
  notifyUsers,
};

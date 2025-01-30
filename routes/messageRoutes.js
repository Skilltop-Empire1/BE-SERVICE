const express = require("express")
const router = express.Router()
const messageController = require('../controllers/messageController')
const authMiddleware = require('../middlewares/authenticationMiddleware')

router.post("/create",messageController.createMessage)
router.get("/:chatId",messageController.getMessages)
router.get("/chat/:messageId",messageController.getMessage)
router.patch("/read/:messageId",messageController.markMessageAsRead)
router.delete("/:messageId",messageController.deleteMessage)


module.exports = router
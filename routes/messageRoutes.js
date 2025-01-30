const express = require("express")
const router = express.Router()
const messageController = require('../controllers/messageController')
const authMiddleware = require('../middlewares/authenticationMiddleware')

router.post("/create",messageController.createMessage)
router.get("/:chatId",messageController.getMessages)


module.exports = router
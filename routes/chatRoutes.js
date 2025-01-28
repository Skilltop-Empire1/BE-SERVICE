const express = require("express")
const router = express.Router()
const chatController = require('../controllers/chatController')
const authMiddleware = require('../middlewares/authenticationMiddleware')


router.post('/create',chatController.createChat)
router.get('/:userId',chatController.findUserChat)
router.get('/find/:firstId/:secondId',chatController.findChat)




router.get('/userId',authMiddleware.loginJWTAuth,chatController.findUser)
router.get('/users',chatController.getUsers)

module.exports = router
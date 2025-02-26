const express = require("express")
const router = express.Router()
const chatController = require('../controllers/chatController')
const authMiddleware = require('../middlewares/authenticationMiddleware')


router.post('/create',chatController.createChat)
router.post('/create/grp',chatController.createGroupChat)
router.patch('/add/grp',chatController.addUserToGroup)
router.patch('/remove/grp',chatController.removeUserFromGroup)
router.post('/promote/grp/:id',chatController.removeUserFromGroup)
router.post('/demote/grp/:id',chatController.removeUserFromGroup)
router.get('/:userId',chatController.findUserChat)
router.get('/find/:firstId/:secondId',chatController.findChat)




router.get('/userId',authMiddleware.loginJWTAuth,chatController.findUser)
router.get('/users',chatController.getUsers)

module.exports = router
// import required module
const express = require("express")
const usersClass = require("../controllers/userController")
const router = express.Router()

// requiired routes
router.route('/welcome').get(usersClass.welcome)

//export module
module.exports = router
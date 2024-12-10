// import required module
const express = require("express")
const usersClass = require("../controllers/userController")
const router = express.Router()

// required routes
router.route('/welcome').get(usersClass.welcome)
router.route('/signup').post(usersClass.signup)
router.route('/signin').post(usersClass.signin)

//export module
module.exports = router
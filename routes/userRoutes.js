// import required module
const express = require("express")
const user= require("../controllers/userController")
const {loginJWTAuth}= require("../middleware/authenticationMiddleware")
const router = express.Router()

// required routes
router.route("/all-users").get(loginJWTAuth, user.welcome)
router.route("/signup").post(user.signup)
router.route("/signin").post(user.signin)

//export module
module.exports = router

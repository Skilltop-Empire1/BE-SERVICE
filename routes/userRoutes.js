// import required module
const express = require("express")
const user= require("../controllers/userController")
const {loginJWTAuth}= require("../middlewares/authenticationMiddleware")
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")

const router = express.Router()

// required routes
router.route("/all-users").get(loginJWTAuth, user.welcome)
router.route("/signup").post(user.signup)
router.route("/signin").post(user.signin)
router.route("/password-reset").post(user.forgotPassword)
router.route("/reset").put(user.resetPassword)
router.route("/change-password").put(loginJWTAuth, user.changePassword)

//export module
module.exports = router

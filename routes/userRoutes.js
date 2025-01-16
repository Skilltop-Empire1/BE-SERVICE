// import required module
const express = require("express")
const user= require("../controllers/userController")
const {loginJWTAuth}= require("../middlewares/authenticationMiddleware")
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")

const router = express.Router()

// required routes
router.route("/all-users").get(loginJWTAuth, user.welcome)

 /** POST Methods */
    /**
     * @openapi
     * '/api/v1/user/signup':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: signup a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - email
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: johndoe 
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.route("/signup").post(user.signup)
router.route("/signin").post(user.signin)
router.route("/password-reset").post(user.forgotPassword)
router.route("/reset").put(user.resetPassword)
router.route("/change-password").put(loginJWTAuth, user.changePassword)

//export module
module.exports = router

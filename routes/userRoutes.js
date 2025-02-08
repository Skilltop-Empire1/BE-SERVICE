// import required module
const express = require("express")
const user= require("../controllers/userController")
const {loginJWTAuth}= require("../middlewares/authenticationMiddleware")
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")

const router = express.Router()

// required routes

 /** GET Methods */
    /**
     * @openapi
     * '/user/all-users':
     *  get:
     *     tags:
     *     - User Controller
     *     summary: Get all users information
     *     parameters:
     *      - name: username
     *        in: path
     *        description: The username of the user
     *        required: true
     *     responses:
     *      200:
     *        description: Returns users information
     * 
     */
router.route("/all-users").get(loginJWTAuth, user.welcome)



 /** POST Methods */
    /**
     * @openapi
     * '/user/signup':
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
     *              - subscriptionCode
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
     *              subCode:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      201:
     *        description: User created successfully
     *      403:
     *        description: New users not allowed, Please contact support
     *      404:
     *        description: A User with these details already exists
     */
router.route("/signup").post(user.signup)


/** POST Methods */
    /**
     * @openapi
     * '/user/signin':
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
     *              - email
     *              - password
     *            properties: 
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      200:
     *        description: accessToken, id, email, role
     *      400:
     *        description: You have entered incorrect login details
     *      404:
     *        description: User not found
     *     
     */
router.route("/signin").post(user.signin)


/** POST Methods */
    /**
     * @openapi
     * '/user/password-reset':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Password reset. Sents password reset links to user's email.
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *            properties: 
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *     responses:
     *      200:
     *        description: An email has been sent to you with a link to reset your password. If not seen in your inbox, please check your spam.
     *      404:
     *        description: User does not exist
     */
router.route("/password-reset").post(user.forgotPassword)


/** PUT Methods */
    /**
     * @openapi
     * '/user/reset':
     *  put:
     *     tags:
     *     - User Controller
     *     summary: update users password
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - newPassword
     *            properties:
     *              email:
     *                type: string
     *                default: ''
     *              newPassword:
     *                type: string

     *     responses:
     *      201:
     *        description: Password updated successfully
     *      404:
     *        description: Password reset failed"
     */
router.route("/reset").put(user.resetPassword)



/** PUT Methods */
    /**
     * @openapi
     * '/user/change-password':
     *  put:
     *     tags:
     *     - User Controller
     *     summary: change user password to a new password
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - password
     *              - confirmPassword
     *            properties:
     *              password:
     *                type: string
     *                default: ''
     *              confirmPassword:
     *                type: string

     *     responses:
     *      201:
     *        description: User password updated successfully
     *      404:
     *        description: Password update failed"
     */
router.route("/change-password").put(loginJWTAuth, user.changePassword)



/** PUT Methods */
    /**
     * @openapi
     * '/user/update-details':
     *  put:
     *     tags:
     *     - User Controller
     *     summary: change user password to a new password
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - firstName
     *              - lastName
     *              - department
     *              - phoneNo
     *            properties:
     *              firstName:
     *                type: string
     *                default: ''
     *              lastName:
     *                type: string
     *              department:
     *                type: string
     *              phoneNo:
     *                type: string

     *     responses:
     *      201:
     *        description: User details updated successfully
     *      404:
     *        description: Password update failed"
     */
router.route("/update-details").put(loginJWTAuth, user.updateUser)

//export module
module.exports = router

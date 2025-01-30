// import required module
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")
const express = require('express');
const router = express.Router();
const subscription = require('../controllers/subscriptionController'); // Adjust the path as necessary


// required routes

 /** POST Methods */
    /**
     * @openapi
     * '/subscription/list':
     *  get:
     *     tags:
     *     - User Controller
     *     summary: Get all users information
     *     parameters:
     *      - name: businessName
     *        in: path
     *        description: The username of the user
     *        required: true
     *     responses:
     *      200:
     *        description: Returns subscribers information
     * 
     */
router.route("/list").get(subscription.planList)

/** POST Methods */
    /**
     * @openapi
     * '/subscription/subscribe':
     *  post:
     *     tags:
     *     - Subscription Controller
     *     summary: creates subscription details .
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - businessName
     *              - email
     *              - phone
     *              -subscribedPlan
     *              -subscriptionCode
     *            properties:
     *              businessName:
     *                type:string 
     *                default: johnDoe Ventures
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              phone:
     *                type: string
     *                default: +2348169652545
     *              subscribedPlan:
     *                type: string
     *                default: Yearly
     *              subscriptionCode:
     *                type: string
     *     responses:
     *      200:
     *        description: An email has been sent to you with a link to reset your password. If not seen in your inbox, please check your spam.
     *      404:
     *        description: User does not exist
     */

router.route("/subscribe").post(subscription.subscriptionPlan)



//export module
module.exports = router

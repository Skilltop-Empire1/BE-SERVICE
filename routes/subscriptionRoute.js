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
     * '/api/v1/subscription/list':
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
router.route("/list").get(subscription.planList)
router.route("/subscribe").post(subscription.subscriptionPlan)



//export module
module.exports = router

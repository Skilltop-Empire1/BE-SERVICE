// Import required modules
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const express = require('express');
const router = express.Router();
const subscription = require('../controllers/subscriptionController'); // Adjust the path as necessary

// Required routes

/** GET Methods */
/**
 * @openapi
 * '/subscription/list':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get all users' information
 *     parameters:
 *      - name: businessName
 *        in: query
 *        description: The name of the business to filter users
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Returns subscribers' information
 *      404:
 *        description: No subscribers found
 */
router.route("/list").get(subscription.planList);

/** POST Methods */
/**
 * @openapi
 * '/subscription/subscribe':
 *  post:
 *     tags:
 *     - Subscription Controller
 *     summary: Creates subscription details.
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
 *              - subscribedPlan
 *              - subscriptionCode
 *            properties:
 *              businessName:
 *                type: string 
 *                description: The name of the business
 *              email:
 *                type: string
 *                description: The email address of the subscriber
 *              phone:
 *                type: string
 *                description: The phone number of the subscriber
 *              subscribedPlan:
 *                type: string
 *                description: The type of subscription plan
 *              subscriptionCode:
 *                type: string
 *                description: Unique code for the subscription
 *     responses:
 *      200:
 *        description: Subscription created successfully. An email has been sent with further instructions.
 *      404:
 *        description: User does not exist
 */
router.route("/subscribe").post(subscription.subscriptionPlan);

// Export module
module.exports = router;

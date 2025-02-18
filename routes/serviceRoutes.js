const express = require("express")
const router = express.Router()
const serviceController = require('../controllers/serviceController');
const {loginJWTAuth}= require("../middlewares/authenticationMiddleware")

/**
 * @swagger
 * /service/create:
 *   post:
 *     summary: Create a new service
 *     tags: [Service]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *                 description: Name of the service
 *                 example: Premium Cleaning Service
 *               price:
 *                 type: string
 *                 description: Price of the service
 *                 example: 120.50
 *               duration:
 *                 type: string
 *                 description: Duration of the service
 *                 example: 2 hours
 *               serviceManager:
 *                 type: string
 *                 description: Name of the service manager
 *                 example: John Doe
 *               phoneNumber:
 *                 type: string
 *                 description: Contact number for the service
 *                 example: +123456789
 *               description:
 *                 type: string
 *                 description: Detailed description of the service
 *                 example: Provides a full cleaning service for residential properties.
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serviceId:
 *                   type: string
 *                   description: Unique ID of the newly created service
 *                   example: "1"
 *                 serviceName:
 *                   type: string
 *                   description: Name of the service
 *                   example: Premium Cleaning Service
 *                 price:
 *                   type: number
 *                   description: Price of the service
 *                   example: 120.50
 *                 duration:
 *                   type: string
 *                   description: Duration of the service
 *                   example: 2 hours
 *                 serviceManager:
 *                   type: string
 *                   description: Name of the service manager
 *                   example: John Doe
 *                 phoneNumber:
 *                   type: string
 *                   description: Contact number for the service
 *                   example: +123456789
 *                 description:
 *                   type: string
 *                   description: Detailed description of the service
 *                   example: Provides a full cleaning service for residential properties.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of when the service was created
 *                   example: "2025-01-22T10:00:00Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Validation error message
 *                   example: "Service name is required."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */

router.post('/create',loginJWTAuth ,serviceController.createService);

/**
 * @swagger
 * /service/allServices:
 *   get:
 *     summary: Get all services with pagination
 *     tags: [Service]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of services per page (default is 5)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: A list of services with pagination details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                   example: 10
 *                 limit:
 *                   type: integer
 *                   description: Number of services per page
 *                   example: 5
 *                 totalServices:
 *                   type: integer
 *                   description: Total number of services available
 *                   example: 50
 *                 hasNextPage:
 *                   type: boolean
 *                   description: Indicates if there is a next page
 *                   example: true
 *                 hasPrevPage:
 *                   type: boolean
 *                   description: Indicates if there is a previous page
 *                   example: false
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       serviceId:
 *                         type: integer
 *                         description: Unique ID of the service
 *                         example: 1
 *                       serviceName:
 *                         type: string
 *                         description: Name of the service
 *                         example: Premium Cleaning Service
 *                       price:
 *                         type: number
 *                         description: Price of the service
 *                         example: 120.50
 *                       duration:
 *                         type: string
 *                         description: Duration of the service
 *                         example: 2 hours
 *                       serviceManager:
 *                         type: string
 *                         description: Name of the service manager
 *                         example: John Doe
 *                       phoneNumber:
 *                         type: string
 *                         description: Contact number for the service
 *                         example: +123456789
 *                       description:
 *                         type: string
 *                         description: Detailed description of the service
 *                         example: Provides a full cleaning service for residential properties.
 *                       addedDate:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the service was created
 *                         example: "2025-01-22T10:00:00Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */

router.get('/allServices',loginJWTAuth,serviceController.getAllServices);

/**
 * @swagger
 * /service/view/{serviceId}:
 *   get:
 *     summary: View a specific service by ID
 *     tags: [Service]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: The ID of the service to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: The details of the service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serviceName:
 *                   type: string
 *                   description: Name of the service
 *                   example: Premium Cleaning Service
 *                 price:
 *                   type: number
 *                   description: Price of the service
 *                   example: 120.50
 *                 duration:
 *                   type: string
 *                   description: Duration of the service
 *                   example: 2 hours
 *                 serviceManager:
 *                   type: string
 *                   description: Name of the service manager
 *                   example: John Doe
 *                 phoneNumber:
 *                   type: string
 *                   description: Contact number for the service
 *                   example: +123456789
 *                 description:
 *                   type: string
 *                   description: Detailed description of the service
 *                   example: Provides a full cleaning service for residential properties.
 *       404:
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Service not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */

router.get('/view/:serviceId',loginJWTAuth,serviceController.viewService);

/**
 * @swagger
 * /service/edit/{serviceId}:
 *   put:
 *     summary: Update a specific service by ID
 *     tags: [Service]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: The ID of the service to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *                 description: Name of the service
 *                 example: Premium Cleaning Service
 *               price:
 *                 type: number
 *                 description: Price of the service
 *                 example: 150.00
 *               duration:
 *                 type: string
 *                 description: Duration of the service
 *                 example: 2 hours
 *               serviceManager:
 *                 type: string
 *                 description: Name of the service manager
 *                 example: John Doe
 *               phoneNumber:
 *                 type: string
 *                 description: Contact number for the service
 *                 example: +123456789
 *               description:
 *                 type: string
 *                 description: Detailed description of the service
 *                 example: Provides a full cleaning service for residential properties.
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Service updated successfully"
 *                 service:
 *                   type: object
 *                   description: Updated service details
 *                   properties:
 *                     serviceId:
 *                       type: integer
 *                       example: 1
 *                     serviceName:
 *                       type: string
 *                       example: Premium Cleaning Service
 *                     price:
 *                       type: string
 *                       example: 150.00
 *                     duration:
 *                       type: string
 *                       example: 2 hours
 *                     serviceManager:
 *                       type: string
 *                       example: John Doe
 *                     phoneNumber:
 *                       type: string
 *                       example: +123456789
 *                     description:
 *                       type: string
 *                       example: Provides a full cleaning service for residential properties.
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid service data"
 *       404:
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Service not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */

router.put('/edit/:serviceId',loginJWTAuth,serviceController.updateService);

/**
 * @swagger
 * /service/delete/{serviceId}:
 *   delete:
 *     summary: Delete a specific service by ID
 *     tags: [Service]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: The ID of the service to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Service deleted successfully"
 *       404:
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Service not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */

router.delete('/delete/:serviceId',loginJWTAuth,serviceController.deleteService);





module.exports = router
const express = require("express");
const router = express.Router();
const { 
    deleteClient, 
    updateClient, 
    getClientbyid, 
    getClient, 
    createClient 
} = require("../controllers/ClientController");
const upload =  require("../middlewares/multer")
const {loginJWTAuth} = require("../middlewares/authenticationMiddleware")

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new client
 *     tags:
 *       - Clients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNo:
 *                 type: string
 *               email:
 *                 type: string
 *               DOB:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created successfully
 *       500:
 *         description: Error creating client
 */
router.post("/create",loginJWTAuth, createClient);

/**
 * @swagger
 * /getall:
 *   get:
 *     summary: Get all clients
 *     tags:
 *       - Clients
 *     responses:
 *       200:
 *         description: List of all clients
 *       500:
 *         description: Error fetching clients
 */
router.get("/getall",loginJWTAuth, getClient);

/**
 * @swagger
 * /getbyid/{clientId}:
 *   get:
 *     summary: Get a client by ID
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client to retrieve
 *     responses:
 *       200:
 *         description: Client details
 *       404:
 *         description: Client not found
 *       500:
 *         description: Error fetching client
 */
router.get("/getbyid/:clientId",loginJWTAuth, getClientbyid);

/**
 * @swagger
 * /update/{clientId}:
 *   put:
 *     summary: Update a client's information
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNo:
 *                 type: string
 *               email:
 *                 type: string
 *               DOB:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found or no changes made
 *       500:
 *         description: Error updating client
 */
router.put("/update/:clientId",loginJWTAuth, updateClient);

/**
 * @swagger
 * /delete/{clientId}:
 *   delete:
 *     summary: Delete a client
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client to delete
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 *       500:
 *         description: Error deleting client
 */
router.delete("/delete/:clientId",loginJWTAuth, deleteClient);

module.exports = router;

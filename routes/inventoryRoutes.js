const express = require("express")
const router = express.Router()
const inventoryController = require('../controllers/inventoryController');
const {loginJWTAuth}= require("../middlewares/authenticationMiddleware")

/**
 * @swagger
 * /inventory/create:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *                 description: Name of the inventory item
 *                 example: Laptop
 *               category:
 *                 type: string
 *                 description: Category of the inventory item
 *                 example: Electronics
 *               itemId:
 *                 type: string
 *                 description: Unique ID of the inventory item
 *                 example: ITM12345
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the inventory item
 *                 example: 10
 *               totalValue:
 *                 type: number
 *                 description: Total monetary value of the inventory item
 *                 example: 1500.00
 *               assignedTo:
 *                 type: string
 *                 description: Name of the person to whom the item is assigned
 *                 example: John Doe
 *               datePurchased:
 *                 type: string
 *                 format: date
 *                 description: Purchase date of the inventory item
 *                 example: 2023-01-15
 *               note:
 *                 type: string
 *                 description: Additional notes about the inventory item
 *                 example: "Purchased for office use"
 *     responses:
 *       201:
 *         description: Inventory item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inventoryId:
 *                   type: string
 *                   description: ID of the created inventory item
 *                   example: 1
 *                 itemName:
 *                   type: string
 *                   description: Name of the inventory item
 *                   example: Laptop
 *                 category:
 *                   type: string
 *                   description: Category of the inventory item
 *                   example: Electronics
 *                 itemId:
 *                   type: string
 *                   description: Unique ID of the inventory item
 *                   example: ITM12345
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the inventory item
 *                   example: 10
 *                 totalValue:
 *                   type: number
 *                   description: Total monetary value of the inventory item
 *                   example: 1500.00
 *                 assignedTo:
 *                   type: string
 *                   description: Name of the person to whom the item is assigned
 *                   example: John Doe
 *                 datePurchased:
 *                   type: string
 *                   format: date
 *                   description: Purchase date of the inventory item
 *                   example: 2023-01-15
 *                 note:
 *                   type: string
 *                   description: Additional notes about the inventory item
 *                   example: "Purchased for office use"
 *       400:
 *         description: Validation error in the request body
 *       500:
 *         description: Internal server error
 */

router.post('/create',loginJWTAuth,inventoryController.createInventory);

/**
 * @swagger
 * /inventory/allInventory:
 *   get:
 *     summary: Retrieve all inventory items with pagination
 *     tags: [Inventory]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved the inventory items
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
 *                   description: The total number of pages
 *                   example: 10
 *                 limit:
 *                   type: integer
 *                   description: The number of items per page
 *                   example: 5
 *                 totalInventory:
 *                   type: integer
 *                   description: The total number of inventory items
 *                   example: 50
 *                 hasNextPage:
 *                   type: boolean
 *                   description: Indicates if there is a next page
 *                   example: true
 *                 hasPrevPage:
 *                   type: boolean
 *                   description: Indicates if there is a previous page
 *                   example: false
 *                 inventory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       inventoryId:
 *                         type: string
 *                         description: The ID of the inventory item
 *                         example: 1
 *                       itemName:
 *                         type: string
 *                         description: Name of the inventory item
 *                         example: Laptop
 *                       category:
 *                         type: string
 *                         description: Category of the inventory item
 *                         example: Electronics
 *                       itemId:
 *                         type: string
 *                         description: Unique ID of the inventory item
 *                         example: ITM12345
 *                       quantity:
 *                         type: integer
 *                         description: Quantity of the inventory item
 *                         example: 10
 *                       totalValue:
 *                         type: number
 *                         description: Total monetary value of the inventory item
 *                         example: 1500.00
 *                       assignedTo:
 *                         type: string
 *                         description: Name of the person to whom the item is assigned
 *                         example: John Doe
 *                       datePurchased:
 *                         type: string
 *                         format: date
 *                         description: Purchase date of the inventory item
 *                         example: 2023-01-15
 *                       note:
 *                         type: string
 *                         description: Additional notes about the inventory item
 *                         example: "Purchased for office use"
 *                       addedDate:
 *                         type: string
 *                         format: date-time
 *                         description: The date when the item was added to the inventory
 *                         example: 2023-01-16T10:00:00Z
 *                 nextPage:
 *                   type: string
 *                   description: The URL for the next page
 *                   example: "/api/IMS/all-inventory?page=2&limit=5"
 *                 prevPage:
 *                   type: string
 *                   description: The URL for the previous page
 *                   example: null
 *       500:
 *         description: Internal server error
 */

router.get('/allInventory',loginJWTAuth,inventoryController.getAllInventory);

/**
 * @swagger
 * /inventory/view/{inventoryId}:
 *   get:
 *     summary: View a specific inventory item by its ID
 *     tags: [Inventory]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the inventory item
 *     responses:
 *       200:
 *         description: Successfully retrieved the inventory item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemName:
 *                   type: string
 *                   description: Name of the inventory item
 *                   example: Laptop
 *                 category:
 *                   type: string
 *                   description: Category of the inventory item
 *                   example: Electronics
 *                 itemId:
 *                   type: string
 *                   description: Unique ID of the inventory item
 *                   example: ITM12345
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the inventory item
 *                   example: 10
 *                 totalValue:
 *                   type: number
 *                   description: Total monetary value of the inventory item
 *                   example: 1500.00
 *                 assignedTo:
 *                   type: string
 *                   description: Name of the person to whom the item is assigned
 *                   example: John Doe
 *                 datePurchased:
 *                   type: string
 *                   format: date
 *                   description: Purchase date of the inventory item
 *                   example: 2023-01-15
 *                 note:
 *                   type: string
 *                   description: Additional notes about the inventory item
 *                   example: "Purchased for office use"
 *       404:
 *         description: Inventory item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Inventory item not found
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

router.get('/view/:inventoryId',loginJWTAuth,inventoryController.viewInventory);

/**
 * @swagger
 * /inventory/edit/{inventoryId}:
 *   put:
 *     summary: Update an existing inventory item
 *     tags: [Inventory]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the inventory item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *                 description: Name of the inventory item
 *                 example: Laptop
 *               category:
 *                 type: string
 *                 description: Category of the inventory item
 *                 example: Electronics
 *               itemId:
 *                 type: string
 *                 description: Unique ID of the inventory item
 *                 example: ITM12345
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the inventory item
 *                 example: 15
 *               totalValue:
 *                 type: number
 *                 description: Total monetary value of the inventory item
 *                 example: 2000.00
 *               assignedTo:
 *                 type: string
 *                 description: Name of the person to whom the item is assigned
 *                 example: John Doe
 *               datePurchased:
 *                 type: string
 *                 format: date
 *                 description: Purchase date of the inventory item
 *                 example: 2023-01-15
 *               note:
 *                 type: string
 *                 description: Additional notes about the inventory item
 *                 example: "Updated for office upgrade"
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Inventory item updated successfully
 *                 inventory:
 *                   type: object
 *                   properties:
 *                     itemName:
 *                       type: string
 *                       description: Name of the inventory item
 *                       example: Laptop
 *                     category:
 *                       type: string
 *                       description: Category of the inventory item
 *                       example: Electronics
 *                     itemId:
 *                       type: string
 *                       description: Unique ID of the inventory item
 *                       example: ITM12345
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the inventory item
 *                       example: 15
 *                     totalValue:
 *                       type: number
 *                       description: Total monetary value of the inventory item
 *                       example: 2000.00
 *                     assignedTo:
 *                       type: string
 *                       description: Name of the person to whom the item is assigned
 *                       example: John Doe
 *                     datePurchased:
 *                       type: string
 *                       format: date
 *                       description: Purchase date of the inventory item
 *                       example: 2023-01-15
 *                     note:
 *                       type: string
 *                       description: Additional notes about the inventory item
 *                       example: "Updated for office upgrade"
 *       400:
 *         description: Validation error or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid input data"
 *       404:
 *         description: Inventory item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Inventory item not found
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

router.put('/edit/:inventoryId',loginJWTAuth,inventoryController.updateInventory);

/**
 * @swagger
 * /inventory/delete/{inventoryId}:
 *   delete:
 *     summary: Delete an inventory item by its ID
 *     tags: [Inventory]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the inventory item to delete
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Inventory item deleted successfully
 *       404:
 *         description: Inventory item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Inventory item not found
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

router.delete('/delete/:inventoryId',loginJWTAuth,inventoryController.deleteInventory);


module.exports = router
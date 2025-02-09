const express = require("express")
const router = express.Router()
const categoryController = require('../controllers/categoryController');
const {loginJWTAuth}= require("../middlewares/authenticationMiddleware")



/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryId:
 *                   type: integer
 *                   description: ID of the created category
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   description: ID of the user who created the category
 *                   example: 10
 *                 name:
 *                   type: string
 *                   description: Name of the category
 *                   example: Electronics
 *       500:
 *         description: Internal server error
 */
router.post('/create',loginJWTAuth, categoryController.createCategory);

/**
 * @swagger
 * /category/edit/{categoryId}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the category
 *                 example: Office Supplies
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.put('/edit/:categoryId',loginJWTAuth,categoryController.updateCategory);

/**
 * @swagger
 * /category/view/{categoryId}:
 *   get:
 *     summary: View details of a category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to view
 *     responses:
 *       200:
 *         description: Successfully retrieved category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the category
 *                   example: Electronics
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get('/view/:categoryId',loginJWTAuth,categoryController.viewCategory);
/**
 * @swagger
 * /category/delete/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:categoryId',loginJWTAuth,categoryController.deleteCategory);
/**
 * @swagger
 * /category/allcategories:
 *   get:
 *     summary: Get all categories with pagination
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of categories per page (default is 5)
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 limit:
 *                   type: integer
 *                   example: 5
 *                 totalCategory:
 *                   type: integer
 *                   example: 25
 *                 hasNextPage:
 *                   type: boolean
 *                   example: true
 *                 hasPrevPage:
 *                   type: boolean
 *                   example: false
 *                 category:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       categoryId:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Electronics
 *                 nextPage:
 *                   type: string
 *                   nullable: true
 *                   example: "/api/v1/all-category?page=2&limit=5"
 *                 prevPage:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Internal server error
 */
router.get('/allcategories',loginJWTAuth,categoryController.getAllCategory);


module.exports = router
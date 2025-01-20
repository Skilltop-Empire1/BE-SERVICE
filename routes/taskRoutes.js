const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskController")
const upload = require("../middlewares/multer")

// router.post("/create",upload.single("fileUrl"),taskController.createTask)
// router.get("/list",taskController.getAllTask)
// router.get("/:id",taskController.getTask)
// router.put("/id",upload.single("fileUrl"),taskController.editTask)
// router.delete("/:id",taskController.deleteTask)



/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API endpoints for managing tasks
 */

/**
 * @swagger
 * /tasks/create:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task with an optional file attachment
 *     tags: [Tasks]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: fileUrl
 *         type: file
 *         description: Task-related file
 *       - in: body
 *         name: body
 *         description: Task details
 *         required: true
 *         schema:
 *           type: object
 *           required: 
 *             - title
 *             - description
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 */
router.post("/create", upload.single("fileUrl"), taskController.createTask);

/**
 * @swagger
 * /tasks/list:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/list", taskController.getAllTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieve a specific task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
router.get("/:id", taskController.getTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update task details and file attachment
 *     tags: [Tasks]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *       - in: formData
 *         name: fileUrl
 *         type: file
 *         description: Task-related file
 *       - in: body
 *         name: body
 *         description: Task details to update
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 */
router.put("/:id", upload.single("fileUrl"), taskController.editTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:id", taskController.deleteTask);

 module.exports = router
const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskController")
const upload = require("../middlewares/multer");
const { loginJWTAuth } = require("../middlewares/authenticationMiddleware");

// router.post("/create",upload.single("fileUrl"),taskController.createTask)
// router.get("/list",taskController.getAllTask)
// router.get("/:id",taskController.getTask)
// router.put("/id",upload.single("fileUrl"),taskController.editTask)
// router.delete("/:id",taskController.deleteTask)



/**
 * @swagger
 * /task/create:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task with an optional file attachment
 *     tags: 
 *       - Tasks
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - taskTitle
 *               - servName
 *               - email
 *               - priority
 *               - dueDate
 *               - taskStatus
 *               - desc
 *             properties:
 *               fileUrl:
 *                 type: string
 *                 format: binary
 *                 description: Task-related file
 *               taskTitle:
 *                 type: string
 *                 description: Title of the task
 *               servName:
 *                 type: string
 *                 description: Service name related to the task
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Contact email
 *               priority:
 *                 type: string
 *                 description: Priority level of the task
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Due date for the task
 *               taskStatus:
 *                 type: string
 *                 description: Current status of the task
 *               desc:
 *                 type: string
 *                 description: Detailed description of the task
 *     responses:
 *       '201':
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Task created successfully"
 *               taskId: "12345"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input data"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
router.post("/create", upload.single("fileUrl"), taskController.createTask);

/**
 * @swagger
 * /task/list:
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
router.get("/list",loginJWTAuth, taskController.getAllTask);

/**
 * @swagger
 * /task/{id}:
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
 * /task/{id}:
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
 * /task/{id}:
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
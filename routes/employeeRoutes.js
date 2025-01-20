const express = require("express")
const router = express.Router()
const employeeController = require("../controllers/employeeController")
const upload =  require("../middlewares/multer")
const authMiddleware = require("../middlewares/authenticationMiddleware")

// router.post("/create",upload.single("profile"),authMiddleware.loginJWTAuth,employeeController.addEmployee)
// router.get("/list",authMiddleware.loginJWTAuth,employeeController.getAllEmployees)
// router.post("/invite",employeeController.inviteEmployee)
// router.get("/search",employeeController.searchEmployee)
// router.get("/list/:id",employeeController.getEmployee)
// router.put("/edit/:id",upload.single("profile"),employeeController.updateEmployee)
// router.delete("/remove/:id",employeeController.deleteEmployee)



/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API endpoints for managing employees
 */

 /**
 * @swagger
 * /employees/create:
 *   post:
 *     summary: Create a new employee
 *     description: Adds a new employee with a profile picture
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: profile
 *         type: file
 *         description: Employee profile image
 *       - in: body
 *         name: body
 *         description: Employee details
 *         required: true
 *         schema:
 *           type: object
 *           required: 
 *             - name
 *             - email
 *             - position
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             position:
 *               type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
 router.post("/create", upload.single("profile"), authMiddleware.loginJWTAuth, employeeController.addEmployee);

 /**
  * @swagger
  * /employees/list:
  *   get:
  *     summary: Get all employees
  *     description: Retrieve a list of all employees
  *     tags: [Employees]
  *     security:
  *       - BearerAuth: []
  *     responses:
  *       200:
  *         description: List of employees retrieved successfully
  *       401:
  *         description: Unauthorized
  */
 router.get("/list", authMiddleware.loginJWTAuth, employeeController.getAllEmployees);
 
 /**
  * @swagger
  * /employees/invite:
  *   post:
  *     summary: Invite an employee
  *     description: Sends an invite to an employee
  *     tags: [Employees]
  *     parameters:
  *       - in: body
  *         name: body
  *         description: Employee invitation details
  *         required: true
  *         schema:
  *           type: object
  *           properties:
  *             email:
  *               type: string
  *     responses:
  *       200:
  *         description: Invitation sent successfully
  *       400:
  *         description: Bad request
  */
 router.post("/invite", employeeController.inviteEmployee);
 
 /**
  * @swagger
  * /employees/search:
  *   get:
  *     summary: Search for employees
  *     description: Search employees by query parameters
  *     tags: [Employees]
  *     parameters:
  *       - in: query
  *         name: name
  *         schema:
  *           type: string
  *         description: Employee name to search for
  *     responses:
  *       200:
  *         description: Employee found
  *       404:
  *         description: Employee not found
  */
 router.get("/search", employeeController.searchEmployee);
 
 /**
  * @swagger
  * /employees/list/{id}:
  *   get:
  *     summary: Get an employee by ID
  *     description: Retrieve a specific employee by ID
  *     tags: [Employees]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *         description: Employee ID
  *     responses:
  *       200:
  *         description: Employee retrieved successfully
  *       404:
  *         description: Employee not found
  */
 router.get("/list/:id", employeeController.getEmployee);
 
 /**
  * @swagger
  * /employees/edit/{id}:
  *   put:
  *     summary: Update an employee
  *     description: Update employee details and profile image
  *     tags: [Employees]
  *     consumes:
  *       - multipart/form-data
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *         description: Employee ID
  *       - in: formData
  *         name: profile
  *         type: file
  *         description: Employee profile image
  *       - in: body
  *         name: body
  *         description: Employee details to update
  *         schema:
  *           type: object
  *           properties:
  *             name:
  *               type: string
  *             email:
  *               type: string
  *             position:
  *               type: string
  *     responses:
  *       200:
  *         description: Employee updated successfully
  *       400:
  *         description: Bad request
  */
 router.put("/edit/:id", upload.single("profile"), employeeController.updateEmployee);
 
 /**
  * @swagger
  * /employees/remove/{id}:
  *   delete:
  *     summary: Remove an employee
  *     description: Deletes an employee by ID
  *     tags: [Employees]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *         description: Employee ID
  *     responses:
  *       200:
  *         description: Employee removed successfully
  *       404:
  *         description: Employee not found
  */
 router.delete("/remove/:id", employeeController.deleteEmployee);
 

  module.exports = router
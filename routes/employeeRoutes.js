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
 *   - name: Employees
 *     description: API endpoints for managing employees
 *
 * /employee/create:
 *   post:
 *     summary: Create a new employee
 *     tags: 
 *       - Employees
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profile
 *               - firstName
 *               - lastName
 *               - email
 *               - role
 *               - dept
 *               - type
 *               - status
 *               - task
 *               - phoneNo
 *             properties:
 *               profile:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture of the employee
 *               firstName:
 *                 type: string
 *                 description: Employee's first name
 *               lastName:
 *                 type: string
 *                 description: Employee's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Employee's email address
 *               role:
 *                 type: string
 *                 description: Employee's role in the organization
 *               dept:
 *                 type: string
 *                 description: Department the employee belongs to
 *               type:
 *                 type: string
 *                 description: Employment type (Full-time/Part-time)
 *               status:
 *                 type: string
 *                 description: Employment status (Active/Inactive)
 *               task:
 *                 type: string
 *                 description: Assigned task
 *               note:
 *                 type: string
 *                 description: Additional notes about the employee
 *               phoneNo:
 *                 type: string
 *                 description: Employee's contact number
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Employee created successfully"
 *               employeeId: "12345"
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid request data"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
 router.post("/create", upload.single("profile"), authMiddleware.loginJWTAuth, employeeController.addEmployee);

 /**
  * @swagger
  * /employee/list:
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
  * /employee/invite:
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
  * /employee/search:
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
  * /employee/list/{id}:
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
  * /employee/edit/{id}:
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
  * /employee/remove/{id}:
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
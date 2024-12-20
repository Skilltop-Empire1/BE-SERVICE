const express = require("express")
const router = express.Router()
const employeeController = require("../controllers/employeeController")
const upload =  require("../middlewares/multer")
const authMiddleware = require("../middlewares/authenticationMiddleware")

router.post("/create",upload.single("profile"),authMiddleware.loginJWTAuth,employeeController.addEmployee)
router.get("/list",authMiddleware.loginJWTAuth,employeeController.getAllEmployees)
router.post("/invite",employeeController.inviteEmployee)
router.get("/search",employeeController.searchEmployee)
router.get("/list/:id",employeeController.getEmployee)
router.put("/edit/:id",upload.single("profile"),employeeController.updateEmployee)
router.delete("/remove/:id",employeeController.deleteEmployee)

module.exports = router
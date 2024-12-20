const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskController")
const upload = require("../middlewares/multer")

router.post("/create",upload.single("fileUrl"),taskController.createTask)
router.get("/list",taskController.getAllTask)
router.get("/:id",taskController.getTask)
router.put("/id",upload.single("fileUrl"),taskController.editTask)
router.delete("/:id",taskController.deleteTask)

module.exports = router
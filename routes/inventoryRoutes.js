const express = require("express")
const router = express.Router()
const inventoryController = require('../controllers/inventoryController');

router.post('/create',inventoryController.createInventory);
router.get('/allInventory',inventoryController.getAllInventory);
router.get('/view/:inventoryId',inventoryController.viewInventory);
router.put('/edit/:inventoryId',inventoryController.updateInventory);
router.delete('/delete/:inventoryId',inventoryController.deleteInventory);


module.exports = router
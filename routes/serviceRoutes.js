const express = require("express")
const router = express.Router()
const serviceController = require('../controllers/serviceController');

router.post('/create',serviceController.createService);
router.get('/allServices',serviceController.getAllServices);
router.get('/view/:serviceId',serviceController.viewService);
router.put('/edit/:serviceId',serviceController.updateService);
router.delete('/delete/:serviceId',serviceController.deleteService);





module.exports = router
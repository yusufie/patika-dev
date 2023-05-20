const express = require('express')
const furnitureController = require('../controllers/furnitureController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.route('/').post(roleMiddleware(["admin"]),furnitureController.createFurniture); 
router.route('/').get(furnitureController.getAllFurnitures);
router.route('/:slug').get(furnitureController.getFurniture);
router.route('/:slug').delete(furnitureController.deleteFurniture);
router.route('/:slug').put(furnitureController.updateFurniture);
router.route('/buy').post(furnitureController.buyFurniture);
router.route('/cancel').post(furnitureController.cancelFurniture);

module.exports = router;
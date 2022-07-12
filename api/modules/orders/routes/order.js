const express = require('express');
const OrderController = require("../controllers/order");
const router = express.Router();
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/', checkAuth, OrderController.getAllOrders);
router.post('/', checkAuth, OrderController.createOrder);
router.get('/:orderId', checkAuth, (OrderController.getOrderById));
router.patch('/:orderId', checkAuth, (OrderController.patchOrderById));
router.delete('/:orderId', checkAuth, (OrderController.deleteOrderById));

module.exports = router;
const express = require('express');
const OrderController = require("../controllers/order");
const router = express.Router();

router.get('/', OrderController.getAllOrders);
router.post('/', OrderController.createOrder);
router.get('/:orderId', (OrderController.getOrderById));
router.patch('/:orderId', (OrderController.patchOrderById));
router.delete('/:orderId', (OrderController.deleteOrderById));

module.exports = router;
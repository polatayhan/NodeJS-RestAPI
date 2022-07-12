const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/product");
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/', (ProductController.getAllProducts));
router.post('/', checkAuth, ProductController.createProduct);
router.get('/:productId', ProductController.getProductById);
router.patch('/:productId', checkAuth, ProductController.patchProductById);
router.delete('/:productId', checkAuth, ProductController.deleteProductById);

module.exports = router;
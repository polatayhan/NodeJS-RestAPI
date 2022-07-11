const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const checkAuth = require('../middleware/checkAuth');

router.get('/', (req, res, next) => {
    Product.find()
        .then(products => {
        res.status(200).json({
            message: 'Products fetched successfully',
            products: products
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Fetching products failed',
            error: err
        });
    });
});
router.post('/', checkAuth, (req, res, next) => {
    // create a new product
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    // product save to database
    product.save().then(createdProduct => {
        res.status(201).json({
            message: 'Product added successfully',
            createdProduct: createdProduct
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Creating a product failed',
            error: err
        });
    })
});
router.get('/:productId', (req, res, next) => {;
    Product.findById(req.params.productId).then(product => {
        if (product) {
            res.status(200).json({
                message: 'Product found',
                product: product
            });
        } else {
            res.status(404).json({
                message: 'Product not found'
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Fetching product failed',
            error: err
        });
    });
});
router.patch('/:productId', (req, res, next) => {
    Product.update({_id: req.params.productId}, {$set: req.body}).then(result => {
        res.status(200).json({
            message: 'Product updated',
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Product update failed',
            error: err
        });
    });
});
router.delete('/:productId', (req, res, next) => {
    Product.remove({_id: req.params.productId}).then(result => {
        res.status(200).json({
            message: 'Product deleted'
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Deleting product failed',
            error: err
        });
    });
});

module.exports = router;
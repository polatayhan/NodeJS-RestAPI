const Order = require("../models/order");

const getAllOrders = (req, res, next) => {
    Order.find()
        .then(orders => {
            res.status(200).json({
                message: 'Orders fetched successfully',
                orders: orders
            });
        }).catch(err => {
        res.status(500).json({
            message: 'Fetching orders failed',
            error: err
        });
    });
};
const createOrder = (req, res, next) => {
    // create a new order
    const order = new Order({
        product: req.body.product,
        quantity: req.body.quantity
    });
    // order save to database
    order.save().then(createdOrder => {
        res.status(201).json({
            message: 'Order added successfully',
            createdOrder: createdOrder
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Creating a order failed',
            error: err
        });
    })
}
const getOrderById = (req, res, next) => {
    Order.findById(req.params.orderId).then(order => {
        if (order) {
            res.status(200).json({
                message: 'Order found',
                order: order
            });
        } else {
            res.status(404).json({
                message: 'Order not found'
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Fetching order failed',
            error: err
        });
    });
}
const patchOrderById = (req, res, next) => {
    Order.update({_id: req.params.orderId}, {$set: req.body}).then(result => {
        res.status(200).json({
            message: 'Order updated',
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Order update failed',
            error: err
        });
    });
}
const deleteOrderById = (req, res, next) => {
    Order.remove({_id: req.params.orderId}).then(result => {
        res.status(200).json({
            message: 'Order deleted'
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Deleting order failed',
            error: err
        });
    });
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    patchOrderById,
    deleteOrderById
};
const mongoose = require('mongoose');

// create a new schema for the product model
const orderShema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 1
    }
});

// export the mongoose model
module.exports = mongoose.model('Order', orderShema);
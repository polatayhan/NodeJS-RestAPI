const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// create a new schema for the product model
const orderSchema = new mongoose.Schema({
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
orderSchema.plugin(uniqueValidator);

// export the mongoose model
module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// create a new schema for the product model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
});
productSchema.plugin(uniqueValidator);

// export the mongoose model
module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

// create a new schema for the product model
const productShema = new mongoose.Schema({
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

// export the mongoose model
module.exports = mongoose.model('Product', productShema);
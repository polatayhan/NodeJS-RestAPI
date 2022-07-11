const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// create a new schema for the product model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 0,
        default: 1,
        //select: false
    }
});
userSchema.plugin(uniqueValidator);

// export the mongoose model
module.exports = mongoose.model('User', userSchema);
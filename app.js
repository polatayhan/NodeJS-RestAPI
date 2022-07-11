const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// Connect to MongoDB
mongoose.connect("mongodb+srv://node-js:"+ process.env.MONGODB_ATLAS_PASSWORD +"@cluster0.dzx6a.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log('Error: ' + err);
    });
// morgan is a middleware that logs the request in the console
app.use(morgan('dev'));
// bodyParser is a middleware that parses the body of the request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// cors is a middleware that allows cross-origin requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// If no route is matched by now, it must be a 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
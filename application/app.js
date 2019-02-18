const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const prdocutRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb://mongo:27017/node-shop');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authoriztion"
    );

    if (request.method === 'OPTIONS') {
        response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return response.status(200).json({});
    }

    next();
});

app.use('/products', prdocutRoutes);
app.use('/orders', orderRoutes);

app.use((request, response, next) => {
    const error = new Error('Not found!');
    error.status = 404;

    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
const router = require('express').Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: "Get to /products"
    });
});

router.post('/', (request, response, next) => {
    const product = {
        name: request.body.name,
        price: request.body.price
    };

    response.status(200).json({
        message: "POST to /products",
        product: product
    });
});

router.get('/:product', (request, response, next) => {
    response.status(200).json({
        message: request.params.product
    });
});

module.exports = router;
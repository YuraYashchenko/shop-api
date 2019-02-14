const router = require('express').Router();

router.get('/', (request, response, next) => {
    res.status(200).json({
        message: "get /orders"
    });
});

router.post('/', (request, response, order) => {
    res.status(201).json({
        message: "post to /orders"
    });
});

module.exports = router;
const router = require('express').Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (request, response, next) => {
    const products = Product.find()
        .exec()
        .then(documents => {
            response.status(200).json({ products: documents });
        })
        .catch(error => {
            console.log(error);

            response.status(500).json({
                message: error.message,
                error: error
            });
        });
});

router.post('/', (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });
    product.save()
        .then(result => {
            response.status(200).json({
                message: "Product was created.",
                product: product
            });
        })
        .catch(error => {
            console.log(error);

            response.status(500).json({
                message: error.message,
                error: error
            });
        });
});

router.get('/:product', (request, response, next) => {
    const id = request.params.product;
    const document = Product.findById(id)
        .exec()
        .then(doc => {
            response.status(200).json({ doc });
        })
        .catch(error => {
            response.status(500).json({
                message: error.message,
                error: error
            });
        });
});

router.patch('/:product', (request, response, next) => {
    const id = request.params.product;
    
    Product.update({_id: id}, {
        $set: request.body
    })
    .exec()
    .then(result => {
        response.status(200).json({result});
    })
    .catch((error) => {
        response.status(500).json({
            message: error.message,
            error: error
        })
    });
});

router.delete('/:product', (request, response, next) => {
    const id = request.params.product;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            response.status(200).json({message: 'Item was deleted.'});
        })
        .catch(error => {
            console.log(error);

            response.status(500).json({
                message: error.message,
                error: error
            });
        });
});

module.exports = router;
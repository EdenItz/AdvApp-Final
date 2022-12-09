const Product = require('../models/Product');
const errorHandler = require('../globals').errorHandler;

const getProducts = (_req, res) => {
    Product.find()
        .then(product => {
            res.json(product);
        })
        .catch(errorHandler(res));
};

const getProductlById = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            res.json(product);
        })
        .catch(errorHandler(res));
};

module.exports = {
    getProducts,
    getProductlById,
};

// TODO:
const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();

router.get('/', productController.getProducts);

router.get('/:productId', productController.getProductlById);

module.exports = router;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    price: {
        type: Number,
        required: true,
        minlength: 2,
    },
    category: {
        type: String,
        required: true,
        minlength: 2,
    },
    description: {
        type: String,
        required: true,
        minlength: 6,
    },
    image: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    hot: {
        type: Boolean,
        required: true,
    },
    rate: {
        type: String,
        default: '0.0',
    },
    productSize: [
        {
            type: String,
        },
    ],
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;

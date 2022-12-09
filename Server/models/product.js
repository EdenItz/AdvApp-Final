const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    id: {
        type: [Number],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    store: {
        type: String,
        required: true,
    },
    description: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('products', Product);

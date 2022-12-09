const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    productIds: {
        type: [Number],
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('orders', Order);

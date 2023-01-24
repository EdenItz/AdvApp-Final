const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    productIds: {
        type: [Number],
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('orders', Order);

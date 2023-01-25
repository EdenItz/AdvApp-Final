const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    productIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'products',
            required: true
        }
    ],
    fullName: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    },
    orderDate: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('orders', Order);

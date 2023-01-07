const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        // required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'products',
            },
            name: String,
            price: Number,
            category: String,
            subCategory: String,
            description: String,
            image: String,
            size: String,
            quantity: Number,
        },
    ],
    active: {
        type: Boolean,
        required: true,
    },
});

const Cart = mongoose.model('carts', cartSchema);
module.exports = Cart;

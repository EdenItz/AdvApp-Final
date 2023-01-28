const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const joi = require('joi');
const Cart = require('../models/Cart');
const User = require('../models/User');

// ** Product Schema
const productSchema = joi.object({
    productId: joi.string(),
    name: joi.string().required().min(2),
    price: joi.number().required().min(2),
    category: joi.string().required().min(2),
    description: joi.string().required().min(6),
    image: joi.string().required(),
    quantity: joi.number().required(),
    size: joi.string().required(),
});

// ** Add Product to User Cart
router.post('/', auth, async (req, res) => {
    try {
        // Validation for body
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.message);

        const headerUserId = req.headers.userid;

        let cart = await Cart.findOne({ userId: headerUserId });

        if (!cart) {
            await Cart.insertMany([{ userId: headerUserId, active: true }]);
            cart = await Cart.findOne({ userId: headerUserId });
        }
        // return res.status(404).send('No Cart For This User.');

        // Add Product to user Cart
        cart.products.push(req.body);
        await cart.save();
        res.status(200).send(cart.products);
    } catch (error) {
        console.log(error);

        res.status(400).send(error);
    }
});

// ** Get Products in Cart
router.get('/', auth, async (req, res) => {
    try {
        const headerUserId = req.headers.userid;

        let cart = await Cart.findOne({ userId: headerUserId });
        if (!cart) return res.status(200).send([]);

        res.status(200).send(cart.products);
    } catch (error) {
        res.status(400).send('Error in Get Products');
    }
});

// ** Edit products from Cart
router.put('/', auth, async (req, res) => {
    try {
        const headerUserId = req.headers.userid;

        let cart = await Cart.findOne({ userId: headerUserId });
        if (!cart) return res.status(404).send('Theres no such Cart');

        await cart.updateOne({ products: [] });
        res.status(200).send('Cart Deleted Successfully!');
    } catch (error) {
        res.status(400).send(error);
    }
});

// ** Delete Product From Cart
router.delete('/delete-product/:id', auth, async (req, res) => {
    const prodId = req.params.id;

    try {
        const headerUserId = req.headers.userid;

        let cart = await Cart.findOne({ userId: headerUserId });
        if (!cart) return res.status(404).send('Theres no such Cart');

        const productFilter = cart.products.filter(
            item => item.productId == prodId,
        );
        let itemIndex = cart.products.indexOf(productFilter[0]);

        if (itemIndex == -1)
            return res.status(404).send('No Such Item in Cart');
        else {
            cart.products.splice(itemIndex, 1);
        }

        await cart.save();

        res.status(201).send(cart);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const joi = require('joi');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

const productSchema = joi.object({
    productIds: joi.array().required(),
    totalPrice: joi.number().required(),
});

router.post('/', auth, async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send('details are not as expected');

        let user = await User.findOne({ email: req.payload.email });
        const { _id, name } = user._doc;

        let cart = await Cart.findOne({ userId: user._id });
        if (!cart) return res.status(400).send('cart not found');

        let order = await Order.insertMany([
            {
                userId: _id,
                productIds: req.body.productIds,
                fullName: name,
                totalPrice: req.body.totalPrice,
                orderDate: new Date().getTime().toString(),
            },
        ]);

        await cart.updateOne({ products: [] });
        await cart.save();

        res.status(200).send(order[0]._doc._id);
    } catch (error) {
        res.status(400).send('Error in Get Products');
    }
});

// Get order Details by id
router.get('/:id', async (req, res) => {
    try {
        let order = await Order.findOne({ _id: req.params.id });
        if (!order) return res.status(404).send('Theres no such order');

        let products = await Product.find({ _id: { $in: order.productIds } });
        products = products.map(product => product._doc);

        res.status(200).send({ ...order._doc, products });
    } catch (error) {
        console.log(error);

        res.status(400).send('Error in get Product...');
    }
});

// Get orders history Details by user
router.get('/', auth, async (req, res) => {
    try {
        if (!req?.payload?.email)
            return res.status(400).send('details are not as expected');

        let user = await User.findOne({ email: req.payload.email });
        const { _id, name } = user._doc;

        let orders = await Order.find({ userId: user._id });

        let products;
        let returnOrders = [];
        for (let order of orders) {
            products = await Product.find({ _id: { $in: order.productIds } });
            returnOrders.push({
                ...order._doc,
                products: products.map(product => product._doc),
            });
        }

        res.status(200).send([...returnOrders]);
    } catch (error) {
        console.log(error);

        res.status(400).send('Error in get Product...');
    }
});

router.get('/getInfo/historyCategories', auth, async (req, res) => {
    try {
        if (!req?.payload?.email)
            return res.status(400).send('details are not as expected');

        let user = await User.findOne({ email: req.payload.email });

        let orders = await Order.aggregate([
            {
                $unwind: { path: '$productIds' },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productIds',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            {
                $project: {
                    category: { $first: '$product.category' },
                },
            },
            {
                $group: {
                    _id: '$category',
                    count: { $count: {} },
                },
            },
        ]);

        res.status(200).send([...orders]);
    } catch (error) {
        console.log(error);

        res.status(400).send('Error in get Product...');
    }
});

module.exports = router;

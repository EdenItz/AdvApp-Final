const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const joi = require('joi');
const Product = require('../models/Product');

// ** Product Schema
const productSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required().min(2),
    category: joi.string().required().min(2),
    description: joi.string().required().min(6),
    image: joi.string().required(),
    inStock: joi.boolean().required(),
    productSize: joi.array().items(joi.string()),
});

const PAGE_SIZE = 24; // page size

// ** Add New Product (Admin Only)
router.post('/', auth, async (req, res) => {
    try {
        // Check if the the user is Admin
        if (!req.payload.isAdmin)
            return res.status(400).send('Only Admin can add Products..');

        // Validation for body
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.message);

        // Add Product to DB
        let product = new Product(req.body);
        await product.save();

        // Send the new product details
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// ** Get all Products in store
router.get('/', async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send('Error in get Products');
    }
});

// ** Get products by category and search
router.get('/', async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send('Error in get Products');
    }
});

router.get('/:category', async (req, res) => {
    // destructure page and limit and set default values
    const { q, inStock, page = 1, limit = 10 } = req.query;
    const category = req.params.category;

    try {
        // execute query with page and limit values
        let allProducts;
        if (q) {
            allProducts = await Product.find({
                $and: [
                    {
                        category: category,
                        ...(inStock && { inStock: inStock }),
                    },
                    { name: { $regex: new RegExp(q, 'i') } },
                ],
            })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
        } else {
            allProducts = await Product.find({
                category: category,
                ...(inStock && { inStock: inStock }),
            })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
        }

        // get total documents in the Posts collection
        const count = allProducts.length;

        // return response with posts, total pages, and current page
        res.json({
            allProducts,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error(err.message);
    }
});

// ** Get Product Details by Id
router.get('/id/:id', async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id });
        if (!product) return res.status(404).send('Theres no such product');
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send('Error in get Product...');
    }
});

// ** Update Product Details (Admin Only)
router.put('/:id', auth, async (req, res) => {
    try {
        // Check if the the user is Admin
        if (!req.payload.isAdmin)
            return res.status(400).send('Only Admin can add Products..');

        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.message);

        // Edit Product
        let product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true },
        );
        if (!product) return res.status(404).send('No Such Product');

        // Send the updated Product Details
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// ** Delete Product By Id (Admin Only)
router.delete('/:id', auth, async (req, res) => {
    try {
        // Check if the the user is Admin
        if (!req.payload.isAdmin)
            return res.status(400).send('Only Admin can add Products..');

        // Delete Product
        let product = await Product.findOneAndRemove({ _id: req.params.id });
        if (!product) return res.status(400).send('Product was not found!');
        res.status(200).send('Product Removed Successfully!');
    } catch (error) {
        res.status(400).send('Error in delete Product');
    }
});

module.exports = router;

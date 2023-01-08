// ** This file will insert products and orders to Mongo DB
const mongoose = require('mongoose');
const Product = require('./models/product');

const DB_URL = process.env.db || 'mongodb://localhost:27017/AdvApp';

// get MongoDB driver connection
mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(err => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

const testProducts = [
    {
        name: 'iPhone 9',
        price: 549.99,
        category: 'Phones',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },
    {
        name: 'iPhone 2',
        price: 549.99,
        category: 'Phones',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },

    {
        name: 'iPhone 3',
        price: 549.99,
        category: 'Phones',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },

    {
        name: 'iPhone 4',
        price: 549.99,
        category: 'Phones',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },

    {
        name: 'iPhone 5',
        price: 549.99,
        category: 'Phones',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: false,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },
];

// ** Insert Products
Product.insertMany(testProducts)
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    });

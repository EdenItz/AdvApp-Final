// ** This file will insert products and orders to Mongo DB
const mongoose = require('mongoose');
const Product = require('./models/product');
const Categories = require('./models/category');

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

// ** Lets create test Categories

const testCategories = [
    {
        name: 'Women',
        image: '/assets/images/categories/women-img.png',
        link: '/women',
    },
    {
        name: 'Men',
        image: '/assets/images/categories/men-img.png',
        link: '/men',
    },
    {
        name: 'Kids',
        image: '/assets/images/categories/kids-img.png',
        link: '/kids',
    },
    {
        name: 'Shoes&Bags',
        image: '/assets/images/categories/shoes-bags-img.png',
        link: '/shoes&bags',
    },
    {
        name: 'Accessories',
        image: '/assets/images/categories/accessories-img.png',
        link: '/accessories',
    },
];

// ** Insert Categories
Categories.insertMany(testCategories)
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    });

// ** Lets create test products

const testProducts = [
    // ** Women
    {
        name: 'iPhone 9 - Women',
        price: 549.99,
        category: 'Women',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },
    {
        name: 'iPhone 2 - Women',
        price: 549.99,
        category: 'Women',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },

    {
        name: 'iPhone 3 - Women',
        price: 549.99,
        category: 'Women',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['XL', 'L', 'S'],
    },

    {
        name: 'iPhone 4 - Women',
        price: 549.99,
        category: 'Women',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['XL', 'L', 'S'],
    },

    {
        name: 'iPhone 5 - Women',
        price: 549.99,
        category: 'Women',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: false,
        hot: false,
        rate: 4.7,
        productSize: ['XL', 'L', 'S'],
    },

    // ** Men
    {
        name: 'iPhone 9 - Men',
        price: 549.99,
        category: 'Men',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },
    {
        name: 'iPhone 2 - Men',
        price: 549.99,
        category: 'Men',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },

    {
        name: 'iPhone 3 - Men',
        price: 549.99,
        category: 'Men',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['XL', 'L', 'S'],
    },

    {
        name: 'iPhone 4 - Men',
        price: 549.99,
        category: 'Men',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['XL', 'L', 'S'],
    },

    {
        name: 'iPhone 5 - Men',
        price: 549.99,
        category: 'Men',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: false,
        hot: false,
        rate: 4.7,
        productSize: ['XL', 'L', 'S'],
    },

    // ** Kids
    {
        name: 'iPhone 9 - Kids',
        price: 549.99,
        category: 'Kids',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },
    {
        name: 'iPhone 2 - Kids',
        price: 549.99,
        category: 'Kids',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'XL',
    },

    {
        name: 'iPhone 3 - Kids',
        price: 549.99,
        category: 'Kids',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['XL', 'L', 'S'],
    },

    {
        name: 'iPhone 4 - Kids',
        price: 549.99,
        category: 'Kids',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['XL', 'L', 'S'],
    },

    {
        name: 'iPhone 5 - Kids',
        price: 549.99,
        category: 'Kids',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: false,
        hot: false,
        rate: 4.7,
        productSize: ['XL', 'L', 'S'],
    },

    // ** Shoes&Bags
    {
        name: 'iPhone 9 - Shoes&Bags',
        price: 549.99,
        category: 'Shoes&Bags',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['42', '41', '40', '39', '38', '37'],
    },
    {
        name: 'iPhone 2 - Shoes&Bags',
        price: 549.99,
        category: 'Shoes&Bags',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['42', '41', '40', '39', '38', '37'],
    },

    {
        name: 'iPhone 3 - Shoes&Bags',
        price: 549.99,
        category: 'Kids',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['42', '41', '40', '39', '38', '37'],
    },

    {
        name: 'iPhone 4 - Shoes&Bags',
        price: 549.99,
        category: 'Shoes&Bags',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: ['42', '41', '40', '39', '38', '37'],
    },

    {
        name: 'iPhone 5 - Shoes&Bags',
        price: 549.99,
        category: 'Shoes&Bags',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: false,
        hot: false,
        rate: 4.7,
        productSize: 'Regular',
    },

    // ** Accessories
    {
        name: 'iPhone 9 - Accessories',
        price: 549.99,
        category: 'Accessories',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'one-size',
    },
    {
        name: 'iPhone 2 - Accessories',
        price: 549.99,
        category: 'Accessories',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'one-size',
    },

    {
        name: 'iPhone 3 - Accessories',
        price: 549.99,
        category: 'Accessories',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'one-size',
    },

    {
        name: 'iPhone 4 - Accessories',
        price: 549.99,
        category: 'Accessories',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: true,
        hot: false,
        rate: 4.7,
        productSize: 'one-size',
    },

    {
        name: 'iPhone 5 - Accessories',
        price: 549.99,
        category: 'Accessories',
        description: 'An apple mobile which is nothing like apple',
        image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        inStock: false,
        hot: false,
        rate: 4.7,
        productSize: 'one-size',
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

console.log('Done !!!');

//** Libs
const axios = require('axios');

// ** This file will insert products and orders to Mongo DB
const mongoose = require('mongoose');
const Product = require('./models/product');
const Categories = require('./models/category');
// const Users = require('./models/user');

const DB_URL = process.env.db || 'mongodb://127.0.0.1:27017/AdvApp';

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

async function insertCategories() {
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
}

const configData = [
    {
        name: 'Women',
        image: '/assets/images/categories/women-img.png',
        link: '/women',
        productSize: ['XL', 'L', 'M', 'S', 'XS'],
        catIn: ['womens-shoes', 'womens-dresses'],
    },
    {
        name: 'Men',
        image: '/assets/images/categories/men-img.png',
        link: '/men',
        productSize: ['XL', 'L', 'M', 'S'],
        catIn: ['mens-shirts'],
    },
    {
        name: 'Kids',
        image: '/assets/images/categories/kids-img.png',
        link: '/kids',
        productSize: ['XL', 'L', 'M', 'S', 'XS'],
        catIn: ['mens-shirts'],
    },
    {
        name: 'Shoes&Bags',
        image: '/assets/images/categories/shoes-bags-img.png',
        link: '/shoes&bags',
        productSize: ['42', '41', '40', '39', '38', '37'],
        catIn: ['womens-shoes', 'mens-shoes'],
    },
    {
        name: 'Shoes&Bags',
        image: '/assets/images/categories/shoes-bags-img.png',
        link: '/shoes&bags',
        productSize: 'one-size',
        catIn: ['womens-bags', 'mens-shoes'],
    },
    {
        name: 'Accessories',
        image: '/assets/images/categories/accessories-img.png',
        link: '/accessories',
        productSize: 'one-size',
        catIn: [
            'sunglasses',
            'womens-jewellery',
            'mens-watches',
            'home-decoration',
        ],
    },
];

//** convert products
function productConversion(catData, product) {
    const newProduct = {
        name: product?.title,
        price: product?.price,
        category: catData.name,
        description: product?.description,
        image: product?.images[0],
        inStock: (Math.round(Math.random() * 6) > 1),
        rate: product?.rating,
        productSize: catData.productSize,
    };

    return newProduct;
}

// fetch data from api
async function fetchCategoriesAndProducts() {
    try {
        // Fetch categories
        const categoriesResponse = await axios.get(
            'https://dummyjson.com/products/categories',
        );
        const categories = categoriesResponse.data;

        console.log('fetched dummy categories!');

        // Fetch products for each category
        let productsByCategory = [];

        for (const fetchData of configData) {
            const catData = fetchData?.catIn;

            for (const category of catData) {
                // lets check if we have correct data
                if (categories.includes(category)) {
                    const productsResponse = await axios.get(
                        `https://dummyjson.com/products/category/${category}`,
                    );

                    const products = productsResponse?.data?.products;

                    for (const product of products) {
                        const convertProd = productConversion(
                            fetchData,
                            product,
                        );
                        productsByCategory.push(convertProd);
                    }
                } else {
                    console.log('Error at - ' + category);
                }
            }
        }
        console.log('Added all dummy products!');

        //**  Lets create test products -> Insert Products
        await Product.insertMany(productsByCategory)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
        // console.log(convertProd);

        return productsByCategory;
    } catch (error) {
        console.error(error);
        return null;
    }
}

insertCategories();
fetchCategoriesAndProducts();

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar';
import Footer from '../Footer';
import Category from '../Category';
import '../../css/categoryCard.css';
import '../../css/card.css';

import { getAllProducts } from '../../services/productsService';
import { errorMsg } from '../../services/feedbackService';
import Card from '../Card';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Women Cloth Filter
    const womenCloth = products.filter(item => item.category == 'Women');

    // Men Cloth Filter
    const menCloth = products.filter(item => item.category == 'Men');

    // Kids & Babys Cloth Filter
    const kidsCloth = products.filter(item => item.category == 'Kids');

    useEffect(() => {
        // Getting All Products
        getAllProducts()
            .then(result => {
                setProducts(result.data);
                setIsLoading(true);
            })
            .catch(err => {
                errorMsg('Something went wrong.. Try Again!');
            });
    }, []);

    return (
        <>
            <Navbar />
            {/* Adds Spinner on Page While Data is Fetched */}
            {isLoading ? (
                <div className="container main">
                    {/* Categories Cards */}
                    <h1 className="boldTitle text-center pt-3">
                        <span className="tapered2">Featured Categories</span>
                    </h1>
                    <h5 className="text-center mb-3">
                        Newest trends from top brands.
                    </h5>
                    <Category />
                    <hr className="horizontalLine mt-5 mb-4 mx-auto" />

                    <h1 className="boldTitle text-center">
                        <span className="tapered2">Women Clothing</span>
                    </h1>
                    <h5 className="text-center mb-3">
                        <i className="fa-solid fa-venus women"></i> New Arrivals
                        For Women.
                    </h5>
                    {/* Women Clothing Cards */}
                    <div className="products">
                        {womenCloth
                            .filter((item, index) => index < 4)
                            .map(product => {
                                return (
                                    // CARDS
                                    <Card
                                        _id={product._id}
                                        hot={product.hot}
                                        image={product.image}
                                        category={product.category}
                                        description={product.description}
                                        rate={product.rate}
                                        name={product.name}
                                        price={product.price}
                                        inStock={product.inStock}
                                        key={product._id}
                                    />
                                );
                            })}
                    </div>
                    <div className="text-center">
                        <Link
                            type="button"
                            className="btn shiny btn-dark mt-4"
                            to="/Women"
                        >
                            See More <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                    <hr className="horizontalLine mt-4 mb-4 mx-auto" />
                    {/* Banners */}
                    <div className="banners text-center mb-4">
                        <div className="row">
                            <div className="banner col-lg-6 shiny">
                                <Link to="/kids">
                                    <img
                                        className="banner img-fluid"
                                        src="banner1.jpg"
                                        alt="Banner"
                                    />
                                </Link>
                            </div>
                            <div className="banner col-lg-6 shiny">
                                <Link to="/men">
                                    <img
                                        className="banner img-fluid"
                                        src="banner2.jpg"
                                        alt="Banner"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <hr className="horizontalLine mb-4 mx-auto hr" />
                    <h1 className="boldTitle text-center">
                        <span className="tapered2">Men Clothing</span>
                    </h1>
                    <h5 className="text-center mb-3">
                        <i className="fa-solid fa-mars men"></i> New Arrivals
                        For Men.
                    </h5>
                    {/* Men Clothing Cards */}
                    <div className="products">
                        {menCloth
                            .filter((item, index) => index < 4)
                            .map(product => {
                                return (
                                    <Card
                                        _id={product._id}
                                        hot={product.hot}
                                        image={product.image}
                                        category={product.category}
                                        description={product.description}
                                        rate={product.rate}
                                        name={product.name}
                                        price={product.price}
                                        inStock={product.inStock}
                                        key={product._id}
                                    />
                                );
                            })}
                    </div>
                    <div className="text-center">
                        <Link
                            type="button"
                            className="btn shiny btn-dark mt-4"
                            to="/Men"
                        >
                            See More <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>

                    <hr className="horizontalLine mx-auto" />
                    <h1 className="boldTitle text-center mb-4">
                        <span className="tapered2">Kids Clothing</span>
                    </h1>

                    {/* Kids Clothing Cards */}
                    <div className="products">
                        {kidsCloth
                            .filter((item, index) => index < 4)
                            .map(product => {
                                return (
                                    <Card
                                        _id={product._id}
                                        hot={product.hot}
                                        image={product.image}
                                        category={product.category}
                                        description={product.description}
                                        rate={product.rate}
                                        name={product.name}
                                        price={product.price}
                                        inStock={product.inStock}
                                        key={product._id}
                                    />
                                );
                            })}
                    </div>
                    <div className="text-center">
                        <Link
                            type="button"
                            className="btn shiny btn-dark mt-4"
                            to="/Kids"
                        >
                            See More <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="spinner">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default HomePage;

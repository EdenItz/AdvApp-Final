import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { getProductsByCategory } from '../services/productsService';
import Card from './Card';

function Product({ category }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const productsApi = async () => {
        const request = await getProductsByCategory(category);

        if (request.status === 200) {
            setProducts(request.data.allProducts);
            setIsLoading(true);
        }
    };

    React.useEffect(() => {
        productsApi(category);
    }, [category]);

    return (
        <>
            <Navbar />
            {/* Adds Spinner on Page While Data is Fetched */}
            {isLoading ? (
                <div className="container main">
                    {/* SEARCH BAR */}
                    <div className="search pt-3">
                        <div className="input-group flex-nowrap ">
                            <span
                                className="input-group-text"
                                id="addon-wrapping"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input
                                onChange={e => setSearch(e.target.value)}
                                type="search"
                                className="form-control search-Control w-75"
                                placeholder="Search Product..."
                                aria-label="Search"
                                aria-describedby="addon-wrapping"
                            />
                        </div>
                    </div>

                    {/* PRODUCTS */}
                    {products ? (
                        <div className="products mt-3">
                            {products
                                .filter(item => {
                                    return search.toLowerCase() == ''
                                        ? item
                                        : item.name
                                              .toLowerCase()
                                              .includes(search);
                                })
                                .map(product => {
                                    return (
                                        // CARDS
                                        <Card
                                            _id={product._id}
                                            image={product.image}
                                            hot={product.hot}
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
                    ) : null}
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

export default Product;

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import { addToUserCart } from '../../services/cartService';
import { errorMsg, successMsg } from '../../services/feedbackService';
import { Link } from 'react-router-dom';

function CurrentProduct(props) {
    const products = props.products;
    // Updates Cart Badge After Adding To Cart
    const cartChange = props.cartChange;
    const setCartChange = props.setCartChange;
    const [cookies] = useCookies();
    const [size, setSize] = useState('');

    //  Add Product To Cart
    const HandleAddToCart = product => {
        if (!size) {
            errorMsg('Please Choose Size!');
        } else {
            product.quantity = 1;
            const currentSize = {
                size,
            };
            product.size = currentSize.size;
            product.productId = products._id;
            addToUserCart(product, cookies.eShopToken, cookies.eShopUserID)
                .then(() => {
                    successMsg('Product added successfully!');
                    setCartChange(!cartChange);
                })
                .catch(err =>
                    errorMsg('Something went wrong, Please try again!'),
                );
        }
    };
    return (
        <>
            <div className="row content my-4">
                {/* Image Div */}
                <div className="leftDiv col-6 shiny">
                    {products.hot ? <div className="badge">Hot</div> : null}
                    {/* Big Screen Left Image */}
                    <img
                        className="productDetailsImage img-fluid"
                        src={products.image}
                        alt="ProductImage"
                    />
                </div>
                {/* Details Div */}
                <div className="rightDiv col-xl-6 col-md-12 col-sm-12">
                    {/* Mobile Screen Image // Hidden while Screen is Big */}
                    <div className="resonsiveImg text-center mb-4">
                        <img
                            className="img img-fluid"
                            src={products.image}
                            alt="ProductImage"
                        />
                    </div>
                    <h2
                        className="productDetailsTxt"
                        style={{ display: 'inline' }}
                    >
                        {products.name}{' '}
                    </h2>
                    <span>
                        <i
                            className="fa-solid fa-star"
                            style={{ color: '#FFD700' }}
                        ></i>{' '}
                        <strong className="rate">{products.rate}</strong>
                    </span>
                    <h2 className="productDetailsTxt fw-bold mt-1">
                        Price: ${products.price}
                        {products.inStock ? (
                            <span className="inStock"> In Stock!</span>
                        ) : (
                            <span className="outOfStock"> Out Of Stock!</span>
                        )}{' '}
                    </h2>
                    <span style={{ color: '#9d9d9d' }}>
                        SKU: {products._id}{' '}
                    </span>
                    <h5 className="mt-2">Description:</h5>{' '}
                    <span className="descClass">{products.description}</span>
                    <hr />
                    <div className="sizeBtns">
                        <select
                            defaultValue="Choose Your Size"
                            className="form-select"
                            aria-label="Default select example"
                            onChange={e => setSize(e.target.value)}
                        >
                            <option value="Choose Your Size" disabled>
                                Choose Size
                            </option>
                            {products.productSize
                                ? products.productSize.map((item, index) => (
                                      <option key={index}>{item}</option>
                                  ))
                                : null}
                        </select>
                    </div>
                    <div
                        className="alert alert-secondary mt-3 descClass"
                        role="alert"
                    >
                        <i
                            className="fa-solid fa-truck-fast fa-lg"
                            style={{ color: '#00A36C' }}
                        ></i>
                        <span className="fw-bold "> Free Shipping</span>
                        <p>Free Shipping over $50</p>
                        <i
                            className="fa-solid fa-shield fa-lg"
                            style={{ color: '#00A36C' }}
                        ></i>{' '}
                        <span className="fw-bold">Return Policy</span>
                        <p className="fs-6">
                            If you return an item requesting a refund within 28
                            days of the item being delivered to you or available
                            for collection, we'll give you a full refund by way
                            of the original payment method. If you return an
                            item requesting a refund within 29 and 45 days of
                            the item being delivered to you or available for
                            collection, we'll give you an E-Shops gift voucher
                            for the amount equivalent to the price you paid for
                            them - click here to find out more info about items
                            returned within 29 and 45 days.
                            <br />
                            For all returns, we aim to refund you within 14 days
                            of receiving the returned item.
                            <br />
                            If you request a refund for an item during the above
                            time frames but you can't return it to us for some
                            reason, please get in touch - but any refund will be
                            at our discretion.
                        </p>
                    </div>
                    {products.inStock == false ? (
                        <button
                            className="btn btn-secondary shiny w-100"
                            disabled
                        >
                            Out Of Stock :(
                        </button>
                    ) : cookies.eShopToken ? (
                        <a
                            onClick={() => HandleAddToCart(products)}
                            className="btn shiny btn-success btn-lg w-100 "
                        >
                            <i className="fa-solid fa-bag-shopping"> </i> Add To
                            Bag{' '}
                        </a>
                    ) : (
                        <Link
                            to="/login"
                            className="btn shiny btn-dark btn-lg w-100 "
                        >
                            Login To Continue Shopping
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

export default CurrentProduct;

import React from 'react';
import './ProductCard.css';

function ProductCard({ name, price, currency, images }) {
    return (
        <div className="product-card">
            <div className="product-info">
                <p>{name}</p>
                <p className="product-price">
                    {price} {currency}
                </p>
            </div>

            <img
                className="product-img"
                src={images && images[0]}
                alt="תמונת מוצר"
            />
        </div>
    );
}

export default ProductCard;

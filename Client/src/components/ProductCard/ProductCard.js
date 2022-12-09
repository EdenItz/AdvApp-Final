import React from 'react';
import { Button } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import './ProductCard.css';

function ProductCard({
    name,
    price,
    currency,
    images,
    addToCart,
    removeFromCart = false,
}) {
    const handleAddToCart = e => {
        e.stopPropagation();

        addToCart();
    };

    const handleRemoveFromCart = e => {
        e.stopPropagation();

        removeFromCart();
    };

    return (
        <div className="product-card">
            {removeFromCart ? (
                <Button
                    className="remove-from-cart"
                    variant="contained"
                    endIcon={<RemoveShoppingCartIcon />}
                    color="secondary"
                    onClick={handleRemoveFromCart}
                >
                    הסר מהעגלה
                </Button>
            ) : (
                <Button
                    className="add-to-cart"
                    variant="contained"
                    endIcon={<AddShoppingCartIcon />}
                    color="primary"
                    onClick={handleAddToCart}
                >
                    הוסף לעגלה
                </Button>
            )}
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

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowForward';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ClearIcon from '@mui/icons-material/Clear';

import { CartContext } from '../../context/CartContext';
import { productsJson } from '../../MockData/products';
import ProductCard from '../ProductCard/ProductCard';

import './ShoppingCart.css';
import { Button } from '@mui/material';

function ShoppingCart() {
    let navigate = useNavigate();
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [finalCartProducts, setFinalCartProducts] = useState([]);

    useEffect(() => {
        setProducts(productsJson);

        let finalProducts = [];

        cartProducts.forEach(productId => {
            const currentProduct = products.find(
                product => product.id === productId,
            );

            if (!currentProduct) return;

            finalProducts.push(currentProduct);
        });

        setFinalCartProducts(finalProducts);
    }, [cartProducts, products]);

    const handleRemoveFromCart = id => {
        setCartProducts(prevState =>
            prevState.filter(productId => productId !== id),
        );
    };

    const handleProductClick = id => {
        if (!id) return;

        navigate(`/product/${id}`);
    };

    const onBuy = e => {
        e.preventDefault();

        console.log('Products to buy: ', finalCartProducts);
    };

    const totalCartPrice = finalCartProducts
        ?.map(product => product.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return (
        <form onSubmit={onBuy} className="shopping-cart">
            <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
                className="back-button"
                onClick={() => navigate(-1)}
            >
                חזור
            </Button>
            <div>
                <h1>עגלת קניות</h1>
                {finalCartProducts?.length > 0 && (
                    <h2>
                        {`סהכ:
                    ${Math.round(totalCartPrice * 100) / 100} ${
                            finalCartProducts[0].currency
                        }`}
                    </h2>
                )}
                <div className="actions">
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<ClearIcon />}
                        className="clear-cart-button"
                        onClick={() => setCartProducts([])}
                    >
                        נקה סל קניות
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ShoppingBasketIcon />}
                        className="buy-button"
                        type="submit"
                    >
                        בצע רכישה
                    </Button>
                </div>
                {finalCartProducts.map(product => (
                    <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                    >
                        <ProductCard
                            {...product}
                            removeFromCart={() =>
                                handleRemoveFromCart(product.id)
                            }
                        />
                    </div>
                ))}
            </div>
        </form>
    );
}

export default ShoppingCart;

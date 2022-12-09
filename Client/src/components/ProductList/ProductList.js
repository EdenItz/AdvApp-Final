import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { productsJson } from '../../MockData/products';
import ProductCard from '../ProductCard/ProductCard';

import './ProductList.css';
import { CartContext } from '../../context/CartContext';

function ProductList() {
    let navigate = useNavigate();
    const { cartProducts, setCartProducts } = useContext(CartContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Preparation for when there will be DB
        setProducts(productsJson);
    }, []);

    const handleProductClick = id => {
        if (!id) return;

        navigate(`/product/${id}`);
    };

    const handleAddToCart = id => {
        setCartProducts(prevState => [...prevState, id]);
    };

    return (
        <div className="products-list">
            <Badge
                onClick={() => navigate('cart')}
                className="shopping-cart-icon"
                badgeContent={cartProducts?.length}
                color="primary"
            >
                <ShoppingCartIcon />
            </Badge>
            <h1>החנות של עדן</h1>
            {products.map(product => (
                <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                >
                    <ProductCard
                        {...product}
                        addToCart={() => handleAddToCart(product.id)}
                    />
                </div>
            ))}
        </div>
    );
}

export default ProductList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsJson } from '../../MockData/products';
import ProductCard from '../ProductCard/ProductCard';

import './ProductList.css';

function ProductList() {
    let navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Preparation for when there will be DB
        setProducts(productsJson);
    }, []);

    const handleProductClick = id => {
        if (!id) return;

        navigate(`product/${id}`);
    };

    return (
        <div className="products-list">
            {products.map(product => (
                <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                >
                    <ProductCard {...product} />
                </div>
            ))}
        </div>
    );
}

export default ProductList;

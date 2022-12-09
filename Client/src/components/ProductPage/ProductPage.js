import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowForward';

import { productsJson } from '../../MockData/products';

import './ProductPage.css';

function ProductPage() {
    let { productId } = useParams();
    const [product, setProduct] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (!productId) return setProduct(null);

        setProduct(productsJson.find(p => p.id === parseInt(productId)));
    }, [productId]);

    return product ? (
        <div className="product-page">
            <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
                className="back-button"
                onClick={() => navigate(-1)}
            >
                חזור
            </Button>
            <h2 className="product-page-title">{product.name}</h2>
            <img
                className="product-img"
                src={
                    product.images &&
                    (product.images.length > 1
                        ? product.images[1]
                        : product.images[0])
                }
                alt="תמונת מוצר"
            />
            <p>
                <b>תיאור: </b>
                {product.description}
            </p>
            <p>
                <b>חנות: </b> {product.store}
            </p>
        </div>
    ) : (
        <div>
            <h1
                className="center"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(-1)}
            >
                המוצר לא נמצא, לחץ כדי לחזור לרשימת הקניות
            </h1>
        </div>
    );
}

export default ProductPage;

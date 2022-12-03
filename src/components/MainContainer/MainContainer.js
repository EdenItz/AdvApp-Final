import React from 'react';
import IconButton from '@mui/material/IconButton'; import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import ProductList from '../ProductList/ProductList';

import "./MainContainer.css";

function MainContainer() {
    return (
        <><div>
            <h2 className='title'>חנות שווה ביותר</h2>
            <IconButton>
                <ShoppingCartIcon />
            </IconButton>
        </div>
            <ProductList /></>
    );
}

export default MainContainer;

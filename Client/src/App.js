import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import ProductPage from './components/ProductPage/ProductPage';
import ProductList from './components/ProductList/ProductList';

function App() {
    return (
        <Router>
            <IconButton color="primary">
                <ShoppingCartIcon />
            </IconButton>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="product/:productId" element={<ProductPage />} />
            </Routes>
        </Router>
    );
}

export default App;

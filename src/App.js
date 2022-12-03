import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage/ProductPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="product/:productId" element={<ProductPage />} />
            </Routes>
        </Router>
    );
}

export default App;

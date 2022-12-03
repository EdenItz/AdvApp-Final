import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainContainer from './components/MainContainer/MainContainer';
import ProductPage from './components/ProductPage/ProductPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="product/:productId" element={<ProductPage />} />
            </Routes>
        </Router>
    );
}

export default App;

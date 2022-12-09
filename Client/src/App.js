import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CartContext } from './context/CartContext';
import ProductPage from './components/ProductPage/ProductPage';
import ProductList from './components/ProductList/ProductList';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

function App() {
    const [cartProducts, setCartProducts] = useState([]);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
            <Router>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route
                        path="product/:productId"
                        element={<ProductPage />}
                    />
                    <Route path="cart" element={<ShoppingCart />} />
                </Routes>
            </Router>
        </CartContext.Provider>
    );
}

export default App;

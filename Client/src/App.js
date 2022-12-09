import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';

import { ProductsContext } from './context/ProductsContext';
import { CartContext } from './context/CartContext';
import ProductPage from './components/ProductPage/ProductPage';
import ProductList from './components/ProductList/ProductList';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import { getProducts } from './actions/productsActions';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [cartProducts, setCartProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const res = await getProducts();

            if (res) {
                setProducts(res);
            } else alert.error('Error while loading products');

            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CartContext.Provider value={{ cartProducts, setCartProducts }}>
                <ProductsContext.Provider value={{ products, setProducts }}>
                    {loading ? (
                        <CircularProgress size="7rem" className="loader" />
                    ) : (
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
                    )}
                </ProductsContext.Provider>
            </CartContext.Provider>
        </ThemeProvider>
    );
}

export default App;

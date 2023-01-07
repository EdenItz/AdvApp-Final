import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Navbar from '../Navbar';
import Footer from '../Footer';

// Top Component
import CurrentProduct from './CurrentProduct';
// Bottom Component
import RandomProducts from '../RandomProducts';

function ProductDetails() {
    const { id } = useParams();
    const api = import.meta.env.VITE_API_BASE_URL || '';
    const [products] = useFetch(`${api}products/${id}`);
    const [isLoading, setIsLoading] = useState(false);

    // Update Cart icon When Adding New Product
    const [cartChange, setCartChange] = useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 500);
    }, []);
    return (
        <>
            <Navbar cartChange={cartChange} />
            {isLoading ? (
                <div className="container main">
                    <CurrentProduct
                        products={products}
                        setCartChange={setCartChange}
                        cartChange={cartChange}
                    />
                    <RandomProducts />
                </div>
            ) : (
                <div className="spinner">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default ProductDetails;

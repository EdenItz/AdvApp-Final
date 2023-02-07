import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getProductById } from '../../services/productsService';
import Navbar from '../Navbar';
import Footer from '../Footer';

// Top Component
import CurrentProduct from './CurrentProduct';
// Bottom Component
import RandomProducts from '../RandomProducts';

function ProductDetails() {
    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Update Cart icon When Adding New Product
    const [cartChange, setCartChange] = useState(false);

    React.useEffect(() => {
        async function fetchData() {
            const response = await getProductById(id);

            if (response.status == 200) {
                setProducts(response.data);
                setIsLoading(true);
            }
        }
        fetchData();
    }, [id]);

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

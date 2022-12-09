import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowForward';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2';

import { CartContext } from '../../context/CartContext';
import ProductCard from '../ProductCard/ProductCard';
import { ProductsContext } from '../../context/ProductsContext';
import { upsertOrder } from '../../actions/order';

import './ShoppingCart.css';

function ShoppingCart() {
    let navigate = useNavigate();
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const { products } = useContext(ProductsContext);
    const [finalCartProducts, setFinalCartProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        fullName: '',
        address: '',
    });

    useEffect(() => {
        let finalProducts = [];

        cartProducts.forEach(productId => {
            const currentProduct = products.find(
                product => product.id === productId,
            );

            if (!currentProduct) return;

            finalProducts.push(currentProduct);
        });

        setFinalCartProducts(finalProducts);
    }, [cartProducts, products]);

    const handleRemoveFromCart = id => {
        let idx = cartProducts.findIndex(p => p === id);

        if (!cartProducts[idx]) return;

        let newCartProducts = [...cartProducts];
        newCartProducts.splice(idx, 1);

        setCartProducts(newCartProducts);
    };

    const handleProductClick = id => {
        if (!id) return;

        navigate(`/product/${id}`);
    };

    const onBuy = async e => {
        setLoading(true);
        e.preventDefault();
        console.log('form fields: ', formFields);
        console.log('Products to buy: ', finalCartProducts);

        const order = {
            ...formFields,
            productIds: finalCartProducts.map(product => product.id),
        };

        let orderId = await upsertOrder(order);

        orderId
            ? Swal.fire(`איזה כיף!`, `הזמנה בוצעה בהצלחה`, 'success')
            : Swal.fire(`לא הצלחנו לבצע את ההזמנה, נסה שנית`, '', 'error');

        setLoading(false);
    };

    const totalCartPrice = finalCartProducts
        ?.map(product => product.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const onChangeInput = e => {
        setFormFields(prevState => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    return (
        <form onSubmit={onBuy} className="shopping-cart">
            <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
                className="back-button"
                onClick={() => navigate(-1)}
            >
                חזור
            </Button>
            <div>
                <h1>עגלת קניות</h1>
                {finalCartProducts?.length > 0 && (
                    <h2>
                        {`סהכ:
                    ${Math.round(totalCartPrice * 100) / 100} ${
                            finalCartProducts[0].currency
                        }`}
                    </h2>
                )}
                <div className="actions">
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<ClearIcon />}
                        className="clear-cart-button"
                        onClick={() => setCartProducts([])}
                    >
                        נקה סל קניות
                    </Button>
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        endIcon={<ShoppingBasketIcon />}
                        className="buy-button"
                        type="submit"
                        loading={loading}
                    >
                        בצע רכישה
                    </LoadingButton>
                </div>
                <div className="input-details">
                    <TextField
                        name="fullName"
                        className="input"
                        variant="outlined"
                        onChange={onChangeInput}
                        label="שם מלא"
                        value={formFields.fullName}
                    />
                    <TextField
                        name="address"
                        className="input"
                        variant="outlined"
                        onChange={onChangeInput}
                        label="כתובת"
                        value={formFields.address}
                    />
                </div>
                {finalCartProducts.map((product, index) => (
                    <div
                        key={index}
                        id={product.id}
                        onClick={() => handleProductClick(product.id)}
                    >
                        <ProductCard
                            {...product}
                            removeFromCart={() =>
                                handleRemoveFromCart(product.id)
                            }
                        />
                    </div>
                ))}
            </div>
        </form>
    );
}

export default ShoppingCart;

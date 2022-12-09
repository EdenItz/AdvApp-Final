import { createContext } from 'react';

let cartContext = {
    cartProducts: [],
    setCartProducts: () => {},
};

export const CartContext = createContext(cartContext);

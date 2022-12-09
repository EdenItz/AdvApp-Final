import { createContext } from 'react';

let productsContext = {
    products: [],
    setProducts: () => {},
};

export const ProductsContext = createContext(productsContext);

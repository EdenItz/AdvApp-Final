import products from '../api/products';

export const getProducts = async () => {
    try {
        const { data } = await products.get('/');

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getProductById = async productId => {
    try {
        const { data } = await products.get(`/${productId}`, {});

        return data;
    } catch (e) {
        console.error(e);
    }
};

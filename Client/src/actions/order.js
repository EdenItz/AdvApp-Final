import orders from '../api/order';

export const upsertOrder = async order => {
    try {
        const { data } = await orders.post('/', order);

        return data;
    } catch (e) {
        console.error(e);
    }
};

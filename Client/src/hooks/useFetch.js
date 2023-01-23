import { useState, useEffect } from 'react';

export const useFetch = endpoint => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(endpoint, {credentials: 'include'})
            .then(res => res.json())
            .then(data => setData(data));
    }, [endpoint]);

    return [data];
};

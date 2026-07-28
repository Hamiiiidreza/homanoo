import { localBackendUrl } from '../utils/constants';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const fetchData = async (productId: number) => {
    const headers: { authorization?: string } = {};

    const token = Cookies.get('token');

    if (token) {
        headers.authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${localBackendUrl}/product/${productId}`, {
        headers,
    });

    const data = await res.json();

    if (!res.ok) {
        throw data;
    }

    return data;
};

const useProduct = (productId: number) => {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchData(productId),
        retry: false,
    });
};

export default useProduct;
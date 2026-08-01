import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { localBackendUrl } from '../utils/constants';
import { CheckoutReqBody } from '../types/service.types';

const createOrder = async (obj: CheckoutReqBody) => {
    const response = await fetch(localBackendUrl + `/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${Cookies.get('token')}`,
        },

        body: JSON.stringify(obj),
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};

export const fetchOrder = async (trackingCode: string) => {
    const response = await fetch(`${localBackendUrl}/order/${trackingCode}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};
export const fetchOrders = async () => {
    const response = await fetch(`${localBackendUrl}/orders`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};

const useOrder = (trackingCode?: string) => {
    const mutation = useMutation({
        mutationFn: (data: CheckoutReqBody) => createOrder(data),
        mutationKey: ['create-order'],
    });

    const { data: order, isPending: orderRequestPending } = useQuery({
        queryKey: ['get-order', trackingCode],
        queryFn: () => fetchOrder(String(trackingCode)),
        enabled: !!trackingCode,
    });
    const { data: orders, isPending: ordersRequestPending } = useQuery({
        queryKey: ['get-orders'],
        queryFn: fetchOrders,
    });
    return { mutation, order, orderRequestPending, orders, ordersRequestPending };
};

export default useOrder;

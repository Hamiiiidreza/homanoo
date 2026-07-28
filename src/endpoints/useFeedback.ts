import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { localBackendUrl } from '../utils/constants';
import { toast } from 'sonner';

const createFeedback = async (
    productCode: number,
    body: { comment: string; rating: number },
) => {
    const response = await fetch(localBackendUrl + `/feedback/${productCode}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${Cookies.get('token')}`,
        },

        body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
};

const fetchData = async (productCode: number, page: number) => {
    const response = await fetch(
        localBackendUrl +
        `/product/feedbacks/${productCode}${page ? `?page=${page}` : ''}`,
    );
    const data = await response.json();
    return data;
};

const useFeedback = (productCode?: number, page?: number) => {
    const { data, isPending } = useQuery({
        queryKey: [`product-feedbacks-${productCode}`, page],
        queryFn: () => fetchData(Number(productCode), Number(page)),
        enabled: !!productCode,
    });

    const createMutation = useMutation({
        mutationFn: (params: {
            productCode: number;
            data: { comment: string; rating: number };
        }) => createFeedback(params.productCode, params.data),

        onSuccess: (data) => {
            toast.success(data.message || 'نظر شما با موفقیت ثبت شد');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'مشکلی در ثبت نظر پیش آمد');
        },
    });

    return { createMutation, data, isPending };
};

export default useFeedback;
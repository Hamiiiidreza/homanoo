import { toast } from 'sonner';
import { localBackendUrl } from '../utils/constants';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const toggleFavorite = async (code: number) => {
    const response = await fetch(localBackendUrl + `/toggle/wishlist/${code}`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${Cookies.get('token')}`,
        },
    });
    const data = await response.json();
    return data;
};

const useFavorite = () => {
    const mutation = useMutation({
        mutationFn: (code: number) => toggleFavorite(code),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
    return { mutation };
};

export default useFavorite;
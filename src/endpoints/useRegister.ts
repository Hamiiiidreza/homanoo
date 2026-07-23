import { useMutation, useQueryClient } from '@tanstack/react-query';
import { localBackendUrl } from '../utils/constants';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface RegisterRequest {
    phone: string;
    password: string;
}

interface RegisterResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        id: number;
        phone: string;
        password: string;
    };
}

export const registerUser = async (
    data: RegisterRequest,
): Promise<RegisterResponse> => {
    const response = await fetch(`${localBackendUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'خطا در ارتباط با سرور');
    }

    return response.json();
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data: RegisterRequest) => registerUser(data),
        onSuccess: (data) => {
            Cookies.set('token', data.token);
            toast.success(data.message);
            queryClient.refetchQueries({ queryKey: ['me'] });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    return { mutation };
};

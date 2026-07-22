import { useMutation, useQueryClient } from '@tanstack/react-query';
import { localBackendUrl } from '../utils/constants';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface LoginRequest {
    phone: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        id: number;
        phone: string;
        password: string;
    };
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${localBackendUrl}/login`, {
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

export const useLogin = (endFunction?: () => void) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data: LoginRequest) => loginUser(data),
        onSuccess: (data) => {
            Cookies.set('token', data.token);
            toast.success(data.message);
            queryClient.refetchQueries({ queryKey: ['me'] });
            endFunction?.();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    return { mutation };
};

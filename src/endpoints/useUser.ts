import { useMutation, useQuery } from '@tanstack/react-query';
import { localBackendUrl } from '../utils/constants';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { User } from '../types/user.types';

export const fetchMe = async () => {
    const response = await fetch(`${localBackendUrl}/me`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
    });
    if (!response.ok) {
        if (response.status === 401) {
            Cookies.remove('token');
            throw new Error('Unauthorized');
        }
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'خطا در دریافت اطلاعات کاربر');
    }
    return response.json();
};

const editUser = async (data: {
    email?: string;
    phone?: string;
    birthDate?: string;
    name?: string;
    nationalCode?: string;
}) => {
    const response = await fetch(`${localBackendUrl}/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};

const changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
}) => {
    const response = await fetch(`${localBackendUrl}/changePassword`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};

const createAddress = async (data: {
    postalCode: string;
    city: string;
    province: string;
    address: string;
}) => {
    const response = await fetch(`${localBackendUrl}/address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};

const deleteAddress = async (id: number) => {
    const response = await fetch(`${localBackendUrl}/address/${id}`, {
        method: 'DELETE',
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

export const useUser = () => {
    const editUsermutation = useMutation({
        mutationFn: (data: any) => editUser(data),
        mutationKey: ['editUser'],
        onSuccess(data) {
            toast.success(data.message);
        },
        onError(data) {
            toast.error(data.message);
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: (data: any) => changePassword(data),
        mutationKey: ['changePassword'],
        onSuccess(data) {
            toast.success(data.message);
            Cookies.set('token', data.token);
        },
        onError(data) {
            toast.error(data.message);
        },
    });
    const createAddressMutation = useMutation({
        mutationFn: (data: any) => createAddress(data),
        mutationKey: ['createAddress'],
        onSuccess(data) {
            toast.success(data.message);
        },
        onError(data) {
            toast.error(data.message);
        },
    });
    const deleteAddressMutation = useMutation({
        mutationFn: (id: number) => deleteAddress(id),
        mutationKey: ['deleteAddress'],
        onSuccess(data) {
            toast.success(data.message);
        },
        onError(data) {
            toast.error(data.message);
        },
    });

    const {
        data,
        isPending,
        isLoading,
    }: { data: User | undefined; isPending: boolean; isLoading: boolean } =
        useQuery({
            queryKey: ['me'],
            queryFn: fetchMe,
            enabled: true,
            retry: false,
        });
    return {
        data,
        isPending,
        isLoading,
        editUsermutation,
        changePasswordMutation,
        createAddressMutation,
        deleteAddressMutation,
    };
};

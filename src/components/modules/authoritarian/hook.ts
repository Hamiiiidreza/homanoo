import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRegister as useRegisterEndpoint } from '../../../endpoints/useRegister';
import { useLogin as useLoginEndpoint } from '../../../endpoints/useLogin';

const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, 'نام کاربری الزامی است')
            .min(3, 'حداقل ۳ کاراکتر وارد کنید'),
        phone: z
            .string()
            .min(1, 'شماره موبایل الزامی است')
            .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست (مثلاً: 09123456789)'),
        password: z
            .string()
            .min(1, 'رمز عبور الزامی است')
            .min(6, 'حداقل ۶ کاراکتر'),
        confirmPassword: z
            .string()
            .min(1, 'تکرار رمز عبور الزامی است'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'تکرار رمز عبور مطابقت ندارد',
        path: ['confirmPassword'],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const useRegister = (endFunction?: () => void) => {
    const { mutation } = useRegisterEndpoint();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormValues) => {
        const obj = {
            phone: data.phone,
            name: data.name,
            password: data.password,
        };

        mutation.mutate(obj, {
            onSuccess() {
                endFunction?.();
            },
        });
    };

    return { register, errors, handleSubmit, onSubmit };
};

const loginSchema = z.object({
    phone: z
        .string()
        .min(1, 'شماره موبایل الزامی است')
        .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست (مثلاً: 09123456789)'),
    password: z
        .string()
        .min(1, 'رمز عبور الزامی است')
        .min(6, 'حداقل ۶ کاراکتر'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = (endFunction?: () => void) => {
    const { mutation } = useLoginEndpoint();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormValues) => {
        mutation.mutate(data, {
            onSuccess() {
                endFunction?.();
            },
        });
    };

    return { register, errors, handleSubmit, onSubmit };
};
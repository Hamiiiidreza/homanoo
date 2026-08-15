import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from '../../../../../../endpoints/useUser';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z
    .object({
        currentPassword: z.string().min(1, 'رمز عبور فعلی را وارد کنید'),
        newPassword: z.string().min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد'),
        confirmPassword: z.string().min(1, 'تکرار رمز عبور را وارد کنید'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'تکرار رمز عبور با رمز جدید یکسان نیست',
    });

type FormValues = z.infer<typeof schema>;

const useChangePassword = () => {
    const { changePasswordMutation } = useUser();
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormValues) => {
        changePasswordMutation.mutate(data, {
            onSuccess() {
                setOpen(false);
            },
        });
    };

    return {
        onSubmit,
        handleSubmit,
        register,
        open,
        setOpen,
        errors,
        isSubmitting,
    };
};

export default useChangePassword;
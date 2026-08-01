import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import useLocation from '../../../../endpoints/useLocation';
import { useUser } from '../../../../endpoints/useUser';
import { useForm } from 'react-hook-form';

const schema = z.object({
    province: z.string().min(1, 'استان را انتخاب کنید'),

    city: z.string().min(1, 'شهر را انتخاب کنید'),

    postalCode: z
        .string()
        .regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),

    address: z.string().min(10, 'آدرس را کامل وارد کنید'),

    fname: z
        .string({ error: 'نام الزامی است' })
        .min(3, 'حداقل ۳ کاراکتر وارد کنید'),

    lname: z
        .string({ error: 'نام خانوادگی الزامی است' })
        .min(3, 'حداقل ۳ کاراکتر وارد کنید'),

    phone: z
        .string({ error: 'شماره موبایل الزامی است' })
        .regex(/^09[0-9]{9}$/, 'شماره موبایل معتبر نیست'),

    email: z
        .string()
        .optional()
        .refine((val) => !val || z.string().email().safeParse(val).success, {
            message: 'ایمیل معتبر وارد کنید',
        }),
});

type FormValues = z.infer<typeof schema>;

const useCheckout = () => {
    const { data } = useLocation();
    const { data: user } = useUser();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            province: '',
            city: '',
            postalCode: '',
            address: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
        },
    });

    const selectedProvince = watch('province');
    useEffect(() => {
        setValue('city', '');
    }, [selectedProvince]);

    useEffect(() => {
        if (user) {
            reset({
                province: '',
                city: '',
                postalCode: '',
                address: '',
                fname: '',
                lname: '',
                phone: String(`0${user.phone}`),
                email: '',
            });
        }
    }, [user, reset]);

    return {
        data,
        user,
        isSubmitting,
        errors,
        register,
        handleSubmit,
        selectedProvince,
        control,
        reset,
    };
};

export default useCheckout;

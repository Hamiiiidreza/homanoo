import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Button } from '../../../ui/button';
import { useEffect } from 'react';
import { useUser } from '../../../../endpoints/useUser';
import ChangePasswordModal from './partials/change-password/change-password-modal';
import AddressModal from './partials/address/address-modal';
import ProfileCard from './partials/profile-card';
import {
    User,
    Camera,
    Edit2,
    Shield,
    Calendar,
    Mail,
    Phone,
    CreditCard,
    Loader
} from "lucide-react";

type FormValues = {
    name: string;
    nationalCode: string;
    email: string;
    birthDate: string;
    phone: string;
    gender: string;
};

const AccountScreen = () => {
    const { data, editUsermutation, editUserMutationPending } = useUser();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<FormValues>({
        defaultValues: {},
    });

    const onSubmit = (data: FormValues) => {
        editUsermutation.mutate(data, {
            onSuccess: () => {
                reset(data);
            },
        });
    };
    
    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                nationalCode: String(data.nationalCode),
                email: data.email,
                birthDate: data.birthDate || '۱۴۰۵/۰۴/۱۰',
                phone: data.phone,
            });
        }
    }, [data, reset]);

    return (
        <section className="xs:!p-6 my-10 w-full rounded-md border bg-white p-4 shadow-lg transition-all">
            <div className="mb-8">
                <div className="flex items-center justify-start gap-3">
                    <div className="bg-neutral-01 flex size-9 items-center justify-center rounded-md">
                        <User className="text-secondary-color-blue" />
                    </div>
                    <h2 className="text-neutral-07 flex items-center text-xl font-bold sm:!text-2xl">
                        اطلاعات حساب کاربری
                    </h2>
                </div>
                <p className="font-VazirRegular mt-2 text-sm text-gray-500">
                    اطلاعات شخصی و تنظیمات حساب کاربری خود را مدیریت کنید.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="order-1 xl:order-2">
                    <ProfileCard />
                </div>

                <div className="order-2 rounded-md bg-white transition-all sm:!border sm:!p-6 sm:!shadow-lg md:col-span-2 xl:order-1 xl:row-span-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label className="font-VazirMedium text-neutral-07 text-sm">
                                    نام و نام خانوادگی
                                </label>

                                <div className="relative">
                                    <User
                                        size={20}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-color-blue pointer-events-none"
                                    />
                                    <input
                                        className="border-neutral-03 rounded-md border p-2 pr-10 text-sm text-gray-600 w-full"
                                        {...register('name', {
                                            required: 'نام و نام خانوادگی الزامی است',
                                            minLength: {
                                                value: 3,
                                                message: 'حداقل ۳ کاراکتر وارد کنید',
                                            },
                                        })}
                                    />
                                </div>

                                {errors.name && (
                                    <span className="scroll-pt-2.5 text-sm text-red-500">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-VazirMedium text-neutral-07 text-sm">
                                    کد ملی
                                </label>
                                <div className="relative">
                                    <CreditCard
                                        size={18}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-color-blue pointer-events-none"
                                    />
                                    <input
                                        className="border-neutral-03 rounded-md border p-2 pr-10 text-sm text-gray-600 w-full"
                                        {...register('nationalCode', {
                                            pattern: {
                                                value: /^\d{10}$/,
                                                message: 'کد ملی باید دقیقا ۱۰ رقم باشد',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.nationalCode && (
                                    <span className="scroll-pt-2.5 text-sm text-red-500">
                                        {errors.nationalCode.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-VazirMedium text-neutral-07 text-sm">
                                    ایمیل
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-color-blue pointer-events-none"
                                    />
                                    <input
                                        className="border-neutral-03 rounded-md border p-2 pr-10 text-sm text-gray-600 w-full"
                                        type="email"
                                        {...register('email', {
                                            required: 'ایمیل الزامی است',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'ایمیل معتبر نیست',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="scroll-pt-2.5 text-sm text-red-500">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-VazirMedium text-neutral-07 text-sm">
                                    تاریخ تولد
                                </label>
                                <div className="relative">
                                    <Calendar
                                        size={18}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-color-blue pointer-events-none z-10"
                                    />
                                    <Controller
                                        name="birthDate"
                                        control={control}
                                        rules={{ required: 'تاریخ تولد الزامی است' }}
                                        render={({ field }) => (
                                            <DatePicker
                                                inputClass="border-neutral-03 rounded-md border p-2 pr-10 text-sm text-gray-600 w-full"
                                                calendar={persian}
                                                locale={persian_fa}
                                                value={field.value}
                                                onChange={(date) => {
                                                    field.onChange(date?.format('YYYY/MM/DD') || '');
                                                }}
                                                format="YYYY/MM/DD"
                                                calendarPosition="bottom-right"
                                            />
                                        )}
                                    />
                                </div>
                                {errors.birthDate && (
                                    <span className="scroll-pt-2.5 text-sm text-red-500">
                                        {errors.birthDate.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-VazirMedium text-neutral-07 text-sm">
                                    شماره موبایل
                                </label>
                                <div className="relative">
                                    <Phone
                                        size={18}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-color-blue pointer-events-none"
                                    />
                                    <input
                                        className="border-neutral-03 rounded-md border p-2 pr-10 text-sm text-gray-600 w-full"
                                        dir="ltr"
                                        {...register('phone', {
                                            required: 'شماره موبایل الزامی است',
                                            pattern: {
                                                value: /^09\d{9}$/,
                                                message: 'شماره موبایل معتبر نیست',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.phone && (
                                    <span className="scroll-pt-2.5 text-sm text-red-500">
                                        {errors.phone.message}
                                    </span>
                                )}
                            </div>

                        </div>

                        <Button type="submit" variant={'main'} className="mt-6 w-full" disabled={!isDirty}>
                            {editUserMutationPending ? (
                                <Loader className="mx-auto animate-spin" />
                            ) : (
                                'ثبت'
                            )}
                        </Button>
                    </form>
                </div>

                <div className="order-3 space-y-4 rounded-md border-t bg-white pt-6 text-center transition-all sm:!border-x sm:!border-b sm:!p-4 sm:!shadow-lg xl:order-3">
                    <h2 className="font-VazirBold text-neutral-07 mb-4 text-right text-lg">
                        سایر اطلاعات
                    </h2>
                    <ChangePasswordModal />
                    <AddressModal />
                </div>
            </div>

        </section>
    );
};

export default AccountScreen;




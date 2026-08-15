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
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {},
    });

    const onSubmit = (data: FormValues) => {
        editUsermutation.mutate(data);
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
                <div className="order-2 mt-8 space-y-6 sm:!mt-0 lg:order-1">
                    <ProfileCard />
                    <div className="space-y-4 rounded-md border-t bg-white pt-6 text-center transition-all sm:!border-x sm:!border-b sm:!p-4 sm:!shadow-lg">
                        <h2 className="font-VazirBold text-neutral-07 mb-4 text-right text-lg">
                            سایر اطلاعات
                        </h2>
                        <ChangePasswordModal />
                        <AddressModal />
                    </div>
                </div>

                <div className="rounded-md bg-white transition-all sm:!border sm:!p-6 sm:!shadow-lg md:col-span-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label className="font-VazirMedium text-neutral-07 text-sm">
                                    نام و نام خانوادگی
                                </label>

                                <input
                                    className="border-neutral-03 rounded-md border p-2 text-sm text-gray-600"
                                    {...register('name', {
                                        required: 'نام و نام خانوادگی الزامی است',
                                        minLength: {
                                            value: 3,
                                            message: 'حداقل ۳ کاراکتر وارد کنید',
                                        },
                                    })}
                                />

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
                                <input
                                    className="border-neutral-03 rounded-md border p-2 text-sm text-gray-600"
                                    {...register('nationalCode', {
                                        pattern: {
                                            value: /^\d{10}$/,
                                            message: 'کد ملی باید دقیقا ۱۰ رقم باشد',
                                        },
                                    })}
                                />

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

                                <input
                                    className="border-neutral-03 rounded-md border p-2 text-sm text-gray-600"
                                    type="email"
                                    {...register('email', {
                                        required: 'ایمیل الزامی است',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'ایمیل معتبر نیست',
                                        },
                                    })}
                                />
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

                                <Controller
                                    name="birthDate"
                                    control={control}
                                    rules={{
                                        required: 'تاریخ تولد الزامی است',
                                    }}
                                    render={({ field }) => (
                                        <DatePicker
                                            inputClass="border-neutral-03 rounded-md border p-2 text-sm text-gray-600"
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

                                <input
                                    className="border-neutral-03 rounded-md border p-2 text-sm text-gray-600"
                                    dir="ltr"
                                    {...register('phone', {
                                        required: 'شماره موبایل الزامی است',
                                        pattern: {
                                            value: /^09\d{9}$/,
                                            message: 'شماره موبایل معتبر نیست',
                                        },
                                    })}
                                />
                                {errors.phone && (
                                    <span className="scroll-pt-2.5 text-sm text-red-500">
                                        {errors.phone.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <Button type="submit" variant={'main'} className="mt-6 w-full">
                            {editUserMutationPending ? (
                                <Loader className="mx-auto animate-spin" />
                            ) : (
                                'ثبت'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AccountScreen;




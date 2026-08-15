import { Edit2, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../../../../../ui/dialog';
import { Button } from '../../../../../ui/button';
import useAddress from './hook';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../../../ui/select';
import { Controller } from 'react-hook-form';
import { useUser } from '../../../../../../endpoints/useUser';
import { Address } from '../../../../../../types/user.types';
import { useQueryClient } from '@tanstack/react-query';

const AddressModal = () => {
    const { data: userData, deleteAddressMutation } = useUser();
    const queryClient = useQueryClient();

    const {
        data,
        setOpen,
        open,
        onSubmit,
        isSubmitting,
        errors,
        register,
        handleSubmit,
        selectedProvince,
        control,
        reset,
    } = useAddress();

    return (
        <Dialog
            open={open}
            onOpenChange={(o) => {
                setOpen(o);
                if (o) {
                    reset({});
                }
            }}
        >
            <DialogTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 rounded-md border p-3 transition-all hover:shadow-[0_4px_4px_rgb(0,0,0,0.25)]">
                    <Edit2 size={16} className="shrink-0 text-gray-400" />

                    <div className="flex flex-col items-start text-right">
                        <span className="text-sm">آدرس ها</span>

                        <span className="text-xs text-gray-400">
                            برای سهولت بیشتر در زمان ثبت سفارش، آدرس خود را پیش نویس ثبت و
                            مدیریت کنید
                        </span>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent
                dir="rtl"
                className="flex max-h-[90%] max-w-2xl flex-col gap-5 overflow-y-auto rounded-lg px-7 pt-10 pb-7 sm:!flex-row"
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full flex-col gap-5"
                >
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <label className="mb-2 block text-sm">استان</label>

                            <Controller
                                control={control}
                                name="province"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="h-12 w-full">
                                            <SelectValue placeholder="انتخاب استان" />
                                        </SelectTrigger>

                                        <SelectContent dir="rtl">
                                            {(data as any)?.provinces.map(
                                                (province: {
                                                    provinceId: number;
                                                    provinceName: string;
                                                }) => (
                                                    <SelectItem
                                                        key={province.provinceId}
                                                        value={String(province.provinceId)}
                                                    >
                                                        {province.provinceName}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors.province && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.province.message}
                                </p>
                            )}
                        </div>

                        <div className="w-full">
                            <label className="mb-2 block text-sm">شهر</label>

                            <Controller
                                control={control}
                                name="city"
                                render={({ field }) => (
                                    <Select
                                        disabled={!selectedProvince}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="h-12 w-full">
                                            <SelectValue placeholder="انتخاب شهر" />
                                        </SelectTrigger>

                                        <SelectContent dir="rtl">
                                            {(data as any)?.cities
                                                .filter(
                                                    (city: { provinceId: number }) =>
                                                        city.provinceId == Number(selectedProvince),
                                                )
                                                .map((city: { cityId: number; cityName: string }) => (
                                                    <SelectItem
                                                        key={city.cityId}
                                                        value={String(city.cityId)}
                                                    >
                                                        {city.cityName}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors.city && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">کد پستی</label>

                        <input
                            type="text"
                            maxLength={10}
                            inputMode="numeric"
                            {...register('postalCode')}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(
                                    /\D/g,
                                    '',
                                );
                            }}
                            className="focus:border-primary h-12 w-full rounded-lg border px-4 outline-none"
                        />

                        {errors.postalCode && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.postalCode.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <textarea
                            rows={4}
                            {...register('address')}
                            className="focus:border-primary w-full resize-none rounded-lg border p-4 outline-none"
                        />

                        {errors.address && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant={'main'}
                        disabled={isSubmitting}
                        className="mt-2 h-12 rounded-lg text-white disabled:opacity-50"
                    >
                        ذخیره تغییرات
                    </Button>
                </form>
                <div className="w-full pt-5 sm:!pt-0">
                    <p className="pb-5 font-semibold">آدرس های ثبت شده</p>

                    <div className="w-full space-y-4">
                        {userData && userData?.addresses.length > 0 ? (
                            userData?.addresses.map((address: Address) => (
                                <div className="border-neutral-03 bg-light-blue relative w-full rounded-md border p-3 text-sm">
                                    <p>
                                        {address.province.provinceName} / {address.city.cityName} -{' '}
                                        <span className="text-gray-500">{address.postalCode}</span>
                                    </p>
                                    <p>{address.address}</p>
                                    <div
                                        onClick={() =>
                                            deleteAddressMutation.mutate(address._id, {
                                                onSuccess() {
                                                    queryClient.invalidateQueries({
                                                        queryKey: ['me'],
                                                    });
                                                },
                                            })
                                        }
                                        className="absolute -top-2 -left-2 cursor-pointer rounded-full bg-red-500 p-1 text-white"
                                    >
                                        <Trash size={16} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="w-full text-center sm:!pt-28">آدرسی ثبت نشده است</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddressModal;
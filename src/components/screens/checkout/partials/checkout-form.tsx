import { Controller } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../ui/select';
import useCheckout from './hook';

const CheckoutForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const {
        data,
        user,
        errors,
        register,
        handleSubmit,
        selectedProvince,
        control,
        reset,
    } = useCheckout();
    return (
        <form
            id="checkout-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6 xl:!w-3/5"
        >
            <div className="shadow-m w-full space-y-6 rounded-xl bg-white p-6">
                <div className="text-xl text-black">اطلاعات تماس</div>

                <div className="flex gap-3">
                    <div className="w-full">
                        <input
                            {...register('fname')}
                            placeholder="نام"
                            className={`w-full rounded-md border p-2 ${errors.fname ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.fname && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.fname.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <input
                            {...register('lname')}
                            placeholder="نام خانوادگی"
                            className={`w-full rounded-md border p-2 ${errors.lname ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.lname && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.lname.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        {...register('phone')}
                        placeholder="شماره تلفن"
                        className={`pointer-events-none w-full cursor-not-allowed rounded-md border p-2 opacity-30 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register('email')}
                        placeholder="ایمیل (اختیاری)"
                        className="w-full rounded-md border border-gray-300 p-2"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>
            </div>

            <div className="shadow-m w-full space-y-6 rounded-xl bg-white p-6">
                <p className="text-xl text-black">آدرس ارسال</p>

                <div className="flex gap-3">
                    <div className="w-full">
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
                            <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        {...register('postalCode')}
                        placeholder="کد پستی"
                        className={`w-full rounded-md border p-2 ${errors.postalCode ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.postalCode.message}
                        </p>
                    )}
                </div>

                <div>
                    <textarea
                        {...register('address')}
                        placeholder="آدرس"
                        className={`w-full rounded-md border p-2 ${errors.address ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.address && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.address.message}
                        </p>
                    )}
                </div>

                {user?.addresses && user?.addresses.length > 0 ? (
                    <>
                        <p className="text-xl text-black">آدرس های پیش نویس</p>
                        {user.addresses.map((address) => (
                            <div
                                onClick={() => {
                                    reset({
                                        province: address.province.provinceId,
                                        city: address.city.cityId,
                                        postalCode: address.postalCode,
                                        address: address.address,
                                    });
                                }}
                                className="border-neutral-03 bg-light-blue relative w-full cursor-pointer rounded-md border p-3 text-sm"
                            >
                                <p>
                                    {address.province.provinceName} / {address.city.cityName} -{' '}
                                    <span className="text-gray-500">{address.postalCode}</span>
                                </p>
                                <p>{address.address}</p>
                            </div>
                        ))}
                    </>
                ) : (
                    ''
                )}
            </div>
        </form>
    );
};

export default CheckoutForm;

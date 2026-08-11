import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../../../ui/button';

type Values = {
    fullName: string;
    phone: string;
    subject: string;
    message: string;
};

const ContactUsForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<Values>({
        mode: 'onChange',
    });

    const onSubmit = (data: Values) => {
        toast.success('پیام شما با موفقیت ارسال شد.');
        reset();
    };

    return (
        <div>
            <p className="text-center text-xl font-semibold md:!text-2xl lg:!text-right">
                با ما در تماس باشید
            </p>

            <h1 className="pt-2 pb-7 text-justify text-neutral-800"></h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="xs:flex-row flex flex-col gap-4">
                    <div className="w-full">
                        <label htmlFor="fullName" className="block font-semibold">
                            نام و نام خانوادگی
                        </label>

                        <input
                            id="fullName"
                            placeholder="نام و نام خانوادگی"
                            className="mt-1 w-full rounded-2xl border border-gray-300 p-3 text-sm outline-none"
                            {...register('fullName', {
                                required: 'نام و نام خانوادگی الزامی است',
                                minLength: {
                                    value: 3,
                                    message: 'حداقل ۳ کاراکتر وارد کنید',
                                },
                            })}
                        />

                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <label htmlFor="phone" className="block font-semibold">
                            شماره تماس
                        </label>

                        <input
                            id="phone"
                            dir="rtl"
                            placeholder="09120000000"
                            className="mt-1 w-full rounded-2xl border border-gray-300 p-3 text-sm outline-none"
                            {...register('phone', {
                                required: 'شماره تماس الزامی است',
                                pattern: {
                                    value: /^09\d{9}$/,
                                    message: 'شماره موبایل معتبر نیست',
                                },
                            })}
                        />

                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="py-4">
                    <label htmlFor="subject" className="block font-semibold">
                        موضوع پیام
                    </label>

                    <input
                        id="subject"
                        placeholder="موضوع پیام"
                        className="mt-1 w-full rounded-2xl border border-gray-300 p-3 text-sm outline-none"
                        {...register('subject', {
                            required: 'موضوع پیام الزامی است',
                        })}
                    />

                    {errors.subject && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.subject.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="message" className="block font-semibold">
                        پیام
                    </label>

                    <textarea
                        id="message"
                        placeholder="توضیحات..."
                        className="mt-1 h-32 w-full resize-none rounded-2xl border border-gray-300 p-3 text-sm outline-none"
                        {...register('message', {
                            required: 'متن پیام الزامی است',
                            minLength: {
                                value: 10,
                                message: 'پیام باید حداقل ۱۰ کاراکتر باشد',
                            },
                        })}
                    />

                    {errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                <Button
                    disabled={!isValid}
                    type="submit"
                    className="mt-4 w-full"
                    variant="main"
                >
                    ارسال
                </Button>
            </form>
        </div>
    );
};

export default ContactUsForm;

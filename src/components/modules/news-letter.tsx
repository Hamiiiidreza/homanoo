import { useState } from 'react';
import { toast } from 'sonner';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error('لطفاً یک ایمیل معتبر وارد کنید.');
            return;
        }

        toast.success(`ایمیل ${email} با موفقیت ثبت شد.`);
        setEmail('');
    };

    return (
        <section className="flex w-full items-center justify-center rounded-t-xl bg-[#F2F4F6] lg:bg-[url(/Images/newsletter.png)] lg:bg-cover lg:bg-center">
            <div className="relative sm:!py-28 py-10 h-full w-[528px] text-center transition-all">
                <div className="h-[166px] w-full px-4 sm:px-0">
                    <h2 className="tracking-headline-6 text-neutral-07 sm:tracking-headline-4 mb-2 text-[28px] leading-8.5 transition-all sm:text-[40px] sm:leading-11">
                        به خبرنامه ما بپیوندید
                    </h2>

                    <p className="font-VazirRegular text-neutral-07 mb-8 text-sm leading-5.5 tracking-[0] transition-all sm:text-lg sm:leading-7.5">
                        برای دریافت تخفیف‌ها، محصولات جدید و پیشنهادهای ویژه ثبت‌نام کنید
                    </p>

                    <form onSubmit={submitHandler} className="flex flex-col items-center">
                        <div className="border-neutral-04/50 flex h-[52px] w-full max-w-md items-center gap-2 border-b py-2">
                            <img
                                className="mr-2 size-6 transition-all"
                                src="/Images/email.svg"
                                alt="Email"
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="آدرس ایمیل"
                                className="tracking-button-s text-neutral-04 flex-1 border-none text-base transition-all outline-none"
                                aria-label="آدرس ایمیل"
                            />

                            <button
                                type="submit"
                                className="tracking-button-s text-neutral-04 cursor-pointer text-base transition-all"
                            >
                                ثبت‌نام
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
import { Loader } from 'lucide-react';
import { Button } from '../../ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { useRegister } from './hook';

const Register = ({
    setStep,
    endFunction,
}: {
    setStep: (val: string) => void;
    endFunction?: () => void;
}) => {
    const { register, errors, handleSubmit, isPending, onSubmit } = useRegister(endFunction);

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    <img className="mx-auto h-12" src="/Images/logo.jpg" alt="" />
                </DialogTitle>
                <DialogDescription className="w-full text-center text-gray-400">
                    لطفا فرم زیر را تکمیل کنید
                </DialogDescription>
            </DialogHeader>
            <div className="pl-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="grid gap-3 md:!grid-cols-2">
                        <div>
                            <label className="block pb-2 text-sm">نام کاربری</label>
                            <input
                                className="w-full rounded-xl border border-gray-200 p-2 outline-0"
                                {...register('name')}
                            />
                            <p className="pt-1 text-xs text-red-600">
                                {errors.name?.message}
                            </p>
                        </div>
                        <div>
                            <label className="block pb-2 text-sm">شماره موبایل</label>
                            <input
                                className="w-full rounded-xl border border-gray-200 p-2 outline-0"
                                {...register('phone')}
                            />
                            <p className="pt-1 text-xs text-red-600">
                                {errors.phone?.message}
                            </p>
                        </div>
                        <div>
                            <label className="block pb-2 text-sm">رمز عبور</label>
                            <input
                                className="w-full rounded-xl border border-gray-200 p-2 outline-0"
                                type="password"
                                {...register('password')}
                            />
                            <p className="pt-1 text-xs text-red-600">
                                {errors.password?.message}
                            </p>
                        </div>
                        <div>
                            <label className="block pb-2 text-sm">تکرار رمز عبور</label>
                            <input
                                className="w-full rounded-xl border border-gray-200 p-2 outline-0"
                                type="password"
                                {...register('confirmPassword')}
                            />
                            <p className="pt-1 text-xs text-red-600">
                                {errors.confirmPassword?.message}
                            </p>
                        </div>
                    </div>

                    <Button
                        className="mx-auto !mt-6 !block !w-2/3"
                        variant={'main'}
                        type="submit"
                    >
                        {isPending ? <Loader className="mx-auto animate-spin" /> : 'ثبت‌نام'}
                    </Button>
                    <p
                        onClick={() => setStep('login')}
                        className="text-main mx-auto w-max cursor-pointer text-center text-sm"
                    >
                        <span className="text-black">حساب کاربری دارید؟</span> وارد شوید
                    </p>
                </form>
            </div>
        </>
    );
};

export default Register;
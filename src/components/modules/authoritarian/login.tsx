import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { useLogin } from './hook';
import { Loader } from 'lucide-react';

const Login = ({
  setStep,
  endFunction,
}: {
  setStep: (val: string) => void;
  endFunction?: () => void;
}) => {
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useLogin(endFunction);

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <img className="mx-auto h-12" src="/Images/logo.jpg" alt="" />
        </DialogTitle>
        <DialogDescription className="w-full text-center text-gray-400">
          برای استفاده از خدمات ما، شماره موبایل خود را وارد کنید.
        </DialogDescription>
      </DialogHeader>
      <div className="pl-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block pb-2 text-sm">شماره موبایل</label>
            <input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="w-full rounded-xl border border-gray-200 p-2 outline-0"
              {...register('phone')}
            />
            <p className="pt-1 text-xs text-red-600">{errors.phone?.message}</p>
          </div>

          <div>
            <label className="block pb-2 text-sm">رمز عبور</label>
            <input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="w-full rounded-xl border border-gray-200 p-2 outline-0"
              type="password"
              {...register('password')}
            />
            <p className="pt-1 text-xs text-red-600">
              {errors.password?.message}
            </p>
          </div>

          <Button
            className="mx-auto !mt-6 !block !w-2/3"
            variant={'main'}
            type="submit"
          >
            {isPending ? <Loader className="mx-auto animate-spin" /> : 'ورود'}
          </Button>
          <p
            onClick={() => setStep('register')}
            className="text-main mx-auto w-max cursor-pointer text-center text-sm"
          >
            <span className="text-black">حساب کاربری ندارید؟</span> ثبت نام کنید
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import CustomInput from "../../ui/custom-input";

const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز باید حداقل ۶ کاراکتر باشد"),
})

const registerSchema = z.object({
  username: z.string().min(3, "نام کاربری کوتاه است"),
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز باید حداقل ۶ کاراکتر باشد"),
})

type LoginForm = z.infer<typeof loginSchema>
type RegisterForm = z.infer<typeof registerSchema>

type AuthFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AuthForm({
  open,
  onOpenChange,
}: AuthFormProps) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPass, setShowPass] = useState<boolean>(false);

  const schema = isLogin ? loginSchema : registerSchema

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm | RegisterForm>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    reset()
  }, [isLogin, reset])

  const onSubmit = (data: LoginForm | RegisterForm) => {
    console.log(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="sm:max-w-md rounded-2xl bg-white dark:bg-gray-900 font-VazirRegular"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-VazirBold">
            <img
              className="w-60 h-31 rounded-md overflow-hidden mx-auto"
              src="/Images/logo-3.png"
              alt="logo" />
          </DialogTitle>

          <p className="text-center text-gray-500 text-sm font-VazirRegular -mt-5">
            {isLogin
              ? "برای ادامه وارد شوید"
              : "اطلاعات زیر را برای ثبت نام وارد کنید"}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {!isLogin && (
            <CustomInput
              register={register("username" as const)}
              placeholder="نام کاربری"
              icon={<User className="text-gray-400" size={20} />}
              inputClassName="w-full pr-10 py-6 border rounded-lg dark:bg-gray-800 dark:border-gray-700 outline-none focus:border-secondary-color-blue font-VazirRegular"
              error={"username" in errors && errors.username ? errors.username.message : ""}
            />
          )}

          <CustomInput
            register={register("email")}
            placeholder="ایمیل"
            icon={<Mail className="text-gray-400" size={20} />}
            inputClassName="w-full pr-10 py-6 border rounded-lg dark:bg-gray-800 dark:border-gray-700 outline-none focus:border-secondary-color-blue font-VazirRegular"
            error={errors.email?.message}
          />

          <CustomInput
            type={showPass ? "text" : "password"}
            register={register("password")}
            placeholder="رمز عبور"
            icon={<Lock className="text-gray-400" size={20} />}
            leftElement={
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-gray-400 flex items-center"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
            inputClassName="w-full pr-10 pl-10 py-6 border rounded-lg dark:bg-gray-800 dark:border-gray-700 outline-none focus:border-secondary-color-blue font-VazirRegular"
            error={errors.password?.message}
          />

          <button
            className="w-full bg-main hover:bg-main/90 text-white py-3 rounded-lg font-VazirMedium transition shadow-lg cursor-pointer"
            type="submit"
          >
            {isLogin ? "ورود" : "ثبت نام"}
          </button>
        </form>

        <div className="text-center mt-4 border-t pt-4 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "هنوز ثبت نام نکرده‌اید؟" : "قبلاً حساب ساخته‌اید؟"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="mr-2 text-main font-VazirBold hover:underline"
            >
              {isLogin ? "ایجاد حساب کاربری" : "وارد شوید"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}









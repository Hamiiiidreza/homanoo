import { useState } from 'react';
import { Button } from '../../ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from '../../ui/dialog';
import Register from './register';
import Login from './login';
import { LogInIcon, UserIcon } from 'lucide-react';

const AuthoritarianSteps = ({
    isOpen,
    endFunction,
    setIsOpen,
    isMenu = false,
}: {
    isOpen?: boolean;
    endFunction?: () => void;
    setIsOpen?: (val: boolean) => void;
    isMenu?: boolean;
}) => {
    const [step, setStep] = useState('login');
    const [open, setOpen] = useState(isOpen);

    return (
        <Dialog
            open={Boolean(open)}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) {
                    setIsOpen?.(false);
                }
            }}
        >
            <DialogTrigger asChild>
                {isMenu ? (
                    <li className="flex items-center gap-2">
                        <UserIcon size={22} />
                        <p className="block text-[17px] font-thin">ورود / ثبت نام</p>
                    </li>
                ) : (
                    <Button variant={'mainShaded'}>
                        <span className="hidden sm:!block"> ورود / ثبت نام</span>
                        <LogInIcon size={28} className="block size-5 sm:!hidden" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                dir="rtl"
                className="max-w-[350px] !overflow-visible !rounded-2xl !bg-white !px-6 md:max-w-[500px]"
            >
                {step === 'login' ? (
                    <Login endFunction={endFunction} setStep={setStep} />
                ) : (
                    <Register endFunction={endFunction} setStep={setStep} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AuthoritarianSteps;

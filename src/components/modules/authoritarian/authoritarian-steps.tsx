import { useState } from 'react';
import { Button } from '../../ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from '../../ui/dialog';
import Register from './register';
import Login from './login';
import { LogInIcon } from 'lucide-react';

const AuthoritarianSteps = ({ isOpen, endFunction, setIsOpen }: { isOpen?: boolean, endFunction?: () => void, setIsOpen?: (val: boolean) => void }) => {
    const [step, setStep] = useState('login');
    const [open, setOpen] = useState(isOpen)
    return (
        <Dialog open={Boolean(open)} onOpenChange={(open) => {
            setOpen(open)
            if (!open) {
                setIsOpen?.(false)
            }
        }}>
            <DialogTrigger asChild>
                <Button variant={'mainShaded'}>
                    <span className='sm:!block hidden'> ورود / ثبت نام</span>
                    <LogInIcon size={28} className='sm:!hidden block size-5' />
                </Button>
            </DialogTrigger>
            <DialogContent
                dir="rtl"
                className="max-w-[350px] !overflow-visible !rounded-2xl !bg-white !px-6 md:max-w-[500px]"
            >
                {step == 'login' ? <Login endFunction={endFunction || undefined} setStep={setStep} /> : <Register endFunction={endFunction} setStep={setStep} />}
            </DialogContent>
        </Dialog>
    );
};

export default AuthoritarianSteps;
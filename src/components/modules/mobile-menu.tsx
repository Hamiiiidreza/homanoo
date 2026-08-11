import {
    Book,
    Home,
    LogOut,
    Menu,
    NotepadText,
    Phone,
    ShoppingBag,
    UserIcon,
} from 'lucide-react';
import { SheetTrigger, SheetContent, Sheet, SheetHeader } from '../ui/sheet';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../endpoints/useUser';
import { Skeleton } from '../ui/skeleton';
import AuthoritarianSteps from './authoritarian/authoritarian-steps';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const MobileMenu = () => {
    const { data, isLoading } = useUser();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Menu className="md:hidden" size={24} />
            </SheetTrigger>
            <SheetContent className={'!w-[300px] rounded-l-2xl'}>
                <SheetHeader>
                    <img className="mx-auto h-9" src="/Images/logo.jpg" alt="" />
                </SheetHeader>

                <ul className="space-y-8 px-6 pt-7">
                    {isLoading ? (
                        <Skeleton className="h-9 w-11 rounded-lg sm:!w-20" />
                    ) : data?.name ? (
                        <li className="flex items-center gap-2">
                            <UserIcon size={22} />
                            <Link
                                className="block text-[17px] font-thin"
                                to={'/user-panel/dashboard'}
                            >
                                پنل کاربری{' '}
                            </Link>
                        </li>
                    ) : (
                        <AuthoritarianSteps endFunction={() => setOpen(false)} isMenu />
                    )}
                    <li
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2"
                    >
                        <Home size={22} />
                        <Link className="block text-[17px] font-thin" to={'/'}>
                            خانه
                        </Link>
                    </li>
                    <li
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2"
                    >
                        <Home size={22} />
                        <Link className="block text-[17px] font-thin" to={'/about-us'}>
                            درباه ما
                        </Link>
                    </li>
                    <li
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2"
                    >
                        <ShoppingBag size={22} />
                        <Link className="block text-[17px] font-thin" to={'/shop'}>
                            فروشگاه
                        </Link>
                    </li>
                    <li
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2"
                    >
                        <Book size={22} />
                        <Link className="block text-[17px] font-thin" to={'/blogs'}>
                            مقالات
                        </Link>
                    </li>
                    <li
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2"
                    >
                        <Phone size={22} />
                        <Link className="block text-[17px] font-thin" to={'/contact-us'}>
                            تماس با ما
                        </Link>
                    </li>

                    {data?.name ? (
                        <li
                            onClick={() => {
                                Cookies.remove('token');
                                queryClient.setQueryData(['me'], null);
                                navigate('/');
                                setOpen(false);
                            }}
                            className="flex items-center gap-2"
                        >
                            <LogOut className="cursor-pointer" size={22} />
                            <p className="block text-[17px] font-thin">خروج </p>
                        </li>
                    ) : (
                        ''
                    )}
                </ul>

                <div className="absolute bottom-7 left-0 w-full">
                    <div className="flex justify-center gap-6 pb-4">
                        <Link to="/" aria-label="Instagram">
                            <img
                                className="size-6 lg:size-7"
                                src="/Images/instagram.svg"
                                style={{ filter: 'invert(1)' }}
                                alt="Instagram"
                            />
                        </Link>
                        <Link to="/" aria-label="Facebook">
                            <img
                                className="size-6 lg:size-7"
                                src="/Images/facebook.svg"
                                style={{ filter: 'invert(1)' }}
                                alt="Facebook"
                            />
                        </Link>
                        <Link to="/" aria-label="YouTube">
                            <img
                                className="size-6 lg:size-7"
                                src="/Images/youtube.svg"
                                style={{ filter: 'invert(1)' }}
                                alt="YouTube"
                            />
                        </Link>
                    </div>

                    <div className="flex flex-col items-center gap-3 text-center md:flex-row md:gap-7 md:text-left lg:flex-row lg:gap-10">
                        <p className="text-xs lg:text-sm">
                            © 2026 هومانو. تمامی حقوق محفوظ است
                        </p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;








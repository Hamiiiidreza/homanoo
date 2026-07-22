import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '../ui/badge';
import ButtonCard from '../ui/button-card';

type MobileMenuProps = {
    open: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {

    const navigate = useNavigate();

    // قفل اسکرول صفحه وقتی منو باز است
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [open]);

    const handleSignin = (): void => {
        navigate('/checkout')
    };

    const handleStopPropagation = (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ): void => {
        e.stopPropagation();
    };

    return (
        <>
            {/* Backdrop (تیره‌کننده صفحه) */}
            <div
                onClick={onClose}
                className={`
                            fixed inset-0 z-40 bg-black/50
                            transition-opacity duration-300
                            ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                          `}
            />

            {/* Mobile Menu Overlay */}
            <div
                className={`
                            fixed inset-y-0 left-0 z-50
                            transform transition-transform duration-300 ease-in-out
                            ${open ? 'translate-x-0' : '-translate-x-full'}
                          `}
            >
                <div className="relative bg-white w-full min-w-[375px] min-h-screen">
                    <div
                        className="absolute top-0 right-0 w-[375px] min-h-screen bg-neutral-04"
                    />

                    <nav
                        className="flex flex-col w-[343px] min-h-screen items-center justify-between p-6 absolute top-0 left-0 bg-white"
                        role="navigation"
                        aria-label="Main navigation"
                        onClick={handleStopPropagation}
                    >
                        {/* TOP */}
                        <div className="flex flex-col items-start gap-4 self-stretch w-full">
                            {/* Header */}
                            <header className="flex items-center justify-between self-stretch w-full">
                                <div className="relative w-[70px] h-6">
                                    <p className="absolute top-0 left-0 font-PoppinsMedium text-base text-center tracking-[0] leading-4">
                                        <span className="text-black leading-[0.1px]">3legant</span>
                                        <span className="text-neutral-04 leading-6">.</span>
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="relative size-6 border-0 p-0 cursor-pointer"
                                    aria-label="Close menu"
                                    onClick={onClose}
                                >
                                    <img
                                        className="w-full h-full"
                                        src="/Images/Close.svg"
                                        alt="close"
                                    />
                                </button>
                            </header>

                            {/* Search */}
                            <div className="flex flex-col items-start gap-2 self-stretch w-full">
                                <form
                                    className="flex h-[46px] items-center gap-2 px-4 py-0 self-stretch w-full bg-white rounded-md overflow-hidden border border-solid border-neutral-04"
                                    role="search"
                                >
                                    <label
                                        htmlFor="search-input"
                                        className="flex items-center gap-2 flex-1 grow"
                                    >
                                        <img
                                            className="relative size-6"
                                            src="/Images/Search.svg"
                                            alt="search"
                                            aria-hidden="true"
                                        />
                                        <input
                                            id="search-input"
                                            className="relative flex-1 border-none p-0 outline-none"
                                            placeholder="Search"
                                            type="search"
                                            name="search"
                                            aria-label="Search"
                                        />
                                    </label>
                                </form>
                            </div>

                            {/* Primary navigation */}
                            <nav
                                className="inline-flex flex-col items-start gap-4"
                                aria-label="Primary navigation"
                            >
                                <div className="flex flex-col w-[295px] border-b border-neutral-03 pb-2">
                                    <Link to="/" onClick={onClose} className="relative w-full h-8 no-underline">
                                        <span className="absolute top-[calc(50%_-_16px)] left-0 w-[303px] font-InterMedium text-sm leading-6 tracking-[0]">
                                            Home
                                        </span>
                                    </Link>
                                </div>

                                <div className="flex flex-col w-[295px] border-b border-neutral-03 pb-2">
                                    <button className="relative w-full h-8 border-0 p-0 text-left">
                                        <span className="absolute top-[calc(50%_-_16px)] left-0 w-[303px] font-InterMedium text-sm leading-6 tracking-[0]">
                                            Shop
                                        </span>
                                        <img
                                            className="absolute top-[calc(50%_-_12px)] right-0 size-6"
                                            src="/Images/chevron-down.svg"
                                            alt="chevron-down"
                                        />
                                    </button>
                                </div>

                                <div className="flex flex-col w-[295px] border-b border-neutral-03 pb-2">
                                    <button className="relative w-full h-8 border-0 p-0 text-left">
                                        <span className="absolute top-[calc(50%_-_16px)] left-0 w-[303px] font-InterMedium text-sm leading-6 tracking-[0]">
                                            Product
                                        </span>
                                        <img
                                            className="absolute top-[calc(50%_-_12px)] right-0 size-6"
                                            src="/Images/chevron-down.svg"
                                            alt="chevron-down"
                                        />
                                    </button>
                                </div>

                                <div className="flex flex-col w-[295px] border-b border-neutral-03 pb-2">
                                    <Link to="/contact-us" onClick={onClose} className="relative w-full h-8 no-underline">
                                        <span className="absolute top-[calc(50%_-_16px)] left-0 w-[303px] font-InterMedium text-sm leading-6 tracking-[0]">
                                            Contact Us
                                        </span>
                                    </Link>
                                </div>
                            </nav>
                        </div>

                        {/* BOTTOM */}
                        <div className="flex flex-col h-[210px] items-center justify-between relative self-stretch w-full">
                            {/* Secondary navigation */}
                            <nav
                                className="inline-flex flex-col h-[95.33px] items-center gap-2 relative"
                                aria-label="Secondary navigation"
                            >
                                <div className="flex flex-col w-[295px] border-b border-neutral-03 pb-2">
                                    <Link to="/shopping-cart" onClick={onClose} className="relative w-full h-8 no-underline">
                                        <span className="absolute top-[calc(50%_-_16px)] left-0 w-[303px] font-InterMedium text-lg text-neutral-04 leading-8 tracking-button-m">
                                            Cart
                                        </span>
                                        <span className="absolute top-0.5 left-[245px] w-[50px] h-7 flex items-center justify-end gap-[5px]">
                                            <div className="relative">
                                                <img
                                                    src="/Images/Shop.svg"
                                                    alt="shop-icon"
                                                    className="size-6 hover:drop-shadow-custom transition-all cursor-pointer"
                                                />
                                                <img
                                                    src="/Images/Curve.svg"
                                                    alt="shop-icon2"
                                                    className="absolute top-1 right-2 size-2"
                                                />
                                            </div>
                                            <Badge
                                                className="flex items-center justify-center font-InterBold leading-0.83 bg-neutral-07 text-white text-xs rounded-full size-5.5"
                                                number={2} />
                                        </span>
                                    </Link>
                                </div>

                                <div className="flex flex-col w-[295px] border-b border-neutral-03 pb-2">
                                    <Link to="/my-account/wishlist" onClick={onClose} className="relative w-full h-8 no-underline">
                                        <span className="absolute top-[calc(50%_-_16px)] left-0 w-[303px] font-InterMedium text-lg text-neutral-04 leading-8 tracking-button-m">
                                            Wishlist
                                        </span>
                                        <span className="absolute top-0.5 left-[245px] w-[50px] h-7 flex gap-[5px] items-center justify-end">
                                            <img
                                                className="w-6 h-6"
                                                src="/Images/Line.svg"
                                                alt="Wishlist icon"
                                            />
                                            <Badge
                                                className="flex items-center justify-center font-InterBold leading-0.83 bg-neutral-07 text-white text-xs rounded-full size-5.5"
                                                number={2} />
                                        </span>
                                    </Link>
                                </div>
                            </nav>

                            {/* Sign In */}
                            <ButtonCard
                                onClick={handleSignin}
                                title="Sign In"
                                className='flex items-center justify-center flex-col font-InterMedium text-lg text-white leading-8 tracking-button-m px-[26px] py-2.5 self-stretch w-full bg-neutral-07 rounded-md no-underline'
                            />

                            {/* Social */}
                            <nav
                                className="flex w-[295px] items-start gap-2.5"
                                aria-label="Social media links"
                            >
                                <ul className="inline-flex items-start gap-6 list-none m-0 p-0">
                                    <li>
                                        <Link to="/instagram" aria-label="Instagram">
                                            <img
                                                className="size-6"
                                                src="/Images/instagram-1.svg"
                                                alt="Instagram"
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/facebook" aria-label="Facebook">
                                            <img
                                                className="size-6"
                                                src="/Images/facebook-1.svg"
                                                alt="Facebook"
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/youtube" aria-label="YouTube">
                                            <img
                                                className="size-6"
                                                src="/Images/youtube-1.svg"
                                                alt="YouTube"
                                            />
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default MobileMenu;








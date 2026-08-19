import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import MobileProductCard from '../screens/cart/partials/mobile-product-card';
import { CartItem, User } from '../../types/user.types';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCartTotalPrice } from '../../utils/helpers';

type CartSidebarProps = {
    data: User | undefined;
    open: boolean;
    onClose: () => void;
};

export default function CartSidebar({ data, open, onClose }: CartSidebarProps) {
    const [totalPrice, setTotalPrice] = useState<number | null>(null);

    useEffect(() => {
        if (data?.cart) {
            setTotalPrice(getCartTotalPrice(data.cart));
        }
    }, [data]);

    return (
        <div className={`fixed inset-0 z-[1000] ${open ? 'visible' : 'invisible'}`}>
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'
                    }`}
            />
            <aside
                className={`xs:!w-[400px] fixed top-0 right-0 z-50 flex h-screen w-[340px] transform flex-col rounded-l-2xl bg-white px-6 py-6 shadow-lg transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'} `}
            >
                <div className="mb-10 flex w-full items-center justify-between">
                    <h1 className="tracking-headline-6 text-[28px] leading-[34px] text-black/900 transition-all">
                        سبد خرید شما
                    </h1>
                    <X
                        className="stroke-neutral-04 cursor-pointer transition-all"
                        onClick={onClose}
                    />
                </div>

                <div className="scrollbar-custom flex-1 space-y-6 overflow-y-auto bg-white">
                    {[...(data?.cart ?? [])].reverse().map((item: CartItem) => (
                        <MobileProductCard
                            key={item._id}
                            onClose={onClose}
                            item={item}
                            total={data?.cart.length ?? 0}
                        />
                    ))}
                </div>

                <div className="flex justify-between py-3">
                    <span className="text-neutral-07 text-xl leading-[28px] transition-all">
                        مجموع
                    </span>
                    <span className="text-neutral-07 text-xl leading-[28px] transition-all">
                        {totalPrice?.toLocaleString()} هزار تومان
                    </span>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex flex-col gap-4">
                    <Link to="/cart" className="w-full">
                        <Button className="bg-main hover:!bg-main h-12 w-full cursor-pointer transition-opacity hover:opacity-70">
                            تکمیل سفارش
                        </Button>
                    </Link>
                    <Link
                        to="/cart"
                        className="mx-auto cursor-pointer border-b border-black/900 pb-1 text-sm leading-[22px] text-black/900 transition-all"
                    >
                        مشاهده سبد خرید
                    </Link>
                </div>
            </aside>
        </div>
    );
}




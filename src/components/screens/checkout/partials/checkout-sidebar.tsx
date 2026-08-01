import { Button } from '../../../ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCheckout from './hook';
import { getCartTotalPrice } from '../../../../utils/helpers';

const CheckoutSidebar = () => {
    const [type, setType] = useState('post');
    const [totalPrice, setTotalPrice] = useState<number | null>(null);

    const { user } = useCheckout();

    useEffect(() => {
        if (user?.cart) {
            setTotalPrice(getCartTotalPrice(user.cart));
        }
    }, [user]);

    useEffect(() => {
        if (type) {
            localStorage.setItem('order-type', type);
        }
    }, [type]);

    return (
        <div
            className={`${user?.cart.length == 0 || !user ? 'pointer-events-none opacity-20' : ''} bg-neutral-02 shadow-m sticky top-3 flex h-max w-full flex-col items-start gap-4 rounded-xl p-6 transition-all lg:!w-2/6`}
        >
            <div className="text-neutral-07 self-stretch text-xl leading-7 transition-all">
                خلاصه سبد خرید
            </div>

            <div className="flex w-full flex-col items-start self-stretch">
                <div className="flex w-full flex-col items-start self-stretch pt-0 pb-8">
                    <div className="flex w-full flex-col items-start gap-3 self-stretch pb-4">
                        <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-white p-3">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    className="accent-main size-5"
                                    name="send"
                                    onChange={() => setType('post')}
                                    checked={type == 'post'}
                                    id="post"
                                />
                                <label htmlFor="post"> ارسال با پست</label>
                            </div>
                            <div className="font-VazirRegular text-neutral-07 text-base">
                                50,000 تومان
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-white p-3">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    className="accent-main size-5"
                                    name="send"
                                    onChange={() => setType('tipax')}
                                    checked={type == 'tipax'}
                                    id="tipax"
                                />
                                <label htmlFor="tipax"> ارسال با تیپاکس</label>
                            </div>
                            <div className="font-VazirRegular text-neutral-07 text-base">
                                120,000 تومان
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-white p-3">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    className="accent-main size-5"
                                    name="send"
                                    onChange={() => setType('shop')}
                                    checked={type == 'shop'}
                                    id="shop"
                                />

                                <label htmlFor="shop"> مراجعه حضوری</label>
                            </div>
                            <div className="font-VazirRegular text-neutral-07 text-base">
                                رایگان
                            </div>
                        </div>
                    </div>
                    <hr className="border-neutral-03 w-full border" />
                    {/* Total */}
                    {user?.cart.length !== 0 ? (
                        <div className="flex w-full items-center justify-between py-3">
                            <div className="text-neutral-07 text-xl font-bold transition-all">
                                مجموع
                            </div>
                            <div className="text-neutral-07 text-xl font-bold transition-all">
                                {user?.cart.length !== 0
                                    ? (
                                        Number(totalPrice) +
                                        (type == 'post' ? 50000 : type == 'tipax' ? 120000 : 0)
                                    )?.toLocaleString()
                                    : '-'}{' '}
                                تومان
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <Link to={'/checkout'} className="w-full">
                    <Button className="h-10 w-full" variant={'main'}>
                        ادامه فرایند خرید
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default CheckoutSidebar;

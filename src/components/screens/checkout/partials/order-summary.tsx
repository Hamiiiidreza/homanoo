import { useEffect, useState } from 'react';
import { useUser } from '../../../../endpoints/useUser';
import { Skeleton } from '../../../ui/skeleton';
import { getCartTotalPrice } from '../../../../utils/helpers';

export const OrderSummary = () => {
    const { data } = useUser();

    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [orderType, setOrderType] = useState<string | null>(null);

    useEffect(() => {
        if (data?.cart) {
            setTotalPrice(getCartTotalPrice(data.cart));
        }
        if (localStorage.getItem('order-type')) {
            setOrderType(localStorage.getItem('order-type'));
        }
    }, [data]);

    return (
        <div className="bg-neutral-02 shadow-m rounded-xl p-6">
            <div className="text-neutral-07 self-stretch text-xl leading-7 font-bold transition-all">
                خلاصه سفارش
            </div>

            <div className="flex w-full flex-col items-start self-stretch">
                <div className="border-neutral-03 flex w-full items-center justify-between self-stretch border-b border-solid px-0 py-[13px]">
                    <div className="font-VazirRegular text-neutral-07 text-base leading-6.5 tracking-[0] transition-all">
                        نحوه ارسال
                    </div>
                    <div className="text-neutral-07 text-base leading-6.5 font-bold tracking-[0] transition-all">
                        {orderType == 'post'
                            ? 'پست'
                            : orderType == 'tipax'
                                ? 'تیپاکس'
                                : 'مراجعه حضوری'}
                    </div>
                </div>
                {/* <div className="border-neutral-03 flex w-full items-center justify-between self-stretch border-b border-solid px-0 py-[13px]">
          <div className="font-VazirRegular text-neutral-07 text-base leading-6.5 tracking-[0] transition-all">
            کد تخفیف
          </div>
          <div className="text-neutral-07 text-base leading-6.5 font-bold tracking-[0] transition-all">
            asdfDD
          </div>
        </div> */}
                <div className="flex w-full items-center justify-between self-stretch px-0 py-[13px]">
                    <div className="text-neutral-07 text-xl leading-7 font-semibold tracking-[0] transition-all">
                        صورت حساب
                    </div>
                    <div className="text-neutral-07 text-xl leading-7 font-semibold tracking-[0] transition-all">
                        {data?.cart.length !== 0 ? (
                            totalPrice ? (
                                (
                                    Number(totalPrice) +
                                    (orderType == 'post'
                                        ? 50000
                                        : orderType == 'tipax'
                                            ? 120000
                                            : 0)
                                )?.toLocaleString() + ' تومان '
                            ) : (
                                <Skeleton className="h-7 w-20 bg-gray-300" />
                            )
                        ) : (
                            0
                        )}{' '}
                    </div>
                </div>
            </div>
        </div>
    );
};

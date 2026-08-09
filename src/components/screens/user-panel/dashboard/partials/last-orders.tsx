import { ChevronLeft } from 'lucide-react';
import { Orders } from '../../../../../types/user.types';
import { localAssetsUrl } from '../../../../../utils/constants';
import { Link } from 'react-router-dom';
import { toJalaliDate } from '../../../../../utils/helpers';
import { Skeleton } from '../../../../ui/skeleton';
import useOrder from '../../../../../endpoints/useOrder';

const LastOrders = () => {
    const { orders } = useOrder();

    const lastThreeOrders = orders ? [...orders].reverse().slice(0, 3) : [];

    return (
        <div className="w-full rounded-md border bg-white px-6 py-6 shadow-sm transition-all xl:w-[40%]">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-VazirBold text-neutral-07 ml-2 text-base">
                    آخرین سفارش ها
                </h2>
                <Link
                    to={'/my-account/orders'}
                    className="font-VazirMedium text-secondary-color-blue flex items-center gap-2 text-xs"
                >
                    مشاهده همه
                    <ChevronLeft size={14} />
                </Link>
            </div>

            <div className="text-neutral-04 space-y-3 text-xs">
                {orders ? (
                    lastThreeOrders.length > 0 ? (
                        lastThreeOrders.map((order: Orders) => (
                            <Link
                                key={order.trackingCode}
                                to={'/my-account/orders'}
                                className="border-neutral-02 flex items-center gap-4 border-b pb-3 hover:bg-neutral-50 transition-colors"
                            >
                                <img
                                    src={`${localAssetsUrl + order.products[0]?.product.images[0]}`}
                                    alt={`سفارش ${order.trackingCode}`}
                                    className="xs:!w-30 h-15 w-15 rounded-md object-cover"
                                />
                                <div className="flex flex-1 items-center justify-between">
                                    <div className="mb-1 flex flex-col gap-2">
                                        <span className="font-VazirBold text-neutral-07 block text-sm">
                                            سفارش #{order.trackingCode}
                                        </span>
                                        <span className="font-VazirRegular text-neutral-04 block">
                                            {toJalaliDate(order.createdAt)}
                                        </span>
                                        <span className="font-VazirMedium text-neutral-07">
                                            {order.totalPrice.toLocaleString()} تومان
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="rounded-md bg-green-100 px-3 py-2 text-[10px] text-green-700">
                                            ثبت شده
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="pt-4 text-center xl:!pt-20">سفارشی یافت نشد</p>
                    )
                ) : (
                    <div className="flex items-center gap-4 border-b pb-3">
                        <Skeleton className="xs:!w-30 h-15 w-15 rounded-md" />
                        <div className="flex flex-1 items-center justify-between">
                            <div className="mb-1 flex flex-col gap-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-3 w-15" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <Skeleton className="h-8 w-15 bg-green-200" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LastOrders;

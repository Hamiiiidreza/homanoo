import { CheckCircle, Handbag, XCircle } from 'lucide-react';
import { Button } from '../../../../ui/button';

const OrdersNav = ({
    setFilter,
    filter,
}: {
    filter: string;
    setFilter: (v: string) => void;
}) => {
    const filterButtons = [
        { label: 'همه', value: 'all' },
        { label: 'ثبت شده', value: 'successfull' },
        { label: 'لغو شده', value: 'unSuccessfull' },
    ];
    return (
        <div className="flex flex-col items-start justify-between md:!flex-row md:!items-center">
            <div className="itmes-center flex justify-start gap-3">
                <div className="bg-neutral-01 flex size-9 items-center justify-center rounded-md">
                    <Handbag className="text-secondary-color-blue" />
                </div>
                <h2 className="font-VazirBold text-neutral-07 text-2xl">
                    سفارش‌های من
                </h2>
            </div>
            <div className="my-6 flex items-center justify-between">
                <div className="font-VazirMedium xs:!flex-nowrap xs:justify-start flex flex-wrap gap-2 text-sm sm:!gap-4">
                    {filterButtons.map((btn) => (
                        <Button
                            key={btn.value}
                            onClick={() => setFilter(btn.value as any)}
                            className={`group xs:!px-4 px-3 text-sm transition-all sm:!text-sm ${filter === btn.value
                                ? 'bg-main border-main hover:bg-main/90 text-white'
                                : 'text-neutral-07 hover:bg-main border bg-white hover:text-white'
                                }`}
                        >
                            {btn.value === 'successfull' && (
                                <CheckCircle
                                    size={16}
                                    className={`transition-colors ${filter === 'delivered'
                                        ? 'text-white'
                                        : 'text-green-700 group-hover:text-white'
                                        }`}
                                />
                            )}
                            {btn.value === 'unSuccessfull' && (
                                <XCircle
                                    size={16}
                                    className={`transition-colors ${filter === 'canceled'
                                        ? 'text-white'
                                        : 'text-red-700 group-hover:text-white'
                                        }`}
                                />
                            )}

                            <span>{btn.label}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersNav;
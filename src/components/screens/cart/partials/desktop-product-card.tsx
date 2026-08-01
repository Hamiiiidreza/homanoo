import { CartItem } from '../../../../types/user.types';
import { localAssetsUrl } from '../../../../utils/constants';
import QuantityControls from '../../product/partials/quantity-controls';
import { useQueryClient } from '@tanstack/react-query';

const DesktopProductCard = (item: CartItem) => {
    const queryclient = useQueryClient()
    return (
        <div
            key={item._id}
            className="border-neutral-03 grid w-full grid-cols-[168px_1fr] items-center border-b border-solid py-6"
        >
            <div className="flex items-center gap-4">
                <div className="bg-neutral-02">
                    <img
                        src={localAssetsUrl + item.product.images[0]}
                        alt={item.product.name}
                        className="h-16 w-20 rounded-md object-cover mix-blend-multiply transition-all hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="font-bold text-neutral-07 text-sm leading-5.5 tracking-[0] transition-all">
                        {item.product.name}
                    </div>

                    <div className="font-VazirRegular text-neutral-04 text-xs leading-5 tracking-[0] whitespace-nowrap transition-all">
                        رنگ: {item.product.colors.find(c => c?.code == item.color)?.name}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 items-center text-center">
                <div className="font-VazirRegular text-black-900  whitespace-nowrap transition-all">
                    {item.product.price.toLocaleString('fa-IR')} تومان
                </div>

                <div className="font-bold text-black-900 text-base leading-7.5 whitespace-nowrap transition-all flex gap-3">
                    {(item.product.price * item.quantity).toLocaleString('fa-IR')} تومان

                </div>

                <QuantityControls endUpdateQuantityHandler={() => {
                    queryclient.invalidateQueries({ queryKey: ["me"] })
                }
                } data={item} className='flex-row' />
            </div>
        </div>
    );
};

export default DesktopProductCard;

import { CartItem } from '../../../../types/user.types';
import { localAssetsUrl } from '../../../../utils/constants';
import QuantityControls from '../../product/partials/quantity-controls';
import { useQueryClient } from '@tanstack/react-query';

const MobileProductCard = ({
    item,
    onClose,
    total,
}: {
    item: CartItem;
    onClose?: () => void;
    total?: number;
}) => {
    const queryclient = useQueryClient();
    return item ? (
        <div className="border-b border-gray-200 pb-6">
            <div key={item.product.code} className="flex items-center gap-4">
                <div className="bg-neutral-02">
                    <img
                        src={`${localAssetsUrl}${item.product.images[0] ?? ''}`}
                        alt={item.product.name}
                        className="h-24 w-20 rounded-md object-cover mix-blend-multiply"
                    />
                </div>
                <div className="flex flex-1 justify-between gap-1.5">
                    <div className="space-y-2">
                        <h2 className="text-neutral-07 leading-[22px] transition-all">
                            {item.product.name}
                        </h2>
                        <p className="text-neutral-04 text-xs leading-[20px] transition-all">
                            {item.product.colors.find((c) => c.code == item.color)?.name}
                        </p>
                        <span className="leading-[22px] text-black/900 transition-all">
                            {(item.quantity * item.product.price).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            <QuantityControls
                endUpdateQuantityHandler={() => {
                    queryclient.refetchQueries({ queryKey: ['me'] });
                }}
                endFunctionHandler={() => {
                    if (total == 1) {
                        onClose?.();
                    }
                }}
                className={`!flex-row pt-5`}
                data={item}
            />
        </div>
    ) : (
        ''
    );
};

export default MobileProductCard;

import { Minus, Plus, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { CartItem, User } from '../../../../types/user.types';
import useCart from '../../../../endpoints/useCart';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const QuantityControls = ({
    data,
    showBtn,
    endFunctionHandler,
    endUpdateQuantityHandler,
    className,
}: {
    data: CartItem;
    endUpdateQuantityHandler?: () => void;
    endFunctionHandler?: (v?: null) => void;
    showBtn?: boolean;
    className?: string;
}) => {

    const { updateQuantityMutation, removeItemMutation } = useCart();
    const [quantity, setQuantity] = useState(data.quantity);
    const queryClinet = useQueryClient();

    useEffect(() => {
        setQuantity(data.quantity);
    }, [data.quantity]);

    const syncUserCart = (nextQuantity: number) => {
        queryClinet.setQueryData<User | undefined>(['me'], (user) => {
            if (!user) {
                return user;
            }

            return {
                ...user,
                cart: user.cart.map((item) =>
                    item._id === data._id
                        ? { ...item, quantity: nextQuantity }
                        : item,
                ),
            };
        });
    };

    return (
        <div className={`${className ? className : ''} flex flex-col items-center gap-2`}>
            {showBtn ? (
                <Link className="w-full" to={'/cart'}>
                    <Button className="lg:!w-full" variant={'outline'}>
                        مشاهده سبد خرید
                    </Button>
                </Link>
            ) : (
                ''
            )}
            <div
                className={`${updateQuantityMutation.isPending ? 'pointer-events-none opacity-35' : ''} border-neutral-04 flex h-8 w-full items-center justify-between gap-3 rounded-md border px-2 transition-opacity`}
            >
                <Plus
                    className="cursor-pointer text-black/900"
                    size={16}
                    onClick={() =>
                        updateQuantityMutation.mutate(
                            { id: data._id, action: 'plus' },
                            {
                                onSuccess: () => {
                                    const nextQuantity = quantity + 1;
                                    setQuantity(nextQuantity);
                                    syncUserCart(nextQuantity);
                                    endUpdateQuantityHandler?.();
                                },
                            },
                        )
                    }
                />
                <span className="text-xs text-black/900">{quantity}</span>
                <Minus
                    className={`${quantity == 1 ? 'pointer-events-none opacity-30' : ''} cursor-pointer text-black/900`}
                    size={16}
                    onClick={() =>
                        updateQuantityMutation.mutate(
                            { id: data._id, action: 'minus' },
                            {
                                onSuccess: () => {
                                    const nextQuantity = quantity - 1;
                                    setQuantity(nextQuantity);
                                    syncUserCart(nextQuantity);
                                    endUpdateQuantityHandler?.();
                                },
                            },
                        )
                    }
                />
            </div>
            <div
                onClick={() =>
                    removeItemMutation.mutate(data._id, {
                        onSuccess() {
                            endFunctionHandler?.();
                            queryClinet.invalidateQueries({ queryKey: ['me'] });
                        },
                    })
                }
                className="flex w-full cursor-pointer justify-center rounded-md bg-red-600 px-3 py-2 transition-opacity hover:opacity-75"
            >
                <Trash size={17} className="stroke-white" />
            </div>
        </div>
    );
};

export default QuantityControls;

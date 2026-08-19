import MobileProductCard from './mobile-product-card';
import DesktopProductCard from './desktop-product-card';
import { useUser } from '../../../../endpoints/useUser';
import { CartItem } from '../../../../types/user.types';
import { Button } from '../../../ui/button';
import { toast } from 'sonner';
import TableSkeleton from './table-skeleton';
import MobileProductSkeleton from '../../product/partials/mobile-product-skeleton';

const ProductsTable = () => {
    const { data, isPending } = useUser();

    const cartItems = data?.cart ?? [];
    const hasItems = cartItems.length > 0;

    return (
        <div className="flex w-full flex-col gap-10 lg:w-4/6">
            <div className="flex flex-col gap-10">
                <div className="hidden w-full flex-col items-start sm:flex">
                    <div className="grid w-full grid-cols-[168px_1fr] border-b border-solid border-[#6c7174] pb-6">
                        <div className="text-black-900 leading-6.5 font-bold tracking-[0] whitespace-nowrap transition-all">
                            محصول
                        </div>

                        <div className="text-black-900 grid grid-cols-3 text-center text-base leading-6.5 font-bold tracking-[0] whitespace-nowrap">
                            <div className="transition-all">قیمت</div>
                            <div className="transition-all">جمع</div>
                            <div className="transition-all">تعداد</div>
                        </div>
                    </div>

                    {!isPending ? (
                        hasItems ? (
                            [...cartItems].reverse().map((item: CartItem) => (
                                <DesktopProductCard key={item._id} {...item} />
                            ))
                        ) : (
                            <p className="w-full pt-5 text-center">محصولی یافت نشد</p>
                        )
                    ) : (
                        <TableSkeleton />
                    )}
                </div>

                {/* MOBILE */}
                <div className="scrollbar-custom block flex-1 overflow-y-auto bg-white sm:hidden">
                    <div className="mb-6 w-full border-b border-solid border-[#6c7174] pb-4">
                        <h2 className="text-black-900 leading-6.5 font-bold tracking-[0] whitespace-nowrap transition-all">
                            محصول
                        </h2>
                    </div>

                    <div className="space-y-6">

                        {!isPending ? (
                            hasItems ? (
                                [...cartItems].reverse().map((item: CartItem) => (
                                    <MobileProductCard key={item._id} item={item} />
                                ))
                            ) : (
                                <p className="w-full pt-0 text-center">محصولی یافت نشد</p>
                            )
                        ) : (
                            <MobileProductSkeleton />
                        )}

                    </div>
                </div>
            </div>

            <div className="order-2 flex flex-col gap-4">
                <div className="flex w-full flex-col items-start gap-[7px] self-stretch">
                    <div className="text-neutral-07 self-stretch text-xl leading-7 tracking-[0] transition-all">
                        کد تخفیف دارید؟
                    </div>
                    <p className="font-VazirRegular text-neutral-04 self-stretch text-base leading-6.5 tracking-[0] transition-all">
                        کد خود را وارد کنید تا تخفیف اعمال شود
                    </p>
                </div>
                <form className="flex h-[54px] w-full items-center justify-between rounded-xl border border-solid border-gray-300 px-4 py-0">
                    <div className="flex flex-1 grow items-center gap-2">
                        <img
                            className="text-neutral-04 size-6 transition-all"
                            src="/Images/ticket-percent.svg"
                        />
                        <input
                            type="text"
                            placeholder="کد تخفیف"
                            className="text-neutral-04 tracking-button-s placeholder:text-neutral-04 flex-1 text-base leading-7 transition-all focus:outline-none"
                        />
                    </div>

                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            toast.error('کد وارد شده صحیح نمی باشد');
                        }}
                        variant={'ghost'}
                    >
                        اعمال
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ProductsTable;

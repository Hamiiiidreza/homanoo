import { ChevronLeft } from 'lucide-react';
import { User } from '../../../../../types/user.types';
import { Link } from 'react-router-dom';
import DashboardProductCard from './dashboard-product-card';
import { Skeleton } from '../../../../ui/skeleton';

const FavoriteProducts = ({ data }: { data: User | undefined }) => {
    return (
        <div className="w-full rounded-md border bg-white px-4 py-6 shadow-sm transition-all xl:w-[60%]">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-VazirBold text-neutral-07 ml-2 text-base">
                    محصولات محبوب شما
                </h2>
                <Link
                    to="/my-account/favorites"
                    className="font-VazirMedium text-secondary-color-blue flex cursor-pointer items-center gap-2 text-xs"
                >
                    مشاهده همه
                    <ChevronLeft size={14} />
                </Link>
            </div>

            {data ? (
                data.wishlist.length > 0 ? (
                    <div className="grid gap-4 sm:!grid-cols-2">
                        {data?.wishlist.slice(0, 6).map((p) => (
                            <DashboardProductCard {...p.product} />
                        ))}
                    </div>
                ) : (
                    <p className="pt-4 text-center xl:!pt-20">محصولی یافت نشد</p>
                )
            ) : (
                <div className="grid gap-4 sm:!grid-cols-2">
                    <div className="flex items-center gap-3 border-b pb-3">
                        <Skeleton className="h-[70px] w-[70px] rounded-md" />
                        <div>
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-5 mt-2" />

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FavoriteProducts;

import { Heart } from 'lucide-react';
import { useUser } from '../../../../endpoints/useUser';
import ProductSkeleton from '../../shop/partials/product-skeleton';
import { WishlistItem } from '../../../../types/user.types';
import Card from '../../../modules/product-card';
import PaginationWrapper from '../../../modules/pagination-wrapper';

const FavoritesScreen = () => {
    const { data, isPending } = useUser();

    const wishlist = data?.wishlist || [];

    return (
        <section className="my-10 rounded-md border bg-white p-6 shadow-lg">
            <div className="flex items-center justify-start gap-3">
                <div className="bg-neutral-01 flex size-9 items-center justify-center rounded-md">
                    <Heart className="text-secondary-color-blue" />
                </div>

                <h2 className="font-VazirBold text-neutral-07 flex items-center text-2xl">
                    علاقه مندی های من
                </h2>
            </div>

            {!isPending ? (
                wishlist.length > 0 ? (
                    <div className="w-full space-y-10 pt-10">
                        <PaginationWrapper<WishlistItem>
                            variant="client"
                            items={wishlist}
                            limit={7}
                        >
                            {(currentItems) => (
                                <div className="grid w-full grid-cols-1 gap-6 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4">
                                    {currentItems.map((pr) => (
                                        <Card
                                            key={pr.id}
                                            isPanel
                                            data={{
                                                ...pr.product,
                                                isInCart: true,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </PaginationWrapper>
                    </div>
                ) : (
                    <p className="w-full py-20 text-center text-2xl">
                        کالایی یافت نشد
                    </p>
                )
            ) : (
                <div className="xs:grid-cols-2 grid w-full grid-cols-1 gap-6 pt-10 lg:!grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default FavoritesScreen;





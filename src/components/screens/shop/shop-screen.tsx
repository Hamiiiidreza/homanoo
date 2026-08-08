import Breadcrumb from '../../modules/breadcrumb';
import Container from '../../../components/modules/container';
import Card from '../../modules/product-card';
import { Product } from '../../../types/product.types';
import useShop from '../../../endpoints/useShop';
import { useEffect } from 'react';
import ProductFiltersWrapper from './partials/product-filters-wrapper';
import ProductSkeleton from './partials/product-skeleton';
import PaginationWrapper from '../../modules/pagination-wrapper';
import { useNavigate } from 'react-router-dom';
import { useProductFilters } from '../../../store/product-filter';

const ShopScreen = () => {
    const navigate = useNavigate();
    const filters = useProductFilters((state) => state.filters);
    const { data, isPending, filtersData } = useShop(filters);

    useEffect(() => {
        if (!data) return;
        if (data.page > 1 && data.page > data.totalPages) {
            navigate('/shop', { replace: true });
        }
    }, [data]);

    return (
        <Container>
            <Breadcrumb className="pt-5" title="فروشگاه" />

            <div className="flex flex-col gap-4 pt-5 pb-10 md:flex-row">
                <ProductFiltersWrapper filtersData={filtersData} />

                {!isPending || data?.products.length === 0 ? (
                    data?.products.length ? (
                        <div className="w-full space-y-5">
                            <div className="grid grid-cols-1 xs:grid-cols-2 lg:!grid-cols-3 gap-6">
                                {data.products.map((product: Product) => (
                                    <Card key={product._id} data={product} />
                                ))}
                            </div>

                            <PaginationWrapper
                                variant="server"
                                key="shop"
                                page={data.page}
                                limit={5}
                                totalItems={data.total}
                            />
                        </div>
                    ) : (
                        <div className="w-full pt-20 text-center">
                            <img className="mx-auto" src="/Images/notfound.png" alt="محصولی یافت نشد" />

                            <p className="py-2 text-2xl">متاسفانه کالایی یافت نشد</p>

                            <p>
                                برای رسیدن به نتیجه بهتر، ترکیب‌های مختلفی از فیلترها را امتحان
                                کنید.
                            </p>
                        </div>
                    )
                ) : (
                    <div className="xs:grid-cols-2 grid w-full grid-cols-1 gap-6 lg:!grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ShopScreen;
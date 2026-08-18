import Breadcrumb from '../../../components/modules/breadcrumb';
import Container from '../../../components/modules/container';
import Card from '../../modules/product-card';
import { Product } from '../../../types/product.types';
import useShop from '../../../endpoints/useShop';
import { useEffect, useState } from 'react';
import ProductFiltersWrapper from './partials/product-filters-wrapper';
import ProductSkeleton from './partials/product-skeleton';
import PaginationWrapper from '../../modules/pagination-wrapper';
import { useNavigate } from 'react-router-dom';
import { useProductFilters } from '../../../store/product-filter';
import { useQueryParams } from '../../../endpoints/useQueryParams';

const ShopScreen = () => {
    const navigate = useNavigate();

    const { getParams } = useQueryParams();

    const filters = useProductFilters((state) => state.filters);
    const setFilter = useProductFilters((state) => state.setFilter);

    const [filtersInitialized, setFiltersInitialized] = useState(false);

    const { data, isPending, filtersData } = useShop(
        filtersInitialized ? filters : undefined,
    );

    const params = getParams();

    useEffect(() => {
        if (!filtersData) return;

        setFilter({
            category: (params.category as string) || 'all',
            sortBy: (params.sortBy as string) || 'all',
            color: (params.color as string) || 'all',
            priceRange: [
                Number(params.minPrice) || filtersData.minPrice,
                Number(params.maxPrice) || filtersData.maxPrice,
            ],
            inStock: Boolean(params.inStock),
        });

        setFiltersInitialized(true);
    }, [
        filtersData,
        params.category,
        params.sortBy,
        params.color,
        params.minPrice,
        params.maxPrice,
        params.inStock,
        setFilter,
    ]);

    useEffect(() => {
        if (!data) return;
        if (data.page > 1 && data.page > data.totalPages) {
            navigate('/shop', { replace: true });
        }
    }, [data, navigate]);

    return (
        <Container>
            <Breadcrumb className="pt-5" title="فروشگاه" />

            <div className="flex flex-col gap-4 pt-5 pb-10 md:flex-row">
                <ProductFiltersWrapper filtersData={filtersData} />

                {!isPending || data?.products.length === 0 ? (
                    data?.products?.length ? (
                        <div className="w-full space-y-5">
                            <div className="xs:grid-cols-2 grid grid-cols-1 gap-6 lg:!grid-cols-3">
                                {data.products.map((product: Product) => (
                                    <Card key={product._id} data={product} />
                                ))}
                            </div>

                            <PaginationWrapper
                                variant="server"
                                key="shop"
                                page={data.page}
                                limit={9}
                                totalItems={data.total}
                            />
                        </div>
                    ) : (
                        <div className="w-full pt-20 text-center">
                            <img className="mx-auto" src="/Images/notfound.png" alt="" />

                            <p className="py-2 text-2xl">متاسفانه کالایی یافت نشد</p>

                            <p>
                                برای رسیدن به نتیجه بهتر، ترکیب‌های مختلفی از فیلترها را امتحان
                                کنید.
                            </p>
                        </div>
                    )
                ) : (
                    <div className="xs:grid-cols-2 grid w-full grid-cols-1 gap-6 lg:!grid-cols-3">
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ShopScreen;
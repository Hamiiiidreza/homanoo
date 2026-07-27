import { useEffect } from 'react';
import { useQueryParams } from '../../../../endpoints/useQueryParams';
import { useProductFilters } from '../../../../store/product-filter';
import { filterToQuery } from '../../../../utils/filter-to-query';
import { ShopFiltersData } from '../../../../types/shop';

export function useFilterActions(
    filtersData: ShopFiltersData,
    closeDrawer: () => void,
) {
    const { getParams, replaceParams } = useQueryParams();

    const filters = useProductFilters((s) => s.filters);

    const setFilter = useProductFilters((s) => s.setFilter);

    const resetFilters = useProductFilters((s) => s.resetFilters);

    const setPriceRange = useProductFilters((s) => s.setPriceRange);

    useEffect(() => {
        if (!filtersData) return;

        setPriceRange(filtersData.minPrice, filtersData.maxPrice);

        const params = getParams();

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
    }, [filtersData]);

    const update = (values: Partial<typeof filters>) => {
        const updated = {
            ...filters,
            ...values,
        };

        setFilter(values);

        replaceParams(
            filterToQuery(updated, filtersData.minPrice, filtersData.maxPrice),
        );
        closeDrawer();
    };

    const reset = () => {
        resetFilters(filtersData.minPrice, filtersData.maxPrice);
        replaceParams({});
        closeDrawer();
    };

    return {
        filters,
        update,
        reset,
    };
}
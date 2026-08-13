import { useQuery } from '@tanstack/react-query';
import { localBackendUrl } from '../utils/constants';
import { Filters } from '../store/product-filter';
import { useQueryParams } from './useQueryParams';
import Cookies from 'js-cookie';

const useShop = (filters?: Filters) => {
    const { getParam } = useQueryParams();

    const fetchShopData = async () => {
        const params = new URLSearchParams();

        if (filters) {
            if (filters.category && filters.category !== 'all') {
                params.append('category', filters.category);
            }
            if (filters.color && filters.color !== 'all') {
                params.append('color', filters.color);
            }
            if (
                filters.priceRange &&
                filters.priceRange[0] !== 0 &&
                filters.priceRange[1] !== 0
            ) {
                params.append('minPrice', Number(filters.priceRange[0]).toString());
                params.append('maxPrice', Number(filters.priceRange[1]).toString());
            }
            if (filters.inStock) {
                params.append('inStock', 'true');
            }
            if (true) {
                params.append('limit', '9');
            }
            if (getParam('page') as string) {
                params.append('page', getParam('page') as string);
            }
            if (getParam('name') as string) {
                params.append('search', getParam('name') as string);
            } else {
                params.delete('search');
            }
            if (filters.sortBy && filters.sortBy !== 'all') {
                params.append('sort', filters.sortBy);
            }
        }

        const headers: { authorization?: string } = {};
        if (Cookies.get('token')) {
            headers.authorization = `Bearer ${Cookies.get('token')}`;
        }

        const url = `${localBackendUrl}/products${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await fetch(url, {
            headers,
        });
        const data = await response.json();
        return data;
    };
    const fetchShopFiltersData = async () => {
        const response = await fetch(`${localBackendUrl}/shopFilters`);
        const data = await response.json();
        return data;
    };

    const { data: filtersData } = useQuery({
        queryKey: ['filtersData'],
        queryFn: fetchShopFiltersData,
    });
    const { data, isPending } = useQuery({
        queryKey: [
            'shop',
            getParam('name') as string,
            getParam('page') as string,
            filters,
        ],
        queryFn: fetchShopData,
        enabled: !!filters,
    });

    return { data, isPending, filtersData };
};

export default useShop;
import { Filters } from '../store/product-filter';

export function filterToQuery(filters: Filters, min: number, max: number) {
    const query: Record<string, any> = {};

    if (filters.category !== 'all') query.category = filters.category;

    if (filters.sortBy !== 'all') query.sortBy = filters.sortBy;

    if (filters.color !== 'all') query.color = filters.color;

    if (filters.priceRange[0] !== min || filters.priceRange[1] !== max) {
        query.minPrice = filters.priceRange[0];
        query.maxPrice = filters.priceRange[1];
    }

    if (filters.inStock) query.inStock = true;

    return query;
}

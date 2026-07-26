import { create } from 'zustand';

export interface Filters {
    category: string;
    sortBy: string;
    color: string;
    priceRange: number[];
    inStock: boolean;
}

interface ProductFiltersStore {
    filters: Filters;
    setFilter: (data: Partial<Filters>) => void;
    setPriceRange: (min: number, max: number) => void;
    resetFilters: (min: number, max: number) => void;
}

export const useProductFilters = create<ProductFiltersStore>((set) => ({
    filters: {
        category: 'all',
        sortBy: 'all',
        color: 'all',
        priceRange: [0, 0],
        inStock: false,
    },

    setFilter: (data) =>
        set((state) => ({
            filters: {
                ...state.filters,
                ...data,
            },
        })),

    setPriceRange: (min, max) =>
        set((state) => ({
            filters: {
                ...state.filters,
                priceRange: [min, max],
            },
        })),

    resetFilters: (min, max) =>
        set({
            filters: {
                category: 'all',
                sortBy: 'all',
                color: 'all',
                priceRange: [min, max],
                inStock: false,
            },
        }),
}));

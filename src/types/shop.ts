export interface ShopFiltersData {
    categories: {
        _id: string;
        name: string;
        slug: string;
    }[];
    colors: string[];
    minPrice: number;
    maxPrice: number;
}
export type CategoriesProps = {
    data: {
        description: string;
        image: string;
        isActive: boolean;
        name: string;
        slug: string;
    };
    isTop: boolean;
    imageClass?: string;
    hasInnerLeftBorder?: boolean;
};
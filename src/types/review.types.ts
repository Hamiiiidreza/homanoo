export type Review = {
    comment: string;
    createdAt: string;
    product: string;
    rating: number;
    show: boolean;
    updatedAt: string;
    user: {
        name: string;
        _id: string;
    };
};
import { Product } from './product.types';

export interface User {
    _id: string;
    name: string;
    ticketsCount: number;
    ordersCount: number;
    email: string;
    phone: string;
    role: 'admin' | 'user' | 'moderator';
    cart: CartItem[];
    wishlist: WishlistItem[];
    nationalCode: string | null;
    birthDate: string | null;
    impersonatedBy: string | null;
    createdAt: string; //
    updatedAt: string;
    addresses: Address[];
    orders: Orders[];
}

export interface CartItem {
    product: Product;
    quantity: number;
    color: string;
    _id: string;
}

export interface WishlistItem {
    _id: string;
    product: Product;
    createdAt?: string;
    updatedAt?: string;
}
export interface Address {
    _id: number;
    postalCode: string;
    address: string;
    city: {
        cityName: string;
        cityId: string;
        provinceId: string;
    };
    province: {
        provinceId: string;
        provinceName: string;
    };
}
export interface Orders {
    _id: number;
    information: {
        postalCode: string;
        address: string;
        city: {
            cityName: string;
            cityId: string;
            provinceId: string;
        };
        province: {
            provinceId: string;
            provinceName: string;
        };
        firstName: string;
        lastName: string;
        method: string;
    };
    products: CartItem[];
    status: string;
    totalPrice: 44000000;
    trackingCode: string;
    user: string;
    createdAt: string;
}

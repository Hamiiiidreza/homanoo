import { CartItem } from '../types/user.types';

export const toJalaliDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
};

export const getCartTotalPrice = (cart: CartItem[]) => {
    const prices = cart.map((item) => item.quantity * item.product.price);
    const total = prices.reduce((a, b) => a + b, 0);
    return total;
};

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

type TicketStatus = 'closed' | 'isUnreadForAdmin' | 'isUnreadForUser';

export const getTicketStatus = (
    status: TicketStatus | string
): { text: string; className: string } => {
    switch (status) {
        case 'closed':
            return {
                className: 'bg-gray-100 text-gray-500',
                text: 'بسته شده',
            };
        case 'isUnreadForAdmin':
            return {
                className: 'bg-orange-100 text-orange-600',
                text: 'در دست بررسی',
            };
        case 'isUnreadForUser':
            return {
                className: 'bg-green-100 text-green-700',
                text: 'پاسخ داده شده',
            };
        default:
            return {
                className: 'bg-gray-100',
                text: 'نامعلوم',
            };
    }
};

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { CartItems } from "../../types/cart.types";
import { User } from "../../types/user.types";

import {
    Sheet,
    SheetContent,
} from "../ui/sheet";

type CartSidebarProps = {
    data: User | undefined;
    open: boolean;
    onClose: () => void;
}

const cartItems: CartItems[] = [
    { id: 1, name: "میز سینی", color: "مشکی", price: 19.19, quantity: 2, image: "/Images/product-5.png" },
    { id: 2, name: "میز سینی", color: "قرمز", price: 19.19, quantity: 2, image: "/Images/product-5-2.svg" },
    { id: 3, name: "چراغ رومیزی", color: "طلایی", price: 39.0, quantity: 2, image: "/Images/product-2.png" },
];

export default function CartSidebar({ data, open, onClose }: CartSidebarProps) {
    const navigate = useNavigate();
    const subtotal = 99.0;
    const total = 234.0;

    const handleCheckout = (): void => {
        navigate('/checkout')
    }

    return (
        <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
            <SheetContent
                side="right"
                className="flex flex-col w-[400px] h-screen bg-white px-6 py-10 shadow-lg"
            >
                <header className="flex items-center justify-between w-full mb-10">
                    <h1 className="font-VazirMedium text-[28px] text-black/900 transition-all hover:drop-shadow-custom">سبد خرید</h1>
                </header>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2 max-h-[350px] scrollbar-custom">
                    {cartItems.map((item: CartItems) => (
                        <div key={item.id} className="flex items-center border-b border-gray-200 pb-6">
                            <div className="bg-neutral-02">
                                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-blend-multiply transition-all hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
                            </div>
                            <div className="flex justify-between flex-1 mx-4">
                                <div className="space-y-2">
                                    <h2 className="font-VazirBold text-sm text-neutral-07 transition-all hover:drop-shadow-custom">{item.name}</h2>
                                    <p className="font-VazirRegular text-neutral-04 text-xs transition-all hover:drop-shadow-custom">رنگ: {item.color}</p>
                                    <div className="flex items-center border border-neutral-04 rounded mt-2 w-20 h-8 justify-between px-2 transition-all hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                                        <button>-</button>
                                        <span className="text-xs font-VazirBold">{item.quantity}</span>
                                        <button>+</button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="font-VazirBold text-sm transition-all hover:drop-shadow-custom">${item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <div className="flex justify-between border-b border-gray-200 py-3">
                        <span className="font-VazirRegular text-base">جمع جزئی</span>
                        <span className="font-VazirRegular text-base">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span className="font-VazirMedium text-xl">مجموع</span>
                        <span className="font-VazirMedium text-xl">${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <Button
                        onClick={handleCheckout}
                        className="font-VazirMedium w-full h-[52px] bg-main text-white hover:bg-main/90 cursor-pointer"
                    >
                        تسویه حساب
                    </Button>

                    <Link
                        to="/shopping-cart"
                        className="font-VazirBold text-sm text-black/900 mx-auto border-b border-black/900 pb-1"
                    >
                        مشاهده سبد خرید
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}



import React from 'react'
import Stepper from '../../modules/stepper';
import Badge from '../../ui/badge';
import ButtonCard from '../../ui/button-card';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';

type OrderProduct = {
    id: string;
    image: string;
    quantity: number;
};

type OrderInfoItem = {
    label: string;
    value: string;
};

const OrderDetails: React.FC = () => {

    const navigate = useNavigate();

    const handlePurchase = (): void => {
        navigate('/my-account/');
    }

    // ✅ products با id یونیک
    const products: OrderProduct[] = [
        {
            id: 'product-1',
            image: '/Images/product-5.png',
            quantity: 2
        },
        {
            id: 'product-2',
            image: '/Images/product-5-2.svg',
            quantity: 2
        },
        {
            id: 'product-3',
            image: '/Images/product-2.png',
            quantity: 1
        }
    ];

    const orderInfo: OrderInfoItem[] = [
        { label: "کد سفارش:", value: "#0123_45678" },
        { label: "تاریخ:", value: "October 19, 2023" },
        { label: "مجموع:", value: "$1,345.00" },
        { label: "روش پرداخت:", value: "کارت اعتباری" }
    ];

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center py-16 lg:py-20 bg-white">

                    <Stepper
                        title="تکمیل شد!"
                        currentStep={3}
                    />

                    <div
                        className="flex flex-col items-center gap-10
                            w-full max-w-[640px] lg:max-w-[700px]
                            px-6 sm:px-10 lg:px-20
                            py-12 lg:py-20
                            my-12 lg:my-20
                            bg-white
                            rounded-lg
                            shadow-[0px_32px_48px_-4px_rgba(0,0,0,0.25)]
                        "
                    >

                        {/* HEADER */}
                        <header className="flex flex-col items-center gap-4 w-full text-center">
                            <h2 className="w-full font-VazirMedium text-neutral-04 text-2xl lg:text-[28px] leading-8.5 transition-all hover:drop-shadow-custom">
                                🎉  متشکریم!
                            </h2>

                            <p className="w-full font-VazirMedium text-2xl sm:text-3xl lg:text-[40px] text-[#23262F] leading-tight transition-all hover:drop-shadow-custom">
                                سفارش شما با موفقیت دریافت شد
                            </p>
                        </header>

                        {/* PRODUCTS */}
                        <div className="flex flex-wrap justify-center gap-10 w-full">
                            {products.map((product: OrderProduct) => (
                                <div
                                    key={product.id}
                                    className="relative bg-neutral-02 transition-all hover:drop-shadow-custom"
                                >
                                    <img
                                        className="w-30 sm:w-20 h-34 sm:h-24 object-cover mix-blend-multiply"
                                        src={product.image}
                                        alt="product"
                                    />

                                    <div className="absolute -top-4 right-0 flex items-center justify-center size-8 bg-neutral-07 rounded-[80px] transition-all hover:drop-shadow-custom">
                                        <Badge
                                            number={product.quantity.toLocaleString('fa-IR')}
                                            className="w-2.5 h-6 font-VazirBold text-[#FCFCFD] text-base leading-6"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ORDER INFO */}
                        <dl
                            className="w-full grid gap-y-2 sm:gap-y-5 sm:grid-cols-[180px_auto] sm:justify-center"
                        >
                            {orderInfo.map((item) => (
                                <React.Fragment key={item.label}>
                                    <dt className="font-VazirBold text-neutral-04 text-sm pb-2 transition-all hover:drop-shadow-custom">
                                        {item.label}
                                    </dt>

                                    <dd className="font-VazirBold text-neutral-07 text-sm pb-2 border-b border-neutral-03 sm:border-none break-all transition-all hover:drop-shadow-custom">
                                        {item.value}
                                    </dd>
                                </React.Fragment>
                            ))}
                        </dl>

                        <Button
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-6 font-VazirMedium text-white text-base tracking-button-s leading-7 bg-main transition-all hover:bg-main/90 rounded-[80px] cursor-pointer"
                            onClick={handlePurchase}
                        >
                            تاریخچه خرید
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetails;

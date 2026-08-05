import Container from '../../modules/container';
import { Link, useParams } from 'react-router-dom';
import Stepper from '../../modules/stepper';
import { Button } from '../../ui/button';
import Badge from '../../ui/badge';
import useOrder from '../../../endpoints/useOrder';
import { localAssetsUrl } from '../../../utils/constants';
import { CartItem } from '../../../types/user.types';
import { Skeleton } from '../../ui/skeleton';
import { toJalaliDate } from '../../../utils/helpers';

const OrderComplateScreen = () => {
    const { trackingCode } = useParams();
    const { order, orderRequestPending } = useOrder(trackingCode);

    return (
        <Container>
            <div className="flex flex-col items-center bg-white py-10">
                <Stepper title="تکمیل شد!" currentStep={3} />

                <div className="my-10 flex w-full max-w-[640px] flex-col items-center gap-10 rounded-xl bg-white px-6 py-12 shadow-[0px_32px_48px_-4px_rgba(0,0,0,0.25)] sm:px-10 lg:max-w-[700px] lg:py-20">
                    <div className="flex w-full flex-col items-center gap-4 text-center">
                        <h2 className="text-neutral-04 w-full text-2xl leading-8.5 transition-all lg:text-[28px]">
                            🎉 متشکریم!
                        </h2>

                        <p className="w-full text-2xl leading-tight text-[#23262F] transition-all sm:text-3xl lg:text-[40px]">
                            سفارش شما با موفقیت دریافت شد
                        </p>
                    </div>

                    <div className="flex w-full flex-wrap justify-center gap-10">
                        {orderRequestPending ? (
                            <Skeleton className="h-14 w-14 rounded-md sm:h-20 sm:w-32" />
                        ) : (
                            order?.products.map((product: CartItem) => (
                                <div
                                    key={product.product._id}
                                    className="bg-neutral-02 relative transition-all"
                                >
                                    <img
                                        className="h-14 w-14 rounded-md object-cover mix-blend-multiply sm:h-20 sm:w-32"
                                        src={localAssetsUrl + product.product.images[0]}
                                        alt="product"
                                    />

                                    <div className="bg-main absolute -top-4 left-0 flex size-8 items-center justify-center rounded-[80px] text-white transition-all">
                                        <Badge
                                            number={product.quantity.toLocaleString('fa-IR')}
                                            className="h-6 w-2.5 text-base leading-6 font-bold text-[#FCFCFD]"
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="grid w-full gap-y-2 justify-items-center sm:justify-items-start sm:grid-cols-[180px_auto] sm:justify-center sm:gap-y-5">
                        <div className="flex flex-row gap-3 sm:!flex-col sm:!gap-0">
                            <p className="text-neutral-04 pb-2 text-sm font-bold transition-all">
                                کد سفارش:
                            </p>

                            <p className="text-neutral-07 border-neutral-03 border-b pb-2 text-sm font-bold break-all transition-all sm:border-none">
                                {orderRequestPending ? (
                                    <Skeleton className="h-7 w-20" />
                                ) : (
                                    order?.trackingCode
                                )}
                            </p>
                        </div>

                        <div className="flex flex-row gap-3 sm:!flex-col sm:!gap-0">
                            <p className="text-neutral-04 pb-2 text-sm font-bold transition-all">
                                تاریخ
                            </p>

                            <p className="text-neutral-07 border-neutral-03 border-b pb-2 text-sm font-bold break-all transition-all sm:border-none">
                                {orderRequestPending ? (
                                    <Skeleton className="h-7 w-20" />
                                ) : (
                                    toJalaliDate(order.createdAt)
                                )}
                            </p>
                        </div>

                        <div className="flex flex-row gap-3 sm:!flex-col sm:!gap-0">
                            <p className="text-neutral-04 pb-2 text-sm font-bold transition-all">
                                مجموع :
                            </p>

                            <p className="text-neutral-07 border-neutral-03 border-b pb-2 text-sm font-bold break-all transition-all sm:border-none">
                                {orderRequestPending ? (
                                    <Skeleton className="h-7 w-20" />
                                ) : (
                                    String(order?.totalPrice).toLocaleString()
                                )}
                            </p>
                        </div>

                        <div className="flex flex-row gap-3 sm:!flex-col sm:!gap-0">
                            <p className="text-neutral-04 pb-2 text-sm font-bold transition-all">
                                روش پرداخت:
                            </p>

                            <p className="text-neutral-07 border-neutral-03 border-b pb-2 text-sm font-bold break-all transition-all sm:border-none">
                                {orderRequestPending ? (
                                    <Skeleton className="h-7 w-20" />
                                ) : order?.information.method == 'shop' ? (
                                    'مراجعه حضوری'
                                ) : order?.information.method == 'tipax' ? (
                                    'تیپاکس'
                                ) : (
                                    'پست'
                                )}
                            </p>
                        </div>
                    </div>

                    <Link to={'/my-account/orders'} className="block w-full">
                        <Button variant={'main'} className="mx-auto !block h-11 w-2/3">
                            مشاهده سفارشات
                        </Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default OrderComplateScreen;

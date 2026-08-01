import Container from '../../modules/container';
import Stepper from '../../modules/stepper';
import CheckoutForm from './partials/checkout-form';
import { OrderSummary } from '../checkout/partials/order-summary';
import { Button } from '../../ui/button';
import useLocation from '../../../endpoints/useLocation';
import useOrder from '../../../endpoints/useOrder';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CheckoutScreen = () => {
    const { mutation } = useOrder();
    const { data } = useLocation();
    const navigate = useNavigate();
    const handleCheckout = (values: any) => {
        const province = (data as any).provinces.find(
            (p: { provinceId: string }) => p.provinceId == values.province,
        );

        const city = (data as any).cities.find(
            (c: { cityId: string; provinceId: string }) =>
                c.cityId == values.city && c.provinceId == province.provinceId,
        );

        const obj = {
            information: {
                address: values.address,
                firstName: values.fname,
                lastName: values.lname,
                postalCode: values.postalCode,
                city,
                province,
                method: localStorage.getItem('order-type'),
            },
        };
        mutation.mutate(obj, {
            onSuccess(data) {
                toast.success(data.message);
                localStorage.removeItem('order-type');
                navigate(`/order-complete/${data.trackingCode}`);
            },
        });
    };
    return (
        <Container>
            <div className="relative flex flex-col items-center py-10">
                <Stepper title="تکمیل خرید" currentStep={2} />
                <div className="relative flex w-full flex-col gap-6 py-10 md:!flex-row">
                    <CheckoutForm onSubmit={handleCheckout} />
                    <div className="sticky top-4 h-max w-full xl:w-2/5">
                        <OrderSummary />
                        <div className="flex items-center justify-center gap-2 py-3">
                            <p className="font-extrabold">پرداخت امن با</p>
                            <img src="/Images/zarinpal.jpg" className="h-6" alt="" />
                        </div>
                        <Button
                            form="checkout-form"
                            type="submit"
                            className="h-12 w-full"
                            variant={'main'}
                        >
                            ثبت سفارش
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutScreen;
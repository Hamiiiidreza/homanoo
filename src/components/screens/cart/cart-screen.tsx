import Container from '../../modules/container';
import Stepper from '../../modules/stepper';
import CheckoutSidebar from '../checkout/partials/checkout-sidebar';
import ProductsTable from './partials/products-table';

const CartScreen = () => {
    return (
        <Container>
            <div className="relative flex flex-col items-center bg-white py-10">
                <Stepper title="سبد خرید" currentStep={1} />
                <div className="flex w-full flex-col gap-8 py-12 relative lg:flex-row">
                    <ProductsTable />
                    <CheckoutSidebar />
                </div>
            </div>
        </Container>
    );
};

export default CartScreen;
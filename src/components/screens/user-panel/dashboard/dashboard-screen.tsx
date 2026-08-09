import Statistics from './partials/statistics';
import LastOrders from './partials/last-orders';
import FavoriteProducts from './partials/favorite-products';
import { useUser } from '../../../../endpoints/useUser';

const DashboardScreen = () => {
    const { data } = useUser();

    return (
        <>
            <Statistics data={data} />
            <div className="mb-5 flex w-full flex-col gap-4 xl:flex-row" dir="rtl">
                <LastOrders />
                <FavoriteProducts data={data} />
            </div>
        </>
    );
};

export default DashboardScreen;

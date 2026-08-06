import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useUser } from '../../../../endpoints/useUser';
import { Orders } from '../../../../types/user.types';
import { Button } from '../../../ui/button';
import OrdersNav from './partials/orders-nav';
import OrdersInformation from './partials/orders-informatian';
import OrdersSkeleton from './partials/orders-skeleton';
import useOrder from '../../../../endpoints/useOrder';

const OrdersScreen = () => {
  const [filter, setFilter] = useState<string>('all');
  const [orders, setOrders] = useState<Orders[] | null>(null);
  const { orders: data } = useOrder();

  useEffect(() => {
    if (data) {
      if (filter !== 'all') {
        const filteredOrders = data.filter(
          (order: Orders) => order.status == filter,
        );
        setOrders(filteredOrders);
      } else setOrders(data);
    }
  }, [data, filter]);

  return (
    <section className="xs:!p-6 my-10 w-full rounded-md border bg-white p-4 shadow-lg transition-all">
      <OrdersNav filter={filter} setFilter={setFilter} />
      <div className="space-y-4">
        {orders ? (
          orders.length > 0 ? (
            <div className="grid w-full gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="relative rounded-md bg-white px-4 py-6 shadow-sm transition-all"
                >
                  <div className="flex justify-between gap-1">
                    <div className="xs:!font-medium xs:!text-2xl flex items-center gap-1 text-base font-semibold">
                      {' '}
                      <span>سفارش</span>
                      <p> #{order.trackingCode}</p>
                    </div>
                    <Button
                      className={`font-VazirMedium xs:!px-4 flex h-8 gap-2 px-2 py-2 text-xs ${
                        order.status === 'successfull'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'unSucessfull'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {order.status == 'successfull' ? (
                        <CheckCircle className="xs:!block hidden" size={16} />
                      ) : (
                        <XCircle className="xs:!block hidden" size={16} />
                      )}
                      {order.status == 'successfull' ? 'ثبت شده' : ''}
                    </Button>
                  </div>

                  <hr className="mt-4" />

                  <OrdersInformation order={order} />
                </div>
              ))}
            </div>
          ) : (
            <p className="pt-30 pb-44 text-center text-2xl">سفارشی یافت نشد</p>
          )
        ) : (
          <OrdersSkeleton />
        )}
      </div>
    </section>
  );
};

export default OrdersScreen;

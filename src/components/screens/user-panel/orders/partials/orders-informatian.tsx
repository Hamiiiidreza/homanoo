import { Link } from 'react-router-dom';
import { toJalaliDate } from '../../../../../utils/helpers';
import { localAssetsUrl } from '../../../../../utils/constants';
import { Orders } from '../../../../../types/user.types';
import Badge from '../../../../ui/badge';

const OrdersInformation = ({ order }: { order: Orders }) => {
  return (
    <>
      <div className="flex flex-wrap gap-x-16 gap-y-4 py-4 sm:!gap-x-8">
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-sm sm:!text-base">تاریخ سفارش:</p>
          <p className="text-sm text-gray-500">
            {toJalaliDate(order.createdAt)}
          </p>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-sm sm:!text-base">تعداد کالا:</p>
          <p className="text-sm text-gray-500">{order.products.length}</p>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-sm sm:!text-base"> پرداختی:</p>
          <p className="text-sm text-gray-500">
            {order.totalPrice.toLocaleString()} تومان
          </p>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-sm sm:!text-base"> کد پستی:</p>
          <p className="text-sm text-gray-500">
            {order.information.postalCode}
          </p>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-sm sm:!text-base"> کد پیگیری:</p>
          <p className="text-sm text-gray-500">{order.trackingCode}</p>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-sm sm:!text-base">نحوه ارسال:</p>
          <p className="text-sm text-gray-500">
            {order?.information.method == 'shop'
              ? 'مراجعه حضوری'
              : order?.information.method == 'tipax'
                ? 'تیپاکس'
                : 'پست پیشتاز'}{' '}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-1.5">
        <p className="text-sm sm:!text-base">آدرس:</p>
        <p className="text-sm text-gray-500">{order.information.address}</p>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-10 pt-7">
        {order?.products.map((product) => (
          <Link
            to={`/product/${product.product.code}/${String(product.product.slug).replaceAll(' ', '-')}`}
            key={product.product._id}
            className="bg-neutral-02 relative transition-all"
          >
            <img
              className="h-14 w-14 rounded-md object-cover mix-blend-multiply sm:h-16 sm:w-28"
              src={localAssetsUrl + product.product.images[0]}
              alt="product"
            />

            <div className="bg-main absolute -top-4 left-0 flex size-8 items-center justify-center rounded-[80px] text-white transition-all">
              <Badge
                number={product.quantity.toLocaleString('fa-IR')}
                className="h-6 w-2.5 text-base leading-6 font-bold text-[#FCFCFD]"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default OrdersInformation;

import { useEffect, useState } from 'react';
import useCart from '../../../../endpoints/useCart';
import { useUser } from '../../../../endpoints/useUser';
import { Product } from '../../../../types/product.types';
import { Button } from '../../../ui/button';
import { LoaderCircleIcon, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../../../types/user.types';
import QuantityControls from './quantity-controls';
import { useQueryClient } from '@tanstack/react-query';

const Order = ({
  data,
  activeColor,
}: {
  data: Product;
  activeColor: { code: string; name: string } | null;
}) => {
  const { mutation } = useCart();
  const { data: user } = useUser();
  const [cartProduct, setCartProduct] = useState<null | CartItem>(null);

  useEffect(() => {
    if (user) {
      const isExit = user.cart.find(
        (i: CartItem) => i.product.code == data.code,
      );
      setCartProduct(isExit as any);
    }
  }, [user]);

  const queryClinet = useQueryClient();
  return (
    <div className="bg-neutral-02 shadow-m sticky top-3 mx-auto flex h-max w-full max-w-[500px] flex-col items-start gap-4 rounded-xl p-4 sm:!p-6 lg:!mx-0 lg:!w-2/6">
      <p className="font-VazirMedium -tracking-0.5 line-clamp-3 text-xl leading-8.5 xl:line-clamp-2">
        {data.name}
      </p>
      <ul className="list-disc space-y-2 pr-3 text-sm">
        <li className="text-gray-500">7 روز ضمانت بازگشت کالا</li>
        <li className="text-gray-500">ضمانت اصالت کالا</li>
      </ul>

      {data.priceWithoutOff ? (
        <p className="text-neutral-04 font-VazirMedium mr-auto !leading-5 line-through">
          {data.priceWithoutOff.toLocaleString()}{' '}
          <span className="text-sm">تومان</span>
        </p>
      ) : (
        ''
      )}
      <div className="flex w-full items-center justify-between gap-2">
        {activeColor ? (
          <div className={`flex cursor-pointer items-center gap-2 text-sm`}>
            <div
              style={{ background: activeColor.code }}
              className={`border-neutral-03 h-5 w-5 rounded-md border`}
            ></div>
            <p>{activeColor.name}</p>
          </div>
        ) : (
          ''
        )}
        <div className="flex items-center justify-end gap-2">
          {data.off ? (
            <span className="block rounded-full bg-red-500 px-1.5 py-1 text-xs text-white">
              {data.off}%
            </span>
          ) : (
            ''
          )}
          <p className="font-VazirMedium pt-1 text-[15px] !leading-5 xl:text-[16px]">
            {data.price.toLocaleString()} <span className="text-sm">تومان</span>
          </p>
        </div>
      </div>
      {cartProduct ? (
        <QuantityControls
          endFunctionHandler={() => setCartProduct(null)}
          showBtn
          className="w-full !flex-row"
          data={cartProduct}
        />
      ) : (
        <Button
          onClick={() =>
            mutation.mutate(
              { color: String(activeColor?.code), code: data.code },
              {
                onSuccess: (data) => {
                  queryClinet.invalidateQueries({ queryKey: ['me'] });
                  setCartProduct(data.product);
                },
              },
            )
          }
          className="h-12 w-full"
          variant={'main'}
        >
          {mutation.isPending ? (
            <LoaderCircleIcon className="mx-auto size-5 animate-spin" />
          ) : (
            <>
              افزودن به سبد خرید <ShoppingBag />
            </>
          )}{' '}
        </Button>
      )}
    </div>
  );
};
export default Order;

import { ShoppingBag, StarIcon, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product.types';
import { Button } from '../ui/button';
import { localAssetsUrl } from '../../utils/constants';
import ShareModal from './share-modal';
import useCart from '../../endpoints/useCart';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useFavorite from '../../endpoints/useFavorite';
import { useUser } from '../../endpoints/useUser';
import AuthoritarianSteps from './authoritarian/authoritarian-steps';

const ProductCard = ({
  data: {
    images,
    name,
    price,
    priceWithoutOff,
    star,
    off,
    code,
    slug,
    colors,
    isInCart,
  },
  isPanel,
}: {
  data: Product;
  isPanel?: boolean;
}) => {
  const { mutation } = useCart();
  const { mutation: removeFromFavorites } = useFavorite();
  const { data: user } = useUser();
  const [isInCartStatus, setIsInCartStatus] = useState(isInCart);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const queryClient = useQueryClient();

  const addProductToCart = () => {
    mutation.mutate(
      { color: String(colors[0]?.code), code: code },
      {
        onSuccess() {
          setIsInCartStatus(true);
          queryClient.invalidateQueries({ queryKey: ['me'] });
        },
      },
    );
  };

  return (
    <>
      <div
        key={code}
        className="group relative block h-max w-full rounded-xl shadow transition-all hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      >
      <Link
        to={`/product/${code}/${String(slug).replaceAll(' ', '-')}`}
        className={`relative w-full bg-cover bg-center transition-all ${!isPanel ? 'group-hover:blur-xs' : ''
          }`}
      >
        <div className="bg-neutral-02 absolute inset-0 z-0 rounded-t-xl"></div>
        <img
          src={localAssetsUrl + images[0]}
          alt={name}
          className="h-[200px] w-full rounded-t-xl object-cover mix-blend-multiply"
        />
      </Link>
      {!isPanel ? (
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 items-center justify-end gap-2 pt-0 opacity-0 group-hover:opacity-100">
          {!isInCartStatus ? (
            <Button
              onClick={() => {
                if (!user) {
                  setShowLoginForm(true);
                  return;
                }
                addProductToCart();
              }}
              className="tracking-button-s shadow-shadow-01 flex h-[40px] transform cursor-pointer items-center justify-center gap-2 rounded-lg border border-black bg-white px-2 py-3 text-sm text-black transition-all hover:bg-white hover:opacity-70"
            >
              افزودن به سبد خرید
              <ShoppingBag className="text-red-500" size={17} />
            </Button>
          ) : (
            <Link to={'/cart'}>
              <Button
                variant={'main'}
                className="flex h-[40px] cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-3 text-sm transition-all hover:opacity-70"
              >
                مشاهده سبد خرید
                <ShoppingBag className="text-white" size={17} />
              </Button>
            </Link>
          )}

          <ShareModal
            className="rounded-lg border border-black px-2 py-2.5 hover:opacity-70"
            link={location.href}
          />
        </div>
      ) : (
        ''
      )}

      <Link
        to={`/product/${code}/${String(slug).replaceAll(' ', '-')}`}
        className={`block px-2 py-3 transition-all ${!isPanel ? 'group-hover:blur-xs' : ''
          }`}
      >
        <h3 className="text-neutral-07 truncate pb-2 text-base font-bold">
          {name}
        </h3>

        {priceWithoutOff && !isPanel && (
          <div className="mt-1 flex items-center justify-end gap-2">
            <span className="font-VazirRegular text-neutral-04 text-sm line-through">
              {priceWithoutOff.toLocaleString()}
            </span>
            <p className="bg-main rounded-md p-1.5 pb-1 text-sm text-white">
              {off}%
            </p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <p className="pt-0.5">{star}</p>{' '}
            <StarIcon className="fill-orange-400 stroke-orange-400" size={15} />
          </div>
          <p className="text-neutral-07 pt-2 text-left font-bold">
            {price.toLocaleString()} تومان
          </p>
        </div>
      </Link>
      {isPanel ? (
        <div className="p-4 pt-1">
          <Button
            onClick={() => {
              removeFromFavorites.mutate(code, {
                onSuccess() {
                  queryClient.invalidateQueries({ queryKey: ['me'] });
                },
              });
            }}
            className="w-full"
            variant={'danger'}
          >
            حذف از علاقه مندی ها
            <Trash />{' '}
          </Button>
        </div>
      ) : (
        ''
      )}
      </div>

      {showLoginForm ? (
        <AuthoritarianSteps
          setIsOpen={setShowLoginForm}
          endFunction={() => {
            addProductToCart();
            setShowLoginForm(false);
          }}
          isOpen={true}
        />
      ) : null}
    </>
  );
};

export default ProductCard;


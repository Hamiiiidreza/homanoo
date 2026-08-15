import { Link } from 'react-router-dom';
import { localAssetsUrl } from '../../../../../utils/constants';
import { ChevronLeft } from 'lucide-react';

const CategoriesCard = ({ isTop, imageClass, data }: any) => {
  const { image, name } = data;

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(data.slug)}`}
      className={`${isTop ? 'bg-main' : 'bg-neutral-02'} group relative block h-full rounded-xl transition-transform hover:-translate-0.5`}
    >
      {isTop ? (
        <div>
          <div className="mb-4 pt-5 pr-6">
            <h3 className="text-headline-5 mb-3 text-white">{name}</h3>
            <p className="flex items-center gap-1 text-white">
              مشاهده فروشگاه <ChevronLeft size={19} />
            </p>
          </div>
          <img
            src={localAssetsUrl + image}
            alt={name}
            className={`relative mx-auto w-3/4 object-contain mix-blend-multiply ${imageClass || ''}`}
          />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center gap-3 py-5 sm:justify-evenly">
          <img
            src={localAssetsUrl + image}
            alt={name}
            className={`relative h-[120px] w-[170px] object-contain mix-blend-darken sm:!h-[150px] sm:w-1/2 lg:!h-[200px] ${imageClass || ''}`}
          />
          <div>
            <h3 className="text-neutral-07 text-headline-5 mb-3 max-sm:text-xl sm:!text-2xl lg:!text-3xl">
              {name}
            </h3>
            <p className="flex items-center gap-1">
              مشاهده فروشگاه <ChevronLeft size={19} />
            </p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default CategoriesCard;

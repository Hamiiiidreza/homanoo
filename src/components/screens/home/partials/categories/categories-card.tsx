import { Link } from 'react-router-dom'
import { localAssetsUrl } from '../../../../../utils/constants'
import { CategoriesProps } from '../../../../../types/category.types'
import { ChevronLeft } from 'lucide-react'

const CategoriesCard = ({ isTop, imageClass, data }: CategoriesProps) => {
  const { image, name } = data

  return (
    <Link to={`/shop/${data.slug}`}
      className={`${isTop ? "bg-main" : "bg-neutral-02"} block group relative rounded-xl h-full hover:-translate-0.5 transition-transform`}
    >
      {isTop ? (
        <div>
          <div className="pr-6 pt-5 mb-4">
            <h3 className=" text-white text-headline-5 mb-3">
              {name}
            </h3>
            <p className='flex gap-1 items-center text-white'>مشاهده فروشگاه <ChevronLeft size={19} /></p>
          </div>
          <img
            src={localAssetsUrl + image}
            alt={name}
            className={`relative object-contain mx-auto mix-blend-multiply w-3/4 ${imageClass || ""}`}
          />
        </div>
      ) : (
        <div className="items-center justify-center sm:justify-evenly flex gap-3 h-full py-5">
          <img
            src={localAssetsUrl + image}
            alt={name}
            className={`relative sm:!h-[150px] h-[120px] sm:w-1/2 w-[170px] lg:!h-[200px] object-contain mix-blend-darken ${imageClass || ""}`}
          />
          <div>
            <h3 className=" text-neutral-07  sm:!text-2xl lg:!text-3xl max-sm:text-xl text-headline-5 mb-3">
              {name}
            </h3>
            <p className='flex gap-1 items-center'>مشاهده فروشگاه <ChevronLeft size={19} /></p>
          </div>
        </div>
      )}
    </Link>
  )
}

export default CategoriesCard

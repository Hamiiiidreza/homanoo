import Breadcrumb from '../../../modules/breadcrumb'
import { Link } from 'react-router-dom'
import { Button } from '../../../ui/button'
import { ChevronLeft } from 'lucide-react'
import Gallery from './Gallery'
import { Product } from '../../../../types/product.types'
import MainIcons from './main-icons'
interface Props {
    data: Product,
    activeColor: { code: string, name: string } | null,
    setActiveColor: (c: { code: string, name: string }) => void
}

const Main = ({ data, activeColor, setActiveColor }: Props) => {
    return (
        <div className='lg:!w-4/6 w-full bg-white shadow-m rounded-xl p-4 sm:!p-6'>
            <div className="flex justify-between items-center gap-2 pb-6">
                <Breadcrumb title={data.name}>
                    <Link to={`/shop/${data.category.slug}`} className="inline-flex items-center gap-1">
                        <span
                            className="text-black-900 text-sm whitespace-nowrap"
                        >
                            {data.category.name}
                        </span>
                    </Link>
                </Breadcrumb>

                <MainIcons isFave={data.isFave} star={data.feedback.totalRatings} productCode={data.code} className="sm:!flex hidden" />
            </div>
            <div className='flex gap-3 md:!flex-row flex-col-reverse justify-between'>
                <div className='space-y-4'>
                    <h1 className='line-clamp-3 text-xl font-VazirMedium leading-8.5 -tracking-0.5 xl:line-clamp-2'>{data.name}</h1>
                    <div className='flex gap-2 justify-between'>
                        {data.feedback.totalComments !== 0 ? (
                            <a href="#comments">
                                <Button className='text-black' variant={"mainShaded"}>{data.feedback.totalComments} دیدگاه <ChevronLeft size={17} />
                                </Button></a>
                        ) : ""}
                        <MainIcons star={data.feedback.totalRatings} isFave={data.isFave} productCode={data.code} className="sm:!hidden flex" />
                    </div>
                    <div className='flex gap-3'>
                        {data.colors.map(color => (
                            <div onClick={() => setActiveColor(color)} className={`${color.code == activeColor?.code ? "bg-neutral-02" : ''} cursor-pointer flex gap-2 items-center border border-gray-300 px-1 rounded-md pl-4 text-sm py-0.5`}>
                                <div style={{ background: color.code }} className={`w-5 h-5 border border-neutral-03 rounded-md`}></div>
                                <p>{color.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-8 pt-3">
                        {data.details.map(data => (
                            <div className='text-sm'>
                                <label className='block pb-2 text-gray-500'>{data.key}</label>
                                <p>{data.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Gallery images={data.images} />
            </div>
            <p className='font-regular pt-10 !leading-[26px] text-gray-500 text-justify text-sm'>{data.description}</p>
        </div>
    )
}

export default Main 
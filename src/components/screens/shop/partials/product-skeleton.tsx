import { Skeleton } from '../../../ui/skeleton'

const ProductSkeleton = () => {
    return (
        <Skeleton className='h-[342px] w-full rounded-xl'>
            <div className='w-full h-[180px]'></div>
            <div className="py-3 px-2">
                <Skeleton className='w-[200px] h-8 bg-gray-200 mb-6' />

                <div className="flex items-center justify-end gap-2 mt-3">
                    <Skeleton className='w-[80px] h-8 bg-gray-200' />
                    <Skeleton className='w-[40px] h-8 bg-gray-200' />
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-0.5 items-center">
                        <Skeleton className='w-[50px] h-8 bg-gray-200' />
                    </div>
                    <Skeleton className='w-[130px] h-8 bg-gray-200' />
                </div>
            </div>
        </Skeleton>
    )
}

export default ProductSkeleton
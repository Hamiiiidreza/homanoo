import { Skeleton } from '../../../../ui/skeleton'

const BlogsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 gap-x-[25px] gap-y-[40px]">
            <Skeleton className='min-[384px] rounded-xl'>
                <div className='h-[180px] w-full'></div>
                <div className='px-3 pb-4'>
                    <Skeleton className='w-[150px] h-8 bg-gray-200 mb-4' />
                    <Skeleton className='w-full h-24 bg-gray-200 mb-3' />
                    <Skeleton className='w-[100px] bg-gray-200 h-5 mr-auto' />
                </div>
            </Skeleton>
            <Skeleton className='min-[384px] rounded-xl'>
                <div className='h-[180px] w-full'></div>
                <div className='px-3 pb-4'>
                    <Skeleton className='w-[150px] h-8 bg-gray-200 mb-4' />
                    <Skeleton className='w-full h-24 bg-gray-200 mb-3' />
                    <Skeleton className='w-[100px] bg-gray-200 h-5 mr-auto' />
                </div>
            </Skeleton>
            <Skeleton className='min-[384px] rounded-xl'>
                <div className='h-[180px] w-full'></div>
                <div className='px-3 pb-4'>
                    <Skeleton className='w-[150px] h-8 bg-gray-200 mb-4' />
                    <Skeleton className='w-full h-24 bg-gray-200 mb-3' />
                    <Skeleton className='w-[100px] bg-gray-200 h-5 mr-auto' />
                </div>
            </Skeleton>
            <Skeleton className='min-[384px] rounded-xl'>
                <div className='h-[180px] w-full'></div>
                <div className='px-3 pb-4'>
                    <Skeleton className='w-[150px] h-8 bg-gray-200 mb-4' />
                    <Skeleton className='w-full h-24 bg-gray-200 mb-3' />
                    <Skeleton className='w-[100px] bg-gray-200 h-5 mr-auto' />
                </div>
            </Skeleton>
        </div>
    )
}

export default BlogsSkeleton
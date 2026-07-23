import { Skeleton } from '../../../../ui/skeleton'

const headerSkeleton = () => {
    return (
        <Skeleton className="md:!h-[280px] relative lg:!h-[380px] h-[200px] rounded-md w-full">
            <Skeleton className='absolute size-14 sm:!block hidden rounded-full bg-gray-300 top-1/2 left-8' />
            <Skeleton className='absolute size-14 sm:!block hidden rounded-full bg-gray-300 top-1/2 right-8' />
        </Skeleton>
    )
}

export default headerSkeleton
import { Skeleton } from '../../../ui/skeleton'

const MobileProductSkeleton = () => {
    return (
        <div className='flex justify-between gap-1'>
            <div className='flex items-center gap-2'>
                <Skeleton className='h-24 w-20 rounded-md' />
                <div className='space-y-1'>
                    <Skeleton className='h-8 w-28 rounded-md' />
                    <Skeleton className='h-6 w-10 rounded-md' />
                    <Skeleton className='h-6 w-14 rounded-md' />
                </div>
            </div>
            <div className='space-y-3 pt-1'>
                <Skeleton className='h-8 w-20 rounded-md' />
                <Skeleton className='h-8 w-10 rounded-md' />
            </div>
        </div>
    )
}

export default MobileProductSkeleton
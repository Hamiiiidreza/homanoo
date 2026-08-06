import { Skeleton } from '../../../../ui/skeleton';

const OrdersSkeleton = () => {
    return (
        <div className="relative rounded-md bg-white px-4 py-6 shadow-sm transition-all">
            <div className="flex items-center justify-between gap-1">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-8 w-16 sm:!w-24" />
            </div>
            <hr className="mt-4" />
            <div className="flex flex-wrap gap-x-16 gap-y-4 py-4 sm:!gap-x-8">
                <Skeleton className="sm:!h-8 h-6 w-2/3 sm:!w-1/6" />
                <Skeleton className="sm:!h-8 h-6 w-2/3 sm:!w-28" />
                <Skeleton className="sm:!h-8 h-6 w-1/3 sm:!w-1/6" />
                <Skeleton className="sm:!h-8 h-6 w-2/3 sm:!w-28" />
                <Skeleton className="sm:!h-8 h-6 w-1/3 sm:!w-1/6" />
                <Skeleton className="sm:!h-8 h-6 w-2/3 sm:!w-28" />
            </div>
            <Skeleton className="mt-2 h-12 sm:!h-8 w-full sm:w-2/3" />
            <div className="flex w-full flex-wrap justify-center gap-10 pt-7">
                <Skeleton className="h-14 w-14 rounded-md sm:h-16 sm:w-28" />
                <Skeleton className="h-14 w-14 rounded-md sm:h-16 sm:w-28" />
            </div>
        </div>
    );
};

export default OrdersSkeleton;
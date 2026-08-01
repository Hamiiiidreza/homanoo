import { Skeleton } from "../../../ui/skeleton"

const TableSkeleton = () => {
    return (
        <div
            className="border-neutral-03 grid w-full grid-cols-[168px_1fr] gap-16 md:!gap-20 items-center border-b border-solid py-6">
            <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-20 rounded-md " />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-20 rounded-md " />
                    <Skeleton className="h-6 w-10 rounded-md " />
                </div>
            </div>
            <div className="grid grid-cols-3 items-center text-center">
                <Skeleton className="h-10 w-10 rounded-md " />
                <Skeleton className="h-10 w-10 rounded-md " />
                <Skeleton className="h-10 w-20 rounded-md " />
            </div>
        </div>
    )
}

export default TableSkeleton
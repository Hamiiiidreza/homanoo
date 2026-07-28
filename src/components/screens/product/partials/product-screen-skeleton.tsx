import { Skeleton } from "../../../ui/skeleton"

const ProductScreenSkeleton = () => {
    return (

        <div className="flex lg:!flex-row flex-col gap-4">
            <Skeleton className="w-full lg:!w-4/6 p-6">
                <div className="flex flex-col-reverse gap-y-4 md:flex-row gap-6 justify-between pl-1">
                    <div className="space-y-4">
                        <Skeleton className="w-full sm:!block hidden h-8 bg-gray-200" />

                        <div className="flex flex-col items-start gap-3">
                            <Skeleton className="w-4/5 h-6 bg-gray-200" />
                            <Skeleton className="w-24 h-5 bg-gray-300" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                            <div>
                                <Skeleton className="w-20 h-4 bg-gray-200 mb-1" />
                                <Skeleton className="w-24 h-5 bg-gray-300" />
                            </div>
                            <div>
                                <Skeleton className="w-20 h-4 bg-gray-200 mb-1" />
                                <Skeleton className="w-24 h-5 bg-gray-300" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Skeleton className="w-20 h-4 bg-gray-200 mb-1" />
                                <Skeleton className="w-24 h-5 bg-gray-300" />
                            </div>
                            <div>
                                <Skeleton className="w-20 h-4 bg-gray-200 mb-1" />
                                <Skeleton className="w-24 h-5 bg-gray-300" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Skeleton className="w-20 h-4 bg-gray-200 mb-1" />
                                <Skeleton className="w-28 h-5 bg-gray-300" />
                            </div>
                            <div>
                                <Skeleton className="w-20 h-4 bg-gray-200 mb-1" />
                                <Skeleton className="w-24 h-5 bg-gray-300" />
                            </div>
                        </div>


                    </div>

                    <div className="md:!w-max w-full">
                        <Skeleton className="w-full h-8 md:!hidden mb-4 bg-gray-200" />
                        <Skeleton className="flex flex-col gap-6 sm:!mt-16 relative xl:!w-[330px] w-full md:!w-[300px] h-[240px] md:!h-[300px] aspect-square rounded-lg bg-gray-200" />
                        <div className="hidden gap-2 justify-center mt-4 md:!flex">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="w-14 h-14 rounded-lg bg-gray-200" />
                            ))}
                        </div>
                    </div>


                </div>
                <div className="pt-4 border-t space-y-2 mt-6">
                    <Skeleton className="w-full h-4 bg-gray-200" />
                    <Skeleton className="w-5/6 h-4 bg-gray-200" />
                    <Skeleton className="w-4/6 h-4 bg-gray-200" />
                </div>
            </Skeleton>
            <Skeleton className="w-full lg:!w-2/6 p-4">
                <div className="mt-4">
                    <Skeleton className="w-3/4 h-6 bg-gray-200" />
                </div>

                <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded-full bg-gray-200" />
                        <Skeleton className="w-48 h-4 bg-gray-200" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded-full bg-gray-200" />
                        <Skeleton className="w-40 h-4 bg-gray-200" />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <Skeleton className="w-12 h-6 rounded-lg bg-red-200" />
                    <Skeleton className="w-28 h-7 bg-gray-200" />
                </div>

                <div className="mt-4">
                    <Skeleton className="w-full h-11 rounded-lg bg-gray-300" />
                </div>
            </Skeleton>
        </div>
    )
}

export default ProductScreenSkeleton
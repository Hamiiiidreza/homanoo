import { Skeleton } from "../../../../ui/skeleton"

const CategoriesSkeleton = () => {
    return (
        <section className="w-full bg-white flex flex-nowrap flex-col md:flex-row gap-6">
            <div className="md:w-1/2 md:!block hidden">
                <Skeleton className="rounded-xl h-[400px] lg:!h-[560px]" />
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-6">
                <div className="md:!hidden block w-full">
                    <Skeleton className="rounded-xl min-h-[160px]" />
                </div>
                <Skeleton className="rounded-xl min-h-[160px]" />
                <Skeleton className="rounded-xl min-h-[160px]" />
            </div>
        </section>
    )
}

export default CategoriesSkeleton
import { useQueryParams } from "../../endpoints/useQueryParams";
import { Button } from "../ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from "../ui/pagination";

interface Props {
    totalItems: number;
    limit: number;
    page: number;
}

const PaginationWrapper = ({ totalItems, limit, page }: Props) => {
    const totalPages = Math.ceil(totalItems / limit);
    const { setParams } = useQueryParams();

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: number[] = [];
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, page + 2);

        for (let i = startPage; i <= endPage; i++) pages.push(i);

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <Pagination dir="rtl">
            <PaginationContent className="flex items-center gap-2">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => {
                            if (page > 1) setParams({ page: page - 1 });
                        }}
                        className={
                            page === 1
                                ? "pointer-events-none opacity-40"
                                : "group size-10 flex items-center justify-center rounded-md border bg-white text-neutral-07 transition-colors hover:bg-main hover:text-white active:scale-95 cursor-pointer"
                        }
                    />
                </PaginationItem>

                {Number(pageNumbers[0]) > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink asChild>
                                <Button
                                    className="size-10 rounded-md border bg-white text-sm font-VazirMedium text-neutral-07 transition-all hover:bg-main hover:text-white cursor-pointer"
                                    variant="ghost"
                                    onClick={() => setParams({ page: 1 })}
                                >
                                    1
                                </Button>
                            </PaginationLink>
                        </PaginationItem>

                        {Number(pageNumbers[0]) > 2 && <PaginationEllipsis />}
                    </>
                )}

                {pageNumbers.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink asChild isActive={page === p}>
                            <Button
                                className={`size-10 flex items-center justify-center rounded-md text-sm font-VazirMedium transition-all cursor-pointer ${page === p
                                        ? "border-main bg-main !text-white hover:bg-main/90 hover:!text-white"
                                        : "border bg-white text-neutral-07 hover:bg-main hover:text-white"
                                    }`}
                                variant="ghost"
                                onClick={() => setParams({ page: p })}
                            >
                                {p}
                            </Button>
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {Number(pageNumbers[pageNumbers.length - 1]) < totalPages && (
                    <>
                        {Number(pageNumbers[pageNumbers.length - 1]) < totalPages - 1 && (
                            <PaginationEllipsis />
                        )}

                        <PaginationItem>
                            <PaginationLink asChild>
                                <Button
                                    className="size-10 rounded-md border bg-white text-sm font-VazirMedium text-neutral-07 transition-all hover:bg-main hover:text-white cursor-pointer"
                                    variant="ghost"
                                    onClick={() => setParams({ page: totalPages })}
                                >
                                    {totalPages}
                                </Button>
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => {
                            if (page < totalPages) setParams({ page: page + 1 });
                        }}
                        className={
                            page === totalPages
                                ? "pointer-events-none opacity-40"
                                : "group size-10 flex items-center justify-center rounded-md border bg-white text-neutral-07 transition-colors hover:bg-main hover:text-white active:scale-95 cursor-pointer"
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationWrapper;

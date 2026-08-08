import { ReactNode, useEffect } from 'react';
import { useQueryParams } from '../../endpoints/useQueryParams';
import { Button } from '../ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from '../ui/pagination';

type ServerPaginationProps = {
    variant?: 'server';
    totalItems: number;
    limit: number;
    page: number;
};

type ClientPaginationProps<T> = {
    variant: 'client';
    items: T[];
    limit: number;
    children: (currentItems: T[]) => ReactNode;
};

type Props<T> = ServerPaginationProps | ClientPaginationProps<T>;

const PaginationWrapper = <T,>(props: Props<T>) => {
    const { limit } = props;
    const { getParam, setParams } = useQueryParams();

    const isClientPagination = props.variant === 'client';

    const pageParam = getParam('page');
    const parsedPage = Number(pageParam);

    const requestedPage =
        pageParam && Number.isFinite(parsedPage) && parsedPage > 0
            ? Math.floor(parsedPage)
            : 1;

    const totalItems = isClientPagination
        ? props.items.length
        : props.totalItems;

    const totalPages = Math.ceil(totalItems / limit);

    const page = isClientPagination
        ? totalPages > 0
            ? Math.min(requestedPage, totalPages)
            : 1
        : props.page;

    useEffect(() => {
        if (!isClientPagination) return;
        if (totalPages <= 0) return;

        if (!pageParam) return;

        const isInvalidPage =
            !Number.isFinite(parsedPage) ||
            parsedPage < 1 ||
            requestedPage > totalPages;

        if (isInvalidPage) {
            setParams({ page }, true);
        }
    }, [
        isClientPagination,
        totalPages,
        pageParam,
        parsedPage,
        requestedPage,
        page,
        setParams,
    ]);

    const getPageNumbers = () => {
        const pages: number[] = [];
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, page + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    const pagination =
        totalPages <= 1 ? null : (
            <Pagination dir="rtl">
                <PaginationContent className="flex items-center gap-2">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                if (page > 1) {
                                    setParams({ page: page - 1 });
                                }
                            }}
                            className={
                                page === 1
                                    ? 'pointer-events-none opacity-40'
                                    : 'group size-10 flex items-center justify-center rounded-md border bg-white text-neutral-07 transition-colors hover:bg-main hover:text-white active:scale-95 cursor-pointer'
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

                            {Number(pageNumbers[0]) > 2 && (
                                <PaginationEllipsis />
                            )}
                        </>
                    )}

                    {pageNumbers.map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink asChild isActive={page === p}>
                                <Button
                                    className={`size-10 flex items-center justify-center rounded-md text-sm font-VazirMedium transition-all cursor-pointer ${page === p
                                            ? 'border-main bg-main !text-white hover:bg-main/90 hover:!text-white'
                                            : 'border bg-white text-neutral-07 hover:bg-main hover:text-white'
                                        }`}
                                    variant="ghost"
                                    onClick={() => setParams({ page: p })}
                                >
                                    {p}
                                </Button>
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {Number(pageNumbers[pageNumbers.length - 1]) <
                        totalPages && (
                            <>
                                {Number(pageNumbers[pageNumbers.length - 1]) <
                                    totalPages - 1 && <PaginationEllipsis />}

                                <PaginationItem>
                                    <PaginationLink asChild>
                                        <Button
                                            className="size-10 rounded-md border bg-white text-sm font-VazirMedium text-neutral-07 transition-all hover:bg-main hover:text-white cursor-pointer"
                                            variant="ghost"
                                            onClick={() =>
                                                setParams({ page: totalPages })
                                            }
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
                                if (page < totalPages) {
                                    setParams({ page: page + 1 });
                                }
                            }}
                            className={
                                page === totalPages
                                    ? 'pointer-events-none opacity-40'
                                    : 'group size-10 flex items-center justify-center rounded-md border bg-white text-neutral-07 transition-colors hover:bg-main hover:text-white active:scale-95 cursor-pointer'
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

    if (isClientPagination) {
        const currentItems = props.items.slice(
            (page - 1) * limit,
            page * limit,
        );

        return (
            <>
                {props.children(currentItems)}
                {pagination}
            </>
        );
    }

    return pagination;
};

export default PaginationWrapper;

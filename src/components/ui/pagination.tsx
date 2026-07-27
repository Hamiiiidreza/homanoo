import * as React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    );
}

function PaginationContent({
    className,
    ...props
}: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn("flex items-center gap-2", className)}
            {...props}
        />
    );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
    return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
    isActive?: boolean;
    asChild?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
    React.ComponentProps<"a">;

function PaginationLink({
    className,
    asChild,
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) {
    return (
        <Button
            asChild
            variant={isActive ? "outline" : "ghost"}
            size={size}
            className={cn(className)}
        >
            <a
                aria-current={isActive ? "page" : undefined}
                data-slot="pagination-link"
                data-active={isActive}
                {...props}
            />
        </Button>
    );
}

function PaginationPrevious({
    className,
    asChild,
    text = "Previous",
    ...props
}: React.ComponentProps<typeof PaginationLink> & {
    text?: string;
    asChild?: boolean;
}) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn(
                "group size-10 flex items-center justify-center rounded-md border bg-white text-neutral-07 transition-colors hover:bg-main hover:text-white active:scale-95 cursor-pointer disabled:pointer-events-none disabled:opacity-40 [&_svg]:text-gray-700 hover:[&_svg]:text-white",
                className
            )}
            {...props}
        >
            <ChevronRightIcon
                data-icon="inline-start"
                className="cn-rtl-flip size-[18px] transition-colors"
            />
        </PaginationLink>
    );
}

function PaginationNext({
    className,
    asChild,
    text = "Next",
    ...props
}: React.ComponentProps<typeof PaginationLink> & {
    text?: string;
    asChild?: boolean;
}) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn(
                "group size-10 flex items-center justify-center rounded-md border bg-white text-neutral-07 transition-colors hover:bg-main hover:text-white active:scale-95 cursor-pointer disabled:pointer-events-none disabled:opacity-40 [&_svg]:text-gray-700 hover:[&_svg]:text-white",
                className
            )}
            {...props}
        >
            <ChevronLeftIcon
                data-icon="inline-end"
                className="cn-rtl-flip size-[18px] transition-colors"
            />
        </PaginationLink>
    );
}

function PaginationEllipsis({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            aria-hidden
            data-slot="pagination-ellipsis"
            className={cn(
                "size-10 flex items-center justify-center select-none font-bold text-gray-400",
                className
            )}
            {...props}
        >
            <MoreHorizontalIcon className="hidden" />
            <span>...</span>
            <span className="sr-only">More pages</span>
        </span>
    );
}

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};

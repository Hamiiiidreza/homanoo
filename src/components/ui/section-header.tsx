import React from "react";
import { Link } from "react-router-dom"; 
import {   ChevronLeft } from "lucide-react";

type MobileLayout = "inline" | "seprate"

type SectionHeaderProps = {
    title: string;
    linkText: string;
    to: string;
    mbClass?: string;
    mobileLayout?: MobileLayout;
}

const SectionHeader = ({
    title,
    linkText,
    to,
    mbClass,
    mobileLayout = "inline",
}: SectionHeaderProps) => {
    return (
        <div
            className={`
                flex justify-between items-center
                ${mobileLayout === 'seprate' ? 'md:flex' : 'flex'}
                ${mbClass}`}
        >
            <h2 className="font-VazirMedium   text-xl sm:text-4.5xl text-black leading-none tracking-headline-7">
                {title}
            </h2>

            <Link
                to={to}
                className={`
                    flex items-center gap-1 transition-opacity hover:opacity-75 px-2 py-1
                    ${mobileLayout === 'seprate' ? 'hidden md:flex' : 'flex'}
                    `}
            >
                <span className="font-VazirMedium text-base text-neutral-07">
                    {linkText}
                </span>
                <ChevronLeft
                    className="size-5"
                />
            </Link>
        </div>
    );
};

export default SectionHeader;

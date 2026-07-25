import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type BreadcrumbProps = {
    title: string;
    children?: ReactNode
    name?: string;
    desc?: string;
    className?: string;
};

const Breadcrumb = ({ title, children, className }: BreadcrumbProps) => {
    return (
        <div className={`${className ? className : ''}`}>
            <section className="inline-flex items-center justify-center">
                <nav
                    className="inline-flex flex-col items-center gap-6"
                    aria-label="Breadcrumb"
                >
                    <ul className="m-0 flex items-center gap-2 p-0 flex-wrap">
                        <li className="inline-flex items-center gap-1">
                            <Link
                                to="/"
                                className="text-sm whitespace-nowrap text-[#605F5F]"
                            >
                                خانه
                            </Link>
                        </li>
                        <ChevronLeft size={17} />
                        {children ? (
                            <>
                                {children}
                                <ChevronLeft size={17} />
                            </>)
                            : ""}

                        <li className="inline-flex items-center gap-1">
                            <span
                                className=" text-black-900 text-sm whitespace-nowrap"
                                aria-current="page"
                            >
                                {title}
                            </span>
                        </li>
                    </ul>

                </nav>
            </section>
        </div>
    );
};

export default Breadcrumb;


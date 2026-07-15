import React, { useState } from 'react';
import {
    MessageSquareText,
    FunnelPlus,
    Eye,
    Reply,
    CheckCheck,
    AlertCircle,
    Clock3,
    CheckCircle2,
    LucideIcon,
} from 'lucide-react';
import CustomInput from '../../../components/ui/custom-input';
import CustomPagination from '../../../components/ui/custom-pagination';
import { useNavigate } from "react-router-dom";

type Status = 'باز' | 'در حال بررسی' | 'بسته شده';

interface Ticket {
    id: number;
    title: string;
    status: Status;
    isReplied: boolean;
    lastUpdate: string;
}

type TicketStatItem = {
    title: string;
    count: number;
    icon: LucideIcon;
};

const tickets: Ticket[] = [
    {
        id: 1,
        title: 'مشکل در ورود به حساب',
        status: 'باز',
        isReplied: true,
        lastUpdate: '۱۴۰۳/۱۲/۲۸ - ۰۵:۲۴',
    },
    {
        id: 2,
        title: 'پیگیری سفارش شماره ۱۲۵۸',
        status: 'در حال بررسی',
        isReplied: true,
        lastUpdate: '۱۴۰۳/۰۷/۱۶ - ۰۵:۲۷',
    },
    {
        id: 3,
        title: 'سوال در مورد محصول مبل راحتی',
        status: 'در حال بررسی',
        isReplied: false,
        lastUpdate: '۱۴۰۳/۰۷/۰۵ - ۰۵:۲۲',
    },
    {
        id: 4,
        title: 'درخواست مرجوعی کالا',
        status: 'بسته شده',
        isReplied: true,
        lastUpdate: '۱۴۰۳/۰۸/۱۱ - ۰۵:۰۳',
    },
];

const TicketManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();

    const totalTickets = 42;
    const totalPages = Math.ceil(totalTickets / itemsPerPage);

    const ticketStats: TicketStatItem[] = [
        {
            title: 'بسته شده',
            count: 402,
            icon: CheckCircle2,
        },
        {
            title: 'در انتظار پاسخ',
            count: 12,
            icon: Clock3,
        },
        {
            title: 'باز',
            count: 38,
            icon: AlertCircle,
        },
        {
            title: 'کل تیکت‌ها',
            count: 452,
            icon: MessageSquareText,
        },
    ];

    return (
        <section className="w-full rounded-md border bg-white p-4 shadow-lg transition-all hover:drop-shadow-custom md:my-10 md:p-6">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <div className="flex items-center justify-start gap-3">
                    <div className="flex size-9 items-center justify-center rounded-md bg-neutral-01">
                        <MessageSquareText className="text-secondary-color-blue" />
                    </div>

                    <h2 className="flex items-center text-xl font-VazirBold text-neutral-07 md:text-2xl">
                        تیکت‌ها
                    </h2>
                </div>

                <p className="mt-2 text-xs font-VazirRegular leading-relaxed text-gray-500 md:text-sm">
                    لیست و مدیریت تیکت‌های پشتیبانی کاربران را مشاهده و کنترل کنید.
                </p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
                {ticketStats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 rounded-md border bg-white p-4 shadow-sm transition-all hover:drop-shadow-custom md:items-start md:p-5"
                        >
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-01 text-secondary-color-blue md:size-12">
                                <Icon size={20} className="md:h-[22px] md:w-[22px]" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-VazirMedium text-neutral-07">
                                    {item.title}
                                </span>

                                <span className="text-base font-VazirBold text-neutral-07">
                                    {item.count.toLocaleString('fa-ir')}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <div className="w-full sm:w-80">
                        <CustomInput
                            type="text"
                            placeholder="جستجو بر اساس عنوان تیکت..."
                            inputClassName="h-10 w-full rounded-md border bg-white px-4 pl-10 font-VazirRegular text-sm outline-none transition-all placeholder:text-neutral-04 focus:border-neutral-04"
                        />
                    </div>

                    <button className="flex h-10 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 text-sm font-VazirRegular transition-all hover:bg-main hover:text-white sm:w-auto">
                        <FunnelPlus size={16} />
                        فیلتر
                    </button>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="overflow-hidden rounded-md border bg-white shadow-sm">
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full border-collapse text-center">
                        <thead className="border-b bg-gray-50">
                            <tr className="border-b border-gray-100 bg-gray-50 text-xs font-VazirMedium text-neutral-07">
                                <th className="p-4">شماره</th>
                                <th className="p-4">عنوان</th>
                                <th className="p-4">وضعیت</th>
                                <th className="p-4">پاسخ داده</th>
                                <th className="p-4">آخرین بروزرسانی</th>
                                <th className="p-4">عملیات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.map((ticket) => (
                                <tr
                                    key={ticket.id}
                                    className="border-b border-gray-100 transition-colors hover:bg-gray-50/50"
                                >
                                    <td className="p-4 text-xs font-VazirMedium">
                                        {ticket.id}
                                    </td>

                                    <td className="max-w-xs p-4 text-right text-sm font-VazirMedium text-neutral-07 truncate">
                                        {ticket.title}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            <StatusBadge status={ticket.status} />
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            <span
                                                className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-VazirMedium ${ticket.isReplied
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-orange-50 text-orange-600'
                                                    }`}
                                            >
                                                {ticket.isReplied ? 'پاسخ داده شده' : 'در انتظار پاسخ'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4 text-sm font-VazirMedium text-gray-600">
                                        {ticket.lastUpdate}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-4">
                                            <button
                                                onClick={() => navigate("/p-admin/admin-tickets/ticket-detail")}
                                                className="cursor-pointer text-secondary-color-blue transition-colors hover:text-gray-600"
                                                title="مشاهده"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            <button
                                                onClick={() => navigate("/p-admin/admin-tickets/ticket-detail")}
                                                className="cursor-pointer text-secondary-color-blue transition-colors hover:text-gray-600"
                                                title="پاسخ"
                                            >
                                                <Reply size={18} />
                                            </button>

                                            <button
                                                className="cursor-pointer text-green-600 transition-colors hover:text-gray-600"
                                                title="تایید نهایی"
                                            >
                                                <CheckCheck size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="block divide-y divide-gray-100 md:hidden">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="flex flex-col gap-3 p-4 transition-colors hover:bg-gray-50/50"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-VazirMedium text-gray-400">
                                    تیکت #{ticket.id}
                                </span>

                                <div className="flex items-center gap-4">
                                    <button className="p-1 text-secondary-color-blue" title="مشاهده">
                                        <Eye size={18} />
                                    </button>

                                    <button className="p-1 text-secondary-color-blue" title="پاسخ">
                                        <Reply size={18} />
                                    </button>

                                    <button className="p-1 text-green-600" title="تایید">
                                        <CheckCheck size={18} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-1 text-sm font-VazirBold text-neutral-07">
                                    {ticket.title}
                                </h3>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-gray-100 pt-2">
                                <div className="flex gap-1.5">
                                    <StatusBadge status={ticket.status} />

                                    <span
                                        className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-[10px] font-VazirMedium ${ticket.isReplied
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-orange-50 text-orange-600'
                                            }`}
                                    >
                                        {ticket.isReplied ? 'پاسخ داده شده' : 'در انتظار'}
                                    </span>
                                </div>

                                <span className="text-[11px] font-VazirMedium text-gray-400">
                                    {ticket.lastUpdate}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-6">
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={totalTickets}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    label="تیکت"
                />
            </div>
        </section>
    );
};

const StatusBadge = ({ status }: { status: Status }) => {
    const statusClasses: Record<Status, string> = {
        باز: 'bg-orange-50 text-orange-600',
        'در حال بررسی': 'bg-[#F3F6FC] text-secondary-color-blue',
        'بسته شده': 'bg-gray-100 text-gray-600',
    };

    return (
        <span
            className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-VazirMedium ${statusClasses[status]}`}
        >
            {status}
        </span>
    );
};

export default TicketManagement;




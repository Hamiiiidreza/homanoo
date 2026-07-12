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
    MoveUpRight,
    LucideIcon,
} from 'lucide-react';
import CustomInput from '../../../components/ui/custom-input';
import CustomPagination from '../../../components/ui/custom-pagination';

type Status = 'باز' | 'در حال بررسی' | 'بسته شده';

interface Ticket {
    id: number;
    title: string;
    customer: {
        name: string;
        avatar?: string;
    };
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
        customer: { name: 'حسای' },
        status: 'باز',
        isReplied: true,
        lastUpdate: '۱۴۰۳/۱۲/۲۸ - ۰۵:۲۴',
    },
    {
        id: 2,
        title: 'پیگیری سفارش شماره ۱۲۵۸',
        customer: { name: 'حسای' },
        status: 'در حال بررسی',
        isReplied: true,
        lastUpdate: '۱۴۰۳/۰۷/۱۶ - ۰۵:۲۷',
    },
    {
        id: 3,
        title: 'سوال در مورد محصول مبل راحتی',
        customer: { name: 'محسنی' },
        status: 'در حال بررسی',
        isReplied: false,
        lastUpdate: '۱۴۰۳/۰۷/۰۵ - ۰۵:۲۲',
    },
    {
        id: 4,
        title: 'درخواست مرجوعی کالا',
        customer: { name: 'مسنی' },
        status: 'بسته شده',
        isReplied: true,
        lastUpdate: '۱۴۰۳/۰۸/۱۱ - ۰۵:۰۳',
    },
];

const TicketManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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
        <section className="w-full bg-white rounded-md shadow-lg my-10 p-6 border transition-all hover:drop-shadow-custom">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-start gap-3">
                    <div className="flex items-center justify-center size-9 rounded-md bg-neutral-01">
                        <MessageSquareText className="text-secondary-color-blue" />
                    </div>

                    <h2 className="flex items-center text-2xl font-VazirBold text-neutral-07">
                        تیکت‌ها
                    </h2>
                </div>

                <p className="font-VazirRegular text-sm text-gray-500 mt-2">
                    لیست و مدیریت تیکت‌های پشتیبانی کاربران را مشاهده و کنترل کنید.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6 w-full">
                {ticketStats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="bg-white border rounded-md p-5 flex items-start gap-4 shadow-sm transition-all hover:drop-shadow-custom"
                        >
                            <div className="size-12 flex items-center justify-center rounded-full bg-neutral-01 text-secondary-color-blue">
                                <Icon size={22} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-neutral-07 text-xs font-VazirMedium">
                                    {item.title}
                                </span>

                                <span className="text-neutral-07 text-base font-VazirBold">
                                    {item.count.toLocaleString('fa-ir')}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                    <CustomInput
                        type="text"
                        placeholder="جستجو بر اساس عنوان تیکت یا نام مشتری..."
                        inputClassName="h-10 w-full rounded-md border bg-white px-4 font-VazirRegular text-sm outline-none transition-all placeholder:text-neutral-04 focus:border-neutral-04 sm:w-80 pl-10"
                    />

                    <button className="flex items-center justify-center gap-2 border px-4 h-10 font-VazirRegular rounded-md cursor-pointer transition-all hover:bg-main hover:text-white">
                        <FunnelPlus size={16} />
                        فیلتر
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-md shadow-sm border overflow-x-auto">
                <table className="w-full text-center border rounded-md overflow-hidden">
                    <thead className="bg-gray-50 border-b">
                        <tr className="bg-gray-50 text-neutral-07 font-VazirMedium text-xs border-b border-gray-100">
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
                                className="border rounded-md shadow-sm overflow-hidden mt-1 border-gray-50 hover:bg-gray-50 transition-colors"
                            >
                                <td className="p-4 font-VazirMedium text-xs">
                                    {ticket.id}
                                </td>

                                <td className="p-4 font-VazirMedium text-sm text-neutral-07">
                                    {ticket.title}
                                </td>

                                <td className="p-4">
                                    <StatusBadge status={ticket.status} />
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`flex items-center justify-center py-2 px-3 rounded-md text-xs font-VazirMedium ${ticket.isReplied
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-orange-50 text-orange-600'
                                            }`}
                                    >
                                        {ticket.isReplied ? 'پاسخ داده شده' : 'در انتظار پاسخ'}
                                    </span>
                                </td>

                                <td className="p-4 text-sm text-gray-600 font-VazirMedium">
                                    {ticket.lastUpdate}
                                </td>

                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-6">
                                        <button className="flex flex-col items-center cursor-pointer text-secondary-color-blue transition-all hover:text-gray-600">
                                            <Eye size={18} />
                                        </button>

                                        <button className="flex flex-col items-center cursor-pointer text-secondary-color-blue transition-all hover:text-gray-600">
                                            <Reply size={18} />
                                        </button>

                                        <button className="flex flex-col items-center cursor-pointer text-green-600 transition-all hover:text-gray-600">
                                            <CheckCheck size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalTickets}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                label="تیکت"
            />
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
            className={`flex items-center justify-center py-2 px-3 rounded-md text-xs font-VazirMedium ${statusClasses[status]}`}
        >
            {status}
        </span>
    );
};

export default TicketManagement;




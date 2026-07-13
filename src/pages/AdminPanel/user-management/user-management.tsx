import React, { useState } from 'react';
import { Users, FunnelPlus, Pencil, Trash2, RefreshCw, Ban } from 'lucide-react';
import CustomInput from '../../../components/ui/custom-input';
import CustomPagination from '../../../components/ui/custom-pagination';

interface User {
    id: string;
    username: string;
    email: string;
    date: string;
    role: 'مدیر' | 'کاربر';
}

const users: User[] = [
    { id: "۱۲۵۴۸۷", username: "ali_mohammadi", email: "ali.mohammadi@example.com", date: "۱۴۰۳/۰۲/۲۲", role: "مدیر" },
    { id: "۱۲۵۴۸۶", username: "sara_ahmadi", email: "sara.ahmadi@example.com", date: "۱۴۰۳/۰۲/۲۱", role: "کاربر" },
    { id: "۱۲۵۴۸۵", username: "reza_karimi", email: "reza.karimi@example.com", date: "۱۴۰۳/۰۲/۲۰", role: "کاربر" },
    { id: "۱۲۵۴۸۴", username: "mahta_rahimi", email: "mahta.rahimi@example.com", date: "۱۴۰۳/۰۲/۱۹", role: "کاربر" },
    { id: "۱۲۵۴۸۳", username: "hamed_naseri", email: "hamed.naseri@example.com", date: "۱۴۰۳/۰۲/۱۸", role: "کاربر" },
    { id: "۱۲۵۴۸۲", username: "paria_zarei", email: "paria.zarei@example.com", date: "۱۴۰۳/۰۲/۱۷", role: "کاربر" },
    { id: "۱۲۵۴۸۱", username: "mohsen_tavakoli", email: "mohsen.tavakoli@example.com", date: "۱۴۰۳/۰۲/۱۶", role: "کاربر" },
    { id: "۱۲۵۴۸۰", username: "neda_gholami", email: "neda.gholami@example.com", date: "۱۴۰۳/۰۲/۱۵", role: "کاربر" },
];

const RoleBadge: React.FC<{ role: User['role'] }> = ({ role }) => (
    <span
        className={`inline-flex items-center justify-center py-1.5 px-3 rounded-md text-xs font-VazirMedium whitespace-nowrap ${role === "مدیر"
                ? "bg-orange-50 text-orange-600"
                : "bg-[#F3F6FC] text-secondary-color-blue"
            }`}
    >
        {role}
    </span>
);

const RowActions: React.FC = () => (
    <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
        <button
            type="button"
            aria-label="ویرایش"
            className="cursor-pointer text-secondary-color-blue transition-all hover:text-gray-600"
        >
            <Pencil size={18} />
        </button>
        <button
            type="button"
            aria-label="بازنشانی"
            className="cursor-pointer text-secondary-color-blue transition-all hover:text-gray-600"
        >
            <RefreshCw size={18} />
        </button>
        <button
            type="button"
            aria-label="حذف"
            className="cursor-pointer text-red-700 transition-all hover:text-gray-600"
        >
            <Trash2 size={18} />
        </button>
        <button
            type="button"
            aria-label="مسدود کردن"
            className="cursor-pointer text-red-700 transition-all hover:text-gray-600"
        >
            <Ban size={18} />
        </button>
    </div>
);

const UserManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const totalProducts = 42;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    return (
        <section className="w-full max-w-full bg-white rounded-md shadow-lg my-6 sm:my-10 p-4 sm:p-6 border transition-all hover:drop-shadow-custom">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-start gap-3">
                    <div className="flex shrink-0 items-center justify-center size-9 rounded-md bg-neutral-01">
                        <Users className="text-secondary-color-blue" />
                    </div>
                    <h2 className="flex items-center text-xl sm:text-2xl font-VazirBold text-neutral-07 truncate">
                        کاربران
                    </h2>
                </div>
                <p className="font-VazirRegular text-xs sm:text-sm text-gray-500 mt-2">
                    لیست و مدیریت کابران فروشگاه را مشاهده و کنترل کنید.
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mb-6">
                <div className="w-full sm:w-auto sm:flex-1 sm:max-w-80">
                    <CustomInput
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="جستجو بر اساس نام کاربری یا ایمیل..."
                        inputClassName="h-10 w-full rounded-md border bg-white px-4 font-VazirRegular text-sm outline-none transition-all placeholder:text-neutral-04 focus:border-neutral-04 pl-10"
                    />
                </div>
                <button
                    type="button"
                    className="flex w-full sm:w-auto items-center justify-center gap-2 border px-4 h-10 font-VazirRegular rounded-md cursor-pointer transition-all hover:bg-main hover:text-white shrink-0"
                >
                    <FunnelPlus size={16} />
                    فیلتر
                </button>
            </div>

            {/* Desktop / Tablet Table */}
            <div className="hidden md:block bg-white rounded-md shadow-sm border overflow-x-auto">
                <table className="w-full min-w-[720px] text-center border-collapse">
                    <thead className="bg-gray-50 border-b">
                        <tr className="bg-gray-50 text-neutral-07 font-VazirMedium text-xs border-b border-gray-100">
                            <th className="p-4">شناسه</th>
                            <th className="p-4">نام کاربری</th>
                            <th className="p-4">ایمیل</th>
                            <th className="p-4">تاریخ</th>
                            <th className="p-4">نقش</th>
                            <th className="p-4">عملیات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                            >
                                <td className="p-4 font-VazirMedium text-xs whitespace-nowrap">
                                    {user.id}
                                </td>
                                <td className="p-4 font-VazirMedium text-sm lg:text-base max-w-[160px] truncate">
                                    {user.username}
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-VazirMedium max-w-[200px] truncate">
                                    {user.email}
                                </td>
                                <td className="p-4 text-xs lg:text-sm text-gray-600 font-VazirMedium whitespace-nowrap">
                                    {user.date}
                                </td>
                                <td className="p-4">
                                    <RoleBadge role={user.role} />
                                </td>
                                <td className="p-4">
                                    <RowActions />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List */}
            <div className="grid grid-cols-1 gap-3 md:hidden">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="border rounded-md p-4 shadow-sm bg-white hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                                <p className="font-VazirMedium text-sm truncate">
                                    {user.username}
                                </p>
                                <p className="font-VazirRegular text-xs text-gray-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                            <RoleBadge role={user.role} />
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-gray-600 font-VazirMedium mb-3">
                            <span>شناسه: {user.id}</span>
                            <span>{user.date}</span>
                        </div>

                        <div className="flex justify-center border-t pt-3">
                            <RowActions />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={totalProducts}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    label="کاربر"
                />
            </div>
        </section>
    );
};

export default UserManagement;


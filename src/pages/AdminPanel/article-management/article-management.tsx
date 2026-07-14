import React, { useState } from "react";
import { Eye, Edit, MoreVertical, Plus, FileText, FunnelPlus } from "lucide-react";
import CustomInput from "../../../components/ui/custom-input";
import CustomPagination from "../../../components/ui/custom-pagination";
import { useNavigate } from "react-router-dom";

type ArticleStatus = "منتشر شده" | "پیش‌نویس";

interface Article {
    id: number;
    title: string;
    category: string;
    author: string;
    date: string;
    status: ArticleStatus;
    statusColor: string;
    image: string;
}

const articles: Article[] = [
    { id: 1, title: "راهنمای کامل چیدمان منزل کوچک", category: "چیدمان و طراحی", author: "سینا یوسفی", date: "۱۴۰۳/۰۲/۲۵", status: "منتشر شده", statusColor: "bg-green-100 text-green-700", image: "/Images/product-20.jpg" },
    { id: 2, title: "معرفی جدیدترین مبل‌های مدرن ۲۰۲۴", category: "محصولات", author: "سارا احمدی", date: "۱۴۰۳/۰۲/۲۰", status: "منتشر شده", statusColor: "bg-green-100 text-green-700", image: "/Images/product-20.jpg" },
    { id: 3, title: "تاثیر رنگ‌ها در دکوراسیون داخلی", category: "دکوراسیون", author: "علی محمدی", date: "۱۴۰۳/۰۲/۱۰", status: "پیش‌نویس", statusColor: "bg-orange-100 text-orange-600", image: "/Images/product-20.jpg" },
    { id: 4, title: "نگهداری و تمیز کردن میزهای چوبی", category: "راهنما و نگهداری", author: "سینا یوسفی", date: "۱۴۰۳/۰۲/۱۰", status: "منتشر شده", statusColor: "bg-green-100 text-green-700", image: "/Images/product-20.jpg" },
    { id: 5, title: "راهنمای انتخاب تخت خواب مناسب", category: "راهنما و خرید", author: "سارا احمدی", date: "۱۴۰۳/۰۲/۱۰", status: "منتشر شده", statusColor: "bg-green-100 text-green-700", image: "/Images/product-20.jpg" },
    { id: 6, title: "پنج ترند برتر دکوراسیون در سال ۲۰۲۴", category: "ترند و اخبار", author: "علی محمدی", date: "۱۴۰۳/۰۲/۲۰", status: "پیش‌نویس", statusColor: "bg-orange-100 text-orange-600", image: "/Images/product-20.jpg" },
];

const ArticleManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();

    const totalArticles = 40;
    const totalPages = Math.ceil(totalArticles / itemsPerPage);

    return (
        <section className="w-full bg-white rounded-md shadow-lg my-4 p-4 md:my-10 md:p-6 border transition-all hover:drop-shadow-custom">

            {/* Header */}
            <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-9 rounded-md bg-neutral-01 shrink-0">
                        <FileText className="text-secondary-color-blue" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-VazirBold text-neutral-07">مقالات</h2>
                </div>
                <p className="font-VazirRegular text-sm text-gray-500 mt-2">
                    لیست تمامی مقالات سایت را مشاهده، مدیریت و ویرایش کنید.
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2 w-full sm:w-auto">
                    <CustomInput
                        type="text"
                        placeholder="جستجو در مقالات..."
                        inputClassName="h-10 w-full rounded-md border bg-white px-4 font-VazirRegular text-sm outline-none transition-all placeholder:text-neutral-04 focus:border-neutral-04 sm:w-72 md:w-80 pl-10"
                    />
                    <button className="flex items-center justify-center gap-2 border px-3 h-10 font-VazirRegular rounded-md cursor-pointer transition-all hover:bg-main hover:text-white shrink-0">
                        <FunnelPlus size={16} />
                        <span className="hidden sm:inline">فیلتر</span>
                    </button>
                </div>
                <button
                    onClick={() => navigate("/p-admin/admin-articles/add")}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-main text-white transition-colors hover:bg-main/90 cursor-pointer shrink-0 w-full sm:w-auto"
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">افزودن مقاله جدید</span>
                    <span className="sm:hidden">افزودن</span>
                </button>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-2">
                {articles.map((article) => (
                    <div key={article.id} className="border rounded-lg p-3 bg-white flex gap-3 items-start">
                        <img src={article.image} alt={article.title} className="w-16 h-16 rounded-md object-cover bg-gray-100 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <p className="font-VazirMedium text-sm text-neutral-07 truncate">{article.title}</p>
                                <span className={`text-xs font-VazirMedium px-2 py-0.5 rounded-md shrink-0 ${article.statusColor}`}>
                                    {article.status}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 font-VazirRegular mt-0.5">{article.category}</p>
                            <p className="text-xs font-VazirMedium text-gray-700 mt-1">{article.author} • {article.date}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 shrink-0">
                            <Eye size={16} className="cursor-pointer text-secondary-color-blue" />
                            <Edit size={16} onClick={() => navigate("/p-admin/admin-articles/edit")} className="cursor-pointer text-secondary-color-blue" />
                            <MoreVertical size={16} className="cursor-pointer text-main" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block rounded-md border overflow-hidden">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-neutral-07 font-VazirMedium text-xs border-b border-gray-100">
                            <th className="p-4 text-right">عنوان مقاله</th>
                            <th className="p-4">دسته بندی</th>
                            <th className="p-4">نویسنده</th>
                            <th className="p-4">تاریخ انتشار</th>
                            <th className="p-4">وضعیت</th>
                            <th className="p-4">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-right">
                                    <div className="flex items-center gap-3">
                                        <img src={article.image} alt={article.title} className="w-24 h-16 rounded-md object-cover bg-gray-200 shrink-0" />
                                        <span className="font-VazirMedium text-sm">{article.title}</span>
                                    </div>
                                </td>
                                <td className="p-4 font-VazirMedium text-sm text-gray-600">{article.category}</td>
                                <td className="p-4 font-VazirMedium text-sm text-gray-600">{article.author}</td>
                                <td className="p-4 font-VazirMedium text-sm text-gray-600">{article.date}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-VazirMedium ${article.statusColor}`}>
                                        {article.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <Eye size={18} className="cursor-pointer text-secondary-color-blue hover:text-gray-600" />
                                        <Edit size={18} onClick={() => navigate("/p-admin/admin-articles/edit")} className="cursor-pointer text-secondary-color-blue hover:text-gray-600" />
                                        <MoreVertical size={18} className="cursor-pointer text-main hover:text-gray-600" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalArticles}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                label="مقاله"
            />
        </section>
    );
};

export default ArticleManagement;



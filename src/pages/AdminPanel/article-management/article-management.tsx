import React, { useState } from "react";
import { Eye, Edit, MoreVertical, Plus, FileText, FunnelPlus, Info } from "lucide-react";
import CustomInput from "../../../components/ui/custom-input";
import CustomPagination from "../../../components/ui/custom-pagination";
import { useNavigate } from "react-router-dom";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";

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
    {
        id: 1,
        title: "راهنمای کامل چیدمان منزل کوچک",
        category: "چیدمان و طراحی",
        author: "سینا یوسفی",
        date: "۱۴۰۳/۰۲/۲۵",
        status: "منتشر شده",
        statusColor: "bg-green-100 text-green-700",
        image: "/Images/product-20.jpg",
    },
    {
        id: 2,
        title: "معرفی جدیدترین مبل‌های مدرن ۲۰۲۴",
        category: "محصولات",
        author: "سارا احمدی",
        date: "۱۴۰۳/۰۲/۲۰",
        status: "منتشر شده",
        statusColor: "bg-green-100 text-green-700",
        image: "/Images/product-20.jpg",
    },
    {
        id: 3,
        title: "تاثیر رنگ‌ها در دکوراسیون داخلی",
        category: "دکوراسیون",
        author: "علی محمدی",
        date: "۱۴۰۳/۰۲/۱۰",
        status: "پیش‌نویس",
        statusColor: "bg-orange-100 text-orange-600",
        image: "/Images/product-20.jpg",
    },
    {
        id: 4,
        title: "نگهداری و تمیز کردن میزهای چوبی",
        category: "راهنما و نگهداری",
        author: "سینا یوسفی",
        date: "۱۴۰۳/۰۲/۱۰",
        status: "منتشر شده",
        statusColor: "bg-green-100 text-green-700",
        image: "/Images/product-20.jpg",
    },
    {
        id: 5,
        title: "راهنمای انتخواب تخت خواب مناسب",
        category: "راهنما و خرید",
        author: "سارا احمدی",
        date: "۱۴۰۳/۰۲/۱۰",
        status: "منتشر شده",
        statusColor: "bg-green-100 text-green-700",
        image: "/Images/product-20.jpg",
    },
    {
        id: 2,
        title: "پنج ترند برتر دکوراسیون در سال ۲۰۲۴",
        category: "ترند و اخبار",
        author: "علی محمدی",
        date: "۱۴۰۳/۰۲/۲۰",
        status: "پیش‌نویس",
        statusColor: "bg-orange-100 text-orange-600",
        image: "/Images/product-20.jpg",
    }
];

const ArticleManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalArticles = 40;
    const totalPages = Math.ceil(totalArticles / itemsPerPage);

    const [openDetails, setOpenDetails] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const navigate = useNavigate();

    return (
        <section className="w-full bg-white rounded-md shadow-lg my-10 p-6 border transition-all hover:drop-shadow-custom">

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-start gap-3">
                    <div className="flex items-center justify-center size-9 rounded-md bg-neutral-01">
                        <FileText className="text-secondary-color-blue" />
                    </div>
                    <h2 className="flex items-center text-2xl font-VazirBold text-neutral-07">
                        مقالات
                    </h2>
                </div>
                <p className="font-VazirRegular text-sm text-gray-500 mt-2">
                    لیست تمامی مقالات سایت را مشاهده، مدیریت و ویرایش کنید.
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <CustomInput
                        type="text"
                        placeholder=" جستجو در مقالات..."
                        inputClassName="h-10 w-full rounded-md border bg-white px-4 font-VazirRegular text-sm outline-none transition-all placeholder:text-neutral-04 focus:border-neutral-04 sm:w-80 pl-10"
                    />
                    <button className="flex items-center justify-center gap-2 border px-4 h-10 font-VazirRegular rounded-md cursor-pointer transition-all hover:bg-main hover:text-white">
                        <FunnelPlus size={16} />
                        فیلتر
                    </button>
                </div>
                <button
                    onClick={() => navigate("/p-admin/admin-articles/add")}
                    className="px-4 py-3 rounded-md flex items-center gap-2 bg-main text-white border--main transition-colors hover:bg-main/90 cursor-pointer"
                >
                    <Plus size={18} />
                    افزودن مقاله جدید
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-md shadow-sm border overflow-x-auto">
                <table className="w-full text-center border rounded-md overflow-hidden">
                    <thead className="bg-gray-50 border-b">
                        <tr className="bg-gray-50 text-neutral-07 font-VazirMedium text-xs border-b border-gray-100">
                            <th className="pl-50">عنوان مقاله</th>
                            <th className="p-4">دسته بندی</th>
                            <th className="p-4">نویسنده</th>
                            <th className="p-4">تاریخ انتشار</th>
                            <th className="p-4">وضعیت</th>
                            <th className="p-4">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article: Article) => (
                            <tr
                                key={article.id}
                                className="border rounded-md shadow-sm overflow-hidden mt-1 border-gray-50 hover:bg-gray-50 transition-colors"
                            >
                                <td className="p-4 font-VazirMedium text-sm">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-18 h-16 bg-gray-200 rounded-lg"
                                        />
                                        <span>{article.title}</span>
                                    </div>
                                </td>

                                <td className="p-4 font-VazirMedium text-sm text-gray-600">
                                    {article.category}
                                </td>

                                <td className="p-4 font-VazirMedium text-sm text-gray-600">
                                    {article.author}
                                </td>

                                <td className="p-4 font-VazirMedium text-sm text-gray-600">
                                    {article.date}
                                </td>

                                <td className="py-4">
                                    <span
                                        className={`flex items-center justify-center py-2 font-VazirMedium rounded-md text-xs ${article.statusColor}`}
                                    >
                                        {article.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <Eye
                                            size={18}
                                            className="cursor-pointer text-secondary-color-blue hover:text-gray-600"
                                        />
                                        <Edit
                                            onClick={() => navigate("/p-admin/admin-articles/edit")}
                                            size={18}
                                            className="cursor-pointer text-secondary-color-blue hover:text-gray-600"
                                        />
                                        <MoreVertical
                                            size={18}
                                            className="cursor-pointer text-main hover:text-gray-600"
                                        />
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

            {/* Details Modal */}
            <Dialog open={openDetails} onOpenChange={setOpenDetails}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-VazirBold text-center">
                            جزئیات مقاله
                        </DialogTitle>
                    </DialogHeader>

                    {selectedArticle && (
                        <div className="space-y-3 font-VazirRegular text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">عنوان</span>
                                <span>{selectedArticle.title}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">دسته بندی</span>
                                <span>{selectedArticle.category}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">نویسنده</span>
                                <span>{selectedArticle.author}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">تاریخ انتشار</span>
                                <span>{selectedArticle.date}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">وضعیت</span>
                                <span>{selectedArticle.status}</span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default ArticleManagement;



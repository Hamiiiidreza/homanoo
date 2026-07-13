import React from 'react'
import {
    Truck, User, Handbag, TrendingUp, MoveUpRight, ChevronLeft, LucideIcon
} from 'lucide-react';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../../components/ui/select";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, TooltipProps
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

type GrowthData = { name: string; a: number; b: number }
type SalesData = { name: string; sales: number }
type StatItem = { title: string; count: number; icon: LucideIcon; desc: string }
type TransactionStatus = 'تکمیل شده' | 'در حال پردازش' | 'در انتظار پرداخت'
type Transaction = {
    id: string; customer: string; product: string;
    price: string; status: TransactionStatus; date: string; img: string
}

const colors = {
    primary: "#2d397e", secondary: "#141718",
    accent: "#2F6BFF", grid: "#F7F9FD", text: "#6c7275"
};

const growthData: GrowthData[] = [
    { name: "04/7/1", a: 2500, b: 4200 },
    { name: "04/8/1", a: 4000, b: 4400 },
    { name: "04/9/1", a: 4800, b: 5200 },
    { name: "04/10/1", a: 3900, b: 5100 },
    { name: "04/11/1", a: 4200, b: 3800 },
    { name: "04/12/1", a: 4500, b: 4100 },
];

const salesData: SalesData[] = [
    { name: '۲۴ فروردین', sales: 400000000 },
    { name: '۲۸ فروردین', sales: 300000000 },
    { name: '۵ اردیبهشت', sales: 500000000 },
    { name: '۹ اردیبهشت', sales: 685000000 },
    { name: '۱۳ اردیبهشت', sales: 420000000 },
    { name: '۱۷ اردیبهشت', sales: 650000000 },
    { name: '۲۱ اردیبهشت', sales: 600000000 },
];

const formatYAxis = (value: number): string => {
    if (value === 0) return '۰';
    return `${Math.round(value / 1000000).toLocaleString('fa-ir')}M`;
};

const CustomTooltipSales = ({ active, payload }: TooltipProps<ValueType, NameType> & { payload?: any }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white p-3 border shadow-md rounded-md text-center">
            <p className="text-[10px] text-neutral-04 mb-1 font-VazirRegular">{payload[0].payload.name}</p>
            <p className="text-sm font-bold text-neutral-07 font-VazirBold">
                {Number(payload[0].value).toLocaleString('fa-ir')} <span className="text-[10px] font-VazirMedium">تومان</span>
            </p>
        </div>
    );
};

const CustomTooltipGrowth = ({ active, payload }: TooltipProps<ValueType, NameType> & { payload?: any }) => {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload as GrowthData;
    return (
        <div className="bg-white p-3 border shadow-md rounded-md text-center font-VazirRegular">
            <p className="text-[10px] text-neutral-04 mb-1">{data.name}</p>
            <div className="text-sm font-VazirBold text-neutral-07 space-y-1">
                <p className="flex justify-between gap-4">
                    <span className='text-secondary-color-blue'>گروه الف:</span>
                    <span>{data.a.toLocaleString('fa-ir')}</span>
                </p>
                <p className="flex justify-between gap-4">
                    <span className='text-neutral-07'>گروه ب:</span>
                    <span>{data.b.toLocaleString('fa-ir')}</span>
                </p>
            </div>
        </div>
    );
};

const statusStyles: Record<TransactionStatus, string> = {
    'تکمیل شده': 'bg-emerald-50 text-emerald-600',
    'در حال پردازش': 'bg-blue-50 text-blue-600',
    'در انتظار پرداخت': 'bg-rose-50 text-rose-600',
};

const AdminDashboard: React.FC = () => {
    const items: StatItem[] = [
        { title: "محصولات فعال", count: 246, icon: Truck, desc: "5% نسبت به ماه قبل" },
        { title: "مشتریان جدید", count: 92, icon: User, desc: "15% نسبت به ماه قبل" },
        { title: "سفارشات جدید", count: 158, icon: Handbag, desc: "8% نسبت به ماه قبل" },
        { title: "مجموع فروش", count: 2485000000, icon: TrendingUp, desc: "12% نسبت به ماه قبل" },
    ];

    const transactions: Transaction[] = [
        { id: '۱۲۵۴۸۷', customer: 'علی محمدی', product: 'مبل ال مدرن وینتر', price: '۶۵,۰۰۰,۰۰۰', status: 'تکمیل شده', date: '۲۲ اردیبهشت ۱۴۰۳', img: '/Images/product-14.png' },
        { id: '۱۲۵۴۸۶', customer: 'سارا احمدی', product: 'میز ناهارخوری لوکس', price: '۶۲,۰۰۰,۰۰۰', status: 'در حال پردازش', date: '۲۲ اردیبهشت ۱۴۰۳', img: '/Images/product-20.jpg' },
        { id: '۱۲۵۴۸۵', customer: 'محمد رضایی', product: 'مبل راحتی چستر', price: '۹۸,۰۰۰,۰۰۰', status: 'تکمیل شده', date: '۲۱ اردیبهشت ۱۴۰۳', img: '/Images/product-15.png' },
        { id: '۱۲۵۴۸۴', customer: 'زهرا حسینی', product: 'آینه قدی مدرن', price: '۲۴,۵۰۰,۰۰۰', status: 'در انتظار پرداخت', date: '۲۱ اردیبهشت ۱۴۰۳', img: '/Images/product-14.png' },
    ];

    return (
        <div className="p-3 sm:p-6 bg-white min-h-screen font-VazirRegular" dir="rtl">

            {/* Stats Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-10 mt-3 sm:mt-5">
                {items.map((box, i) => {
                    const Icon = box.icon;
                    return (
                        <div key={i} className="bg-white border rounded-md p-3 sm:p-5 flex items-start gap-3 sm:gap-4 shadow-sm transition-all hover:drop-shadow-custom">
                            <div className="size-10 sm:size-12 shrink-0 flex items-center justify-center rounded-full bg-neutral-01 text-secondary-color-blue">
                                <Icon size={20} />
                            </div>
                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="text-neutral-07 text-[10px] sm:text-xs font-VazirMedium truncate">{box.title}</span>
                                <span className="text-neutral-07 text-sm sm:text-base font-VazirBold">{box.count.toLocaleString('fa-ir')}</span>
                                <span className="hidden sm:flex items-center gap-1 text-secondary-color-green text-[10px] font-VazirRegular mt-1">
                                    <MoveUpRight size={10} />
                                    {box.desc}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
                {/* Growth Chart */}
                <div className="order-2 xl:order-1 bg-white p-4 sm:p-6 rounded-md border shadow-sm transition-all hover:drop-shadow-custom">
                    <div className="flex justify-between items-center mb-4 sm:mb-8 gap-2">
                        <h3 className="text-sm sm:text-base font-VazirBold text-neutral-07 shrink-0">تحلیل رشد ماهانه</h3>
                        <div className="flex gap-3 sm:gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="size-2.5 rounded-full bg-secondary-color-blue shrink-0"></div>
                                <span className="text-[10px] sm:text-xs text-secondary-color-blue">گروه الف</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="size-2.5 rounded-full bg-neutral-07 shrink-0"></div>
                                <span className="text-[10px] sm:text-xs text-gray-500">گروه ب</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[220px] sm:h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.accent} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={colors.accent} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.1} />
                                        <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: colors.text, fontSize: 9 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: colors.text, fontSize: 9 }} />
                                <Tooltip content={<CustomTooltipGrowth />} />
                                <Area type="monotone" dataKey="a" stroke={colors.accent} strokeWidth={2} fillOpacity={1} fill="url(#colorA)" />
                                <Area type="monotone" dataKey="b" stroke={colors.secondary} strokeWidth={2} fillOpacity={1} fill="url(#colorB)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales Chart */}
                <div className="order-1 xl:order-2 bg-white p-4 sm:p-6 rounded-md border shadow-sm transition-all hover:drop-shadow-custom">
                    <div className="flex justify-between items-center mb-4 sm:mb-8 gap-2">
                        <h3 className="text-sm sm:text-base font-VazirBold text-neutral-07 shrink-0">نمودار میزان فروش</h3>
                        <Select defaultValue="30">
                            <SelectTrigger className="w-[110px] sm:w-[120px] h-[30px] border-main text-[11px] font-VazirBold text-neutral-04 hover:bg-main hover:text-white transition-all rounded-md px-3 cursor-pointer">
                                <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30">۳۰ روز اخیر</SelectItem>
                                <SelectItem value="90">۹۰ روز اخیر</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="h-[220px] sm:h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: colors.text, fontSize: 9 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: colors.text, fontSize: 9 }} tickFormatter={formatYAxis} />
                                <Tooltip content={<CustomTooltipSales />} cursor={{ stroke: colors.primary, strokeWidth: 1, strokeDasharray: '5 5' }} />
                                <Area type="monotone" dataKey="sales" stroke={colors.primary} strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" activeDot={{ r: 6, fill: colors.primary, stroke: '#fff', strokeWidth: 2 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-md shadow-sm border overflow-hidden transition-all hover:drop-shadow-custom">
                <div className="p-4 sm:p-6 flex justify-between items-center border-b border-gray-50">
                    <h3 className="text-sm sm:text-base font-VazirBold text-neutral-07">آخرین تراکنش‌ها</h3>
                    <h4 className="flex items-center gap-1.5 text-xs font-VazirMedium text-secondary-color-blue cursor-pointer shrink-0">
                        مشاهده همه
                        <ChevronLeft size={14} />
                    </h4>
                </div>

                {/* Mobile Cards */}
                <div className="flex flex-col divide-y divide-gray-100 sm:hidden">
                    {transactions.map((item, idx) => (
                        <div key={idx} className="p-4 flex flex-col gap-3">
                            {/* Row 1: تصویر + اسم محصول + شناسه */}
                            <div className="flex items-center gap-3">
                                <img src={item.img} className="size-10 rounded-md object-cover shrink-0" alt={item.product} />
                                <div className="min-w-0">
                                    <p className="text-xs text-neutral-04 font-VazirMedium truncate">{item.product}</p>
                                    <p className="text-[11px] text-gray-400 font-VazirMedium">#{item.id}</p>
                                </div>
                            </div>

                            {/* Row 2: اسم مشتری */}
                            <p className="text-sm font-VazirBold text-neutral-07">{item.customer}</p>

                            {/* Row 3: قیمت */}
                            <p className="text-sm font-VazirBold text-neutral-07">
                                {item.price} <span className="text-[10px] font-VazirRegular text-neutral-04">تومان</span>
                            </p>

                            {/* Row 4: تاریخ + استاتوس */}
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] text-gray-400 font-VazirMedium">{item.date}</span>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-VazirBold ${statusStyles[item.status]}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tablet+ Table */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-center min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50 text-neutral-07 font-VazirMedium text-xs border-b border-gray-100">
                                <th className="py-3 px-3 whitespace-nowrap">شماره سفارش</th>
                                <th className="py-3 px-3 whitespace-nowrap">مشتری</th>
                                <th className="py-3 px-3 whitespace-nowrap">محصول</th>
                                <th className="py-3 px-3 whitespace-nowrap">مبلغ</th>
                                <th className="py-3 px-3 whitespace-nowrap">وضعیت</th>
                                <th className="py-3 px-3 whitespace-nowrap">تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-3 py-3 text-xs font-VazirMedium whitespace-nowrap">{item.id}</td>
                                    <td className="px-3 py-3 text-sm font-VazirBold text-neutral-07 whitespace-nowrap">{item.customer}</td>
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-2 justify-center">
                                            <img src={item.img} className="size-9 rounded-md object-cover shrink-0" alt={item.product} />
                                            <span className="text-xs text-neutral-04 font-VazirMedium text-right max-w-[120px] line-clamp-1">{item.product}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-sm font-VazirBold text-neutral-07 whitespace-nowrap">
                                        {item.price} <span className="text-[10px] font-VazirRegular text-neutral-04">تومان</span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-VazirBold whitespace-nowrap ${statusStyles[item.status]}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 text-[11px] text-gray-400 font-VazirMedium whitespace-nowrap">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;




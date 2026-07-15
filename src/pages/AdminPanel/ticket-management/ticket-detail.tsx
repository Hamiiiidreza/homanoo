import React from "react";
import PageHierarchy from "../../../components/modules/Page-Hierarchy/page-hierarchy";
import {
    ChevronLeft,
    CalendarDays,
    Tag,
    User,
    Headset,
    Paperclip,
    Send,
    CheckCheck,
} from "lucide-react";

type TicketStatus = "answered" | "pending" | "closed";
type TicketPriority = "open" | "Under review" | "closed";

interface TicketInfo {
    number: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt: string;
    category: string;
}

interface Message {
    id: string;
    sender: "user" | "support";
    name: string;
    time: string;
    dateLabel?: string;
    text: string;
    sent?: boolean;
}

const ticketInfo: TicketInfo = {
    number: "#TK-1403-0578",
    status: "answered",
    priority: "open",
    createdAt: "۱۴۰۳/۰۲/۲۷ - ۱۱:۴۵",
    category: "مشکلات فنی",
};

const messages: Message[] = [
    {
        id: "1",
        sender: "user",
        name: "شما",
        time: "۱۴۰۳/۰۲/۲۷ - ۱۱:۴۵",
        text: "سلام،\nمن هنگام ثبت فاکتور با خطای «موجودی کافی نیست» مواجه می‌شوم، اما موجودی کالا در انبار بیشتر از مقدار مورد نیاز است. لطفاً راهنمایی کنید.",
        sent: true,
    },
    {
        id: "2",
        sender: "support",
        name: "پشتیبانی",
        time: "۱۴۰۳/۰۲/۲۷ - ۱۳:۲۰",
        dateLabel: "۱۴۰۳/۰۲/۲۷",
        text: "سلام، وقت شما بخیر\nاین خطا زمانی نمایش داده می‌شود که موجودی قابل فروش کالا در انبار انتخابی کمتر از مقدار مورد نیاز باشد. لطفاً بررسی کنید که انبار و واحد اندازه‌گیری کالا صحیح باشد و موجودی رزرو نشده‌ای برای آن کالا وجود نداشته باشد.\n\nدر صورت ادامه مشکل، لطفاً اسکرین‌شات خطا را ارسال کنید.",
    },
];

function TicketStatusBadge({ status }: { status: TicketStatus }) {
    return (
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            پاسخ داده شده
        </span>
    );
}

function PriorityDot({ priority }: { priority: TicketPriority }) {
    return (
        <div className="flex items-center justify-center gap-1.5 sm:justify-start">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-sm font-semibold text-slate-800">باز</span>
        </div>
    );
}

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-md px-2 text-center">
            <div className="flex items-center gap-1 text-slate-400">
                {icon}
                <span className="text-xs font-VazirMedium">{label}</span>
            </div>
            <div className="break-words text-sm font-VazirBold text-slate-850">
                {value}
            </div>
        </div>
    );
}

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.sender === "user";

    return (
        <div className={`flex w-full ${isUser ? "justify-start" : "justify-end"}`}>
            <div
                className={`flex w-full items-start gap-3 sm:gap-4 ${isUser ? "flex-row" : "flex-row-reverse"
                    }`}
            >
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm sm:h-12 sm:w-12 ${isUser ? "bg-main text-white" : "bg-emerald-600 text-white"
                        }`}
                >
                    {isUser ? (
                        <User className="h-5 w-5 sm:h-7 sm:w-7" />
                    ) : (
                        <Headset className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                </div>

                <div
                    className={`w-full rounded-md border p-4 shadow-sm sm:p-5 ${isUser
                            ? "max-w-full sm:max-w-[650px] border-blue-100 bg-[#f4f8ff]"
                            : "max-w-full sm:max-w-[560px] border-slate-200 bg-[#fafbfa]"
                        }`}
                >
                    <div
                        className={`mb-3 flex ${isUser ? "justify-start text-right" : "justify-end text-left"
                            } sm:mb-4`}
                    >
                        <div>
                            <div
                                className={`text-sm font-VazirBold sm:text-base ${isUser ? "text-blue-600" : "text-emerald-700"
                                    }`}
                            >
                                {message.name}
                            </div>
                            <div className="mt-0.5 text-[11px] font-VazirRegular text-slate-400 sm:text-xs">
                                {message.time}
                            </div>
                        </div>
                    </div>

                    <div className="whitespace-pre-line text-sm leading-7 text-slate-700 font-VazirRegular">
                        {message.text}
                    </div>

                    {isUser && (
                        <div className="mt-4 flex items-center justify-start gap-1.5 text-xs text-slate-400 font-VazirMedium">
                            <CheckCheck className="size-4 text-secondary-color-blue" />
                            <span>ارسال شده</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function TicketDetail() {
    return (
        <div
            dir="rtl"
            className="mt-6 min-h-screen rounded-md border bg-[#f8fafc] p-3 transition-all hover:drop-shadow-custom sm:mt-8 sm:p-4 md:mt-10 md:p-6"
        >
            <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:gap-5 md:gap-6">
                <section className="rounded-md border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
                    <div className="mb-4 flex flex-col gap-4">
                        <h1 className="flex items-center text-xl font-VazirBold text-neutral-07 sm:text-2xl">
                            مشاهده تیکت
                        </h1>

                        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
                            <PageHierarchy
                                items={["مدیریت و بررسی تیکت ها", "مشاهده تیکت"]}
                            />

                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-main bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-all hover:bg-main hover:text-white sm:w-fit sm:px-6"
                            >
                                <ChevronLeft size={16} />
                                بازگشت
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 border-t pt-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x">
                        <InfoItem
                            icon={<span className="text-slate-400" />}
                            label="شماره تیکت"
                            value={
                                <span className="font-VazirBold text-secondary-color-blue">
                                    {ticketInfo.number}
                                </span>
                            }
                        />
                        <InfoItem
                            icon={<span className="text-slate-400" />}
                            label="وضعیت"
                            value={<PriorityDot priority={ticketInfo.priority} />}
                        />
                        <InfoItem
                            icon={<span className="text-slate-400" />}
                            label="پاسخ داده"
                            value={<TicketStatusBadge status={ticketInfo.status} />}
                        />
                        <InfoItem
                            icon={<CalendarDays className="h-4 w-4 text-slate-400" />}
                            label="ایجاد شده در"
                            value={
                                <span className="text-slate-700">{ticketInfo.createdAt}</span>
                            }
                        />
                        <InfoItem
                            icon={<Tag className="h-4 w-4 text-slate-400" />}
                            label="دسته‌بندی"
                            value={
                                <span className="text-slate-700">{ticketInfo.category}</span>
                            }
                        />
                    </div>
                </section>

                <section className="rounded-md border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                    <h2 className="mb-5 text-base font-VazirBold text-slate-850 sm:mb-6 sm:text-lg">
                        گفتگو
                    </h2>

                    <div className="space-y-5 sm:space-y-6">
                        <MessageBubble message={messages[0]} />

                        <div className="flex items-center gap-2 py-1 sm:gap-4 sm:py-2">
                            <div className="h-px flex-1 bg-slate-100" />
                            <span className="shrink-0 rounded-full border bg-white px-3 py-1 text-[11px] text-slate-400 font-VazirMedium sm:px-4 sm:text-xs">
                                ۱۴۰۳/۰۲/۲۷
                            </span>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>

                        <MessageBubble message={messages[1]} />
                    </div>
                </section>

                <section className="rounded-md border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5 md:p-6">
                    <h2 className="mb-4 text-base font-VazirBold text-slate-850 sm:text-lg">
                        پاسخ شما
                    </h2>

                    <div className="rounded-md border border-slate-200 bg-white p-3 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 sm:p-4">
                        <textarea
                            className="min-h-[140px] w-full resize-none border-0 bg-transparent text-sm leading-7 text-slate-700 outline-none placeholder:text-slate-400 sm:min-h-[160px]"
                            placeholder="پیام خود را بنویسید..."
                            rows={6}
                        />
                    </div>

                    <div className="mt-5 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-main hover:text-white"
                            >
                                <Paperclip className="size-5" />
                            </button>

                            <div>
                                <div className="text-sm font-VazirBold text-slate-800">
                                    پیوست
                                </div>
                                <div className="mt-0.5 text-xs font-VazirRegular text-slate-400">
                                    حداکثر اندازه ۱۰ مگابایت
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-main px-6 py-2.5 text-sm font-VazirBold text-white shadow-sm transition-colors hover:bg-main/90 sm:w-auto"
                        >
                            <Send className="size-4" />
                            <span>ارسال پاسخ</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}


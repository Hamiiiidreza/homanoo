import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../../components/AdminPanel/sidebar/Sidebar";
import MobileSidebar from "../../components/UserPanel/sidebar/mobile-sidebar";
import { Bell, Handbag, ChevronLeft, ChevronDown, Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../components/ui/sheet";

const Index: React.FC = () => {
    return (
        <div className="flex bg-neutral-03 min-h-screen">
            {/* desktop aside */}
            <aside className="hidden lg:flex lg:sticky lg:top-0 w-[280px] lg:w-[18%] flex-col shrink-0 z-50 overflow-y-auto scrollbar-minimal h-screen hide-scrollbar bg-white border-r border-neutral-02 p-5">
                <Link to="/" className="flex justify-center">
                    <img src="/Images/logo-3.png" alt="" className="w-30 h-16" />
                </Link>

                <Sidebar />

                <div className="bg-[url('/Images/banner-1.jpg')] w-full h-56 bg-cover bg-[position:50%_100%] sm:bg-[position:50%_90%] rounded-2xl mt-6 overflow-hidden">
                    <div className="p-4">
                        <h3 className="text-xs text-neutral-07 font-VazirBold mb-1">
                            مدیریت هوشمند، فروش بیشتر
                        </h3>
                        <p className="text-xs text-neutral-04 font-VazirRegular mb-3">
                            با تحلیل داده ها، تصمیم های بهتری بگیرید
                        </p>
                        <button className="flex gap-2 text-xs text-white font-VazirRegular bg-main hover:bg-main/90 transition rounded-lg px-3 py-2 cursor-pointer">
                            مشاهده گزارش ها
                            <ChevronLeft size={14} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* mobile aside */}
            <Sheet>
                <SheetContent
                    side="right"
                    className="w-[280px] p-0 bg-transparent shadow-none border-none"
                >
                    <MobileSidebar />
                </SheetContent>

                <section className="w-full p-2">
                    <div className="p-4 sm:p-6 bg-white border border-neutral-02 shadow-sm rounded-md">
                        <header className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <SheetTrigger asChild>
                                    <button className="lg:hidden">
                                        <Menu />
                                    </button>
                                </SheetTrigger>

                                <div>
                                    <h2 className="text-base md:text-xl font-VazirBold text-neutral-07">
                                       سلام مدیریت محترم
                                    </h2>
                                    <p className="font-VazirMedium text-neutral-04 text-xs md:text-sm mt-2">
                                        خوش آمدید! در اینجا نمای کلی از عملکرد فروشگاه را مشاهده میکنید.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="relative">
                                    <Bell
                                        size={18}
                                        className="cursor-pointer text-neutral-07 transition-all hover:text-main"
                                    />
                                    <span className="absolute -top-2 -right-2 bg-main text-white text-[10px] rounded-full size-4 flex items-center justify-center">
                                        2
                                    </span>
                                </button>

                                <div className="hidden sm:block w-[1px] h-6 bg-neutral-03 mx-1"></div>

                                <div className="flex items-center gap-2 sm:gap-3">
                                    <span className="hidden md:flex items-center gap-1 text-sm lg:text-lg font-VazirMedium text-neutral-07">
                                        سینا یوسفی
                                        <ChevronDown size={14} />
                                    </span>

                                    <img
                                        src="/Images/avatar_2.svg"
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-neutral-02"
                                    />
                                </div>
                            </div>
                        </header>

                        <Outlet />
                    </div>
                </section>
            </Sheet>
        </div>
    );
};

export default Index;

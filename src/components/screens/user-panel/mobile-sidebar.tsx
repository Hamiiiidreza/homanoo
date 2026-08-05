import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ChevronLeft } from "lucide-react";

function MobileSidebar() {
    return (
        <aside
            className="fixed right-0 top-0 bottom-0 w-[280px] flex flex-col shrink-0 z-50 overflow-y-auto scrollbar-minimal h-screen hide-scrollbar bg-white border-r border-neutral-02 p-5"
        >
            <Link to="/" className="flex justify-center">
                <img src="/Images/logo-3.png" alt="" className="w-30 h-16" />
            </Link>

            <Sidebar className="" />

            <div className="bg-[url('/Images/banner-1.jpg')] w-full h-56 bg-cover bg-[position:50%_100%] sm:bg-[position:50%_90%] rounded-2xl mt-6 overflow-hidden">
                <div className="p-4">
                    <h3 className="text-sm text-neutral-07 font-VazirBold mb-1">
                        جدیدترین مجموعه مبلمان
                    </h3>
                    <p className="text-xs text-neutral-04 font-VazirRegular mb-3">
                        با طراحی اصیل و کیفیت بی‌نظیر
                    </p>
                    <button className="flex gap-2 text-xs text-white font-VazirRegular bg-main hover:bg-main/90 transition rounded-lg px-3 py-2 cursor-pointer">
                        مشاهده خرید
                        <ChevronLeft size={14} />
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default MobileSidebar;

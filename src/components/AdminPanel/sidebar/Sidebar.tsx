import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Sofa,
    Users,
    Newspaper,
    TicketCheck,
    LogOut,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

type SidebarItem = {
    id: string;
    label: string;
    icon: LucideIcon;
    to?: string;
    type?: "action";
    onClick?: () => void;
};

const items: SidebarItem[] = [
    {
        id: "dashboard",
        label: "پیشخوان",
        to: "/p-admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        id: "products",
        label: "محصولات",
        to: "/p-admin/admin-product",
        icon: Sofa,
    },
    {
        id: "users",
        label: "کاربران",
        to: "/p-admin/admin-users",
        icon: Users,
    },
    {
        id: "articles",
        label: "مقالات",
        to: "/p-admin/admin-articles",
        icon: Newspaper,
    },
    {
        id: "tickets",
        label: "تیکت ها",
        to: "/p-admin/admin-tickets",
        icon: TicketCheck,
    },
    {
        id: "logout",
        label: "خروج از حساب",
        type: "action",
        icon: LogOut,
        onClick: () => {
            console.log("logout");
        },
    },
];

const Sidebar: React.FC = () => {
    const { pathname } = useLocation();

    const baseClass =
        "flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all";

    const activeClass = "bg-[#EAF1FF] text-secondary-color-blue";
    const inactiveClass = "hover:bg-[#F3F6FC] text-neutral-07";

    return (
        <nav className="space-y-1 mt-3">
            {items.map((item) => {
                const Icon = item.icon;

                if (item.to) {
                    return (
                        <NavLink
                            key={item.id}
                            to={item.to}
                            className={({ isActive }) =>
                                `${baseClass} ${isActive ? activeClass : inactiveClass}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        size={18}
                                        className={
                                            isActive
                                                ? "text-secondary-color-blue"
                                                : "text-neutral-04"
                                        }
                                    />
                                    <span
                                        className={
                                            isActive
                                                ? "font-VazirMedium text-sm text-secondary-color-blue"
                                                : "font-VazirMedium text-sm text-neutral-07"
                                        }
                                    >
                                        {item.label}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    );
                }

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={item.onClick}
                        className={`${baseClass} ${inactiveClass} w-full text-right`}
                    >
                        <Icon size={18} className="text-neutral-04" />
                        <span className="font-VazirMedium text-sm text-neutral-07">
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};

export default Sidebar;

import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Handbag,
  Heart,
  User,
  TicketCheck,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';

type SidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  to: string;
};

const items: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'پیشخوان',
    to: '/my-account/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'orders',
    label: 'سفارش‌ها',
    to: '/my-account/orders',
    icon: Handbag,
  },
  {
    id: 'wishlist',
    label: 'علاقه‌مندی‌ها',
    to: '/my-account/favorites',
    icon: Heart,
  },
  {
    id: 'user-account',
    label: 'حساب کاربری',
    to: '/my-account/account',
    icon: User,
  },
  {
    id: 'tickets',
    label: 'تیکت ها',
    to: '/my-account/tickets',
    icon: TicketCheck,
  },
];

const Sidebar = ({ className }: { className: string }) => {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <aside
      className={`${className} scrollbar-minimal hide-scrollbar border-neutral-02 z-50 hidden h-screen min-w-[280px] shrink-0 flex-col overflow-y-auto border-r bg-white p-5 lg:sticky lg:top-0 lg:flex lg:w-[18%]`}
    >
      <Link to="/" className="flex justify-center">
        <img src="/Images/logo.jpg" alt="" className="h-10 w-30" />
      </Link>

      <nav className="space-y-1 pt-10">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.to && pathname === item.to;

          return (
            <Link
              key={item.id}
              to={item.to}
              className={`${isActive ? 'text-secondary-color-blue bg-[#EAF1FF]' : 'text-neutral-07 hover:bg-[#F3F6FC]'} flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 transition-all`}
            >
              <Icon
                size={18}
                className={`${
                  isActive ? 'text-secondary-color-blue' : 'text-neutral-04'
                }`}
              />
              <span
                className={`${
                  isActive
                    ? 'text-secondary-color-blue text-sm'
                    : 'text-neutral-07 text-sm'
                } font-VazirMedium`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
        <Button
          onClick={() => {
            Cookies.remove('token');
            queryClient.setQueryData(['me'], null);
            navigate('/');
          }}
          variant={'ghost'}
          className={`font-VazirMedium mr-1 w-full justify-start gap-4 text-right`}
        >
          <LogOut size={18} className="text-neutral-04" />
          خروج
        </Button>
      </nav>
      <Link
        to={'/shop?category=couches'}
        className="mt-6 block h-44 w-full overflow-hidden rounded-2xl bg-[url('/Images/banner-1.jpg')] bg-cover bg-[position:50%_83%] lg:!h-60 lg:!bg-[position:50%_100%]"
      >
        <div className="p-4">
          <h3 className="text-neutral-07 font-VazirBold mb-1 text-sm">
            جدیدترین مجموعه مبلمان
          </h3>
          <p className="text-neutral-04 font-VazirRegular mb-3 text-xs">
            با طراحی اصیل و کیفیت بی‌نظیر
          </p>
          <button className="font-VazirRegular bg-main hover:bg-main/90 flex cursor-pointer gap-2 rounded-lg px-3 py-2 text-xs text-white transition">
            مشاهده
            <ChevronLeft size={14} />
          </button>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;







import { Handbag, Heart, MapPin, MessageCircle } from 'lucide-react';
import { User } from '../../../../../types/user.types';
import { Skeleton } from '../../../../ui/skeleton';
import { Link } from 'react-router-dom';

type DashboardItem = {
    title: string;
    count?: number | undefined;
    icon: React.ReactNode;
    desription: string;
    route: string;
};
const Statistics = ({ data }: { data: User | undefined }) => {
    const items: DashboardItem[] = [
        {
            title: 'آدرس‌های من',
            count: data?.addresses.length,
            icon: <MapPin />,
            route: 'account',
            desription: 'مدیریت آدرس ها',
        },
        {
            title: 'پیام های من',
            count: data?.ticketsCount,
            icon: <MessageCircle />,
            route: 'tickets',
            desription: 'مشاهده پیام ها',
        },
        {
            title: 'سفارش‌های من',
            count: data?.ordersCount,
            icon: <Handbag />,
            route: 'orders',
            desription: 'مشاهده سفارشات',
        },
        {
            title: 'علاقه‌مندی‌ها',
            count: data?.wishlist.length,
            icon: <Heart />,
            route: 'favorites',
            desription: 'مشاهده علاقه مندی ها',
        },
    ];
    return (
        <div
            className="my-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
            dir="rtl"
        >
            {items.map((box, i) => (
                <Link
                    to={`/my-account/${box.route}`}
                    key={i}
                    className="flex items-start gap-4 rounded-md border bg-white px-6 py-4 shadow-sm transition-all hover:drop-shadow-custom"
                >
                    <div className="bg-neutral-01 text-secondary-color-blue flex size-14 items-center justify-center rounded-full">
                        {box.icon}
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-neutral-07 font-VazirMedium text-sm">
                            {box.title}
                        </span>
                        <span className="text-neutral-07 font-VazirBold text-2xl">
                            {data ? (
                                box.count?.toLocaleString('fa-ir')
                            ) : (
                                <Skeleton className="h-8 w-8" />
                            )}
                        </span>
                        <span className="text-neutral-04 font-VazirMedium text-xs">
                            {box.desription}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Statistics;

import { Link } from 'react-router-dom';
import { Ticket as TicketType } from '../../../../../types/ticket.types';
import { getTicketStatus, toJalaliDate } from '../../../../../utils/helpers';
import { Button } from '../../../../ui/button';
import { ChevronLeft } from 'lucide-react';

const Ticket = ({ data }: { data: TicketType }) => {
    const status =
        data.status == 'closed'
            ? 'closed'
            : data.isUnreadForAdmin
                ? 'isUnreadForAdmin'
                : data.isUnreadForUser
                    ? 'isUnreadForUser'
                    : '';
    return (
        <tr
            key={data._id}
            className="mt-1 overflow-hidden rounded-md border border-gray-50 shadow-sm transition-colors hover:bg-gray-50"
        >
            <td className="font-VazirMedium py-5">{String(data._id).slice(0, 8)}</td>
            <td className="font-VazirMedium py-5 text-sm text-gray-700">
                {data.title == 'site' ? 'مشکل فنی' : 'سفارشات'}
            </td>

            <td className="py-5">
                <div
                    className={`font-VazirMedium mx-auto flex w-max items-center justify-center gap-1.5 rounded-md px-4 py-2 text-xs ${getTicketStatus(status).className}`}
                >
                    <span className="size-1.5 animate-pulse rounded-full bg-current"></span>
                    {getTicketStatus(status).text}
                </div>
            </td>
            <td className="font-VazirMedium py-5 text-sm text-gray-500">
                {toJalaliDate(data.updatedAt)}
            </td>
            <td className="py-5">
                <Link to={`/my-account/tickets/${data._id}`}>
                    {' '}
                    <Button variant={'mainShaded'} className="border bg-white transition-all">
                        مشاهده جزئیات
                        <ChevronLeft size={16} />
                    </Button>
                </Link>
            </td>
        </tr>
    );
};

export default Ticket;

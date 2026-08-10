import { useEffect, useState } from 'react';
import { TicketCheck } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../../components/ui/select';
import CreateTicketModal from './partials/create-ticket-modal';
import useTicket from '../../../../endpoints/useTicket';
import { Ticket as TicketType } from '../../../../types/ticket.types';
import Ticket from './partials/ticket';
import { Skeleton } from '../../../ui/skeleton';

const TicketsScreen = () => {
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [tickets, setTickets] = useState([]);
    const { tickets: data, ticketsPending } = useTicket();

    useEffect(() => {
        if (data) {
            if (filterStatus !== 'all') {
                if (filterStatus == 'isUnreadForUser') {
                    setTickets(data.tickets.filter((t: TicketType) => t.isUnreadForUser));
                } else if (filterStatus == 'isUnreadForAdmin') {
                    setTickets(
                        data.tickets.filter((t: TicketType) => t.isUnreadForAdmin),
                    );
                } else {
                    setTickets(
                        data.tickets.filter((t: TicketType) => t.status == 'closed'),
                    );
                }
            } else {
                setTickets(data.tickets);
            }
        }
    }, [data, filterStatus]);

    return (
        <section className="my-10 rounded-md border bg-white p-4 shadow-lg sm:!p-6">
            <div className="flex flex-col items-start justify-between gap-y-5 sm:!mb-8 sm:!flex-row sm:!items-center">
                <div>
                    <div className="flex items-center justify-start gap-3">
                        <div className="bg-neutral-01 flex size-9 items-center justify-center rounded-md">
                            <TicketCheck className="text-secondary-color-blue" />
                        </div>
                        <h2 className="font-VazirBold text-neutral-07 flex items-center text-2xl">
                            تیکت های من
                        </h2>
                    </div>
                    <p className="font-VazirRegular mt-2 text-sm text-gray-500">
                        در این بخش می‌توانید وضعیت و پاسخ تیکت‌های خود را مشاهده کنید.
                    </p>
                </div>
                <CreateTicketModal />
            </div>

            <div className="mt-4 mb-6 flex items-center justify-between gap-4 sm:!my-6">
                <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v)}>
                    <SelectTrigger
                        className="font-VazirRegular text-neutral-07 w-full text-right text-base hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:!w-[160px]"
                        dir="ltr"
                    >
                        <SelectValue placeholder="همه وضعیت ها" />
                    </SelectTrigger>

                    <SelectContent dir="rtl" position="popper">
                        <SelectItem value="all" className="font-VazirRegular">
                            همه وضعیت ها
                        </SelectItem>
                        <SelectItem value="isUnreadForUser" className="font-VazirRegular">
                            پاسخ داده شده
                        </SelectItem>
                        <SelectItem value="isUnreadForAdmin" className="font-VazirRegular">
                            در حال بررسی
                        </SelectItem>
                        <SelectItem value="closed" className="font-VazirRegular">
                            بسته شده
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full overflow-hidden rounded-md border text-center">
                    <thead>
                        <tr className="text-neutral-07 font-VazirMedium border-b border-gray-100 bg-gray-50 text-xs">
                            <th className="py-4">شماره تیکت</th>
                            <th className="py-4">موضوع</th>
                            <th className="py-4">وضعیت</th>
                            <th className="py-4">آخرین بروزرسانی</th>
                            <th className="py-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!ticketsPending && tickets && tickets.length > 0 ? (
                            tickets?.map((ticket: TicketType) => <Ticket data={ticket} />)
                        ) : (
                            <tr>
                                <td>
                                    <Skeleton className="h-7 w-28 mx-auto" />
                                </td>
                                <td>
                                    <Skeleton className="h-7 w-28 mx-auto" />
                                </td>
                                <td>
                                    <Skeleton className="h-7 w-28 mx-auto" />
                                </td>
                                <td>
                                    <Skeleton className="h-7 w-40 mx-auto" />
                                </td>
                                <td>
                                    <Skeleton className="h-7 w-40 mx-auto" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {!ticketsPending && tickets.length == 0 ? (
                    <p className="w-full py-6 text-center sm:!py-30 sm:!text-2xl">
                        تیکتی یافت نشد
                    </p>
                ) : (
                    ''
                )}
            </div>
        </section>
    );
};

export default TicketsScreen;

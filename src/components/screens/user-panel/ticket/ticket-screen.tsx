import { TicketCheck } from 'lucide-react';
import React, { useState } from 'react';
import useTicket from '../../../../endpoints/useTicket';
import { Button } from '../../../ui/button';
import { toJalaliDate } from '../../../../utils/helpers';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { TicketMessage } from '../../../../types/ticket.types';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '../../../ui/skeleton';

const TicketScreen = () => {
    const [body, setBody] = useState('');
    const { id } = useParams();
    const { createMessageMutation, ticket, ticketPending } = useTicket(id);
    const queryClient = useQueryClient();

    const submitHandler = () => {
        if (!body) {
            toast.error('لطفا پیام خود را بنویسید');
        } else {
            createMessageMutation.mutate(
                { id, body },
                {
                    onSuccess() {
                        setBody('');
                        queryClient.invalidateQueries({
                            queryKey: ['ticket', id],
                        });
                    },
                },
            );
        }
    };

    return (
        <section className="my-10 rounded-md border bg-white p-6 shadow-lg">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <div className="flex items-center justify-start gap-3">
                        <div className="bg-neutral-01 flex size-9 items-center justify-center rounded-md">
                            <TicketCheck className="text-secondary-color-blue" />
                        </div>
                        <h2 className="font-VazirBold text-neutral-07 flex items-center gap-2 text-2xl">
                            تیکت شماره <span dir="ltr"> #{id?.slice(0, 8)}</span>
                        </h2>
                    </div>
                    <p className="font-VazirRegular mt-2 text-sm text-gray-500">
                        در این بخش می‌توانید وضعیت و پاسخ تیکت‌ خود را مشاهده کنید.
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                {!ticketPending ? (
                    ticket?.tickets.messages.map((msg: TicketMessage) => (
                        <div
                            className={`${msg.sender == 'user' ? 'ml-auto bg-blue-100' : 'bg-light-blue mr-auto text-black'} border-neutral-03 w-full max-w-[600px] rounded-md border p-3 sm:!w-1/2`}
                        >
                            <div className="flex items-center justify-between">
                                <p
                                    className={`${msg.sender == 'user' ? 'text-gray-500' : ''} text-sm`}
                                >
                                    {msg.sender == 'user' ? 'شما' : 'ادمین'}
                                </p>
                                <p className="text-xs">{toJalaliDate(msg.createdAt)}</p>
                            </div>
                            <p className="pt-3 break-words">{msg.body}</p>
                        </div>
                    ))
                ) : (
                    <>
                        <Skeleton
                            className={`ml-auto w-full max-w-[600px] rounded-md p-3 sm:!w-1/2`}
                        >
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-5 w-20 rounded-md bg-gray-300" />
                                <Skeleton className="h-5 w-20 rounded-md bg-gray-300" />
                            </div>
                            <Skeleton className="w-full mt-3 h-10 rounded-md bg-gray-300" />
                        </Skeleton>
                        <Skeleton
                            className={`mr-auto w-full max-w-[600px] rounded-md p-3 sm:!w-1/2`}
                        >
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-5 w-20 rounded-md bg-gray-300" />
                                <Skeleton className="h-5 w-20 rounded-md bg-gray-300" />
                            </div>
                            <Skeleton className="w-full mt-3 h-10 rounded-md bg-gray-300" />
                        </Skeleton>
                    </>
                )}
            </div>

            <div className="pt-12">
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    id="body"
                    className={`h-32 w-full rounded-md border border-gray-200 p-3 shadow-sm transition-all outline-none hover:shadow-[0_4px_4px_rgb(0,0,0,0.25)]`}
                    placeholder="متن پیام خود را با جزئیات وارد کنید..."
                />
                <Button
                    disabled={body.length == 0}
                    onClick={submitHandler}
                    className="w-full"
                    variant={'main'}
                >
                    ارسال پیام جدید
                </Button>
            </div>
        </section>
    );
};

export default TicketScreen;

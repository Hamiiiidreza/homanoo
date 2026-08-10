import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { localBackendUrl } from '../utils/constants';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const fetchTickets = async () => {
    const response = await fetch(`${localBackendUrl}/tickets`, {
        headers: {
            authorization: `Bearer ${Cookies.get('token')}`,
        },
    });
    const data = await response.json();
    return data;
};
const fetchTicket = async (id: string) => {
    const response = await fetch(`${localBackendUrl}/ticket/${id}`, {
        headers: {
            authorization: `Bearer ${Cookies.get('token')}`,
        },
    });
    const data = await response.json();
    return data;
};

const createTicket = async (data: any) => {
    const response = await fetch(`${localBackendUrl}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};
const createMessage = async (data: any) => {
    const response = await fetch(
        `${localBackendUrl}/tickets/${data.id}/messages`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({ body: data.body }),
        },
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};

const useTicket = (id?: string) => {
    const queryClient = useQueryClient();

    const createTicketMutation = useMutation({
        mutationFn: (data: any) => createTicket(data),
        mutationKey: ['createTicket'],
        onSuccess(data) {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ['tickets'],
            });
        },
        onError(data) {
            toast.error(data.message);
        },
    });

    const createMessageMutation = useMutation({
        mutationFn: (data: any) => createMessage(data),
        mutationKey: ['createMessage'],
        onSuccess(data) {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ['tickets'],
            });
        },
        onError(data) {
            toast.error(data.message);
        },
    });

    const { data: tickets, isPending: ticketsPending } = useQuery({
        queryKey: ['tickets'],
        queryFn: fetchTickets,
    });
    const { data: ticket, isPending: ticketPending } = useQuery({
        queryKey: ['ticket', id],
        queryFn: () => fetchTicket(String(id)),
    });

    return {
        ticket,
        ticketPending,
        tickets,
        ticketsPending,
        createTicketMutation,
        createMessageMutation,
    };
};

export default useTicket;
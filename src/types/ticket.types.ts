export interface TicketMessage {
    _id: string;
    sender: "user" | "admin";
    body: string;
    createdAt: string;
}

export interface Ticket {
    _id: string;
    title: string;
    status: "open" | "closed";
    user: string;
    isUnreadForAdmin: boolean;
    isUnreadForUser: boolean;
    messages: TicketMessage[];
    lastMessageAt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
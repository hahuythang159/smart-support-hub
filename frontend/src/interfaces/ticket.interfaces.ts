import { OnMessageAdded, Ticket } from "@/types";

export interface TicketFormProps {
    onTicketCreated: (ticket: Ticket) => void
}

export interface NewMessageFormProps {
    ticketId: string;
    token: string;
    onAdded?: OnMessageAdded;
}
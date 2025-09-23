import { Ticket } from "@/types";

export interface TicketFormProps {
    onTicketCreated: (ticket: Ticket) => void
}
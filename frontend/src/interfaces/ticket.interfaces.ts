import { PriorityType, StatusType } from "@/constants/ticketConstants";
import { OnMessageAdded, Ticket, Tickets, TicketUpdateRequest, UserRole } from "@/types";

export interface TicketFormProps {
    onTicketCreated: (ticket: Ticket) => void
}

export interface NewMessageFormProps {
    ticketId: string;
    token: string;
    onAdded?: OnMessageAdded;
}

export interface TicketSettingsListProps {
    tickets: Tickets;
    loading: boolean;
    error: string | null;
    userRole: UserRole;
    onUpdate: (ticketId: string, updates: TicketUpdateRequest) => void;
}

export interface UseTicketSettingsHandlersParams {
    userRole: string;
    onUpdate: (id: string, update: { status: StatusType; priority: PriorityType }) => void;
}

import { Ticket } from '@/types';
import { StatusType, PriorityType } from '@/constants/ticketConstants';
import { UseTicketSettingsHandlersParams } from '@/interfaces/ticket.interfaces';

export function useTicketSettingsHandlers({ userRole, onUpdate }: UseTicketSettingsHandlersParams) {
    const isStaff = userRole === 'staff';

    const handleStatusChange = (ticket: Ticket, newStatus: StatusType) => {
        if (isStaff && ticket.status === 'closed') {
            return;
        }
        onUpdate(ticket._id, {
            status: newStatus,
            priority: ticket.priority,
        });
    };

    const handlePriorityChange = (ticket: Ticket, newPriority: PriorityType) => {
        if (isStaff && ticket.status === 'closed') {
            return;
        }
        onUpdate(ticket._id, {
            status: ticket.status,
            priority: newPriority,
        });
    };

    return { isStaff, handleStatusChange, handlePriorityChange };
}

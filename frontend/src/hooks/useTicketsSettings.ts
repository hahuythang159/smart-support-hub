import { useFetchTickets } from './useFetchTickets';
import { useUpdateTicket } from './useUpdateTicket';
import { TicketUpdateRequest } from '@/types';

export const useTicketsSettings = (token: string | null) => {
    const { tickets, loading: fetchLoading, error: fetchError, refetch, setTickets } = useFetchTickets(token)

    const { updateTicket: updateTicketAPI, loading: updateLoading, error: updateError } = useUpdateTicket(token)

    const updateTicket = async (ticketId: string, updates: TicketUpdateRequest) => {
        const updated = await updateTicketAPI(ticketId, updates)
        if (updated) {
            setTickets(prev => prev.map(t => (t._id === ticketId ? updated : t)))
        }
    }

    return {
        tickets,
        loading: fetchLoading || updateLoading,
        fetchError,
        updateError,
        updateTicket,
        refetch
    };
};

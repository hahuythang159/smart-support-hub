import { useState } from 'react';
import { updateTicketService } from '@/services/ticket.service';
import { TicketUpdateRequest, Ticket } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useUpdateTicket = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const token = useSelector((state: RootState) => state.auth.token)

    const updateTicket = async (ticketId: string, updates: TicketUpdateRequest): Promise<Ticket | null> => {
        if (!token) return null
        setLoading(true)
        setError(null)

        try {
            const updated = await updateTicketService(ticketId, token, updates)
            return updated
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Failed to update ticket')
            }
            return null
        } finally {
            setLoading(false)
        }
    };

    return { updateTicket, loading, error }
};

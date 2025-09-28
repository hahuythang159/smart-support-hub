import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getTicketsService, updateTicketService } from '@/services/ticket.service';
import { Ticket, TicketUpdateRequest, Tickets } from '@/types';

export const useTicketsSettings = () => {
    const [tickets, setTickets] = useState<Tickets>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!token) return;

        const loadTickets = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTicketsService(token);
                setTickets(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load tickets');
            } finally {
                setLoading(false);
            }
        };

        loadTickets();
    }, [token]);

    const updateTicket = async (ticketId: string, updates: TicketUpdateRequest) => {
        if (!token) return;
        setLoading(true);
        setError(null);

        try {
            const updatedTicket = await updateTicketService(ticketId, token, updates);
            setTickets(prev => prev.map(t => (t._id === ticketId ? updatedTicket : t)));
        } catch (err: any) {
            setError(err.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleTicketCreated = (newTicket: Ticket) => {
        setTickets(prev => [...prev, newTicket]);
    };

    return { tickets, loading, error, updateTicket, handleTicketCreated };
};

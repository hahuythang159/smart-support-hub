import { useEffect, useState } from 'react';
import { getTicketByIdService } from '@/services/ticket.service';
import { Ticket, Message } from '@/types';

export const useTicketDetail = (id: string, token: string) => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Ticket ID is missing.');
            setLoading(false);
            return;
        }

        const fetchTicket = async () => {
            try {
                const data = await getTicketByIdService(id as string, token!);
                setTicket(data);
            } catch (err: any) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id, token]);

    const handleMessageAdded = async (newMessage: Message) => {
        setTicket((prevTicket) => {
            if (!prevTicket) return prevTicket;

            return {
                ...prevTicket,
                messages: [...prevTicket.messages, newMessage]
            }
        });
    }

    return { ticket, loading, error, handleMessageAdded };
};

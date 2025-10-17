import { useState, useEffect, useCallback } from 'react';
import { getTicketsService } from '@/services/ticket.service';
import { Tickets } from '@/types';

export const useFetchTickets = (token: string | null) => {
    const [tickets, setTickets] = useState<Tickets>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchTickets = useCallback(async () => {
        if (!token) return
        setLoading(true)
        setError(null)
        try {
            const data = await getTicketsService(token)
            setTickets(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Failed to load tickets')
            }
        } finally {
            setLoading(false)
        }
    }, [token])

    useEffect(() => {
        fetchTickets()
    }, [fetchTickets])

    return { tickets, loading, error, refetch: fetchTickets, setTickets }
};

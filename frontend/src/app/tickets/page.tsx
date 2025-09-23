'use client';

import TicketCard from '@/components/ticket/TicketCard';
import TicketForm from '@/components/ticket/TicketForm';
import { useTickets } from '@/hooks/useTickets';

const TicketsPage = () => {
    const { tickets, userRole, error, loading, handleTicketCreated } = useTickets()

    return (
        <div className="space-y-6">
            <TicketForm onTicketCreated={handleTicketCreated} />
            {error && <h2 >{error}</h2>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 gap-3">
                    {tickets.map((t) => (
                        <TicketCard key={t._id} ticket={t} role={userRole} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TicketsPage;

'use client';

import TicketCard from '@/components/ticket/TicketCard';
import TicketForm from '@/components/ticket/TicketForm';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useTickets } from '@/hooks/useTickets';

const TicketsPage = () => {
    const { tickets, userRole, error, loading, handleTicketCreated } = useTickets()
    const { hasAccess } = useProtectedRoute(['admin', 'staff'])

    if (!hasAccess) {
        return null
    }

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

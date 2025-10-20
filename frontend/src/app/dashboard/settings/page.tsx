'use client'

import React from 'react';
import { useTicketsSettings } from '@/hooks/useTicketsSettings';
import TicketSettingsList from '@/components/ticket/TicketSettingsList';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

const SettingsPage = () => {
    const { hasAccess } = useProtectedRoute(['admin', 'staff'])

    const { tickets, loading, fetchError, updateError, updateTicket } = useTicketsSettings()

    if (!hasAccess) return null

    return (
        <main>
            <h1>Settings - Tickets</h1>
            {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
            {updateError && <p style={{ color: 'red' }}>{updateError}</p>}

            <TicketSettingsList
                tickets={tickets}
                loading={loading}
                onUpdate={updateTicket}
            />
        </main>
    );
};

export default SettingsPage;

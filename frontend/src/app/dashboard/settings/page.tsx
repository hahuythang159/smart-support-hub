'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useTicketsSettings } from '@/hooks/useTicketsSettings';
import TicketSettingsList from '@/components/ticket/TicketSettingsList';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

const SettingsPage = () => {
    const { token, role } = useSelector((state: RootState) => state.auth)
    const { hasAccess } = useProtectedRoute(['admin', 'staff'])

    const { tickets, loading, fetchError, updateError, updateTicket } = useTicketsSettings(token)

    if (!hasAccess) return null

    return (
        <main>
            <h1>Settings - Tickets</h1>
            {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
            {updateError && <p style={{ color: 'red' }}>{updateError}</p>}

            <TicketSettingsList
                tickets={tickets}
                loading={loading}
                userRole={role}
                onUpdate={updateTicket}
            />
        </main>
    );
};

export default SettingsPage;

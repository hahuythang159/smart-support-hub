'use client'

import React from 'react';
import { useTicketsSettings } from '@/hooks/useTicketsSettings';
import TicketSettingsList from '@/components/ticket/TicketSettingsList';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const SettingsPage = () => {
    const { tickets, loading, error, updateTicket } = useTicketsSettings();
    const { hasAccess } = useProtectedRoute(['admin', 'staff'])
    const role = useSelector((state: RootState) => state.auth.role)

    if (!hasAccess) {
        return null
    }

    return (
        <main>
            <h1>Settings - Tickets</h1>
            <TicketSettingsList
                tickets={tickets}
                loading={loading}
                error={error}
                userRole={role}
                onUpdate={updateTicket}
            />
        </main>
    );
};

export default SettingsPage;

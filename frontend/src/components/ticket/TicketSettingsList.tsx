'use client'

import React from 'react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, StatusType, PriorityType } from '@/constants/ticketConstants';
import { TicketSettingsListProps } from '@/interfaces/ticket.interfaces';
import { useTicketSettingsHandlers } from '@/hooks/useTicketSettingsHandlers';

export default function TicketSettingsList({ tickets, loading, error, userRole, onUpdate }: TicketSettingsListProps) {

  const { isStaff, handleStatusChange, handlePriorityChange } = useTicketSettingsHandlers({ userRole: userRole ?? '', onUpdate });

  return (
    <div>
      {loading && <p>Loading tickets...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Updated At</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => {
            const disableStatus = isStaff && ticket.status === 'closed';
            return (
              <tr key={ticket._id}>
                <td className="border border-gray-300 px-4 py-2">{ticket.title}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(ticket.createdAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(ticket.updatedAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={ticket.status}
                    onChange={e => handleStatusChange(ticket, e.target.value as StatusType)}
                    className="border rounded px-2 py-1"
                    disabled={disableStatus}
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={ticket.priority}
                    onChange={e => handlePriorityChange(ticket, e.target.value as PriorityType)}
                    className="border rounded px-2 py-1"
                    disabled={isStaff && ticket.status === 'closed'}
                  >
                    {PRIORITY_OPTIONS.map(priority => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

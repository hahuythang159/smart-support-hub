'use client';

import React from 'react';
import { TicketCardProps } from '@/types';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';

const TicketCard: React.FC<TicketCardProps> = ({ ticket, role }) => {
    const { title, description, status, priority, tags, createdAt, updatedAt } = ticket;

    const statusColor = (status: 'open' | 'pending' | 'resolved' | 'closed') => {
        switch (status) {
            case 'open':
                return 'bg-blue-500';
            case 'pending':
                return 'bg-yellow-500';
            case 'resolved':
                return 'bg-green-500';
            case 'closed':
                return 'bg-gray-500';
            default:
                return '';
        }
    };

    const priorityColor = (priority: 'low' | 'medium' | 'high') => {
        switch (priority) {
            case 'low':
                return 'bg-green-300';
            case 'medium':
                return 'bg-yellow-300';
            case 'high':
                return 'bg-red-300';
            default:
                return '';
        }
    };

    return (
        <div className="p-4 border rounded-md shadow-sm space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className={`px-2 py-1 text-white text-sm rounded ${statusColor(status)}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
            </div>

            <p className="text-gray-600">{description}</p>

            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-xs bg-gray-200 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex justify-between text-sm text-gray-500">
                <span>Priority: <span className={`px-2 py-1 rounded ${priorityColor(priority)}`}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span></span>
                <span>Created: {formatDate(createdAt)}</span>
                <span>Updated: {formatDate(updatedAt)}</span>
            </div>

            {/* Optionally show assignee or requester */}
            {role !== 'user' && (
                <div className="mt-2 text-sm text-gray-700">
                    {ticket.assigneeId ? (
                        <span>Assigned to: {ticket.assigneeId}</span>
                    ) : (
                        <span>Not assigned yet</span>
                    )}
                </div>
            )}

            {/* Link to ticket detail page */}
            <div className="mt-4">
                <Link href={`/tickets/${ticket._id}`} className="text-blue-500 hover:underline">
                    View Ticket Details
                </Link>
            </div>
        </div>
    );
};

export default TicketCard;

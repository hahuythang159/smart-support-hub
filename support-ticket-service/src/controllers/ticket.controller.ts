import { Response } from 'express';
import Ticket from '../models/ticket.model';
import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

export const createTicket = async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, priority, tags } = req.body;
    const requesterId = req.user?.id;
    if (!requesterId) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const ticket = await Ticket.create({ title, description, priority, tags, requesterId });
        res.status(201).json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Create ticket failed', error: err });
    }
};

export const getTickets = async (req: AuthenticatedRequest, res: Response) => {
    const { status, requesterId, assigneeId, page = 1, limit = 20 } = req.query as any;
    const filter: any = {};
    if (status) filter.status = status;
    if (requesterId) filter.requesterId = requesterId;
    if (assigneeId) filter.assigneeId = assigneeId;

    // Basic RBAC: users only see their tickets unless staff
    if (req.user?.role !== 'staff' && req.user?.role !== 'admin') {
        filter.requesterId = req.user?.id;
    }

    try {
        const tickets = await Ticket.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Get tickets failed', error: err });
    }
};

export const getTicketById = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        // Access control
        if (req.user?.role !== 'staff' && req.user?.role !== 'admin' && ticket.requesterId.toString() !== req.user?.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Get ticket failed', error: err });
    }
};

export const addMessage = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params; // ticket id
    const { content } = req.body;
    const authorId = req.user?.id;
    const authorRole = req.user?.role === 'staff' ? 'staff' : 'user';

    if (!authorId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        // Check if the ticket is resolved or closed (no messaging allowed)
        if (ticket.status === 'resolved' || ticket.status === 'closed') {
            if (authorRole !== 'staff') {
                return res.status(403).json({ message: 'Forbidden: Cannot add message to resolved or closed ticket' });
            }
        }

        // if user, ensure owns ticket
        if (authorRole === 'user' && ticket.requesterId.toString() !== authorId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Add the message
        ticket.messages.push({ authorId, authorRole, content, createdAt: new Date() } as any);

        // Optionally change status when staff replies
        if (authorRole === 'staff') {
            if (ticket.status === 'resolved' || ticket.status === 'closed') {
                return res.status(403).json({ message: 'Cannot add messages to a closed or resolved ticket' });
            }
            ticket.status = 'pending'; // Change to pending when staff replies
        }

        await ticket.save();
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Add message failed', error: err });
    }
};

export const updateTicket = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    console.log(req.user?.role);

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        // Check if the ticket is closed (no status change allowed except for admin)
        if (ticket.status === 'closed' && req.user?.role !== 'admin') {
            return res.status(403).json({ message: 'Cannot update a closed ticket' });
        }

        // Only staff or owner can update certain fields
        if (req.user?.role !== 'staff' && req.user?.role !== 'admin' && ticket.requesterId.toString() !== req.user?.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Apply allowed updates
        const allowed = ['title', 'description', 'status', 'priority', 'assigneeId', 'tags'];
        for (const key of allowed) {
            if (key in updates) {
                if (key === 'status') {
                    const newStatus = updates[key];

                    // Don't allow changing status if it's resolved or closed, except in certain cases
                    if (ticket.status === 'resolved' || ticket.status === 'closed') {
                        if (newStatus !== 'open' && newStatus !== 'pending') {
                            return res.status(403).json({ message: 'Cannot change status from resolved or closed to anything other than open or pending' });
                        }
                    }

                    // If updating to resolved, check that it's a staff/admin user
                    if (newStatus === 'resolved' && req.user?.role !== 'staff' && req.user?.role !== 'admin') {
                        return res.status(403).json({ message: 'Only staff or admin can resolve a ticket' });
                    }

                    // If updating to closed, ensure only staff or admin can do so
                    if (newStatus === 'closed' && req.user?.role !== 'staff' && req.user?.role !== 'admin') {
                        return res.status(403).json({ message: 'Only staff or admin can close a ticket' });
                    }
                }
                ticket[key] = updates[key];
            }
        }

        await ticket.save();
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Update failed', error: err });
    }
};


export const deleteTicket = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        if (req.user?.role !== 'staff' && ticket.requesterId.toString() !== req.user?.id) return res.status(403).json({ message: 'Forbidden' });
        await ticket.deleteOne();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Delete failed', error: err });
    }
};
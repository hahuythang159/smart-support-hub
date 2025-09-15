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
        // if user, ensure owns ticket
        if (authorRole === 'user' && ticket.requesterId.toString() !== authorId) return res.status(403).json({ message: 'Forbidden' });


        ticket.messages.push({ authorId, authorRole, content, createdAt: new Date() } as any);
        // Optionally change status when staff replies
        if (authorRole === 'staff') ticket.status = 'pending';
        await ticket.save();
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Add message failed', error: err });
    }
};


export const updateTicket = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        // Only staff or owner can update certain fields
        if (req.user?.role !== 'staff' && ticket.requesterId.toString() !== req.user?.id) return res.status(403).json({ message: 'Forbidden' });

        // apply allowed updates
        const allowed = ['title', 'description', 'status', 'priority', 'assigneeId', 'tags'];
        for (const key of allowed) {
            if (key in updates) (ticket as any)[key] = updates[key];
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
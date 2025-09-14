import mongoose, { Schema } from 'mongoose';
import { MessageSchema } from './message.model';
import { ITicket } from '../interfaces/ticket.interface';

const TicketSchema = new Schema<ITicket>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requesterId: { type: Schema.Types.ObjectId, required: true, index: true },
    assigneeId: { type: Schema.Types.ObjectId, default: null },
    status: { type: String, enum: ['open', 'pending', 'resolved', 'closed'], default: 'open' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    tags: { type: [String], default: [] },
    messages: { type: [MessageSchema], default: [] }
}, { timestamps: true });


export default mongoose.model<ITicket>('Ticket', TicketSchema);
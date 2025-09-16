import { Types } from "mongoose";
import { IMessage } from "./message.interface";

export interface ITicket extends Document {
    title: string;
    description: string;
    requesterId: Types.ObjectId;
    assigneeId?: Types.ObjectId | null;
    status: 'open' | 'pending' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
    [key: string]: any;
}

import { Types } from "mongoose";

export interface IMessage {
    authorId: Types.ObjectId;
    authorRole: 'user' | 'staff' | 'system';
    content: string;
    createdAt: Date;
}

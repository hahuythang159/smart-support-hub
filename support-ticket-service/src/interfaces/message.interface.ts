import { Types } from "mongoose";

export interface IMessage {
    authorId: Types.ObjectId;
    authorRole: 'user' | 'staff' | 'admin';
    content: string;
    createdAt: Date;
}

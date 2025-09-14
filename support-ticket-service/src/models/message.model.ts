import { Schema } from "mongoose";
import { IMessage } from "../interfaces/message.interface";

export const MessageSchema = new Schema<IMessage>({
    authorId: { type: Schema.Types.ObjectId, required: true },
    authorRole: { type: String, enum: ['user', 'staff', 'system'], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

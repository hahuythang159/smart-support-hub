import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
    id: Types.ObjectId;
    email: string;
    password: string;
    role: "user" | "admin";
}

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IUser>('User', UserSchema);

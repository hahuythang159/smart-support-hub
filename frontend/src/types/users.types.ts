import { UserRole } from "./auth.types";

export type User = {
    _id: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export type Users = User[]
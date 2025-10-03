import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: { id: string; role?: 'user' | 'staff' | 'admin' };
}
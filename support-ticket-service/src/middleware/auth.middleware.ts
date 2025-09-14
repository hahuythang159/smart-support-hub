import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    const jwtSecret = process.env.JWT_SECRET;

    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
    const token = auth.split(' ')[1];

    if (!jwtSecret) {
        return res.status(500).json({ message: 'Server misconfiguration: JWT_SECRET is missing' });
    }

    try {
        const payload = jwt.verify(token, jwtSecret) as any;
        req.user = { id: payload.sub || payload.userId || payload.id, role: payload.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
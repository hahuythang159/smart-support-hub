import User from '../models/user.model';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { Response } from 'express';

export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
    if (req.user?.role !== 'admin' && req.user?.role !== 'staff') {
        return res.status(403).json({ message: 'Forbidden: Not authorized to view all users' });
    }

    try {
        const users = await User.find().select('-password');
        return res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Get users failed', error: err });
    }
};
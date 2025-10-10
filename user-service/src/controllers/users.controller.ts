import User from '../models/user.model';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import { comparePassword, hashPassword } from '../utils/hash';

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

export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Please provide both current and new passwords.' })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        const isMatch = await comparePassword(currentPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect.' })
        }

        const hashedNewPassword = await hashPassword(newPassword)
        user.password = hashedNewPassword;

        await user.save();

        return res.status(200).json({ message: 'Password changed successfully.' })
    } catch (err) {
        res.status(500).json({ message: 'Failed to change password.', error: err })
    }
}

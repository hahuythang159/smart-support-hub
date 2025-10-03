import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/authenticated-request.interface";

export const isStaffOrAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'staff') {
        return res.status(403).json({ message: "Access denied, staff or admin only" });
    }

    next();
};
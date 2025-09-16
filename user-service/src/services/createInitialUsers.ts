import User from '../models/user.model';
import { hashPassword } from '../utils/hash';

export const createInitialUsers = async () => {
    const adminEmail = process.env.ADMIN_EMAIL!;
    const adminPassword = process.env.ADMIN_PASSWORD!;
    const staffEmail = process.env.STAFF_EMAIL!;
    const staffPassword = process.env.STAFF_PASSWORD!;

    try {
        let admin = await User.findOne({ email: adminEmail });
        if (!admin) {
            const hashedAdminPassword = await hashPassword(adminPassword);
            admin = new User({
                email: adminEmail,
                password: hashedAdminPassword,
                role: 'admin',
            });
            await admin.save();
        }

        let staff = await User.findOne({ email: staffEmail });
        if (!staff) {
            const hashedStaffPassword = await hashPassword(staffPassword);
            staff = new User({
                email: staffEmail,
                password: hashedStaffPassword,
                role: 'staff',
            });
            await staff.save();
        }
    } catch (error) {
        console.error('Error creating initial users:', error);
    }
};

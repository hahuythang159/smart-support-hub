import { TopBarMenuHandlers, TopbarMenuItem } from "@/interfaces";
import { UserRole } from "@/types";
import { Dashboard, LogoutOutlined, Settings } from "@mui/icons-material";
import { Avatar } from "@mui/material";

export const getMenuItems = (handlers: TopBarMenuHandlers, role: UserRole): TopbarMenuItem[] => {
    const allItems: TopbarMenuItem[] = [
        {
            label: "Profile",
            icon: <Avatar sx={{ width: 24, height: 24, mr: 1 }} />,
            onClick: handlers.onProfile
        },
        {
            label: "Settings",
            icon: <Settings fontSize="small" />,
            onClick: handlers.onSettings
        },
        {
            label: "Dashboard",
            icon: <Dashboard fontSize="small" />,
            onClick: handlers.onDashboard,
            roles: ['admin', 'staff'],
            dividerAfter: true
        },
        {
            label: "Logout",
            icon: <LogoutOutlined fontSize="small" />,
            onClick: handlers.onLogout
        },
    ]
    return allItems.filter((item) => !item.roles || item.roles.includes(role))
}

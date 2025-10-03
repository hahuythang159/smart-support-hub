import { useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { getMenuItems } from "@/configs/topbarMenuConfig";

export const useTopbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const router = useRouter();
    const role = useSelector((state: RootState) => state.auth.role)

    const handleLogout = () => {
        dispatch(logout());
        router.push('/auth/login');
    };

    const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        // TODO: Implement navigation to user profile page
    };

    const handleSettingsClick = () => {
        // TODO: Implement navigation to user settings page
    };

    const handleNotificationClick = () => {
        // TODO: Implement notification panel toggle or redirect to notifications page
    };

    const handleDashboardClick = () => {
        router.push('/dashboard/tickets')
    }

    const items = getMenuItems({ onProfile: handleProfileClick, onSettings: handleSettingsClick, onDashboard: handleDashboardClick, onLogout: handleLogout }, role)

    return { items, anchorEl, open, handleOpenMenu, handleCloseMenu, handleNotificationClick };
};

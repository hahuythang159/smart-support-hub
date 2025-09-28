import { useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";

export const useTopbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const router = useRouter();

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

    return { anchorEl, open, handleLogout, handleOpenMenu, handleCloseMenu, handleProfileClick, handleSettingsClick, handleNotificationClick };
};

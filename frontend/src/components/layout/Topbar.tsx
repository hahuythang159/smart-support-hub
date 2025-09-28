"use client";

import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Tooltip, Menu, MenuItem, Divider, ListItemIcon, Grow } from "@mui/material";
import { Notifications, Settings, Logout } from "@mui/icons-material";
import { useTopbar } from "@/hooks/useTopbar";

export default function Topbar() {
    const { anchorEl, open, handleLogout, handleOpenMenu, handleCloseMenu, handleProfileClick, handleSettingsClick, handleNotificationClick } = useTopbar();

    return (
        <AppBar position="fixed" color="default" elevation={0}
            sx={{
                borderBottom: "1px solid",
                borderColor: (theme) => theme.palette.divider,
                backgroundColor: (theme) => theme.palette.background.paper,
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight="bold" noWrap>
                    Dashboard
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    {/* Notifications */}
                    <Tooltip title="Notifications">
                        <IconButton color="inherit" onClick={handleNotificationClick}>
                            <Notifications />
                        </IconButton>
                    </Tooltip>

                    {/* Avatar + Menu */}
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                            <Avatar alt="User Avatar" src="" />
                        </IconButton>
                    </Tooltip>

                    <Menu disableScrollLock anchorEl={anchorEl} open={open}
                        onClose={handleCloseMenu}
                        slots={{ transition: Grow }}
                        slotProps={{
                            transition: { timeout: 200 },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        keepMounted
                    >
                        <MenuItem onClick={() => { handleProfileClick(); handleCloseMenu(); }}>
                            <Avatar sx={{ width: 24, height: 24, mr: 1 }} /> Profile
                        </MenuItem>
                        <MenuItem onClick={() => { handleSettingsClick(); handleCloseMenu(); }}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => { handleLogout(); handleCloseMenu(); }}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

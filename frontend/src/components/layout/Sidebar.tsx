'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/hooks/useSidebar';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { menuItems } from '@/constants/menuItems';

export default function Sidebar() {
    const pathname = usePathname();
    const { open, handleMouseEnter, handleMouseLeave } = useSidebar()

    return (
        <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                width: open ? 240 : 64,
                transition: 'width 0.3s ease',
                overflow: 'hidden',
                height: '100vh',
                bgcolor: 'background.paper',
                borderRight: '1px solid',
                borderColor: 'divider',
                flexShrink: 0,
            }}
        >
            <Toolbar>
                <Box
                    sx={{
                        width: '100%',
                        textAlign: open ? 'left' : 'center',
                        fontWeight: 'bold',
                        opacity: open ? 1 : 0,
                        transform: open ? 'translateX(0)' : 'translateX(-20px)',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {open ? 'My Dashboard' : 'M'}
                </Box>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.href} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={Link}
                            href={item.href}
                            selected={pathname.startsWith(item.href)}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 0,
                                    justifyContent: 'center',
                                    display: 'flex',
                                    transition: 'margin 0.3s ease',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                sx={{
                                    opacity: open ? 1 : 0,
                                    transform: open ? 'translateX(0)' : 'translateX(-20px)',
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    ml: open ? 1 : 0,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

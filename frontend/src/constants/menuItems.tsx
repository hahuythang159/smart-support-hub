import { MenuItem } from '@/interfaces/layout.interfaces';
import TicketIcon from '@mui/icons-material/ConfirmationNumber';
import SettingsIcon from '@mui/icons-material/Settings';

export const menuItems: MenuItem[] = [
    { name: 'Tickets', href: '/dashboard/tickets', icon: <TicketIcon /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <SettingsIcon /> },
];

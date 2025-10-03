import { UserRole } from '@/types';
import { ReactElement } from 'react';

export interface MenuItem {
    name: string;
    href: string;
    icon: ReactElement;
}

export interface TopBarMenuHandlers {
    onProfile: () => void;
    onSettings: () => void;
    onDashboard: () => void;
    onLogout: () => void;
}

export interface TopbarMenuItem {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    dividerAfter?: boolean;
    roles?: UserRole[];
}
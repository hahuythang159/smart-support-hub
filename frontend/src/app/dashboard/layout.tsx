'use client';

import { ReactNode } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Topbar */}
            <Topbar />

            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    bgcolor: 'background.default',
                    minHeight: '100vh',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

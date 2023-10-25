import Box from '@mui/material/Box';
import React from 'react';
import { Outlet } from 'react-router-dom';

import MenuAppBar from '../../components/AppBar/AppBar';
import { DrawerHeader } from '../../components/AppBar/StyledComponents/StyledComponents';
import Footer from '../../components/Footer/Footer';

export default function Layout() {
    return (
        <Box component="div" sx={{ display: 'flex' }}>
            <MenuAppBar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <DrawerHeader />
                <Outlet />
                <Footer />
            </Box>
        </Box>
    );
}

import React from 'react';
import Box from "@mui/material/Box";
import {DrawerHeader} from "../../components/AppBar/StyledComponents/StyledComponents";
import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import MenuAppBar from "../../components/AppBar/AppBar";

export default function Layout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <MenuAppBar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <DrawerHeader />
                <Outlet />
                <Footer />
            </Box>
        </Box>
    );
}
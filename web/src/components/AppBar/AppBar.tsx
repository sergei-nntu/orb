import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import NavigationIcon from '@mui/icons-material/Navigation';
import {ReactElement} from "react";
import {AppBar, Drawer, DrawerHeader} from "./StyledComponents/StyledComponents";
import Footer from "../Footer/Footer";

const data = [
    {
        icon: <NavigationIcon />,
        text: "Navigation"
    },
    {
        icon: <PrecisionManufacturingIcon />,
        text: "Manipulator"
    },
    {
        icon: <NextPlanIcon />,
        text: "Planning"
    },
    {
        icon: <QrCode2Icon />,
        text: "QR"
    },
];

type MenuAppBarProps = { children: ReactElement; };

export default function MenuAppBar(props: MenuAppBarProps) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("Navigation");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setValue(event.currentTarget.getAttribute("data-text") || "");
        handleDrawerClose();
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {value}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {data.map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            sx={{ display: 'block' }}
                            data-text={item.text}
                            onClick={(event) => handleButtonClick(event)}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
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
                {props.children}
                <Footer />
            </Box>
        </Box>
    );
}
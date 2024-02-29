import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import NavigationIcon from '@mui/icons-material/Navigation';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect } from 'react';

import { API_ROUTES, KEY } from '../../constants';
import { NotificationContext } from '../../contexts/NotificationContext/NotificationContext';
import { PoseContext } from '../../contexts/PoseContext/PoseContext';
import useHttp from '../../hooks/Http/Http';
import { useRouter } from '../../hooks/Router/Router';
import { NOTIFICATION, POSE } from '../../types/appTypes';
import { AppBar, Drawer, DrawerHeader } from './StyledComponents/StyledComponents';

const drawerData = [
    {
        icon: <NavigationIcon />,
        text: 'Navigation',
    },
    {
        icon: <PrecisionManufacturingIcon />,
        text: 'Manipulator',
    },
    {
        icon: <NextPlanIcon />,
        text: 'Planning',
    },
    {
        icon: <QrCode2Icon />,
        text: 'QR',
    },
    {
        icon: <SmartToyIcon />,
        text: 'Dog',
    },
];

export default function MenuAppBar() {
    const theme = useTheme();
    const { request } = useHttp();
    const router = useRouter();
    const { dispatchNotification } = useContext(NotificationContext);
    const { dispatch } = useContext(PoseContext);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('Navigation');

    useEffect(() => {
        calculateTitle();
    }, []);

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        const value = event.currentTarget.getAttribute('data-text') || '';
        setTitle(value);
        const path = calculatePath(value);
        router.push(path);
        handleDrawerClose();
    };

    const calculateTitle = () => {
        if (router.pathname === '/') return;
        const pathname = router.pathname.replace('/', '');
        setTitle(pathname.charAt(0).toUpperCase() + pathname.slice(1));
    };

    const calculatePath = (value: string) => {
        return value === 'Navigation' ? '/' : value.toLowerCase();
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const ExecuteBlockly = async () => {
        const blocklyCode = localStorage.getItem(KEY.BLOCKLY_CODE);

        if (!blocklyCode) {
            console.error('There is no blockly code and/or blockly structure');
            dispatchNotification({ type: NOTIFICATION.NO_BLOCKLY_PROGRAM, open: true });
            return;
        }

        const options = {
            method: 'POST',
            body: JSON.stringify({
                source: localStorage.getItem(KEY.BLOCKLY_CODE),
                structure: localStorage.getItem(KEY.BLOCKLY_STRUCTURE),
            }),
        };

        await request(API_ROUTES.SET_ACTIVE_PROGRAM, options);
        const res = await request(API_ROUTES.START_PROGRAM);

        if (res?.success) {
            dispatchNotification({ type: NOTIFICATION.RUN_BLOCKLY, open: true });
        } else if (res?.success === false) {
            dispatchNotification({ type: NOTIFICATION.BLOCKLY_IS_ALREADY_RUNNING, open: true });
        } else {
            dispatchNotification({ type: NOTIFICATION.BLOCKLY_WITHOUT_SERVER, open: true });
        }
    };

    const StopBlockly = async () => {
        const res = await request(API_ROUTES.STOP_PROGRAM);
        if (res?.success) {
            dispatchNotification({ type: NOTIFICATION.STOP_BLOCKLY, open: true });
        } else if (res?.success === false) {
            dispatchNotification({ type: NOTIFICATION.BLOCKLY_IS_STOPPED, open: true });
        } else {
            dispatchNotification({ type: NOTIFICATION.BLOCKLY_WITHOUT_SERVER, open: true });
        }
    };

    const SaveBlockly = async () => {
        let blocklyCode = localStorage.getItem(KEY.BLOCKLY_CODE);
        let blocklyStructure = localStorage.getItem(KEY.BLOCKLY_STRUCTURE);

        if (!blocklyCode) {
            blocklyCode = 'pass';
            blocklyStructure = '{}';
        }

        const options = {
            method: 'POST',
            body: JSON.stringify({
                source: blocklyCode,
                structure: blocklyStructure,
            }),
        };

        const res = await request(API_ROUTES.SET_ACTIVE_PROGRAM, options);
        if (res?.success) {
            dispatchNotification({ type: NOTIFICATION.SAVE_BLOCKLY, open: true });
        } else if (res?.success === undefined) {
            dispatchNotification({ type: NOTIFICATION.BLOCKLY_WITHOUT_SERVER, open: true });
        }
    };

    const getPose = () => {
        request(API_ROUTES.GET_POSE_STATE).then((res) => {
            if (!res?.data) {
                return;
            }
            dispatch({
                type: POSE.SET_PREV_STATE,
                prevState: {
                    position: {
                        x: res.data.x,
                        y: res.data.y,
                        z: res.data.z,
                    },
                    orientation: {
                        pitch: res.data.pitch,
                        roll: res.data.roll,
                        yaw: res.data.yaw,
                    },
                },
            });
        });
    };

    useEffect(() => {
        getPose();
    }, []);

    return (
        <>
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
                        {title}
                    </Typography>
                    {router.pathname === '/planning' && (
                        <>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/*// @ts-ignore*/}
                            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                                <PlayArrowIcon
                                    onClick={ExecuteBlockly}
                                    sx={{ ml: 2, cursor: 'pointer' }}
                                    fontSize="medium"
                                />
                                <StopIcon onClick={StopBlockly} sx={{ ml: 1, cursor: 'pointer' }} fontSize="medium" />
                            </Box>
                            <Button sx={{ ml: 1 }} onClick={SaveBlockly} variant="text" color="inherit">
                                SAVE
                            </Button>
                        </>
                    )}
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
                    {drawerData.map((item) => (
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
        </>
    );
}

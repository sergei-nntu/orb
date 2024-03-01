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
import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { API_ROUTES, DISABLED_TABS, KEY, TAB } from '../../constants';
import { NotificationContext } from '../../contexts/NotificationContext/NotificationContext';
import { PoseContext } from '../../contexts/PoseContext/PoseContext';
import useHttp from '../../hooks/Http/Http';
import { useRouter } from '../../hooks/Router/Router';
import { NOTIFICATION, POSE } from '../../types/appTypes';
import { AppBar, Drawer, DrawerHeader } from './StyledComponents/StyledComponents';

const drawerData = [
    {
        icon: <NavigationIcon />,
        tab: TAB.NAVIGATION,
    },
    {
        icon: <PrecisionManufacturingIcon />,
        tab: TAB.MANIPULATOR,
    },
    {
        icon: <NextPlanIcon />,
        tab: TAB.PLANNING,
    },
    {
        icon: <QrCode2Icon />,
        tab: TAB.QR,
    },
    {
        icon: <SmartToyIcon />,
        tab: TAB.OQP,
    },
];

export default function MenuAppBar() {
    const theme = useTheme();
    const router = useRouter();

    const { request } = useHttp();
    const { dispatch } = useContext(PoseContext);
    const { dispatchNotification } = useContext(NotificationContext);

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(TAB.NAVIGATION);

    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);
    const connectionStatus = useRef<boolean | undefined>(undefined);

    useEffect(() => {
        const currentTab = getCurrentTab();
        setTitle(currentTab);
    });

    const getCurrentTab = () => {
        const pathname = router.pathname.replace('/', '');
        const foundTab = drawerData.find((item) => item.tab.toLowerCase() === pathname);
        return foundTab ? foundTab.tab : TAB.NAVIGATION;
    };

    useEffect(() => {
        getPose();
        interval.current = setInterval(handleUSBConnection, 2000);
        return () => {
            clearInterval(interval.current);
        };
    }, []);

    const handleUSBConnection = async () => {
        const res = await getUSBConnectionStatus();
        if (thereIsNoConnection(res) || isSameUSBStatus(res)) {
            clearInterval(interval.current);
            return;
        }

        connectionStatus.current = res.connection;
        handleUSBNotification();
    };

    const getUSBConnectionStatus = async () => {
        return await request(API_ROUTES.GET_USB_CONNECTION_STATUS);
    };

    const isSameUSBStatus = (res: { connection: boolean }) => {
        return res.connection === connectionStatus.current;
    };

    const thereIsNoConnection = (res: { connection: boolean }) => {
        return res === undefined;
    };

    const handleUSBNotification = useCallback(() => {
        const notificationType = connectionStatus.current ? NOTIFICATION.USB_ENABLED : NOTIFICATION.USB_DISABLED;
        dispatchNotification({ type: notificationType, open: true });
    }, [connectionStatus.current]);

    // FIXME: it's not good way to define tab and path. Fix it
    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        const tab = event.currentTarget.getAttribute('data-text') || '';
        const path = calculatePath(tab);
        router.push(path);
        handleDrawerClose();
    };

    const calculatePath = (tab: string) => {
        return tab === TAB.NAVIGATION ? '/' : tab.toLowerCase();
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
                    {title === TAB.PLANNING && (
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
                            key={item.tab}
                            disablePadding
                            sx={{ display: 'block' }}
                            data-text={item.tab}
                            onClick={(event) => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                if (!connectionStatus.current && DISABLED_TABS.includes(item.tab)) {
                                    return;
                                }
                                handleButtonClick(event);
                            }}
                        >
                            <ListItemButton
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                disabled={!connectionStatus.current && DISABLED_TABS.includes(item.tab)}
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
                                <ListItemText primary={item.tab} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

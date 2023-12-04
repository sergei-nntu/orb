import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MessagesProvider from './contexts/MessagesContext/MessagesProvider/MessagesProvider';
import NotificationProvider from './contexts/NotificationContext/NotificationProvider/NotificationProvider';
import PoseProvider from './contexts/PoseContext/PoseProvider/PoseProvider';
import Layout from './hoc/Layout/Layout';
import ErrorPage from './pages/error-page/ErrorPage';
import Manipulator from './pages/manipulator/Manipulator';
import Navigation from './pages/navigation/Navigation';
import Planning from './pages/planning/Planning';
import QRPage from './pages/qr-page/QRPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigation />,
            },
            {
                path: '/manipulator',
                element: <Manipulator />,
            },
            {
                path: '/planning',
                element: <Planning />,
            },
            {
                path: '/qr',
                element: <QRPage />,
            },
        ],
    },
]);

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <NotificationProvider>
            <PoseProvider>
                <MessagesProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </MessagesProvider>
            </PoseProvider>
        </NotificationProvider>
    );
}

export default App;

import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/error-page/ErrorPage";
import Planning from "./pages/planning/Planning";
import MenuAppBar from "./components/AppBar/AppBar";
import Navigation from "./pages/navigation/Navigation";
import Manipulator from "./pages/manipulator/Manipulator";
import QRPage from "./pages/qr-page/QRPage";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MenuAppBar />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/navigation",
                element: <Navigation />,
            },
            {
                path: "/manipulator",
                element: <Manipulator />,
            },
            {
                path: "/planning",
                element: <Planning />,
            },
            {
                path: "/qr",
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MenuAppBar>
                <RouterProvider router={router} />
            </MenuAppBar>
        </ThemeProvider>
    );
}

export default App;
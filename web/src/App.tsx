import React from 'react';
import Main from "./pages/main/Main";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/error-page/ErrorPage";
import MenuAppBar from "./components/AppBar/AppBar";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const router = createBrowserRouter([
    {
        path: "*",
        element: <Main />,
        errorElement: <ErrorPage />
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
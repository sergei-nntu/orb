import React from 'react';
import Main from "./pages/main/Main";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/error-page/ErrorPage";
import MenuAppBar from "./components/AppBar/AppBar";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Main />,
        errorElement: <ErrorPage />
    },
]);

function App() {
    return (
        <MenuAppBar>
            <RouterProvider router={router} />
        </MenuAppBar>
    );
}

export default App;
import React from 'react';
import Main from "./pages/main/Main";
import Layout from "./hoc/Layout/Layout";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/error-page/ErrorPage";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Main />,
        errorElement: <ErrorPage />
    },
]);

function App() {
    return (
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    );
}

export default App;
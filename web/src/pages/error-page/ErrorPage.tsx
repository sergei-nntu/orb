import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h2">Oops!</Typography>
            <Typography variant="overline">Sorry, an unexpected error has occurred.</Typography>
            <Typography variant="subtitle2">
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                {/* @ts-ignore*/}
                <i>{error.statusText || error.message}</i>
            </Typography>
        </Box>
    );
}

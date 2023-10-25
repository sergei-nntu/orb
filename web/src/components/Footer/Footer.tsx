import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function Footer() {
    return (
        <Box
            sx={{
                p: 4,
                mt: 'auto',
            }}
            component="footer"
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    {'Telemetry Balkan doo Beograd '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}

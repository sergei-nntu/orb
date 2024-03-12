import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';

import { Item } from '../StyledComponents/StyledComponents';

export default function RobotCamera() {
    return (
        <Box component="div" sx={{ flex: 1, ml: { xs: 1, md: 0 } }}>
            <Paper elevation={1} style={{ overflow: 'hidden' }}>
                <Item
                    sx={{
                        minHeight: { md: '362px', sm: '25vh', xs: '35vh' },
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img alt="Manipulator Camera" style={{ width: '100%' }} />
                </Item>
            </Paper>
        </Box>
    );
}

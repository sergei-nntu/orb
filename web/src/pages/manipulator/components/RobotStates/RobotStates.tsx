import { Grid } from '@mui/material';
import React from 'react';

import { Item } from '../StyledComponents/StyledComponents';
import UserConsole from '../UserConsole/UserConsole';
import GripperState from './GripperState/GripperState';
import JointsState from './JointsState/JointsState';

export default function RobotStates() {
    return (
        <Grid item xs={12} md={4} lg={3}>
            <Item
                sx={{
                    minHeight: { md: '80vh', xs: '0' },
                    display: 'flex',
                    flexDirection: { md: 'column', xs: 'row' },
                    justifyContent: 'flex-end',
                }}
            >
                <UserConsole />
                <JointsState />
                <GripperState />
            </Item>
        </Grid>
    );
}

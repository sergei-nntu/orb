import { Grid } from '@mui/material';
import React from 'react';

import { Item } from '../StyledComponents/StyledComponents';
import UserConsole from '../UserConsole/UserConsole';
import GripperState from './GripperState/GripperState';
import JointsState from './JointsState/JointsState';

export default function RobotStates() {
    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
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

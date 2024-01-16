import { Grid } from '@mui/material';
import React from 'react';

import { Item } from '../StyledComponents/StyledComponents';
import UserConsole from '../UserConsole/UserConsole';
import Gripper from './GripperState/Gripper';
import JointsState from './JointsState/JointsState';

type RobotStatesProps = {
    remoteControlEnabled: React.MutableRefObject<boolean>;
    degreesJointValues: React.MutableRefObject<number[]>;
    gripperValueInRadians: React.MutableRefObject<undefined | number>;
    blocklyEnabled: React.MutableRefObject<boolean>;
};

export default function RobotStates(props: RobotStatesProps) {
    return (
        <Grid item xs={12} md={4} lg={3}>
            <Item
                sx={{
                    minHeight: { md: '80vh', xs: '0' },
                    display: 'flex',
                    flexDirection: { md: 'column', xs: 'row' },
                }}
            >
                <UserConsole />
                <JointsState {...props} />
                <Gripper {...props} />
            </Item>
        </Grid>
    );
}

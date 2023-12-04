import { Grid } from '@mui/material';
import { useControls } from 'leva';
import React from 'react';

import Pose from './components/Pose/Pose';
import RobotCamera from './components/RobotCamera/RobotCamera';
import RobotStates from './components/RobotStates/RobotStates';

export default function Manipulator() {
    const control = useControls('endEffectorCtl', {
        shoulder: {
            value: 180,
            min: 0,
            max: 360,
            step: 1,
        },
        upperArm: {
            value: 0,
            min: -100,
            max: 100,
            step: 1,
        },
        forearm: {
            value: 0,
            min: -160,
            max: 160,
            step: 1,
        },
        wrist1: {
            value: 0,
            min: 0,
            max: 360,
            step: 1,
        },
        wrist2: {
            value: 0,
            min: 0,
            max: 360,
            step: 1,
        },
        endEffectorLink: {
            value: 0,
            min: 0,
            max: 360,
            step: 1,
        },
        claws: {
            value: 0,
            min: -15,
            max: 25,
            step: 1,
        },
    });

    return (
        <Grid container spacing={1} sx={{ pt: 1, pr: 1 }}>
            <Pose />
            <RobotCamera {...control} />
            <RobotStates />
        </Grid>
    );
}

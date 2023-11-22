import { Grid } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';

import { API_ROUTES } from '../../constants';
import { PoseContext } from '../../contexts/PoseContext/PoseContext';
import useHttp from '../../hooks/Http/Http';
import { IJointsState } from '../../types/appTypes';
import Pose from './components/Pose/Pose';
import RobotCamera from './components/RobotCamera/RobotCamera';
import RobotStates from './components/RobotStates/RobotStates';

export default function Manipulator() {
    const { request } = useHttp();
    const { state } = useContext(PoseContext);
    const jointsRef = useRef<IJointsState>({
        shoulder: 150,
        upperArm: 22,
        forearm: 20,
        wrist1: 0,
        wrist2: 90,
        endEffectorLink: 100,
    });

    useEffect(() => {
        (async () => {
            jointsRef.current = await request(API_ROUTES.GET_JOINTS_STATE);
        })();
    }, [state]);

    return (
        <Grid container spacing={1} sx={{ pt: 1, pr: 1 }}>
            <Pose />
            <RobotCamera {...jointsRef.current} />
            <RobotStates />
        </Grid>
    );
}

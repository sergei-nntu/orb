import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

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
    // FIXME: perhaps need to use useRef because this will give optimization
    const [jointsState, setJointsState] = useState<IJointsState>({
        shoulder: 0,
        upperArm: 0,
        forearm: 0,
        wrist1: 0,
        wrist2: 0,
        endEffectorLink: 0,
        claws: 0,
    });

    useEffect(() => {
        request(API_ROUTES.GET_JOINTS_STATE).then((r) => setJointsState(r));
    }, [state]);

    return (
        <Grid container spacing={1} sx={{ pt: 1, pr: 1 }}>
            <Pose />
            <RobotCamera {...jointsState} />
            <RobotStates />
        </Grid>
    );
}

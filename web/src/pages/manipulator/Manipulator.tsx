import { Grid } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';

import { API_ROUTES } from '../../constants';
import { JointsStateContext } from '../../contexts/JointsStateContext/JointsStateContext';
import useHttp from '../../hooks/Http/Http';
import { IJointsState } from '../../types/appTypes';
import Pose from './components/Pose/Pose';
import RobotCamera from './components/RobotCamera/RobotCamera';
import RobotStates from './components/RobotStates/RobotStates';

export default function Manipulator() {
    const { request } = useHttp();
    const { setJointsState } = useContext(JointsStateContext);
    const degreesValues = useRef([0, 0, 0, 0, 0, 0]);
    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);
    const remoteControlEnabled = useRef<boolean>(true);
    const blocklyEnabled = useRef(false);

    useEffect(() => {
        interval.current = setInterval(getJointsState, 100);
        return () => {
            clearInterval(interval.current);
        };
    }, []);

    const getJointsState = async () => {
        if (remoteControlEnabled.current) {
            request(API_ROUTES.GET_JOINTS_STATE).then((r: IJointsState) => {
                if (!r) return;
                setJointsState({ ...r });
                const radianValues = [r.shoulder, r.upperArm, r.forearm, r.wrist1, r.wrist2, r.endEffectorLink];
                degreesValues.current = radianValues.map((element: number) => +((180 * element) / Math.PI).toFixed(0));
            });
        }
    };

    useEffect(() => {
        request(API_ROUTES.GET_BLOCKLY_STATE).then((r) => {
            blocklyEnabled.current = r?.state;
        });
    }, []);

    return (
        <Grid container spacing={1} sx={{ pt: 1, pr: 1 }}>
            <Pose remoteControlEnabled={remoteControlEnabled} blocklyEnabled={blocklyEnabled} />
            <RobotCamera />
            <RobotStates
                remoteControlEnabled={remoteControlEnabled}
                degreesValues={degreesValues.current}
                blocklyEnabled={blocklyEnabled}
            />
        </Grid>
    );
}

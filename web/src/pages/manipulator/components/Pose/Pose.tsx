import { Grid } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';

import { API_ROUTES } from '../../../../constants';
import { NotificationContext } from '../../../../contexts/NotificationContext/NotificationContext';
import { PoseContext } from '../../../../contexts/PoseContext/PoseContext';
import useHttp from '../../../../hooks/Http/Http';
import { IPose, NOTIFICATION, POSE } from '../../../../types/appTypes';
import EndEffectorState from '../RobotStates/EndEffectorState/EndEffectorState';
import { Item } from '../StyledComponents/StyledComponents';
import Orientation from './Orientation/Orientation';
import Position from './Position/Position';

export default function Pose() {
    const { request } = useHttp();
    const { dispatchNotification } = useContext(NotificationContext);
    const { state, dispatch } = useContext(PoseContext);
    const prevStateRef = useRef<IPose | null>(null);

    const sendStateToServer = async (state: IPose) => {
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    x: state.position.x,
                    y: state.position.y,
                    z: state.position.z,
                    pitch: state.orientation.pitch,
                    roll: state.orientation.roll,
                    yaw: state.orientation.yaw,
                    gripper: state.gripper_state,
                }),
            };

            const { execute } = await request(API_ROUTES.CONVERT_POSE, options);

            if (execute) {
                dispatchNotification({ type: NOTIFICATION.SUCCESS_PLANNING, open: false });
                prevStateRef.current = { ...state };
            } else if (!prevStateRef.current) {
                dispatch({ type: POSE.RERENDER });
            } else {
                dispatchNotification({ type: NOTIFICATION.NO_MOVE_TO_POSITION, open: false });
                dispatch({ type: POSE.SET_PREV_STATE, prevState: prevStateRef.current });
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        sendStateToServer(state).then((r) => console.log(r));
    }, [state]);

    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    ml: 1,
                }}
            >
                <Position />
                <Orientation />
                <EndEffectorState />
            </Item>
        </Grid>
    );
}

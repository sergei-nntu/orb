import { Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react';

import { API_ROUTES, INITIAL_POSE_STATE } from '../../../../constants';
import { MessagesContext } from '../../../../contexts/MessagesContext/MessagesContext';
import { ADD_MESSAGE } from '../../../../contexts/MessagesContext/MessagesReducer/MessagesReducer';
import { PoseContext } from '../../../../contexts/PoseContext/PoseContext';
import useHttp from '../../../../hooks/Http/Http';
import { IPose, POSE } from '../../../../types/appTypes';
import EndEffectorState from '../RobotStates/EndEffectorState/EndEffectorState';
import { Item } from '../StyledComponents/StyledComponents';
import Orientation from './Orientation/Orientation';
import Position from './Position/Position';

export type PoseProps = {
    remoteControlEnabled: React.MutableRefObject<boolean>;
    blocklyEnabled: React.MutableRefObject<boolean>;
};

export const getCurrentTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
};

export default function Pose(props: PoseProps) {
    const { remoteControlEnabled, blocklyEnabled } = props;
    const { request } = useHttp();
    const { dispatchMessages } = useContext(MessagesContext);
    const { state, dispatch } = useContext(PoseContext);

    const sendStateToServer = async (state: IPose) => {
        try {
            if (state === INITIAL_POSE_STATE) {
                return;
            }

            const options = {
                method: 'POST',
                body: JSON.stringify({
                    x: state.position.x,
                    y: state.position.y,
                    z: state.position.z,
                    pitch: state.orientation.pitch,
                    roll: state.orientation.roll,
                    yaw: state.orientation.yaw,
                }),
            };

            const { execute, data } = await request(API_ROUTES.CONVERT_POSE, options);

            console.log('Current pose state from server:', data);
            console.log('Current pose state from frontend:', state);

            if (execute) {
                dispatchMessages({
                    type: ADD_MESSAGE,
                    payload: { text: 'Changed goal state', time: getCurrentTime(new Date()) },
                });
            } else {
                dispatchMessages({
                    type: ADD_MESSAGE,
                    payload: {
                        text: 'There is no move to this position. Please try again',
                        time: getCurrentTime(new Date()),
                    },
                });
                dispatch({
                    type: POSE.SET_PREV_STATE,
                    prevState: {
                        position: {
                            x: data.x,
                            y: data.y,
                            z: data.z,
                        },
                        orientation: {
                            pitch: data.pitch,
                            roll: data.roll,
                            yaw: data.yaw,
                        },
                    },
                });
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        sendStateToServer(state).then((err) => {
            if (err != undefined) {
                console.log(err);
            }
        });
    }, [state]);

    return (
        <Grid item xs={12} sm={12} md={4} lg={3}>
            <Item
                sx={{
                    minHeight: { md: '80vh', xs: '0' },
                    display: 'flex',
                    flexDirection: { md: 'column', xs: 'row' },
                    alignItems: { xs: 'flex-end', md: 'stretch' },
                    ml: 1,
                }}
            >
                <Grid item xs={4} sm={4} md={12}>
                    <Position remoteControlEnabled={remoteControlEnabled} blocklyEnabled={blocklyEnabled} />
                </Grid>

                <Grid item xs={4} sm={4} md={12}>
                    <Orientation remoteControlEnabled={remoteControlEnabled} blocklyEnabled={blocklyEnabled} />
                </Grid>

                <Grid item xs={4} sm={4} md={12}>
                    <EndEffectorState blocklyEnabled={blocklyEnabled} />
                </Grid>
            </Item>
        </Grid>
    );
}

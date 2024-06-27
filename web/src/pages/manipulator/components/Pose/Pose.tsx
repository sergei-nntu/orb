import { Grid } from '@mui/material';
import React, { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';

import { API_ROUTES, INITIAL_POSE_STATE } from '../../../../constants';
import { PoseContext } from '../../../../contexts/PoseContext/PoseContext';
import { UserConsoleMessagesContext } from '../../../../contexts/UserConsoleMessagesContext/UserConsoleMessagesContext';
import useHttp from '../../../../hooks/Http/Http';
import { CONSOLE_MESSAGE, IPose, Loaders, POSE } from '../../../../types/appTypes';
import EndEffectorState from '../RobotStates/EndEffectorState/EndEffectorState';
import { Item } from '../StyledComponents/StyledComponents';
import Orientation from './Orientation/Orientation';
import Position from './Position/Position';

export type PoseProps = {
    blocklyEnabled: React.MutableRefObject<boolean>;
    remoteControlEnabled: React.MutableRefObject<boolean>;
    disabledControlInterface: boolean;
    setDisabledControlInterface: Dispatch<SetStateAction<boolean>>;
    flagControlDisableInterface?: React.MutableRefObject<boolean> | undefined;
    loaders: React.MutableRefObject<Loaders>;
};

export default function Pose(props: PoseProps) {
    const {
        blocklyEnabled,
        remoteControlEnabled,
        disabledControlInterface,
        setDisabledControlInterface,
        flagControlDisableInterface,
        loaders,
    } = props;
    const { request } = useHttp();
    const { addUserConsoleMessage } = useContext(UserConsoleMessagesContext);
    const { state, dispatch } = useContext(PoseContext);

    const previousMove = useRef<boolean | undefined>(undefined);
    const noMoveToPositionFlag = useRef<boolean>(false);

    const sendStateToServer = async (state: IPose) => {
        try {
            if (state === INITIAL_POSE_STATE || previousMove.current) {
                previousMove.current = false;
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

            if (execute) {
                addUserConsoleMessage(CONSOLE_MESSAGE.SUCCESS_PLANNING);
                noMoveToPositionFlag.current = false;
            } else {
                addUserConsoleMessage(CONSOLE_MESSAGE.NO_MOVE_TO_POSITION);
                noMoveToPositionFlag.current = true;
                previousMove.current = true;
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
                    <Position
                        blocklyEnabled={blocklyEnabled}
                        remoteControlEnabled={remoteControlEnabled}
                        disabledControlInterface={disabledControlInterface}
                        setDisabledControlInterface={setDisabledControlInterface}
                        loaders={loaders}
                    />
                </Grid>

                <Grid item xs={4} sm={4} md={12}>
                    <Orientation
                        blocklyEnabled={blocklyEnabled}
                        remoteControlEnabled={remoteControlEnabled}
                        disabledControlInterface={disabledControlInterface}
                        setDisabledControlInterface={setDisabledControlInterface}
                        loaders={loaders}
                    />
                </Grid>

                <Grid item xs={4} sm={4} md={12}>
                    <EndEffectorState
                        blocklyEnabled={blocklyEnabled}
                        disabledControlInterface={disabledControlInterface}
                        setDisabledControlInterface={setDisabledControlInterface}
                        noMoveToPositionFlag={noMoveToPositionFlag}
                        flagControlDisableInterface={flagControlDisableInterface}
                        loaders={loaders}
                    />
                </Grid>
            </Item>
        </Grid>
    );
}

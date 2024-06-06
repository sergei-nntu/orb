import { CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { API_ROUTES, INITIAL_POSE_STATE } from '../../../../../constants';
import { LoaderContext } from '../../../../../contexts/JointsStateContext/LoaderContext';
import useHttp from '../../../../../hooks/Http/Http';
import { IPose } from '../../../../../types/appTypes';
import { StyledBox } from '../../StyledComponents/StyledComponents';

type EndEffectorStateProps = {
    disabledControlInterface: boolean;
    noMoveToPositionFlag: React.MutableRefObject<boolean>;
    stateBeforeRequest: IPose;
};

export default function EndEffectorState(props: EndEffectorStateProps) {
    const { disabledControlInterface, stateBeforeRequest, noMoveToPositionFlag } = props;
    const { request } = useHttp();
    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);
    const [endEffectorState, setEndEffectorState] = useState<IPose>(INITIAL_POSE_STATE);
    const { blocklyEnabled, trackingChangeModel } = useContext(LoaderContext);
    const enableLoader = useRef<boolean>(true);

    const StyledTag = styled('strong')(({ theme }) => ({
        color: disabledControlInterface ? theme.palette.grey.A700 : theme.palette.primary.main,
    }));

    useEffect(() => {
        interval.current = setInterval(getEndEffectorState, 100);

        return () => {
            clearInterval(interval.current);
        };
    });

    const getEndEffectorState = async () => {
        request(API_ROUTES.GET_POSE_STATE).then((res) => {
            if (!res?.data) {
                return;
            }
            setEndEffectorState({
                position: {
                    x: res.data.x,
                    y: res.data.y,
                    z: res.data.z,
                },
                orientation: {
                    pitch: res.data.pitch,
                    roll: res.data.roll,
                    yaw: res.data.yaw,
                },
            });
        });
    };

    useEffect(() => {
        if (blocklyEnabled.current === false) {
            if (
                endEffectorState.position.x === stateBeforeRequest.position.x &&
                trackingChangeModel.current === false
            ) {
                enableLoader.current = false; //off_circular
            }
            if (endEffectorState.position.x !== stateBeforeRequest.position.x && trackingChangeModel.current === true) {
                enableLoader.current = true; //on_circular
                if (noMoveToPositionFlag.current) {
                    stateBeforeRequest.position.x = endEffectorState.position.x;
                }
            }

            if (
                endEffectorState.position.y === stateBeforeRequest.position.y &&
                trackingChangeModel.current === false
            ) {
                enableLoader.current = false; //off_circular
            }
            if (endEffectorState.position.y !== stateBeforeRequest.position.y && trackingChangeModel.current === true) {
                enableLoader.current = true; //on_circular
                if (noMoveToPositionFlag.current) {
                    stateBeforeRequest.position.y = endEffectorState.position.y;
                }
            }

            if (
                endEffectorState.position.z === stateBeforeRequest.position.z &&
                trackingChangeModel.current === false
            ) {
                enableLoader.current = false; //off_circular
            }
            if (endEffectorState.position.z !== stateBeforeRequest.position.z && trackingChangeModel.current === true) {
                enableLoader.current = true; //on_circular
                if (noMoveToPositionFlag.current) {
                    stateBeforeRequest.position.z = endEffectorState.position.z;
                }
            }

            if (
                endEffectorState.orientation.pitch === stateBeforeRequest.orientation.pitch &&
                trackingChangeModel.current === false
            ) {
                enableLoader.current = false; //off_circular
            }
            if (
                endEffectorState.orientation.pitch !== stateBeforeRequest.orientation.pitch &&
                trackingChangeModel.current === true
            ) {
                enableLoader.current = true; //on_circular
                if (noMoveToPositionFlag.current) {
                    stateBeforeRequest.orientation.pitch = endEffectorState.orientation.pitch;
                }
            }

            if (
                endEffectorState.orientation.roll === stateBeforeRequest.orientation.roll &&
                trackingChangeModel.current === false
            ) {
                enableLoader.current = false; //off_circular
            }
            if (
                endEffectorState.orientation.roll !== stateBeforeRequest.orientation.roll &&
                trackingChangeModel.current === true
            ) {
                enableLoader.current = true; //on_circular
                if (noMoveToPositionFlag.current) {
                    stateBeforeRequest.orientation.roll = endEffectorState.orientation.roll;
                }
            }

            if (
                endEffectorState.orientation.yaw === stateBeforeRequest.orientation.yaw &&
                trackingChangeModel.current === false
            ) {
                enableLoader.current = false; //off_circular
            }
            if (
                endEffectorState.orientation.yaw !== stateBeforeRequest.orientation.yaw &&
                trackingChangeModel.current === true
            ) {
                enableLoader.current = true; //on_circular
                if (noMoveToPositionFlag.current) {
                    stateBeforeRequest.orientation.yaw = endEffectorState.orientation.yaw;
                }
            }
        }
        if (blocklyEnabled.current === true) {
            // setEnableCircularProgress(false);
            enableLoader.current = false;
        }
    });

    useEffect(() => {
        stateBeforeRequest.position.x = endEffectorState.position.x;
        noMoveToPositionFlag.current = false;
    }, [noMoveToPositionFlag.current]);

    return (
        <StyledBox sx={{ mt: { md: 1, sm: 0 }, height: { md: '150px', xs: '280px' } }}>
            End-Effector State
            <Grid container justifyContent="center" sx={{ mt: { md: 0, xs: 7 }, mb: 1 }}>
                <Grid item xs={10} md={10} lg={10} style={{ width: '150px', textAlign: 'right', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>x: </StyledTag>
                                {endEffectorState.position.x.toFixed(2) || '0'}
                                {enableLoader.current ? (
                                    <CircularProgress sx={{ marginLeft: 1 }} size={10}></CircularProgress>
                                ) : (
                                    <></>
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>y: </StyledTag>
                                {endEffectorState.position.y.toFixed(2) || '0'}
                                {enableLoader.current ? (
                                    <CircularProgress sx={{ marginLeft: 1 }} size={10}></CircularProgress>
                                ) : (
                                    <></>
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>z: </StyledTag>
                                {endEffectorState.position.z.toFixed(2) || '0'}
                                {enableLoader.current ? (
                                    <CircularProgress sx={{ marginLeft: 1 }} size={10}></CircularProgress>
                                ) : (
                                    <></>
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} md={10} lg={10} style={{ width: '100px', textAlign: 'left', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>pitch: </StyledTag>
                                {endEffectorState.orientation.pitch.toFixed(2) || '0'}
                                {enableLoader.current ? (
                                    <CircularProgress sx={{ marginLeft: 1 }} size={10}></CircularProgress>
                                ) : (
                                    <></>
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>roll: </StyledTag>
                                {endEffectorState.orientation.roll.toFixed(2) || '0'}
                                {enableLoader.current ? (
                                    <CircularProgress sx={{ marginLeft: 1 }} size={10}></CircularProgress>
                                ) : (
                                    <></>
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>yaw: </StyledTag>
                                {endEffectorState.orientation.yaw.toFixed(2) || '0'}
                                {enableLoader.current ? (
                                    <CircularProgress sx={{ marginLeft: 1 }} size={10}></CircularProgress>
                                ) : (
                                    <></>
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledBox>
    );
}

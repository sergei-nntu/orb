import { CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';

import { API_ROUTES, INITIAL_POSE_STATE } from '../../../../../constants';
import { PoseContext } from '../../../../../contexts/PoseContext/PoseContext';
import useHttp from '../../../../../hooks/Http/Http';
import { IPose } from '../../../../../types/appTypes';
import { StyledBox } from '../../StyledComponents/StyledComponents';

type EndEffectorStateProps = {
    blocklyEnabled: React.MutableRefObject<boolean>;
    noMoveToPositionFlag: React.MutableRefObject<boolean>;
    disabledControlInterface: boolean;
    setDisabledControlInterface: Dispatch<SetStateAction<boolean>>;
};

export default function EndEffectorState(props: EndEffectorStateProps) {
    const { blocklyEnabled, setDisabledControlInterface, disabledControlInterface, noMoveToPositionFlag } = props;

    const { request } = useHttp();

    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);
    const [endEffectorState, setEndEffectorState] = useState<IPose>(INITIAL_POSE_STATE);

    const [endEffectorStateInResponse, setEndEffectorStateInResponse] = useState<IPose>(INITIAL_POSE_STATE);
    const [endEffectorStateBeforeRequest, setEndEffectorStateBeforeRequest] = useState<IPose>(INITIAL_POSE_STATE);

    const { state } = useContext(PoseContext);

    const flagLoadingX = useRef<boolean>(true);
    const flagLoadingY = useRef<boolean>(true);
    const flagLoadingZ = useRef<boolean>(true);
    const flagLoadingPitch = useRef<boolean>(true);
    const flagLoadingRoll = useRef<boolean>(true);
    const flagLoadingYaw = useRef<boolean>(true);

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
        flagLoadingX.current = false;
        flagLoadingY.current = false;
        flagLoadingZ.current = false;
        flagLoadingPitch.current = false;
        flagLoadingRoll.current = false;
        flagLoadingYaw.current = false;
        noMoveToPositionFlag.current = false;
        setDisabledControlInterface(false);
    }, [noMoveToPositionFlag.current]);

    useEffect(() => {
        if (!blocklyEnabled.current) {
            if (endEffectorStateBeforeRequest.position.x !== state.position.x) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                flagLoadingX.current = true;
            }
            if (endEffectorStateBeforeRequest.position.y !== state.position.y) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                flagLoadingY.current = true;
            }
            if (endEffectorStateBeforeRequest.position.z !== state.position.z) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                flagLoadingZ.current = true;
            }
            if (endEffectorStateBeforeRequest.orientation.pitch !== state.orientation.pitch) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                flagLoadingPitch.current = true;
            }
            if (endEffectorStateBeforeRequest.orientation.roll !== state.orientation.roll) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                flagLoadingRoll.current = true;
            }
            if (endEffectorStateBeforeRequest.orientation.yaw !== state.orientation.yaw) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                flagLoadingYaw.current = true;
            }
        }
    }, [state]);

    useEffect(() => {
        if (!blocklyEnabled.current) {
            if (endEffectorStateInResponse.position.x !== endEffectorState.position.x) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                flagLoadingX.current = false;
            }
            if (endEffectorStateInResponse.position.y !== endEffectorState.position.y) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                flagLoadingY.current = false;
            }
            if (endEffectorStateInResponse.position.z !== endEffectorState.position.z) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                flagLoadingZ.current = false;
            }
            if (endEffectorStateInResponse.orientation.pitch !== endEffectorState.orientation.pitch) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                flagLoadingPitch.current = false;
            }
            if (endEffectorStateInResponse.orientation.roll !== endEffectorState.orientation.roll) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                flagLoadingRoll.current = false;
            }
            if (endEffectorStateInResponse.orientation.yaw !== endEffectorState.orientation.yaw) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                flagLoadingYaw.current = false;
            }
        }
    }, [getEndEffectorState]);

    return (
        <StyledBox sx={{ mt: { md: 1, sm: 0 }, height: { md: '150px', xs: '280px' } }}>
            End-Effector State
            <Grid container justifyContent="center" sx={{ mt: { md: 0, xs: 7 }, mb: 1 }}>
                <Grid item xs={10} md={10} lg={10} style={{ width: '150px', textAlign: 'right', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <StyledTag>x: </StyledTag>
                                {/* {endEffectorState.position.x.toFixed(2) || '0'} */}
                                {flagLoadingX.current ? (
                                    //  <Skeleton variant="rectangular" width={47} height={28} />
                                    <CircularProgress sx={{ marginLeft: 1 }} size={20}></CircularProgress>
                                ) : (
                                    endEffectorState.position.x.toFixed(2) || '0'
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <StyledTag>y: </StyledTag>
                                {/* {endEffectorState.position.x.toFixed(2) || '0'} */}
                                {flagLoadingY.current ? (
                                    // <Skeleton variant="rectangular" width={47} height={28} />
                                    <CircularProgress sx={{ marginLeft: 1 }} size={20}></CircularProgress>
                                ) : (
                                    endEffectorState.position.y.toFixed(2) || '0'
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <StyledTag>z: </StyledTag>
                                {/* {endEffectorState.position.x.toFixed(2) || '0'} */}
                                {flagLoadingZ.current ? (
                                    // <Skeleton variant="rectangular" width={47} height={28} />
                                    <CircularProgress sx={{ marginLeft: 1 }} size={20}></CircularProgress>
                                ) : (
                                    endEffectorState.position.z.toFixed(2) || '0'
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} md={10} lg={10} style={{ width: '100px', textAlign: 'left', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <StyledTag>pitch: </StyledTag>
                                {/* {endEffectorState.position.x.toFixed(2) || '0'} */}
                                {flagLoadingPitch.current ? (
                                    // <Skeleton variant="rectangular" width={47} height={28} />
                                    <CircularProgress sx={{ marginLeft: 1 }} size={20}></CircularProgress>
                                ) : (
                                    endEffectorState.orientation.pitch.toFixed(2) || '0'
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <StyledTag>roll: </StyledTag>
                                {/* {endEffectorState.position.x.toFixed(2) || '0'} */}
                                {flagLoadingRoll.current ? (
                                    // <Skeleton variant="rectangular" width={47} height={28} />
                                    <CircularProgress sx={{ marginLeft: 1 }} size={20}></CircularProgress>
                                ) : (
                                    endEffectorState.orientation.roll.toFixed(2) || '0'
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <StyledTag>yaw: </StyledTag>
                                {/* {endEffectorState.position.x.toFixed(2) || '0'} */}
                                {flagLoadingYaw.current ? (
                                    <CircularProgress sx={{ marginLeft: 1 }} size={20}></CircularProgress>
                                ) : (
                                    // <Skeleton variant="rectangular" width={47} height={28} />
                                    endEffectorState.orientation.yaw.toFixed(2) || '0'
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledBox>
    );
}

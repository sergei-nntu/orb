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
    flagControlDisableInterface: React.MutableRefObject<boolean> | undefined;
};

export default function EndEffectorState(props: EndEffectorStateProps) {
    const {
        blocklyEnabled,
        setDisabledControlInterface,
        disabledControlInterface,
        noMoveToPositionFlag,
        flagControlDisableInterface,
    } = props;

    const { request } = useHttp();

    const { state } = useContext(PoseContext);

    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);
    const [endEffectorState, setEndEffectorState] = useState<IPose>(INITIAL_POSE_STATE);

    const [endEffectorStateInResponse, setEndEffectorStateInResponse] = useState<IPose>(INITIAL_POSE_STATE);
    const [endEffectorStateBeforeRequest, setEndEffectorStateBeforeRequest] = useState<IPose>(INITIAL_POSE_STATE);

    const [flagsLoading, setFlagsLoading] = useState({
        position: {
            flagLoadingX: false,
            flagLoadingY: false,
            flagLoadingZ: false,
        },
        orientation: {
            flagLoadingPitch: false,
            flagLoadingRoll: false,
            flagLoadingYaw: false,
        },
    });

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
        if (!blocklyEnabled.current) {
            if (endEffectorStateBeforeRequest.position.x !== state.position.x) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                setFlagsLoading((prev) => ({
                    ...prev,
                    position: {
                        ...prev.position,
                        flagLoadingX: true,
                    },
                }));
                if (noMoveToPositionFlag.current) {
                    setFlagsLoading((prev) => ({
                        ...prev,
                        position: {
                            ...prev.position,
                            flagLoadingX: false,
                        },
                    }));
                    setDisabledControlInterface(false);
                    noMoveToPositionFlag.current = false;
                }
            }
            if (endEffectorStateBeforeRequest.position.y !== state.position.y) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                setFlagsLoading((prev) => ({
                    ...prev,
                    position: {
                        ...prev.position,
                        flagLoadingY: true,
                    },
                }));
                if (noMoveToPositionFlag.current) {
                    setFlagsLoading((prev) => ({
                        ...prev,
                        position: {
                            ...prev.position,
                            flagLoadingY: false,
                        },
                    }));
                    setDisabledControlInterface(false);
                    noMoveToPositionFlag.current = false;
                }
            }
            if (endEffectorStateBeforeRequest.position.z !== state.position.z) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                setFlagsLoading((prev) => ({
                    ...prev,
                    position: {
                        ...prev.position,
                        flagLoadingZ: true,
                    },
                }));
                if (noMoveToPositionFlag.current) {
                    setFlagsLoading((prev) => ({
                        ...prev,
                        position: {
                            ...prev.position,
                            flagLoadingZ: false,
                        },
                    }));
                    setDisabledControlInterface(false);
                    noMoveToPositionFlag.current = false;
                }
            }
            if (endEffectorStateBeforeRequest.orientation.pitch !== state.orientation.pitch) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                setFlagsLoading((prev) => ({
                    ...prev,
                    orientation: {
                        ...prev.orientation,
                        flagLoadingPitch: true,
                    },
                }));
                if (noMoveToPositionFlag.current) {
                    setFlagsLoading((prev) => ({
                        ...prev,
                        orientation: {
                            ...prev.orientation,
                            flagLoadingPitch: false,
                        },
                    }));
                    setDisabledControlInterface(false);
                    noMoveToPositionFlag.current = false;
                }
            }
            if (endEffectorStateBeforeRequest.orientation.roll !== state.orientation.roll) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                setFlagsLoading((prev) => ({
                    ...prev,
                    orientation: {
                        ...prev.orientation,
                        flagLoadingRoll: true,
                    },
                }));
                if (noMoveToPositionFlag.current) {
                    setFlagsLoading((prev) => ({
                        ...prev,
                        orientation: {
                            ...prev.orientation,
                            flagLoadingRoll: false,
                        },
                    }));
                    setDisabledControlInterface(false);
                    noMoveToPositionFlag.current = false;
                }
            }
            if (endEffectorStateBeforeRequest.orientation.yaw !== state.orientation.yaw) {
                setDisabledControlInterface(true);
                setEndEffectorStateBeforeRequest(state);
                setFlagsLoading((prev) => ({
                    ...prev,
                    orientation: {
                        ...prev.orientation,
                        flagLoadingYaw: true,
                    },
                }));
                if (noMoveToPositionFlag.current) {
                    setFlagsLoading((prev) => ({
                        ...prev,
                        orientation: {
                            ...prev.orientation,
                            flagLoadingYaw: true,
                        },
                    }));
                    setDisabledControlInterface(false);
                    noMoveToPositionFlag.current = false;
                }
            }
        }
    }, [state]);

    useEffect(() => {
        if (!blocklyEnabled.current && flagControlDisableInterface!.current) {
            if (endEffectorStateInResponse.position.x !== endEffectorState.position.x) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                setFlagsLoading((prev) => ({
                    ...prev,
                    position: {
                        ...prev.position,
                        flagLoadingX: false,
                    },
                }));
            }
            if (endEffectorStateInResponse.position.y !== endEffectorState.position.y) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                setFlagsLoading((prev) => ({
                    ...prev,
                    position: {
                        ...prev.position,
                        flagLoadingY: false,
                    },
                }));
            }
            if (endEffectorStateInResponse.position.z !== endEffectorState.position.z) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                setFlagsLoading((prev) => ({
                    ...prev,
                    position: {
                        ...prev.position,
                        flagLoadingZ: false,
                    },
                }));
            }
            if (endEffectorStateInResponse.orientation.pitch !== endEffectorState.orientation.pitch) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                setFlagsLoading((prev) => ({
                    ...prev,
                    orientation: {
                        ...prev.orientation,
                        flagLoadingPitch: false,
                    },
                }));
            }
            if (endEffectorStateInResponse.orientation.roll !== endEffectorState.orientation.roll) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                setFlagsLoading((prev) => ({
                    ...prev,
                    orientation: {
                        ...prev.orientation,
                        flagLoadingRoll: false,
                    },
                }));
            }
            if (endEffectorStateInResponse.orientation.yaw !== endEffectorState.orientation.yaw) {
                setDisabledControlInterface(false);
                setEndEffectorStateInResponse(endEffectorState);
                setFlagsLoading((prev) => ({
                    ...prev,
                    orientation: {
                        ...prev.orientation,
                        flagLoadingYaw: false,
                    },
                }));
            }
        }
    }, [getEndEffectorState]);

    return (
        <StyledBox sx={{ mt: { md: 1, sm: 0 }, height: { md: '150px', xs: '280px' } }}>
            End-Effector State
            <Grid container justifyContent="center" sx={{ mt: { md: 0, xs: 7 }, mb: 1 }}>
                <Grid item xs={10} md={10} lg={10} style={{ width: '65px', textAlign: 'left', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="space-between">
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <Grid container sx={{ display: 'flex' }}>
                                    <Grid item sx={{ display: 'flex' }}>
                                        <StyledTag>x: </StyledTag>
                                    </Grid>
                                    {flagsLoading.position.flagLoadingX ? (
                                        <Grid
                                            item
                                            xs
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                flexDirection: 'row',
                                                marginTop: '5px',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <CircularProgress size={20} id="progress-bar-x"></CircularProgress>
                                        </Grid>
                                    ) : (
                                        <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {endEffectorState.position.x.toFixed(2) || '0'}
                                        </Grid>
                                    )}
                                </Grid>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <Grid container sx={{ display: 'flex' }}>
                                    <Grid item sx={{ display: 'flex' }}>
                                        <StyledTag>y: </StyledTag>
                                    </Grid>
                                    {flagsLoading.position.flagLoadingY ? (
                                        <Grid
                                            item
                                            xs
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                flexDirection: 'row',
                                                marginTop: '5px',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <CircularProgress size={20} id="progress-bar-y"></CircularProgress>
                                        </Grid>
                                    ) : (
                                        <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {endEffectorState.position.y.toFixed(2) || '0'}
                                        </Grid>
                                    )}
                                </Grid>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <Grid container sx={{ display: 'flex' }}>
                                    <Grid item sx={{ display: 'flex' }}>
                                        <StyledTag>z: </StyledTag>
                                    </Grid>
                                    {flagsLoading.position.flagLoadingZ ? (
                                        <Grid
                                            item
                                            xs
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                flexDirection: 'row',
                                                marginTop: '5px',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <CircularProgress size={20} id="progress-bar-z"></CircularProgress>
                                        </Grid>
                                    ) : (
                                        <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {endEffectorState.position.z.toFixed(2) || '0'}
                                        </Grid>
                                    )}
                                </Grid>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item>
                    <></>
                </Grid> */}
                <Grid item xs={10} md={10} lg={10} style={{ width: '102px', textAlign: 'left', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="space-between" marginLeft={2}>
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <Grid container sx={{ display: 'flex' }}>
                                    <Grid item sx={{ display: 'flex' }}>
                                        <StyledTag>pitch: </StyledTag>
                                    </Grid>
                                    {flagsLoading.orientation.flagLoadingPitch ? (
                                        <Grid
                                            item
                                            xs
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                flexDirection: 'row',
                                                marginTop: '5px',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <CircularProgress size={20} id="progress-bar-pitch"></CircularProgress>
                                        </Grid>
                                    ) : (
                                        <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {endEffectorState.orientation.pitch.toFixed(2) || '0'}
                                        </Grid>
                                    )}
                                </Grid>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <Grid container sx={{ display: 'flex' }}>
                                    <Grid item sx={{ display: 'flex' }}>
                                        <StyledTag>roll: </StyledTag>
                                    </Grid>
                                    {flagsLoading.orientation.flagLoadingRoll ? (
                                        <Grid
                                            item
                                            xs
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                flexDirection: 'row',
                                                marginTop: '5px',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <CircularProgress size={20} id="progress-bar-roll"></CircularProgress>
                                        </Grid>
                                    ) : (
                                        <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {endEffectorState.orientation.roll.toFixed(2) || '0'}
                                        </Grid>
                                    )}
                                </Grid>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6" sx={{ display: 'flex' }}>
                                <Grid container sx={{ display: 'flex' }}>
                                    <Grid item sx={{ display: 'flex' }}>
                                        <StyledTag>yaw: </StyledTag>
                                    </Grid>
                                    {flagsLoading.orientation.flagLoadingYaw ? (
                                        <Grid
                                            item
                                            xs
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                flexDirection: 'row',
                                                marginTop: '5px',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <CircularProgress size={20} id="progress-bar-yaw"></CircularProgress>
                                        </Grid>
                                    ) : (
                                        <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {endEffectorState.orientation.yaw.toFixed(2) || '0'}
                                        </Grid>
                                    )}
                                </Grid>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledBox>
    );
}

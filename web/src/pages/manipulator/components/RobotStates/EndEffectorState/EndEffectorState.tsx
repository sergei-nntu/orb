import { CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { API_ROUTES, INITIAL_POSE_STATE } from '../../../../../constants';
import useHttp from '../../../../../hooks/Http/Http';
import { FlagsLoaders, IPose } from '../../../../../types/appTypes';
import { StyledBox } from '../../StyledComponents/StyledComponents';

type EndEffectorStateProps = {
    blocklyEnabled: React.MutableRefObject<boolean>;
    noMoveToPositionFlag: React.MutableRefObject<boolean>;
    disabledControlInterface: boolean;
    setDisabledControlInterface: Dispatch<SetStateAction<boolean>>;
    flagControlDisableInterface: React.MutableRefObject<boolean> | undefined;
    flagsLoading: React.MutableRefObject<FlagsLoaders>;
};

export default function EndEffectorState(props: EndEffectorStateProps) {
    const {
        setDisabledControlInterface,
        disabledControlInterface,
        noMoveToPositionFlag,
        flagControlDisableInterface,
        flagsLoading,
    } = props;

    const { request } = useHttp();

    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);
    const [endEffectorState, setEndEffectorState] = useState<IPose>(INITIAL_POSE_STATE);

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
        if (flagControlDisableInterface?.current) {
            switch (true) {
                case flagsLoading.current.flagLoadingX:
                    flagsLoading.current.flagLoadingX = false;
                    setDisabledControlInterface(false);
                    break;
                case flagsLoading.current.flagLoadingY:
                    flagsLoading.current.flagLoadingY = false;
                    setDisabledControlInterface(false);
                    break;
                case flagsLoading.current.flagLoadingZ:
                    flagsLoading.current.flagLoadingZ = false;
                    setDisabledControlInterface(false);
                    break;
                case flagsLoading.current.flagLoadingPitch:
                    flagsLoading.current.flagLoadingPitch = false;
                    setDisabledControlInterface(false);
                    break;
                case flagsLoading.current.flagLoadingRoll:
                    flagsLoading.current.flagLoadingRoll = false;
                    setDisabledControlInterface(false);
                    break;
                case flagsLoading.current.flagLoadingYaw:
                    flagsLoading.current.flagLoadingYaw = false;
                    setDisabledControlInterface(false);
                    break;
            }
        }
    }, [
        endEffectorState.position.x,
        endEffectorState.position.y,
        endEffectorState.position.z,
        endEffectorState.orientation.pitch,
        endEffectorState.orientation.roll,
        endEffectorState.orientation.yaw,
    ]);

    useEffect(() => {
        if (flagControlDisableInterface?.current && noMoveToPositionFlag.current) {
            noMoveToPositionFlag.current = false;
            flagsLoading.current.flagLoadingX = false;
            flagsLoading.current.flagLoadingY = false;
            flagsLoading.current.flagLoadingZ = false;
            flagsLoading.current.flagLoadingPitch = false;
            flagsLoading.current.flagLoadingRoll = false;
            flagsLoading.current.flagLoadingYaw = false;
            setDisabledControlInterface(false);
        }
    }, [noMoveToPositionFlag.current]);

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
                                    {flagsLoading.current.flagLoadingX ? (
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
                                    {flagsLoading.current.flagLoadingY ? (
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
                                    {flagsLoading.current.flagLoadingZ ? (
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
                                    {flagsLoading.current.flagLoadingPitch ? (
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
                                    {flagsLoading.current.flagLoadingRoll ? (
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
                                    {flagsLoading.current.flagLoadingYaw ? (
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

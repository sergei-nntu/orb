import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';

import { API_ROUTES, INITIAL_POSE_STATE } from '../../../../../constants';
import useHttp from '../../../../../hooks/Http/Http';
import { IPose } from '../../../../../types/appTypes';
import { StyledBox } from '../../StyledComponents/StyledComponents';

type EndEffectorStateProps = {
    blocklyEnabled: React.MutableRefObject<boolean>;
};

export default function EndEffectorState(props: EndEffectorStateProps) {
    const { blocklyEnabled } = props;
    const { request } = useHttp();
    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);

    const [endEffectorState, setEndEffectorState] = useState<IPose>(INITIAL_POSE_STATE);

    const StyledTag = styled('strong')(({ theme }) => ({
        color: blocklyEnabled.current ? theme.palette.grey.A700 : theme.palette.primary.main,
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

    return (
        <StyledBox sx={{ mt: { md: 1, sm: 0 }, height: { md: '150px', xs: '280px' } }}>
            End-Effector State
            <Grid container justifyContent="center" sx={{ mt: { md: 0, xs: 7 }, mb: 1 }}>
                <Grid item xs={10} md={10} lg={10} style={{ width: '100px', textAlign: 'right', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>x:</StyledTag> {endEffectorState.position.x.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>y:</StyledTag> {endEffectorState.position.y.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>z:</StyledTag> {endEffectorState.position?.z.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} md={10} lg={10} style={{ width: '100px', textAlign: 'left', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag sx={{ pr: 1 }}>pitch:</StyledTag>
                                {endEffectorState.orientation?.pitch.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag sx={{ pr: 3 }}>roll:</StyledTag>
                                {endEffectorState.orientation?.roll.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag sx={{ pr: 2 }}>yaw:</StyledTag>
                                {endEffectorState.orientation?.yaw.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledBox>
    );
}

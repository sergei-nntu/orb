import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';

import { PoseContext } from '../../../../../contexts/PoseContext/PoseContext';
import { StyledBox } from '../../StyledComponents/StyledComponents';

const StyledTag = styled('strong')(({ theme }) => ({
    color: theme.palette.primary.main,
}));

export default function EndEffectorState() {
    const { state } = useContext(PoseContext);
    return (
        <StyledBox sx={{ mt: { md: 1, sm: 0 }, height: { md: '150px', xs: '280px' } }}>
            End-Effector State
            <Grid container sx={{ mt: { md: 0, xs: 7 }, mb: 1 }}>
                <Grid item xs={6}>
                    <Typography noWrap variant="h6">
                        <StyledTag>x</StyledTag>: {state?.position?.x || '0'}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="h6">
                        <StyledTag>pitch</StyledTag>: {state?.orientation?.pitch || '0'}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="h6">
                        <StyledTag>y</StyledTag>: {state?.position?.y || '0'}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="h6">
                        <StyledTag>roll</StyledTag>: {state?.orientation?.roll || '0'}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="h6">
                        <StyledTag>z</StyledTag>: {state?.position?.z || '0'}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="h6">
                        <StyledTag>yaw</StyledTag>: {state?.orientation?.yaw || '0'}
                    </Typography>
                </Grid>
            </Grid>
        </StyledBox>
    );
}

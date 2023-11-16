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
        <StyledBox sx={{ mt: 1 }}>
            End-Effector State
            <Grid container sx={{ mt: 1, mb: 1 }}>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>x</StyledTag>: {state?.position.x}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>pitch</StyledTag>: {state?.orientation.pitch}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>y</StyledTag>: {state?.position.y}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>roll</StyledTag>: {state?.orientation.roll}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>z</StyledTag>: {state?.position.z}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>yaw</StyledTag>: {state?.orientation.yaw}
                    </Typography>
                </Grid>
            </Grid>
        </StyledBox>
    );
}

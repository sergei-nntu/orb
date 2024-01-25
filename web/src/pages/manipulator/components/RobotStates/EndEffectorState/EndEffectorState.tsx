import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';

import { PoseContext } from '../../../../../contexts/PoseContext/PoseContext';
import { StyledBox } from '../../StyledComponents/StyledComponents';

type EndEffectorStateProps = {
    blocklyEnabled: React.MutableRefObject<boolean>;
};

export default function EndEffectorState(props: EndEffectorStateProps) {
    const { blocklyEnabled } = props;
    const { state } = useContext(PoseContext);

    const StyledTag = styled('strong')(({ theme }) => ({
        color: blocklyEnabled.current ? theme.palette.grey.A700 : theme.palette.primary.main,
    }));

    return (
        <StyledBox sx={{ mt: { md: 1, sm: 0 }, height: { md: '150px', xs: '280px' } }}>
            End-Effector State
            <Grid container justifyContent="center" sx={{ mt: { md: 0, xs: 7 }, mb: 1 }}>
                <Grid item xs={10} md={10} lg={10} style={{ width: '100px', textAlign: 'right', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>x:</StyledTag> {state?.position?.x.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>y:</StyledTag> {state?.position?.y.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag>z:</StyledTag> {state?.position?.z.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} md={10} lg={10} style={{ width: '100px', textAlign: 'left', flex: '0 0 auto' }}>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag sx={{ pr: 1 }}>pitch:</StyledTag>
                                {state?.orientation?.pitch.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag sx={{ pr: 3 }}>roll:</StyledTag>
                                {state?.orientation?.roll.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap variant="h6">
                                <StyledTag sx={{ pr: 2 }}>yaw:</StyledTag>
                                {state?.orientation?.yaw.toFixed(2) || '0'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledBox>
    );
}

import React from 'react';
import {StyledBox} from "../../StyledComponents/StyledComponents";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledTag = styled("strong")(({ theme }) => ({
    color: theme.palette.primary.main,
}));

export default function EndEffectorState() {
    return (
        <StyledBox sx={{mt: 1}}>
            End-Effector State
            <Grid
                container
                sx={{mt: 1, mb: 1}}
            >
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>x</StyledTag>: 0.34350
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>pitch</StyledTag>: 0.12532
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>y</StyledTag>: -0.54359
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>roll</StyledTag>: 0.4244
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>z</StyledTag>: 0.24255
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap variant="subtitle2">
                        <StyledTag>yaw</StyledTag>: -0.32425
                    </Typography>
                </Grid>
            </Grid>
        </StyledBox>
    );
}
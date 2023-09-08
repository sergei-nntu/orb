import React from 'react';
import {Item, StyledTitleBox} from "../StyledComponents/StyledComponents";
import {Box, Grid} from "@mui/material";

export default function Pose() {
    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: "80vh",
                }}
            >
                <StyledTitleBox>
                    Position
                </StyledTitleBox>
                <Box sx={{height: "240px"}} />
                <StyledTitleBox>
                    Orientation
                </StyledTitleBox>
            </Item>
        </Grid>
    );
}
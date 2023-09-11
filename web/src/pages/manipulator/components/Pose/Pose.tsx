import React from 'react';
import {Item, StyledTitleBox} from "../StyledComponents/StyledComponents";
import {Grid} from "@mui/material";
import Position from "./Position/Position";

export default function Pose() {
    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <StyledTitleBox>
                    Position
                </StyledTitleBox>
                <Position />
                <StyledTitleBox>
                    Orientation
                </StyledTitleBox>
            </Item>
        </Grid>
    );
}
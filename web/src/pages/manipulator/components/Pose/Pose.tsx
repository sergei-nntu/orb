import React from 'react';
import {Item} from "../StyledComponents/StyledComponents";
import {Grid} from "@mui/material";
import Position from "./Position/Position";
import Orientation from "./Orientation/Orientation";

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
                <Position />
                <Orientation />
            </Item>
        </Grid>
    );
}
import React from 'react';
import {Grid} from "@mui/material";
import {Item} from "../StyledComponents/StyledComponents";

export default function RobotCamera() {
    return (
        <Grid item xs={6}>
            <Item
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Robot
            </Item>
        </Grid>
    );
}
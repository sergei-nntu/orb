import React from 'react';
import {Item} from "../StyledComponents/StyledComponents";
import {Grid} from "@mui/material";

export default function GripperState() {
    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Gripper state
            </Item>
        </Grid>
    );
}
import React from 'react';
import {Item} from "../StyledComponents/StyledComponents";
import {Grid} from "@mui/material";

export default function GripperStep() {
    return (
        <Grid item xs={5}>
            <Item
                sx={{
                    minHeight: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Gripper step
            </Item>
        </Grid>
    );
}
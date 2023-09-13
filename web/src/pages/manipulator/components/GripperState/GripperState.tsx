import React from 'react';
import {Item} from "../StyledComponents/StyledComponents";
import {Grid} from "@mui/material";
import JointsState from './JointsState/JointsState';

export default function GripperState() {
    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    alignItems: "flex-end"
                }}
            >
                <JointsState />
            </Item>
        </Grid>
    );
}
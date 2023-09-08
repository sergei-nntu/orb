import React from 'react';
import {Item} from "../StyledComponents/StyledComponents";
import {Grid} from "@mui/material";

export default function ControlInterface() {
    return (
        <Grid item xs={6}>
            <Item
                sx={{
                    minHeight: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Control Interface
            </Item>
        </Grid>
    );
}
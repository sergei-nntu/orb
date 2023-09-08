import React from 'react';
import {Grid} from "@mui/material";
import {Item} from "../StyledComponents/StyledComponents";

export default function Camera() {
    return (
        <Grid item xs={9}>
            <Item
                sx={{
                    minHeight: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Camera
            </Item>
        </Grid>
    );
}
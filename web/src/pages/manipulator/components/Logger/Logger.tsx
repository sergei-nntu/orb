import React from 'react';
import {Grid} from "@mui/material";
import {Item} from "../StyledComponents/StyledComponents";

export default function Logger() {
    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Logger
            </Item>
        </Grid>
    );
}
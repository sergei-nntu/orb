import {Grid} from "@mui/material";
import {Item} from "../StyledComponents/StyledComponents";
import JointsState from "./JointsState/JointsState";
import React from "react";
import GripperState from "./GripperState/GripperState";

export default function RobotStates() {
    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    justifyContent: "flex-end"
                }}
            >
                <JointsState />
                <GripperState />
            </Item>
        </Grid>
    );
}
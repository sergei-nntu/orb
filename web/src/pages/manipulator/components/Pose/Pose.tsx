import React from 'react';
import {Item} from "../StyledComponents/StyledComponents";
import {Grid} from "@mui/material";
import Position from "./Position/Position";
import Orientation from "./Orientation/Orientation";
import EndEffectorState from "../RobotStates/EndEffectorState/EndEffectorState";

export default function Pose() {
    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    ml: 1
                }}
            >
                <Position />
                <Orientation />
                <EndEffectorState />
            </Item>
        </Grid>
    );
}
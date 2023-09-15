import {Grid} from '@mui/material';
import React from 'react';
import RobotCamera from "./components/RobotCamera/RobotCamera";
import Pose from "./components/Pose/Pose";
import RobotStates from "./components/RobotStates/RobotStates";

export default function Manipulator() {
    return (
        <Grid container spacing={1} sx={{pt: 1, pr: 1}}>
            <Pose />
            <RobotCamera />
            <RobotStates />
        </Grid>
    );
}
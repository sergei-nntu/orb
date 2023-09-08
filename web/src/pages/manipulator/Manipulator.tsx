import {Grid} from '@mui/material';
import React from 'react';
import Camera from "./components/Camera/Camera";
import Pose from "./components/Pose/Pose";
import GripperStep from "./components/GripperStep/GripperStep";

export default function Manipulator() {
    return (
        <Grid container spacing={1} sx={{pt: 1, pr: 1}}>
            <Pose />
            <Camera />
            <GripperStep />
        </Grid>
    );
}
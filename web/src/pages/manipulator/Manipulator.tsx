import {Grid} from '@mui/material';
import React from 'react';
import Camera from "./components/Camera/Camera";
import Logger from './components/Logger/Logger';
import Pose from "./components/Pose/Pose";
import GripperStep from "./components/GripperStep/GripperStep";
import ControlInterface from "./components/ControlInterface/ControlInterface";

export default function Manipulator() {
    return (
        <Grid container spacing={1} sx={{pt: 1, pr: 1}}>
            <Camera />
            <Logger />
            <Pose />
            <GripperStep />
            <ControlInterface />
        </Grid>
    );
}
import React, { useState } from 'react';
// import { useControls } from 'leva';
import Dog from './Dog';
import DogStates from './DogStates/DogStates';
import { Grid } from '@mui/material';
import { JointStateContext } from '../../contexts/DogContext/JointStateContext';

export default function DogMain() {
    const [joint0Value, setJoint0Value] = useState(0);
    const [joint1Value, setJoint1Value] = useState(-50);
    const [joint2Value, setJoint2Value] = useState(90);
    const [joint3Value, setJoint3Value] = useState(0);
    const [joint4Value, setJoint4Value] = useState(-50);
    const [joint5Value, setJoint5Value] = useState(90);
    const [joint6Value, setJoint6Value] = useState(0);
    const [joint7Value, setJoint7Value] = useState(-50);
    const [joint8Value, setJoint8Value] = useState(90);
    const [joint9Value, setJoint9Value] = useState(0);
    const [joint10Value, setJoint10Value] = useState(-50);
    const [joint11Value, setJoint11Value] = useState(90);
    return (
        <JointStateContext.Provider
            value={{
                joint0Value,
                setJoint0Value,
                joint1Value,
                setJoint1Value,
                joint2Value,
                setJoint2Value,
                joint3Value,
                setJoint3Value,
                joint4Value,
                setJoint4Value,
                joint5Value,
                setJoint5Value,
                joint6Value,
                setJoint6Value,
                joint7Value,
                setJoint7Value,
                joint8Value,
                setJoint8Value,
                joint9Value,
                setJoint9Value,
                joint10Value,
                setJoint10Value,
                joint11Value,
                setJoint11Value,
            }}
        >
            <Grid container spacing={1} sx={{ pt: 1, pr: 1 }}>
                <Dog />
                <DogStates />
            </Grid>
        </JointStateContext.Provider>
    );
}

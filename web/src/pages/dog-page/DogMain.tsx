import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { API_ROUTES } from '../../constants';
import { JointStateContext } from '../../contexts/OQPJointStateContext/JointStateContext';
import useHttp from '../../hooks/Http/Http';
import Dog from './Dog';
import DogStates from './DogStates/DogStates';

export default function DogMain() {
    const { request } = useHttp();

    const [joint0Value, setJoint0Value] = useState(0);
    const [joint1Value, setJoint1Value] = useState(0);
    const [joint2Value, setJoint2Value] = useState(0);
    const [joint3Value, setJoint3Value] = useState(0);
    const [joint4Value, setJoint4Value] = useState(0);
    const [joint5Value, setJoint5Value] = useState(0);
    const [joint6Value, setJoint6Value] = useState(0);
    const [joint7Value, setJoint7Value] = useState(0);
    const [joint8Value, setJoint8Value] = useState(0);
    const [joint9Value, setJoint9Value] = useState(0);
    const [joint10Value, setJoint10Value] = useState(0);
    const [joint11Value, setJoint11Value] = useState(0);

    useEffect(() => {
        const sendJointStateToServer = async () => {
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        shoulder1: (joint0Value * Math.PI) / 180,
                        reductor1: (joint1Value * Math.PI) / 180,
                        knee1: (joint2Value * Math.PI) / 180,
                        shoulder2: (joint3Value * Math.PI) / 180,
                        reductor2: (joint4Value * Math.PI) / 180,
                        knee2: (joint5Value * Math.PI) / 180,
                        shoulder3: (joint6Value * Math.PI) / 180,
                        reductor3: (joint7Value * Math.PI) / 180,
                        knee3: (joint8Value * Math.PI) / 180,
                        shoulder4: (joint9Value * Math.PI) / 180,
                        reductor4: (joint10Value * Math.PI) / 180,
                        knee4: (joint11Value * Math.PI) / 180,
                    }),
                };
                await request(API_ROUTES.POST_OQP_JOINT_STATE, options);
            } catch (error) {
                console.error(error);
            }
        };
        sendJointStateToServer();
    }, [
        joint0Value,
        joint1Value,
        joint2Value,
        joint3Value,
        joint4Value,
        joint5Value,
        joint6Value,
        joint7Value,
        joint8Value,
        joint9Value,
        joint10Value,
        joint11Value,
    ]);

    useEffect(() => {
        async function fetchFunc() {
            try {
                const response = await request(API_ROUTES.GET_OQP_JOINT_STATE);
                setJoint0Value((response.shoulder1 * 180) / Math.PI);
                setJoint1Value((response.reductor1 * 180) / Math.PI);
                setJoint2Value((response.knee1 * 180) / Math.PI);
                setJoint3Value((response.shoulder2 * 180) / Math.PI);
                setJoint4Value((response.reductor2 * 180) / Math.PI);
                setJoint5Value((response.knee2 * 180) / Math.PI);
                setJoint6Value((response.shoulder3 * 180) / Math.PI);
                setJoint7Value((response.reductor3 * 180) / Math.PI);
                setJoint8Value((response.knee3 * 180) / Math.PI);
                setJoint9Value((response.shoulder4 * 180) / Math.PI);
                setJoint10Value((response.reductor4 * 180) / Math.PI);
                setJoint11Value((response.knee4 * 180) / Math.PI);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFunc().then((r) => console.log(r));
    }, []);

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

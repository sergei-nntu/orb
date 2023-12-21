import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { API_ROUTES } from '../../constants';
import { JointStateContext } from '../../contexts/OQPJointStateContext/JointStateContext';
import useHttp from '../../hooks/Http/Http';
import Dog from './Dog';
import DogStates from './DogStates/DogStates';

export default function DogMain() {
    const { request } = useHttp();
    // FIXME: It's necessary to replace all these states with one
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
                if (isInitialState()) {
                    return;
                }

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
        sendJointStateToServer().then();
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

    const isInitialState = () => {
        return (
            joint0Value === 0 &&
            joint1Value === 0 &&
            joint2Value === 0 &&
            joint3Value === 0 &&
            joint4Value === 0 &&
            joint5Value === 0 &&
            joint6Value === 0 &&
            joint7Value === 0 &&
            joint8Value === 0 &&
            joint9Value === 0 &&
            joint10Value === 0 &&
            joint11Value === 0
        );
    };

    useEffect(() => {
        async function fetchFunc() {
            try {
                const response = await request(API_ROUTES.GET_OQP_JOINT_STATE);
                setJoint0Value(+((response.shoulder1 * 180) / Math.PI).toFixed(0));
                setJoint1Value(+((response.reductor1 * 180) / Math.PI).toFixed(0));
                setJoint2Value(+((response.knee1 * 180) / Math.PI).toFixed(0));
                setJoint3Value(+((response.shoulder2 * 180) / Math.PI).toFixed(0));
                setJoint4Value(+((response.reductor2 * 180) / Math.PI).toFixed(0));
                setJoint5Value(+((response.knee2 * 180) / Math.PI).toFixed(0));
                setJoint6Value(+((response.shoulder3 * 180) / Math.PI).toFixed(0));
                setJoint7Value(+((response.reductor3 * 180) / Math.PI).toFixed(0));
                setJoint8Value(+((response.knee3 * 180) / Math.PI).toFixed(0));
                setJoint9Value(+((response.shoulder4 * 180) / Math.PI).toFixed(0));
                setJoint10Value(+((response.reductor4 * 180) / Math.PI).toFixed(0));
                setJoint11Value(+((response.knee4 * 180) / Math.PI).toFixed(0));
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
                <Grid item xs={6} sm={7} md={6} lg={8}>
                    <Dog />
                </Grid>
                <Grid item xs={6} sm={5} md={6} lg={4}>
                    <DogStates />
                </Grid>
            </Grid>
        </JointStateContext.Provider>
    );
}

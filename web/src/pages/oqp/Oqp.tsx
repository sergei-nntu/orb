import { Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { API_ROUTES } from '../../constants';
import useHttp from '../../hooks/Http/Http';
import { useRouter } from '../../hooks/Router/Router';
import { useUsbConnection } from '../../hooks/UsbConnection/UsbConnection';
import { IJointsStateOqp } from '../../types/appTypes';
import { convertDeegreToRadian, convertRadianToDegree } from '../../utils';
import Model from './components/Model/Model';
import JointsState from './components/States/JointState';

export default function Oqp() {
    const { request } = useHttp();
    const { usbConnected, checkUsbConnection } = useUsbConnection(useHttp, useRouter);

    const responseFetchFunc = useRef();
    const stateFirstStart = useRef(false);

    const [modelLoaded, setModelLoaded] = useState<boolean>(false);
    const [jointValue, setJointValue] = useState<IJointsStateOqp>({
        Front_Left_Shoulder: 0,
        Front_Left_Reductor: -50,
        Front_Left_Knee: 90,
        Front_Right_Shoulder: 0,
        Front_Right_Reductor: -50,
        Front_Right_Knee: 90,
        Rear_Left_Shoulder: 0,
        Rear_Left_Reductor: -50,
        Rear_Left_Knee: 90,
        Rear_Right_Shoulder: 0,
        Rear_Right_Reductor: -50,
        Rear_Right_Knee: 90,
    });

    useEffect(() => {
        const sendJointStateToServer = async () => {
            try {
                if (responseFetchFunc.current === undefined && !stateFirstStart.current && isInitialState()) {
                    return;
                }
                stateFirstStart.current = true;

                const Front_Left_Shoulder = convertDeegreToRadian(jointValue.Front_Left_Shoulder);
                const Front_Left_Reductor = convertDeegreToRadian(jointValue.Front_Left_Reductor);
                const Front_Left_Knee = convertDeegreToRadian(jointValue.Front_Left_Knee);
                const Front_Right_Shoulder = convertDeegreToRadian(jointValue.Front_Right_Shoulder);
                const Front_Right_Reductor = convertDeegreToRadian(jointValue.Front_Right_Reductor);
                const Front_Right_Knee = convertDeegreToRadian(jointValue.Front_Right_Knee);
                const Rear_Left_Shoulder = convertDeegreToRadian(jointValue.Rear_Left_Shoulder);
                const Rear_Left_Reductor = convertDeegreToRadian(jointValue.Rear_Left_Reductor);
                const Rear_Left_Knee = convertDeegreToRadian(jointValue.Rear_Left_Knee);
                const Rear_Right_Shoulder = convertDeegreToRadian(jointValue.Rear_Right_Shoulder);
                const Rear_Right_Reductor = convertDeegreToRadian(jointValue.Rear_Right_Reductor);
                const Rear_Right_Knee = convertDeegreToRadian(jointValue.Rear_Right_Knee);

                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        shoulder1: Front_Left_Shoulder,
                        reductor1: Front_Left_Reductor,
                        knee1: Front_Left_Knee,
                        shoulder2: Front_Right_Shoulder,
                        reductor2: Front_Right_Reductor,
                        knee2: Front_Right_Knee,
                        shoulder3: Rear_Left_Shoulder,
                        reductor3: Rear_Left_Reductor,
                        knee3: Rear_Left_Knee,
                        shoulder4: Rear_Right_Shoulder,
                        reductor4: Rear_Right_Reductor,
                        knee4: Rear_Right_Knee,
                    }),
                };

                await request(API_ROUTES.POST_OQP_JOINT_STATE, options);
            } catch (error) {
                console.error(error);
            }
        };
        sendJointStateToServer().then();
    }, [jointValue]);

    const isInitialState = () => {
        return (
            jointValue.Front_Left_Shoulder === 0 &&
            jointValue.Front_Left_Reductor === -50 &&
            jointValue.Front_Left_Knee === 90 &&
            jointValue.Front_Right_Shoulder === 0 &&
            jointValue.Front_Right_Reductor === -50 &&
            jointValue.Front_Right_Knee === 90 &&
            jointValue.Rear_Left_Shoulder === 0 &&
            jointValue.Rear_Left_Reductor === -50 &&
            jointValue.Rear_Left_Knee === 90 &&
            jointValue.Rear_Right_Shoulder === 0 &&
            jointValue.Rear_Right_Reductor === -50 &&
            jointValue.Rear_Right_Knee === 90
        );
    };

    useEffect(() => {
        checkUsbConnection().then();
        async function fetchFunc() {
            try {
                const response = await request(API_ROUTES.GET_OQP_JOINT_STATE);
                responseFetchFunc.current = response;

                const Front_Left_Shoulder = convertRadianToDegree(response.shoulder1);
                const Front_Left_Reductor = convertRadianToDegree(response.reductor1);
                const Front_Left_Knee = convertRadianToDegree(response.knee1);
                const Front_Right_Shoulder = convertRadianToDegree(response.shoulder2);
                const Front_Right_Reductor = convertRadianToDegree(response.reductor2);
                const Front_Right_Knee = convertRadianToDegree(response.knee2);
                const Rear_Left_Shoulder = convertRadianToDegree(response.shoulder3);
                const Rear_Left_Reductor = convertRadianToDegree(response.reductor3);
                const Rear_Left_Knee = convertRadianToDegree(response.knee3);
                const Rear_Right_Shoulder = convertRadianToDegree(response.shoulder4);
                const Rear_Right_Reductor = convertRadianToDegree(response.reductor4);
                const Rear_Right_Knee = convertRadianToDegree(response.knee4);

                setJointValue({
                    Front_Left_Shoulder,
                    Front_Left_Reductor,
                    Front_Left_Knee,
                    Front_Right_Shoulder,
                    Front_Right_Reductor,
                    Front_Right_Knee,
                    Rear_Left_Shoulder,
                    Rear_Left_Reductor,
                    Rear_Left_Knee,
                    Rear_Right_Shoulder,
                    Rear_Right_Reductor,
                    Rear_Right_Knee,
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchFunc().then((r) => console.log(r));
    }, []);
    return usbConnected ? (
        <Grid container spacing={1} sx={{ pt: 1, pr: 1 }}>
            <Grid item xs={6} sm={7} md={6} lg={8}>
                <Model jointValue={jointValue} setModelLoaded={setModelLoaded} />
            </Grid>
            <Grid item xs={6} sm={5} md={6} lg={4}>
                <JointsState jointValue={jointValue} setJointValue={setJointValue} modelLoaded={modelLoaded} />
            </Grid>
        </Grid>
    ) : null;
}

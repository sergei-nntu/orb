import { Grid } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { API_ROUTES, GRIPPER_SCALE_COEFFICIENT } from '../../constants';
import { JointsStateContext } from '../../contexts/JointsStateContext/JointsStateContext';
import { LoaderContext } from '../../contexts/JointsStateContext/LoaderContext';
import useHttp from '../../hooks/Http/Http';
import { useRouter } from '../../hooks/Router/Router';
import { useUsbConnection } from '../../hooks/UsbConnection/UsbConnection';
import Pose from './components/Pose/Pose';
import RobotCamera from './components/RobotCamera/RobotCamera';
import RobotModel from './components/RobotModel/RobotModel';
import RobotStates from './components/RobotStates/RobotStates';

export default function Manipulator() {
    const { request } = useHttp();

    const { setJointsState } = useContext(JointsStateContext);
    const { usbConnected, checkUsbConnection } = useUsbConnection(useHttp, useRouter);

    const trackingChangeModel = useRef<boolean>(true);
    const trajectory = useRef(undefined);
    const gripperValueInRadians = useRef<undefined | number>(undefined);
    const degreesJointValues = useRef([0, 0, 0, 0, 0, 0]);
    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);

    const remoteControlEnabled = useRef<boolean>(true);
    const blocklyEnabled = useRef<boolean>(false);
    const [stateProgress, setStateProgress] = useState<boolean>(false);
    const [disabledControlInterface, setDisabledControlInterface] = useState<boolean>(false);

    useEffect(() => {
        checkUsbConnection().then();
        interval.current = setInterval(getJointsState, 500);
        return () => {
            clearInterval(interval.current);
        };
    }, []);

    const getJointsState = async () => {
        if (remoteControlEnabled.current) {
            const r = await request(API_ROUTES.GET_JOINT_TRAJECTORY);
            if (!r) {
                clearInterval(interval.current);
                return;
            }

            if (isSameTrajectory(r)) {
                return;
            }

            if (needToSetTrajectory(r)) {
                trajectory.current = r;
            }

            const processJointState = async (state: number[]) => {
                await new Promise((resolve) => setTimeout(resolve, 30));

                setJointsState({
                    shoulder: state[0],
                    upperArm: state[1],
                    forearm: state[2],
                    wrist1: state[3],
                    wrist2: state[4],
                    endEffectorLink: state[5],
                    claws: state[6] * GRIPPER_SCALE_COEFFICIENT,
                });

                const joints = [...state];
                gripperValueInRadians.current = joints.pop();
                degreesJointValues.current = joints.map((element) => +((180 * element) / Math.PI).toFixed(0));
            };

            for (let i = 0; i < r.length; i++) {
                await processJointState(r[i]);

                trackingChangeModel.current = true;
            }
            trackingChangeModel.current = false;
        }
    };

    const isSameTrajectory = (r: number[][]) => {
        return JSON.stringify(trajectory.current) === JSON.stringify(r);
    };

    const needToSetTrajectory = (r: number[][]) => {
        return !trajectory.current || JSON.stringify(trajectory.current) !== JSON.stringify(r);
    };

    useEffect(() => {
        request(API_ROUTES.GET_BLOCKLY_STATE).then((r) => {
            blocklyEnabled.current = r?.state;
        });
    }, []);

    useEffect(() => {
        if (!blocklyEnabled.current && stateProgress) {
            setDisabledControlInterface(false);
        } else {
            setDisabledControlInterface(true);
        }
    }, [stateProgress, blocklyEnabled.current]);

    return usbConnected ? (
        <LoaderContext.Provider //in props
            value={{
                stateProgress,
                setStateProgress,

                trackingChangeModel,
                blocklyEnabled,
            }}
        >
            <Grid container spacing={1} sx={{ pt: 1, pr: 1 }}>
                <Pose remoteControlEnabled={remoteControlEnabled} disabledControlInterface={disabledControlInterface} />
                <Grid item sm={12} md={4} lg={6}>
                    <RobotModel />
                    <RobotCamera />
                </Grid>
                <RobotStates
                    remoteControlEnabled={remoteControlEnabled}
                    degreesJointValues={degreesJointValues}
                    gripperValueInRadians={gripperValueInRadians}
                    disabledControlInterface={disabledControlInterface}
                />
            </Grid>
        </LoaderContext.Provider>
    ) : null;
}

import React, {useContext, useEffect, useMemo, useReducer} from 'react';
import reducer from "../PoseReducer/PoseReducer";
import {PoseContext} from "../PoseContext";
import useHttp from "../../../hooks/Http/Http";
import {IPose} from "../../../types/appTypes";
import { NotificationContext } from '../../NotificationContext/NotificationContext';
import { NOTIFICATION } from '../../../types/appTypes';

type PoseProviderProps = {
    children: React.ReactNode
};

function PoseProvider(props: PoseProviderProps) {
    const initialState = {
        position: {
            x: 0.0,
            y: 0.1,
            z: 0.4
        },
        orientation: {
            pitch: 0.0,
            roll: 0.0,
            yaw: 0.0
        },
        gripper_state: 0.0
    };

    const {dispatchNotification} = useContext(NotificationContext);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [state, dispatch] = useReducer(reducer, initialState);
    const {request} = useHttp();
    const value = useMemo(() => ({state, dispatch}), [state]);

    const sendStateToServer = async (state: IPose) => {
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({
                    "x": state.position.x,
                    "y": state.position.y,
                    "z": state.position.z,
                    "pitch": state.orientation.pitch,
                    "roll": state.orientation.roll,
                    "yaw": state.orientation.yaw,
                    "gripper": state.gripper_state
                })
            };

            const {execute} = await request("/convert_pose", options);
            
            if (execute) {
                dispatchNotification({type: NOTIFICATION.SUCCESS_PLANNING, open: false});
            } else {
                dispatchNotification({type: NOTIFICATION.NO_MOVE_TO_POSITION, open: false});
            }

        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        sendStateToServer(state).then(r => console.log(r));
    }, [state]);

    return (
        <PoseContext.Provider value={value}>
            {props.children}
        </PoseContext.Provider>
    );
}

export default PoseProvider;
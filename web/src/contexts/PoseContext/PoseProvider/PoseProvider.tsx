import React, {useMemo, useReducer} from 'react';
import reducer from "../PoseReducer/PoseReducer";
import {PoseContext} from "../PoseContext";

type PoseProviderProps = {
    children: React.ReactNode
};

function PoseProvider(props: PoseProviderProps) {
    const initialState = {
        position: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        orientation: {
            pitch: 0.0,
            roll: 0.0,
            yaw: 0.0
        },
        gripper_state: 0.0
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({state, dispatch}), [state]);

    return (
        <PoseContext.Provider value={value}>
            {props.children}
        </PoseContext.Provider>
    );
}

export default PoseProvider;
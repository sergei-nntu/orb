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
            y: 0.1,
            z: 0.4
        },
        orientation: {
            pitch: 0.0,
            roll: 0.0,
            yaw: 0.0
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({state, dispatch}), [state]);

    return (
        <PoseContext.Provider value={value}>
            {props.children}
        </PoseContext.Provider>
    );
}

export default PoseProvider;
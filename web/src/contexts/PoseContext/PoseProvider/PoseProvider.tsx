import React, { useMemo, useReducer } from 'react';

import { IPose } from '../../../types/appTypes';
import { PoseContext } from '../PoseContext';
import reducer from '../PoseReducer/PoseReducer';

type PoseProviderProps = {
    children: React.ReactNode;
};

function PoseProvider(props: PoseProviderProps) {
    const initialState: IPose = {
        position: {
            x: 0.0,
            y: 0.1,
            z: 0.4,
        },
        orientation: {
            pitch: 0.0,
            roll: 0.0,
            yaw: 0.0,
        },
        gripper_state: 0.0,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <PoseContext.Provider value={value}>{props.children}</PoseContext.Provider>;
}

export default PoseProvider;

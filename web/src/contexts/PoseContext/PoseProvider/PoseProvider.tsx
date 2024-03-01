import React, { useMemo, useReducer } from 'react';

import { INITIAL_POSE_STATE } from '../../../constants';
import { PoseContext } from '../PoseContext';
import reducer from '../PoseReducer/PoseReducer';

type PoseProviderProps = {
    children: React.ReactNode;
};

function PoseProvider(props: PoseProviderProps) {
    const [state, dispatch] = useReducer(reducer, INITIAL_POSE_STATE);
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <PoseContext.Provider value={value}>{props.children}</PoseContext.Provider>;
}

export default PoseProvider;

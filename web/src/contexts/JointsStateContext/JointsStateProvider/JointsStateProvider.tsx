import React, { useMemo, useState } from 'react';

import { IJointsState } from '../../../types/appTypes';
import { JointsStateContext } from '../JointsStateContext';

type JointsStateProviderProps = {
    children: React.ReactNode;
};

export default function JointsStateProvider(props: JointsStateProviderProps) {
    const [jointsState, setJointsState] = useState<IJointsState>({
        shoulder: 0,
        upperArm: 0,
        forearm: 0,
        wrist1: 0,
        wrist2: 0,
        endEffectorLink: 0,
        claws: 0,
    });

    const value = useMemo(() => ({ jointsState, setJointsState }), [jointsState]);
    return <JointsStateContext.Provider value={value}>{props.children}</JointsStateContext.Provider>;
}

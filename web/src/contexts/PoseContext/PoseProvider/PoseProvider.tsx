import React, {useMemo, useReducer} from 'react';
import reducer from "../PoseReducer/PoseReducer";
import {PoseContext} from "../PoseContext";

type PoseProviderProps = {
    children: React.ReactNode
};

function NotificationProvider(props: PoseProviderProps) {

    const initialState = {};

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({state, dispatch}), [state]);

    return (
        <PoseContext.Provider value={value}>
            {props.children}
        </PoseContext.Provider>
    );
}

export default NotificationProvider;
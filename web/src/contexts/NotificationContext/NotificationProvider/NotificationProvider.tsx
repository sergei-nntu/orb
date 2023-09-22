import React, {useMemo, useReducer} from 'react';
import {NotificationContext}  from '../NotificationContext';
import Notification from "../../../components/Notification/Notification";
import reducer from '../NotificationReducer/NotificationReducer';
import {INotification} from "../../../types/appTypes";

type NotificationProviderProps = {
    children: React.ReactNode
};

function NotificationProvider(props: NotificationProviderProps) {

    const initialState: INotification = {
        severity: "success",
        message: "",
        open: false
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [state, dispatchNotification] = useReducer(reducer, initialState);

    const value = useMemo(() => ({state, dispatchNotification}), [state]);
    return (
        <NotificationContext.Provider value={value}>
            {props.children}
            <Notification />
        </NotificationContext.Provider>
    );
}

export default NotificationProvider;
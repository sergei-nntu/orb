import React, { useMemo, useReducer } from 'react';

import Notification from '../../../components/Notification/Notification';
import { INotification } from '../../../types/appTypes';
import { NotificationContext } from '../NotificationContext';
import reducer from '../NotificationReducer/NotificationReducer';

type NotificationProviderProps = {
    children: React.ReactNode;
};

function NotificationProvider(props: NotificationProviderProps) {
    const initialState: INotification = {
        severity: 'success',
        message: '',
        open: false,
        console: {
            message: '',
        },
    };

    const [notificationState, dispatchNotification] = useReducer(reducer, initialState);

    const value = useMemo(() => ({ notificationState, dispatchNotification }), [notificationState]);
    return (
        <NotificationContext.Provider value={value}>
            {props.children}
            <Notification />
        </NotificationContext.Provider>
    );
}

export default NotificationProvider;

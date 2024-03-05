import React, { useEffect, useMemo, useReducer } from 'react';

import { API_ROUTES } from '../../../constants';
import useHttp from '../../../hooks/Http/Http';
import { getCurrentTime } from '../../../pages/manipulator/components/Pose/Pose';
import { CONSOLE_MESSAGE } from '../../../types/appTypes';
import { MessagesContext } from '../MessagesContext';
import { ADD_MESSAGE, MessagesReducer } from '../MessagesReducer/MessagesReducer';

interface MessagesProviderProps {
    children: React.ReactNode;
}

function MessagesProvider(props: MessagesProviderProps) {
    const initialState = {
        messages: [],
    };

    const [messagesState, dispatchMessages] = useReducer(MessagesReducer, initialState);
    const { request } = useHttp();

    useEffect(() => {
        checkServerStatus().then();
    }, []);

    const checkServerStatus = async () => {
        request(API_ROUTES.CHECK_SERVER_STATUS).then((res: boolean) => {
            const statusMessage = identifyStatus(res);
            dispatchMessages({
                type: ADD_MESSAGE,
                payload: { text: statusMessage, time: getCurrentTime(new Date()) },
            });
        });
    };

    const identifyStatus = (res: boolean) => {
        if (res) {
            return CONSOLE_MESSAGE.INITIALIZED;
        } else {
            return CONSOLE_MESSAGE.NO_CONNECTION_WITH_SERVER;
        }
    };

    const value = useMemo(() => ({ messagesState, dispatchMessages }), [messagesState]);
    return <MessagesContext.Provider value={value}>{props.children}</MessagesContext.Provider>;
}

export default MessagesProvider;

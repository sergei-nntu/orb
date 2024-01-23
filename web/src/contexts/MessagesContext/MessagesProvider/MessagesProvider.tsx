import React, { useEffect, useMemo, useState } from 'react';

import { API_ROUTES } from '../../../constants';
import useHttp from '../../../hooks/Http/Http';
import { CONSOLE_MESSAGE } from '../../../types/appTypes';
import { MessagesContext } from '../MessagesContext';

type MessagesProviderProps = {
    children: React.ReactNode;
};

export const addTimeToMessage = (message: string): string => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return message ? message + ' ' + `${hours}:${minutes}:${seconds}` : message || '';
};

function MessagesProvider(props: MessagesProviderProps) {
    const { request } = useHttp();
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        checkServerStatus().then();
    }, []);

    const checkServerStatus = async () => {
        request(API_ROUTES.CHECK_SERVER_STATUS).then((res) => {
            const statusMessage = identifyStatus(res);
            setMessages([statusMessage]);
        });
    };

    const identifyStatus = (res: boolean) => {
        if (res) {
            return addTimeToMessage(CONSOLE_MESSAGE.INITIALIZED);
        } else {
            return addTimeToMessage(CONSOLE_MESSAGE.NO_CONNECTION_WITH_SERVER);
        }
    };

    const value = useMemo(() => ({ messages, setMessages }), [messages]);
    return <MessagesContext.Provider value={value}>{props.children}</MessagesContext.Provider>;
}

export default MessagesProvider;

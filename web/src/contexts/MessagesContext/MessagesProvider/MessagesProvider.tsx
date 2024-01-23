import React, { useEffect, useMemo, useState } from 'react';

import { API_ROUTES } from '../../../constants';
import useHttp from '../../../hooks/Http/Http';
import { CONSOLE_MESSAGE } from '../../../types/appTypes';
import { MessagesContext } from '../MessagesContext';

type MessagesProviderProps = {
    children: React.ReactNode;
};

export type MessageType = {
    index: number;
    text: string;
    time: string;
};

export const getCurrentTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
};

function MessagesProvider(props: MessagesProviderProps) {
    const { request } = useHttp();
    const [messages, setMessages] = useState<MessageType[]>([]);

    useEffect(() => {
        checkServerStatus().then();
    }, []);

    const checkServerStatus = async () => {
        request(API_ROUTES.CHECK_SERVER_STATUS).then((res) => {
            const statusMessage = identifyStatus(res);
            setMessages([{ index: messages.length, text: statusMessage, time: getCurrentTime(new Date()) }]);
        });
    };

    const identifyStatus = (res: boolean) => {
        if (res) {
            return CONSOLE_MESSAGE.INITIALIZED;
        } else {
            return CONSOLE_MESSAGE.NO_CONNECTION_WITH_SERVER;
        }
    };

    const value = useMemo(() => ({ messages, setMessages }), [messages]);
    return <MessagesContext.Provider value={value}>{props.children}</MessagesContext.Provider>;
}

export default MessagesProvider;

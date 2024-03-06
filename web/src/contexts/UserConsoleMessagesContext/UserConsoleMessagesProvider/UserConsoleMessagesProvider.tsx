import React, { useEffect, useMemo, useState } from 'react';

import { API_ROUTES } from '../../../constants';
import useHttp from '../../../hooks/Http/Http';
import { CONSOLE_MESSAGE, UserConsoleMessage } from '../../../types/appTypes';
import { UserConsoleMessagesContext } from '../UserConsoleMessagesContext';

interface MessagesProviderProps {
    children: React.ReactNode;
}

const initialState: UserConsoleMessage[] = [];

function UserConsoleMessagesProvider(props: MessagesProviderProps) {
    const [userConsoleMessages, setMessages] = useState<UserConsoleMessage[]>(initialState);
    const { request } = useHttp();

    useEffect(() => {
        checkServerStatus().then();
    }, []);

    const getCurrentTime = (date: Date): string => {
        const hours: string = String(date.getHours()).padStart(2, '0');
        const minutes: string = String(date.getMinutes()).padStart(2, '0');
        const seconds: string = String(date.getSeconds()).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    const addUserConsoleMessage = (messageText: string): void => {
        setMessages([
            ...userConsoleMessages,
            { index: userConsoleMessages.length, text: messageText, time: getCurrentTime(new Date()) },
        ]);
    };

    const checkServerStatus = async (): Promise<void> => {
        request(API_ROUTES.CHECK_SERVER_STATUS).then((res: boolean): void => {
            const statusMessage: string = identifyStatus(res);
            addUserConsoleMessage(statusMessage);
        });
    };

    const identifyStatus = (res: boolean): string => {
        if (res) {
            return CONSOLE_MESSAGE.INITIALIZED;
        } else {
            return CONSOLE_MESSAGE.NO_CONNECTION_WITH_SERVER;
        }
    };

    const value = useMemo(() => ({ userConsoleMessages, addUserConsoleMessage }), [userConsoleMessages]);
    return <UserConsoleMessagesContext.Provider value={value}>{props.children}</UserConsoleMessagesContext.Provider>;
}

export default UserConsoleMessagesProvider;

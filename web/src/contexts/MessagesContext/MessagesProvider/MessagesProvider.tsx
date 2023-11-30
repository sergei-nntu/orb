import React, { useEffect, useMemo, useState } from 'react';

import { API_ROUTES } from '../../../constants';
import useHttp from '../../../hooks/Http/Http';
import { CONSOLE_MESSAGE } from '../../../types/appTypes';
import { MessagesContext } from '../MessagesContext';

type MessagesProviderProps = {
    children: React.ReactNode;
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
            return CONSOLE_MESSAGE.INITIALIZED;
        } else {
            return CONSOLE_MESSAGE.NO_CONNECTION_WITH_SERVER;
        }
    };

    const value = useMemo(() => ({ messages, setMessages }), [messages]);
    return <MessagesContext.Provider value={value}>{props.children}</MessagesContext.Provider>;
}

export default MessagesProvider;

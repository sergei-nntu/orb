import { CssBaseline, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';

import { MessagesContext } from '../../../../contexts/MessagesContext/MessagesContext';
import { NotificationContext } from '../../../../contexts/NotificationContext/NotificationContext';
import { PoseContext } from '../../../../contexts/PoseContext/PoseContext';
import { CONSOLE_MESSAGE } from '../../../../types/appTypes';
import { StyledBox } from '../StyledComponents/StyledComponents';

export default function UserConsole() {
    const { state } = useContext(PoseContext);
    const { notificationState } = useContext(NotificationContext);
    const { messages, setMessages } = useContext(MessagesContext);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const addMessage = (newMessage: string) => {
        setMessages([...messages, newMessage]);
    };

    useEffect(() => {
        const message = notificationState.console.message;
        addMessage(message);
    }, [state]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [messages]);

    const defineMessageColor = (msg: string) => {
        const redColor =
            msg === CONSOLE_MESSAGE.NO_MOVE_TO_POSITION || msg === CONSOLE_MESSAGE.NO_CONNECTION_WITH_SERVER;
        return redColor ? 'red' : 'green';
    };

    return (
        <StyledBox sx={{ width: '100%', height: '22vh', mb: 1, overflowY: 'auto' }} id="user-console">
            <CssBaseline />
            {messages.map((msg: string, index: number) => (
                <Typography
                    color={defineMessageColor(msg)}
                    key={index}
                    align="left"
                    variant="caption"
                    component={'div'}
                    id="user-message"
                    sx={{ lineHeight: 1.2 }}
                >
                    {msg}
                </Typography>
            ))}
            <div ref={messagesEndRef} />
        </StyledBox>
    );
}

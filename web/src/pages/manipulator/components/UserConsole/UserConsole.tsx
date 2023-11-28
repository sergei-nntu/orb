import { CssBaseline, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { API_ROUTES } from '../../../../constants';
import { NotificationContext } from '../../../../contexts/NotificationContext/NotificationContext';
import { PoseContext } from '../../../../contexts/PoseContext/PoseContext';
import useHttp from '../../../../hooks/Http/Http';
import { CONSOLE_MESSAGE } from '../../../../types/appTypes';
import { StyledBox } from '../StyledComponents/StyledComponents';

export default function UserConsole() {
    const { state } = useContext(PoseContext);
    const { request } = useHttp();
    const { notificationState } = useContext(NotificationContext);
    const [messages, setMessages] = useState<string[]>(['Initialized.']);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const addMessage = (messageText: string) => {
        setMessages([...messages, messageText]);
    };

    useEffect(() => {
        const message = notificationState.console.message;
        addMessage(message);
    }, [state, notificationState.console.message]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [messages]);

    useEffect(() => {
        request(API_ROUTES.CHECK_SERVER_STATUS).then((r) => {
            if (r.ok) {
                console.log('It works!', r);
            } else {
                console.log("Server doesn't work!");
            }
        });
    }, []);

    return (
        <StyledBox sx={{ width: '100%', height: '22vh', mb: 1, overflowY: 'auto' }} id="user-console">
            <CssBaseline />
            {messages.map((msg, index) => (
                <Typography
                    color={msg === CONSOLE_MESSAGE.NO_MOVE_TO_POSITION ? 'red' : 'green'}
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

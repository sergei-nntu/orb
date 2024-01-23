import { CssBaseline } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';

import { MessagesContext } from '../../../../contexts/MessagesContext/MessagesContext';
import { getCurrentTime } from '../../../../contexts/MessagesContext/MessagesProvider/MessagesProvider';
import { NotificationContext } from '../../../../contexts/NotificationContext/NotificationContext';
import { PoseContext } from '../../../../contexts/PoseContext/PoseContext';
import { MessageType } from '../../../../types/appTypes';
import { StyledBox } from '../StyledComponents/StyledComponents';
import Message from './Message';

export default function UserConsole() {
    const { state } = useContext(PoseContext);
    const { notificationState } = useContext(NotificationContext);
    const { messages, setMessages } = useContext(MessagesContext);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const addMessage = (newMessage: string) => {
        setMessages([...messages, { index: messages.length, text: newMessage, time: getCurrentTime(new Date()) }]);
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

    return (
        <StyledBox sx={{ width: '100%', height: '280px', overflowY: 'auto', ml: { xs: 1, md: 0 } }} id="user-console">
            <CssBaseline />
            {messages.map((message: MessageType) => (
                <Message key={message.index} index={message.index} text={message.text} time={message.time} />
            ))}
            <div ref={messagesEndRef} />
        </StyledBox>
    );
}

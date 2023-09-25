import React, {useContext, useEffect, useRef, useState} from 'react';
import { StyledBox } from '../StyledComponents/StyledComponents';
import { CssBaseline, Typography } from '@mui/material';
import { PoseContext } from '../../../../contexts/PoseContext/PoseContext';
import { NotificationContext } from '../../../../contexts/NotificationContext/NotificationContext';
import { ConsoleMessage } from '../../../../types/appTypes';

export default function UserConsole() {
    const {state} = useContext(PoseContext);
    const {notifyState} = useContext(NotificationContext);
    const [messages, setMessages] = useState<string[]>(["Initialized."]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const addMessage = (messageText: string) => {
        setMessages([...messages, messageText]);
    };

    useEffect(() => {
        const message = notifyState.console.message;
        addMessage(message);
    }, [state, notifyState.console.message]);

    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages]);

    return (
        <StyledBox sx={{ width: '100%', height: '22vh', mb: 1, overflowY: 'auto' }}>
            <CssBaseline />
            {messages.map((msg, index) => (
                <Typography
                    color={msg === ConsoleMessage.NO_MOVE_TO_POSITION ? "red" : "green"} 
                    key={index}
                    align='left'
                    variant='caption'
                    component={'div'}
                    sx={{lineHeight: 1.2}}
                >
                    {msg}
                </Typography>
            ))}
            <div ref={messagesEndRef} />
        </StyledBox>
    );
}
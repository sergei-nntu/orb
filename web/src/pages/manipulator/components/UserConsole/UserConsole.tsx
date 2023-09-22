import React, {useEffect, useRef, useState} from 'react';
import { StyledBox } from '../StyledComponents/StyledComponents';
import { CssBaseline, Typography } from '@mui/material';

export default function UserConsole() {
    const [messages] = useState<string[]>(["Initialized.", "Changed start state"]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Example to add message to console
    // const addMessage = (messageText) => {
    //   setMessages([...messages, messageText]);
    // };

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
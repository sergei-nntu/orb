import { CssBaseline } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';

import { UserConsoleMessagesContext } from '../../../../contexts/UserConsoleMessagesContext/UserConsoleMessagesContext';
import { UserConsoleMessage } from '../../../../types/appTypes';
import { StyledBox } from '../StyledComponents/StyledComponents';
import Message from './Message';

export default function UserConsole() {
    const { userConsoleMessages } = useContext(UserConsoleMessagesContext);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [userConsoleMessages]);

    return (
        <StyledBox sx={{ width: '100%', height: '280px', overflowY: 'auto', ml: { xs: 1, md: 0 } }} id="user-console">
            <CssBaseline />
            {userConsoleMessages.map((message: UserConsoleMessage) => (
                <Message key={message.index} index={message.index} text={message.text} time={message.time} />
            ))}
            <div ref={messagesEndRef} />
        </StyledBox>
    );
}

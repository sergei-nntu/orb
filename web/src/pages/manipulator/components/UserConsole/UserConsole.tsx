import { CssBaseline } from '@mui/material';
import React, { useContext } from 'react';

import { MessagesContext } from '../../../../contexts/MessagesContext/MessagesContext';
import { IMessage } from '../../../../types/appTypes';
import { StyledBox } from '../StyledComponents/StyledComponents';
import Message from './Message';

export default function UserConsole() {
    const { messagesState } = useContext(MessagesContext);

    return (
        <StyledBox sx={{ width: '100%', height: '280px', overflowY: 'auto', ml: { xs: 1, md: 0 } }} id="user-console">
            <CssBaseline />
            {messagesState.messages.map((message: IMessage) => (
                <Message key={message.index} index={message.index} text={message.text} time={message.time} />
            ))}
        </StyledBox>
    );
}

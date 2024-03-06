import { CssBaseline } from '@mui/material';
import React, { useContext } from 'react';

import { UserConsoleMessagesContext } from '../../../../contexts/UserConsoleMessagesContext/UserConsoleMessagesContext';
import { UserConsoleMessage } from '../../../../types/appTypes';
import { StyledBox } from '../StyledComponents/StyledComponents';
import Message from './Message';

export default function UserConsole() {
    const { userConsoleMessages } = useContext(UserConsoleMessagesContext);

    return (
        <StyledBox sx={{ width: '100%', height: '280px', overflowY: 'auto', ml: { xs: 1, md: 0 } }} id="user-console">
            <CssBaseline />
            {userConsoleMessages.map((message: UserConsoleMessage) => (
                <Message key={message.index} index={message.index} text={message.text} time={message.time} />
            ))}
        </StyledBox>
    );
}

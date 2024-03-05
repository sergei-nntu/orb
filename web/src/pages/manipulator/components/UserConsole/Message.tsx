import { Typography } from '@mui/material';
import React from 'react';

import { CONSOLE_MESSAGE, IMessage } from '../../../../types/appTypes';

export default function Message({ index, text, time }: IMessage) {
    const defineMessageColor = (text: string) => {
        const redColor =
            text === CONSOLE_MESSAGE.NO_MOVE_TO_POSITION || text === CONSOLE_MESSAGE.NO_CONNECTION_WITH_SERVER;
        return redColor ? 'red' : 'green';
    };

    return (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
                color={defineMessageColor(text)}
                align="left"
                variant="caption"
                component={'div'}
                id="user-message"
                sx={{ lineHeight: 1.2 }}
            >
                {text}
            </Typography>
            {text && (
                <Typography
                    color={defineMessageColor(text)}
                    align="right"
                    variant="caption"
                    component={'div'}
                    id="user-message"
                    sx={{ lineHeight: 1.2 }}
                >
                    {time}
                </Typography>
            )}
        </div>
    );
}

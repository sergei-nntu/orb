import { Alert, Snackbar } from '@mui/material';
import React, { useContext } from 'react';

import { NotificationContext } from '../../contexts/NotificationContext/NotificationContext';
import { NOTIFICATION } from '../../types/appTypes';

export default function Notification() {
    const { notificationState, dispatchNotification } = useContext(NotificationContext);
    const { open, severity, message } = notificationState;

    const handleClose = () => {
        dispatchNotification({ type: NOTIFICATION.HIDE });
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={5000}
        >
            <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%', mb: 5 }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

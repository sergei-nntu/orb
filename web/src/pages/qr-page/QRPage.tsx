import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

import { API_ROUTES } from '../../constants';
import { NotificationContext } from '../../contexts/NotificationContext/NotificationContext';
import useHttp from '../../hooks/Http/Http';
import { NOTIFICATION } from '../../types/appTypes';

export default function QRPage() {
    const { request } = useHttp();
    const { dispatchNotification } = useContext(NotificationContext);
    const [currentIP, setCurrentIP] = useState<string | undefined>(undefined);

    useEffect(() => {
        getIP().then();
    }, []);

    const getIP = async () => {
        try {
            const { ip } = await request(API_ROUTES.GET_CURRENT_IP);
            setCurrentIP(ip ?? process.env.REACT_APP_HOST);
        } catch (e) {
            console.error(e);
            setCurrentIP(process.env.REACT_APP_HOST);
            dispatchNotification({ type: NOTIFICATION.GET_QR_CODE, open: true });
        }
    };

    if (!currentIP) {
        return (
            <Typography variant="h3" ml={1}>
                QR Code Loading...
            </Typography>
        );
    }

    return <QRCode value={currentIP} />;
}

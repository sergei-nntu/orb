import { useState } from 'react';

import { API_ROUTES } from '../../constants';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function useUsbConnection(useHttp, useRouter) {
    const router = useRouter();
    const { request } = useHttp();
    const [usbConnected, setUsbConnected] = useState(false);

    const checkUsbConnection = async () => {
        try {
            const res = await getUsbConnectionStatus();
            if (res && res.connection) {
                setUsbConnected(true);
            } else {
                console.log(process.env.NODE_ENV);
                if (process.env.REACT_APP_ENVIRONMENT === 'development') {
                    setUsbConnected(true);
                } else {
                    router.push('/');
                }
            }
        } catch (error) {
            console.error('Error checking USB connection:', error);
        }
    };

    const getUsbConnectionStatus = async () => {
        return await request(API_ROUTES.GET_USB_CONNECTION_STATUS);
    };

    return {
        usbConnected,
        checkUsbConnection,
        getUsbConnectionStatus,
    };
}

import React, {useEffect, useState} from 'react';
import QRCode from "react-qr-code";
import useHttp from "../../hooks/Http/Http";
import {API_ROUTES} from "../../constants";

export default function QRPage() {
    const {request} = useHttp();
    const [currentIP, setCurrentIP] = useState<string | undefined>(undefined);

    useEffect(()=> {
        getIP().then();
    },[]);

    const getIP = async () => {
        try{
            const options = {
                method: "GET",
            };

            const {ip} = await request(API_ROUTES.GET_CURRENT_IP, options);
            setCurrentIP(ip ?? process.env.REACT_APP_HOST);
        }catch (e){
            console.error(e);
            setCurrentIP(process.env.REACT_APP_HOST);
        }
    };

    if(!currentIP){
        return (
            <h1>QR Code Loading...</h1>
        );
    }


    return (
        <QRCode value={currentIP} />
    );
}

import { Box, SvgIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { API_ROUTES } from '../../constants';
import useHttp from '../../hooks/Http/Http';
import { IkeySteering } from '../../types/appTypes';
import { StyledBox } from '../manipulator/components/StyledComponents/StyledComponents';

export default function Steering() {
    const { request } = useHttp();
    const [keySteering, setKeySteering] = useState<IkeySteering>({
        ArrowUp: ' ',
        ArrowDown: ' ',
        ArrowLeft: ' ',
        ArrowRight: ' ',
    });

    const handleKeyDownSteering = (event: KeyboardEvent) => {
        const key = event.key;
        if (key in keySteering) {
            setKeySteering((prev) => ({
                ...prev,
                [key]: key,
            }));
        }
    };

    const handleKeyUpSteering = (event: KeyboardEvent) => {
        const key = event.key;
        if (key in keySteering) {
            setKeySteering((prev) => ({
                ...prev,
                [key]: ' ',
            }));
        }
        return;
    };

    const handleMouseDownSteering = (key: string) => () => {
        setKeySteering((prev) => ({
            ...prev,
            [key]: key,
        }));
        return;
    };

    const handleMouseUpSteering = (key: string) => () => {
        setKeySteering((prev) => ({
            ...prev,
            [key]: ' ',
        }));
        return;
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDownSteering);
        window.addEventListener('keyup', handleKeyUpSteering);

        return () => {
            window.removeEventListener('keydown', handleKeyDownSteering);
            window.removeEventListener('keyup', handleKeyUpSteering);
        };
    }, []);

    const sendSteeringToServer = async () => {
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    ArrowUp: keySteering.ArrowUp,
                    ArrowDown: keySteering.ArrowDown,
                    ArrowLeft: keySteering.ArrowLeft,
                    ArrowRight: keySteering.ArrowRight,
                }),
            };
            await request(API_ROUTES.POST_STEERING, options);
            // const resp = await request(API_ROUTES.POST_STEERING, options);
            // console.log('RESP', resp);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        sendSteeringToServer().then((err) => {
            if (err != undefined) {
                console.log(err);
            }
        });
    }, [keySteering]);

    return (
        <StyledBox>
            <h1>Steering</h1>
            <Box component="div" sx={{ display: 'flex', justifyContent: 'Center' }}>
                <CheckBoxEnable />
            </Box>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mt: 3,
                }}
            ></Box>
            <Box
                component="div"
                sx={{
                    position: 'relative',
                    height: '110px',
                    width: '110px',
                    margin: '0 auto',
                }}
            >
                <SvgIcon
                    viewBox="0 0 48 30"
                    style={{
                        cursor: 'pointer',
                        height: '30px',
                        width: '48px',
                        position: 'absolute',
                        left: 'calc(50% - 24px)',
                        top: '0',
                    }}
                    color={keySteering.ArrowUp == ' ' ? 'primary' : 'error'}
                    onMouseDown={handleMouseDownSteering('ArrowUp')}
                    onMouseUp={handleMouseUpSteering('ArrowUp')}
                    onMouseLeave={handleMouseUpSteering('ArrowUp')}
                >
                    <path
                        d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"
                        style={{ transform: 'scale(4) translate(-6px, -8px)' }}
                    ></path>
                </SvgIcon>

                <SvgIcon
                    viewBox="0 0 48 30"
                    style={{
                        cursor: 'pointer',
                        height: '30px',
                        width: '48px',
                        position: 'absolute',
                        left: 'calc(50% - 24px)',
                        bottom: '0',
                    }}
                    color={keySteering.ArrowDown == ' ' ? 'primary' : 'error'}
                    onMouseDown={handleMouseDownSteering('ArrowDown')}
                    onMouseUp={handleMouseUpSteering('ArrowDown')}
                    onMouseLeave={handleMouseUpSteering('ArrowDown')}
                >
                    <path
                        d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                        style={{ transform: 'scale(4) translate(-6px, -8.5px)' }}
                    ></path>
                </SvgIcon>

                <SvgIcon
                    viewBox="0 0 30 48"
                    style={{
                        cursor: 'pointer',
                        height: '48px',
                        width: '30px',
                        position: 'absolute',
                        left: '0',
                        top: 'calc(50% - 24px)',
                    }}
                    color={keySteering.ArrowLeft == ' ' ? 'primary' : 'error'}
                    onMouseDown={handleMouseDownSteering('ArrowLeft')}
                    onMouseUp={handleMouseUpSteering('ArrowLeft')}
                    onMouseLeave={handleMouseUpSteering('ArrowLeft')}
                >
                    <path
                        d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                        style={{ transform: 'scale(4) translate(-8px, -6px)' }}
                    ></path>
                </SvgIcon>

                <SvgIcon
                    viewBox="0 0 30 48"
                    style={{
                        cursor: 'pointer',
                        height: '48px',
                        width: '30px',
                        position: 'absolute',
                        right: '0',
                        top: 'calc(50% - 24px)',
                    }}
                    color={keySteering.ArrowRight == ' ' ? 'primary' : 'error'}
                    onMouseDown={handleMouseDownSteering('ArrowRight')}
                    onMouseUp={handleMouseUpSteering('ArrowRight')}
                    onMouseLeave={handleMouseUpSteering('ArrowRight')}
                >
                    <path
                        d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                        style={{ transform: 'scale(4) translate(-8.5px, -6px)' }}
                    ></path>
                </SvgIcon>
            </Box>
        </StyledBox>
    );
}

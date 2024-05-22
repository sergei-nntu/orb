import { Box, SvgIcon } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { PoseContext } from '../../../../../contexts/PoseContext/PoseContext';
import { POSE } from '../../../../../types/appTypes';
import { StyledBox } from '../../StyledComponents/StyledComponents';
import { PoseProps } from '../Pose';

export default function Position({ remoteControlEnabled, disabledControlInterface }: PoseProps) {
    const { dispatch } = useContext(PoseContext);
    const [keyState, setKeyState] = useState({
        w: false,
        a: false,
        s: false,
        d: false,
        q: false,
        e: false,
    });

    const keyDownInProgressRef = useRef<boolean>(false);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (disabledControlInterface || keyDownInProgressRef.current) {
            return;
        }

        const key = e.key.toLowerCase();
        if (key in keyState) {
            keyDownInProgressRef.current = true;
            setKeyState((prevKeyState) => ({
                ...prevKeyState,
                [key]: true,
            }));

            remoteControlEnabled.current = true;

            // FIXME: rewrite this piece of code
            switch (key) {
                case 'w':
                    dispatch({ type: POSE.POSITION_Y_UP });
                    break;
                case 'a':
                    dispatch({ type: POSE.POSITION_X_DOWN });
                    break;
                case 's':
                    dispatch({ type: POSE.POSITION_Y_DOWN });
                    break;
                case 'd':
                    dispatch({ type: POSE.POSITION_X_UP });
                    break;
                case 'q':
                    dispatch({ type: POSE.POSITION_Z_DOWN });
                    break;
                case 'e':
                    dispatch({ type: POSE.POSITION_Z_UP });
                    break;
            }
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (key in keyState) {
            keyDownInProgressRef.current = false;

            setKeyState((prevKeyState) => ({
                ...prevKeyState,
                [key]: false,
            }));
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    });

    const handleArrowMouseDown = (key: string, action: string) => () => {
        if (disabledControlInterface) {
            return;
        }

        setKeyState((prevKeyState) => ({
            ...prevKeyState,
            [key]: true,
        }));

        remoteControlEnabled.current = true;
        dispatch({ type: action });
    };

    const handleArrowMouseUp = (key: string) => () => {
        setKeyState((prevKeyState) => ({
            ...prevKeyState,
            [key]: false,
        }));
    };

    return (
        <StyledBox sx={{ mr: { md: 0, xs: 1 }, height: { xs: '280px' } }}>
            Position
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mt: 3,
                }}
            >
                <SvgIcon
                    viewBox="0 0 48 60"
                    style={{ cursor: 'pointer', height: '60px', width: '48px' }}
                    color={disabledControlInterface ? 'disabled' : keyState.q ? 'error' : 'primary'}
                    onMouseDown={handleArrowMouseDown('q', POSE.POSITION_Z_DOWN)}
                    onMouseUp={handleArrowMouseUp('q')}
                    onMouseLeave={handleArrowMouseUp('q')}
                    id="button-down-z"
                >
                    <path
                        d="M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6z"
                        style={{ transform: 'scale(4) translate(-6px, -5px)' }}
                    ></path>
                    <path
                        d="m18 13-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"
                        style={{ transform: 'scale(4) translate(-6px, -5px)' }}
                    ></path>
                </SvgIcon>
                <SvgIcon
                    viewBox="0 0 48 60"
                    style={{ cursor: 'pointer', height: '60px', width: '48px' }}
                    color={disabledControlInterface ? 'disabled' : keyState.e ? 'error' : 'primary'}
                    onMouseDown={handleArrowMouseDown('e', POSE.POSITION_Z_UP)}
                    onMouseUp={handleArrowMouseUp('e')}
                    onMouseLeave={handleArrowMouseUp('e')}
                    id="button-up-z"
                >
                    <path
                        d="m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"
                        style={{ transform: 'scale(4) translate(-6px, -5px)' }}
                    ></path>
                    <path
                        d="M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"
                        style={{ transform: 'scale(4) translate(-6px, -5px)' }}
                    ></path>
                </SvgIcon>
            </Box>
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
                    color={disabledControlInterface ? 'disabled' : keyState.w ? 'error' : 'primary'}
                    onMouseDown={handleArrowMouseDown('w', POSE.POSITION_Y_UP)}
                    onMouseUp={handleArrowMouseUp('w')}
                    onMouseLeave={handleArrowMouseUp('w')}
                    id="button-up-y"
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
                    color={disabledControlInterface ? 'disabled' : keyState.s ? 'error' : 'primary'}
                    onMouseDown={handleArrowMouseDown('s', POSE.POSITION_Y_DOWN)}
                    onMouseUp={handleArrowMouseUp('s')}
                    onMouseLeave={handleArrowMouseUp('s')}
                    id="button-down-y"
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
                    color={disabledControlInterface ? 'disabled' : keyState.a ? 'error' : 'primary'}
                    onMouseDown={handleArrowMouseDown('a', POSE.POSITION_X_DOWN)}
                    onMouseUp={handleArrowMouseUp('a')}
                    onMouseLeave={handleArrowMouseUp('a')}
                    id="button-down-x"
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
                    color={disabledControlInterface ? 'disabled' : keyState.d ? 'error' : 'primary'}
                    onMouseDown={handleArrowMouseDown('d', POSE.POSITION_X_UP)}
                    onMouseUp={handleArrowMouseUp('d')}
                    onMouseLeave={handleArrowMouseUp('d')}
                    id="button-up-x"
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

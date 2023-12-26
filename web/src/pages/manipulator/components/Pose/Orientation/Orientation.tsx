import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';

import { PoseContext } from '../../../../../contexts/PoseContext/PoseContext';
import { POSE } from '../../../../../types/appTypes';
import { StyledBox } from '../../StyledComponents/StyledComponents';
import { PoseProps } from '../Pose';

export default function Orientation({ remoteControlEnabled, blocklyEnabled }: PoseProps) {
    const { dispatch } = useContext(PoseContext);
    const [keyState, setKeyState] = useState({
        1: false,
        2: false,
        3: false,
        z: false,
        x: false,
        c: false,
    });

    const handleArrowMouseDown = (key: string, action: string) => () => {
        if (blocklyEnabled.current) {
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

    const handleKeyDown = async (e: KeyboardEvent) => {
        if (blocklyEnabled.current) {
            return;
        }

        const key = e.key.toLowerCase();
        if (key in keyState) {
            setKeyState((prevKeyState) => ({
                ...prevKeyState,
                [key]: true,
            }));

            remoteControlEnabled.current = true;

            // FIXME: rewrite this piece of code
            switch (key) {
                case '1':
                    dispatch({ type: POSE.ORIENTATION_PITCH_UP });
                    break;
                case '2':
                    dispatch({ type: POSE.ORIENTATION_ROLL_UP });
                    break;
                case '3':
                    dispatch({ type: POSE.ORIENTATION_YAW_UP });
                    break;
                case 'z':
                    dispatch({ type: POSE.ORIENTATION_PITCH_DOWN });
                    break;
                case 'x':
                    dispatch({ type: POSE.ORIENTATION_ROLL_DOWN });
                    break;
                case 'c':
                    dispatch({ type: POSE.ORIENTATION_YAW_DOWN });
                    break;
            }
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (key in keyState) {
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
    }, []);

    return (
        <>
            <StyledBox sx={{ mt: { md: 1, sm: 0 }, mr: { md: 0, xs: 1 }, minHeight: '280px' }}>
                Orientation
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        mt: { md: 3, xs: 3 },
                        mb: 2,
                    }}
                >
                    <RotateRightIcon
                        style={{
                            fontSize: '55px',
                            transform: 'rotate(50deg) skew(30deg, 0deg)',
                        }}
                        color={keyState['1'] ? 'error' : 'primary'}
                        onMouseDown={handleArrowMouseDown('1', POSE.ORIENTATION_PITCH_UP)}
                        onMouseUp={handleArrowMouseUp('1')}
                        onMouseLeave={handleArrowMouseUp('1')}
                        id="button-up-pitch"
                    />
                    <RotateLeftIcon
                        style={{
                            fontSize: '55px',
                            transform: 'scale(1.1)',
                        }}
                        color={keyState['2'] ? 'error' : 'primary'}
                        onMouseDown={handleArrowMouseDown('2', POSE.ORIENTATION_ROLL_UP)}
                        onMouseUp={handleArrowMouseUp('2')}
                        onMouseLeave={handleArrowMouseUp('2')}
                        id="button-up-roll"
                    />
                    <RotateLeftIcon
                        style={{
                            fontSize: '55px',
                            transform: 'perspective(500px) rotateX(65deg) scale(1.5)',
                        }}
                        color={keyState['3'] ? 'error' : 'primary'}
                        onMouseDown={handleArrowMouseDown('3', POSE.ORIENTATION_YAW_UP)}
                        onMouseUp={handleArrowMouseUp('3')}
                        onMouseLeave={handleArrowMouseUp('3')}
                        id="button-up-yaw"
                    />
                </Box>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        mb: 2,
                    }}
                >
                    <Typography sx={{ userSelect: 'none' }} variant="subtitle1">
                        PITCH
                    </Typography>
                    <Typography sx={{ userSelect: 'none' }} variant="subtitle1">
                        ROLL
                    </Typography>
                    <Typography sx={{ userSelect: 'none' }} variant="subtitle1">
                        YAW
                    </Typography>
                </Box>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        mb: 1,
                    }}
                >
                    <RotateLeftIcon
                        style={{
                            fontSize: '55px',
                            transform: 'rotate(50deg) skew(30deg, 0deg)',
                        }}
                        color={keyState.z ? 'error' : 'primary'}
                        onMouseDown={handleArrowMouseDown('z', POSE.ORIENTATION_PITCH_DOWN)}
                        onMouseUp={handleArrowMouseUp('z')}
                        onMouseLeave={handleArrowMouseUp('z')}
                        id="button-down-pitch"
                    />
                    <RotateRightIcon
                        style={{
                            fontSize: '55px',
                            transform: 'scale(1.1)',
                        }}
                        color={keyState.x ? 'error' : 'primary'}
                        onMouseDown={handleArrowMouseDown('x', POSE.ORIENTATION_ROLL_DOWN)}
                        onMouseUp={handleArrowMouseUp('x')}
                        onMouseLeave={handleArrowMouseUp('x')}
                        id="button-down-roll"
                    />
                    <RotateRightIcon
                        style={{
                            fontSize: '55px',
                            transform: 'perspective(500px) rotateX(65deg) scale(1.5)',
                        }}
                        color={keyState.c ? 'error' : 'primary'}
                        onMouseDown={handleArrowMouseDown('c', POSE.ORIENTATION_YAW_DOWN)}
                        onMouseUp={handleArrowMouseUp('c')}
                        onMouseLeave={handleArrowMouseUp('c')}
                        id="button-down-yaw"
                    />
                </Box>
            </StyledBox>
        </>
    );
}

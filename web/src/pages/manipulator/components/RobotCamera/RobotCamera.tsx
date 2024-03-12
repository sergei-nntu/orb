import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useEffect, useRef } from 'react';

import { Item } from '../StyledComponents/StyledComponents';

export default function RobotCamera() {
    const videoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        const updateVideoStream = (): void => {
            if (videoElement) {
                videoElement.src = '/manipulator_video_feed';
            }
        };

        updateVideoStream();
    }, []);

    return (
        <Box component="div" sx={{ flex: 1, ml: { xs: 1, md: 0 } }}>
            <Paper elevation={1} style={{ overflow: 'hidden' }}>
                <Item
                    sx={{
                        minHeight: { md: '362px', sm: '25vh', xs: '35vh' },
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img ref={videoRef} alt="Manipulator Camera" style={{ width: '100%' }} />
                </Item>
            </Paper>
        </Box>
    );
}

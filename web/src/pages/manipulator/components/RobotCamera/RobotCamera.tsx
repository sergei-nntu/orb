import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useContext, useEffect, useRef } from 'react';

import VideoErrorContext from '../../../../contexts/VideoErrorContext/VideoErrorContext';
import { Item } from '../StyledComponents/StyledComponents';

export default function RobotCamera() {
    const videoRef = useRef<HTMLImageElement>(null);
    const videoErrorContext = useContext(VideoErrorContext);

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleVideoLoaded = () => {
            console.log('Video is loaded and playing.');
            videoErrorContext.setVideoError(false);
        };

        const handleVideoError = (event: Event) => {
            console.error('Error loading video:', event);
            videoErrorContext.setVideoError(true);
        };

        const updateVideoStream = (): void => {
            if (videoElement) {
                videoElement.addEventListener('load', handleVideoLoaded);
                videoElement.addEventListener('error', handleVideoError);
                videoElement.src = '/manipulator_video_feed';
                console.log(videoElement.src);
            }
        };

        updateVideoStream();

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('load', handleVideoLoaded);
                videoElement.removeEventListener('error', handleVideoError);
            }
        };
    }, [videoRef.current]);

    if (videoErrorContext.videoError) {
        return null;
    }

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

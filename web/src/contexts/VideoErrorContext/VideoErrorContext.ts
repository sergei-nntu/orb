import React, { createContext, ReactNode } from 'react';

interface VideoErrorContextProps {
    videoError: boolean;
    setVideoError: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
}

const VideoErrorContext = createContext<VideoErrorContextProps>({
    videoError: false,
    setVideoError: () => {},
    children: null,
});

export default VideoErrorContext;

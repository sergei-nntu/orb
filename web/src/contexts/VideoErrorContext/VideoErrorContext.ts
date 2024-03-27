import React, { createContext } from 'react';

interface VideoErrorContextProps {
    videoError: boolean;
    setVideoError: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoErrorContext = createContext<VideoErrorContextProps>({
    videoError: false,
    setVideoError: () => {},
});

export default VideoErrorContext;

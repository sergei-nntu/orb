import React, { ReactNode, useState } from 'react';

import VideoErrorContext from '../VideoErrorContext';

interface VideoErrorProviderProps {
    children: ReactNode;
}

const VideoErrorProvider: React.FC<VideoErrorProviderProps> = ({ children }) => {
    const [videoError, setVideoError] = useState(false);

    return (
        <VideoErrorContext.Provider value={{ videoError, setVideoError, children }}>
            {children}
        </VideoErrorContext.Provider>
    );
};

export default VideoErrorProvider;

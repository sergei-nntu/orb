import React, { ReactNode, useMemo, useState } from 'react';

import VideoErrorContext from '../VideoErrorContext';

interface VideoErrorProviderProps {
    children: ReactNode;
}

const VideoErrorProvider: React.FC<VideoErrorProviderProps> = ({ children }) => {
    const [videoError, setVideoError] = useState(false);
    const value = useMemo(() => ({ videoError, setVideoError }), [videoError]);
    return <VideoErrorContext.Provider value={value}>{children}</VideoErrorContext.Provider>;
};

export default VideoErrorProvider;

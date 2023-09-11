import React, {useEffect, useState} from 'react';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';
import KeyboardDoubleArrowUpSharpIcon from '@mui/icons-material/KeyboardDoubleArrowUpSharp';
import { Box } from '@mui/material';

const ArrowStyle = {
    fontSize: '100px',
};

export default function Position() {

    const [isKeyPressed, setIsKeyPressed] = useState(false);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'w') {
            setIsKeyPressed(true);
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'w') {
            setIsKeyPressed(false);
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mb: -6
                }}
            >
                <KeyboardDoubleArrowDownSharpIcon
                    color="primary"
                    style={ArrowStyle}
                    onClick={() => console.log("Arrow -z")}
                />
                <KeyboardDoubleArrowUpSharpIcon
                    style={ArrowStyle}
                    color="primary"
                    onClick={() => console.log("Arrow +z")}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: -6
                }}
            >
                {/*secondary*/}
                <KeyboardArrowUpSharpIcon
                    color={isKeyPressed ? "error" : "primary"}
                    style={ArrowStyle}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    mb: -6,
                    justifyContent: "center"
                }}
            >
                <KeyboardArrowLeftSharpIcon
                    color="primary"
                    style={ArrowStyle}
                    onClick={() => console.log("Arrow Left")}
                />
                <KeyboardArrowRightSharpIcon
                    color="primary"
                    style={ArrowStyle}
                    onClick={() => console.log("Arrow Right")}
                />
            </Box>


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: -2
                }}
            >
                <KeyboardArrowDownSharpIcon
                    color="primary"
                    style={ArrowStyle}
                    onClick={() => console.log("Arrow Down")}
                />
            </Box>
        </>
    );
}
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
    const [keyState, setKeyState] = useState({
        w: false,
        a: false,
        s: false,
        d: false,
        q: false,
        e: false,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key in keyState) {
                setKeyState((prevKeyState) => ({
                    ...prevKeyState,
                    [key]: true,
                }));
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

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [keyState]);

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
                    color={keyState.q ? "error" : "primary"}
                    style={ArrowStyle}
                    onClick={() => console.log("Arrow -z")}
                />
                <KeyboardDoubleArrowUpSharpIcon
                    style={ArrowStyle}
                    color={keyState.e ? "error" : "primary"}
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
                    color={keyState.w ? "error" : "primary"}
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
                    color={keyState.a ? "error" : "primary"}
                    style={ArrowStyle}
                    onClick={() => console.log("Arrow Left")}
                />
                <KeyboardArrowRightSharpIcon
                    color={keyState.d ? "error" : "primary"}
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
                    color={keyState.s ? "error" : "primary"}
                    style={ArrowStyle}
                    onClick={() => console.log("Arrow Down")}
                />
            </Box>
        </>
    );
}
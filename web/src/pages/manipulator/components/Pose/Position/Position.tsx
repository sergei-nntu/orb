import React, {useEffect, useState} from 'react';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';
import KeyboardDoubleArrowUpSharpIcon from '@mui/icons-material/KeyboardDoubleArrowUpSharp';
import { Box } from '@mui/material';
import {StyledBox} from "../../StyledComponents/StyledComponents";

const ArrowStyle = {
    fontSize: '10vh',
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

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleArrowMouseDown = (key: string) => () => {
        setKeyState((prevKeyState) => ({
            ...prevKeyState,
            [key]: true,
        }));
    };

    const handleArrowMouseUp = (key: string) => () => {
        setKeyState((prevKeyState) => ({
            ...prevKeyState,
            [key]: false,
        }));
    };

    return (
        <>
            <StyledBox>
                Position
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        mb: -6
                    }}
                >
                    <KeyboardDoubleArrowDownSharpIcon
                        style={ArrowStyle}
                        color={keyState.q ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("q")}
                        onMouseUp={handleArrowMouseUp("q")}
                        onMouseLeave={handleArrowMouseUp("q")}
                    />
                    <KeyboardDoubleArrowUpSharpIcon
                        style={ArrowStyle}
                        color={keyState.e ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("e")}
                        onMouseUp={handleArrowMouseUp("e")}
                        onMouseLeave={handleArrowMouseUp("e")}
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
                        onMouseDown={handleArrowMouseDown("w")}
                        onMouseUp={handleArrowMouseUp("w")}
                        onMouseLeave={handleArrowMouseUp("w")}
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
                        style={ArrowStyle}
                        color={keyState.a ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("a")}
                        onMouseUp={handleArrowMouseUp("a")}
                        onMouseLeave={handleArrowMouseUp("a")}
                    />
                    <KeyboardArrowRightSharpIcon
                        color={keyState.d ? "error" : "primary"}
                        style={ArrowStyle}
                        onMouseDown={handleArrowMouseDown("d")}
                        onMouseUp={handleArrowMouseUp("d")}
                        onMouseLeave={handleArrowMouseUp("d")}
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
                        onMouseDown={handleArrowMouseDown("s")}
                        onMouseUp={handleArrowMouseUp("s")}
                        onMouseLeave={handleArrowMouseUp("s")}
                    />
                </Box>
            </StyledBox>
        </>
    );
}
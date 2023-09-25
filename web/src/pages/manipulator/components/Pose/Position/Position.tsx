import React, {useContext, useEffect, useState} from 'react';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';
import KeyboardDoubleArrowUpSharpIcon from '@mui/icons-material/KeyboardDoubleArrowUpSharp';
import { Box } from '@mui/material';
import {StyledBox} from "../../StyledComponents/StyledComponents";
import {PoseContext} from "../../../../../contexts/PoseContext/PoseContext";
import {POSE} from "../../../../../types/appTypes";

const ArrowStyle = {
    fontSize: '10vh',
};

export default function Position() {
    const {dispatch} = useContext(PoseContext);
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

            // FIXME: rewrite this piece of code
            switch (key) {
                case "w":
                    dispatch({type: POSE.POSITION_Y_UP});
                    break;
                case "a":
                    dispatch({type: POSE.POSITION_X_DOWN});
                    break;
                case "s":
                    dispatch({type: POSE.POSITION_Y_DOWN});
                    break;
                case "d":
                    dispatch({type: POSE.POSITION_X_UP});
                    break;
                case "q":
                    dispatch({type: POSE.POSITION_Z_DOWN});
                    break;
                case "e":
                    dispatch({type: POSE.POSITION_Z_UP});
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

    const handleArrowMouseDown = (key: string, action: string) => () => {
        setKeyState((prevKeyState) => ({
            ...prevKeyState,
            [key]: true,
        }));

        dispatch({type: action});
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
                        onMouseDown={handleArrowMouseDown("q", POSE.POSITION_Z_DOWN)}
                        onMouseUp={handleArrowMouseUp("q")}
                        onMouseLeave={handleArrowMouseUp("q")}
                    />
                    <KeyboardDoubleArrowUpSharpIcon
                        style={ArrowStyle}
                        color={keyState.e ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("e", POSE.POSITION_Z_UP)}
                        onMouseUp={handleArrowMouseUp("e")}
                        onMouseLeave={handleArrowMouseUp("e")}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: -5
                    }}
                >
                    <KeyboardArrowUpSharpIcon
                        style={ArrowStyle}
                        color={keyState.w ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("w", POSE.POSITION_Y_UP)}
                        onMouseUp={handleArrowMouseUp("w")}
                        onMouseLeave={handleArrowMouseUp("w")}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        mb: -5,
                        justifyContent: "center"
                    }}
                >
                    <KeyboardArrowLeftSharpIcon
                        style={ArrowStyle}
                        color={keyState.a ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("a", POSE.POSITION_X_DOWN)}
                        onMouseUp={handleArrowMouseUp("a")}
                        onMouseLeave={handleArrowMouseUp("a")}
                    />
                    <KeyboardArrowRightSharpIcon
                        style={ArrowStyle}
                        color={keyState.d ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("d", POSE.POSITION_X_UP)}
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
                        style={ArrowStyle}
                        color={keyState.s ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("s", POSE.POSITION_Y_DOWN)}
                        onMouseUp={handleArrowMouseUp("s")}
                        onMouseLeave={handleArrowMouseUp("s")}
                    />
                </Box>
            </StyledBox>
        </>
    );
}
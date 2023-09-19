import React, {useContext, useEffect, useState} from 'react';
import {StyledBox} from "../../StyledComponents/StyledComponents";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CachedIcon from '@mui/icons-material/Cached';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {PoseContext} from "../../../../../contexts/PoseContext/PoseContext";
import {PoseChange} from "../../../../../types/appTypes";

const ArrowStyle = {
    fontSize: '7vh',
};

export default function Orientation() {
    const {state, dispatch} = useContext(PoseContext);
    console.log(state);
    const [keyState, setKeyState] = useState({
        1: false,
        2: false,
        3: false,
        z: false,
        x: false,
        c: false,
    });

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

    const handleKeyDown = async (e: KeyboardEvent) => {
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

    return (
        <>
            <StyledBox sx={{mt: 1}}>
                Orientation
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        mt: 1
                    }}
                >
                    <UndoIcon
                        style={ArrowStyle}
                        color={keyState["1"] ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("1", PoseChange.ORIENTATION_PITCH_UP)}
                        onMouseUp={handleArrowMouseUp("1")}
                        onMouseLeave={handleArrowMouseUp("1")}
                    />
                    <CachedIcon
                        style={ArrowStyle}
                        color={keyState["2"] ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("2", PoseChange.ORIENTATION_ROLL_UP)}
                        onMouseUp={handleArrowMouseUp("2")}
                        onMouseLeave={handleArrowMouseUp("2")}
                    />
                    <RotateLeftIcon
                        style={ArrowStyle}
                        color={keyState["3"] ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("3", PoseChange.ORIENTATION_YAW_UP)}
                        onMouseUp={handleArrowMouseUp("3")}
                        onMouseLeave={handleArrowMouseUp("3")}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <Typography sx={{userSelect: 'none'}} variant="subtitle1">
                        PITCH
                    </Typography>
                    <Typography sx={{userSelect: 'none'}} variant="subtitle1">
                        ROLL
                    </Typography>
                    <Typography sx={{userSelect: 'none'}} variant="subtitle1">
                        YAW
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        mb: 1
                    }}
                >
                    <RedoIcon
                        style={ArrowStyle}
                        color={keyState.z ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("z", PoseChange.ORIENTATION_PITCH_DOWN)}
                        onMouseUp={handleArrowMouseUp("z")}
                        onMouseLeave={handleArrowMouseUp("z")}
                    />
                    <AutorenewIcon
                        style={ArrowStyle}
                        color={keyState.x ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("x", PoseChange.ORIENTATION_ROLL_DOWN)}
                        onMouseUp={handleArrowMouseUp("x")}
                        onMouseLeave={handleArrowMouseUp("x")}
                    />
                    <RotateRightIcon
                        style={ArrowStyle}
                        color={keyState.c ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("c", PoseChange.ORIENTATION_YAW_DOWN)}
                        onMouseUp={handleArrowMouseUp("c")}
                        onMouseLeave={handleArrowMouseUp("c")}
                    />
                </Box>
            </StyledBox>

        </>
    );
}
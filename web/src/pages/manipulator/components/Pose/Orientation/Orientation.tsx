import React, {useContext, useEffect, useState} from 'react';
import {StyledBox} from "../../StyledComponents/StyledComponents";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {PoseContext} from "../../../../../contexts/PoseContext/PoseContext";
import {POSE} from "../../../../../types/appTypes";

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

            // FIXME: rewrite this piece of code
            switch (key) {
                case "1":
                    dispatch({type: POSE.ORIENTATION_PITCH_UP});
                    break;
                case "2":
                    dispatch({type: POSE.ORIENTATION_ROLL_UP});
                    break;
                case "3":
                    dispatch({type: POSE.ORIENTATION_YAW_UP});
                    break;
                case "z":
                    dispatch({type: POSE.ORIENTATION_PITCH_DOWN});
                    break;
                case "x":
                    dispatch({type: POSE.ORIENTATION_ROLL_DOWN});
                    break;
                case "c":
                    dispatch({type: POSE.ORIENTATION_YAW_DOWN});
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
                    <RotateRightIcon
                        style={{
                            fontSize: '7vh',
                            transform: 'rotate(50deg) skew(30deg, 0deg)'
                        }}
                        color={keyState["1"] ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("1", POSE.ORIENTATION_PITCH_UP)}
                        onMouseUp={handleArrowMouseUp("1")}
                        onMouseLeave={handleArrowMouseUp("1")}
                    />
                    <RotateLeftIcon
                        style={{
                            fontSize: '7vh',
                            transform: 'scale(1.1)'
                        }}
                        color={keyState["2"] ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("2", POSE.ORIENTATION_ROLL_UP)}
                        onMouseUp={handleArrowMouseUp("2")}
                        onMouseLeave={handleArrowMouseUp("2")}
                    />
                    <RotateLeftIcon
                        style={{
                            fontSize: '7vh',
                            transform: 'perspective(500px) rotateX(65deg) scale(1.5)'
                        }}
                        color={keyState["3"] ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("3", POSE.ORIENTATION_YAW_UP)}
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
                    <RotateLeftIcon
                        style={{
                            fontSize: '7vh',
                            transform: 'rotate(50deg) skew(30deg, 0deg)'
                        }}
                        color={keyState.z ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("z", POSE.ORIENTATION_PITCH_DOWN)}
                        onMouseUp={handleArrowMouseUp("z")}
                        onMouseLeave={handleArrowMouseUp("z")}
                    />
                    <RotateRightIcon
                        style={{
                            fontSize: '7vh',
                            transform: 'scale(1.1)'
                        }}
                        color={keyState.x ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("x", POSE.ORIENTATION_ROLL_DOWN)}
                        onMouseUp={handleArrowMouseUp("x")}
                        onMouseLeave={handleArrowMouseUp("x")}
                    />
                    <RotateRightIcon
                        style={{
                            fontSize: '7vh',
                            transform: 'perspective(500px) rotateX(65deg) scale(1.5)'
                        }}
                        color={keyState.c ? "error" : "primary"}
                        onMouseDown={handleArrowMouseDown("c", POSE.ORIENTATION_YAW_DOWN)}
                        onMouseUp={handleArrowMouseUp("c")}
                        onMouseLeave={handleArrowMouseUp("c")}
                    />
                </Box>
            </StyledBox>

        </>
    );
}
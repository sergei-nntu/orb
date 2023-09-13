import React from 'react';
import {StyledBox} from "../../StyledComponents/StyledComponents";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CachedIcon from '@mui/icons-material/Cached';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

const ArrowStyle = {
    fontSize: '7vh',
};

export default function Orientation() {
    return (
        <>
            <StyledBox sx={{mt: 1}}>
                Orientation
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <UndoIcon style={ArrowStyle} color="primary" />
                    <CachedIcon style={ArrowStyle} color="primary" />
                    <RotateLeftIcon style={ArrowStyle} color="primary" />
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
                    <RedoIcon style={ArrowStyle} color="primary" />
                    <AutorenewIcon style={ArrowStyle} color="primary" />
                    <RotateRightIcon style={ArrowStyle} color="primary" />
                </Box>
            </StyledBox>

        </>
    );
}
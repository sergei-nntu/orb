import React, {useContext} from 'react';
import {Grid} from "@mui/material";
import {Item} from "../StyledComponents/StyledComponents";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import {NotificationContext} from "../../../../contexts/NotificationContext/NotificationContext";
import {NOTIFICATION} from "../../../../constants";

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
}));

export default function RobotCamera() {
    // FIXME: remove after testing
    const {dispatch} = useContext(NotificationContext);
    return (
        <Grid item xs={6}>
            <StyledPaper elevation={1}>
                <Item
                    sx={{
                        minHeight: "80vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={() => dispatch({type: NOTIFICATION.TEST})}
                >
                        Robot
                </Item>
            </StyledPaper>
        </Grid>
    );
}
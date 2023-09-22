import React from 'react';
import {Grid} from "@mui/material";
import {Item} from "../StyledComponents/StyledComponents";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
}));

export default function RobotCamera() {
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
                >
                        Robot
                </Item>
            </StyledPaper>
        </Grid>
    );
}
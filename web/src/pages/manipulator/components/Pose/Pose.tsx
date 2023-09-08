import React from 'react';
import {Item} from "../StyledComponents/StyledComponents";
import {Box, Grid} from "@mui/material";

export default function Pose() {
    return (
        <Grid item xs={1}>
            <Item
                sx={{
                    minHeight: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Grid
                    container
                    spacing={1}
                    direction="column"
                >
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                fontWeight: "600",
                                pl: 2
                            }}
                        >
                            x: 2.45m
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                fontWeight: "600",
                                pl: 2
                            }}
                        >
                            y: 1.59m
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                fontWeight: "600",
                                pl: 2
                            }}
                        >
                            z: 0.45m
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                fontWeight: "600",
                                pl: 2
                            }}
                        >
                            pitch: 57°
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                fontWeight: "600",
                                pl: 2
                            }}
                        >
                            roll: 123°
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                fontWeight: "600",
                                pl: 2
                            }}
                        >
                            yaw: 12°
                        </Box>
                    </Grid>
                </Grid>
            </Item>
        </Grid>
    );
}
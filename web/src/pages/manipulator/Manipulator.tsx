import {Box, Grid} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Manipulator() {
    return (
        <Grid container spacing={1} sx={{pt: 1, pr: 1}}>
            <Grid item xs={9}>
                <Item
                    sx={{
                        minHeight: "400px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    Camera
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item
                    sx={{
                        minHeight: "400px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    Logger
                </Item>
            </Grid>
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
            <Grid item xs={5}>
                <Item
                    sx={{
                        minHeight: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    Gripper step
                </Item>
            </Grid>
            <Grid item xs={6}>
                <Item
                    sx={{
                        minHeight: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    Control
                </Item>
            </Grid>
        </Grid>
    );
}
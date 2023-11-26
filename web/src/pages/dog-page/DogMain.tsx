import React from 'react';
// import { useControls } from 'leva';
import Dog from './Dog';
import DogStates from './DogStates/DogStates';
import { Grid } from '@mui/material';

export default function DogMain() {
    return (
        <Grid container spacing={1} sx={{ pt: 1, pr: 1 }}>
            <Dog />
            <DogStates />
        </Grid>
    );
}

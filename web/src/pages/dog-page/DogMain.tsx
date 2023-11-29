import { Grid } from '@mui/material';
import React from 'react';

import Dog from './Dog';
import DogStates from './DogStates/DogStates';

export default function DogMain() {
    return (
        <Grid container spacing={1} sx={{ pt: 1, pr: 1 }}>
            <Dog />
            <DogStates />
        </Grid>
    );
}

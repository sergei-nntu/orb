import { Grid } from '@mui/material';
import React from 'react';

import { Item } from '../../manipulator/components/StyledComponents/StyledComponents';
import JointsState from './JointState/JointState';

const DogStates = () => {
    return (
        <Grid item xs={5}>
            <Item
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}
            >
                <JointsState />
            </Item>
        </Grid>
    );
};

export default DogStates;

import { Grid } from '@mui/material';
import React from 'react';

import { Item } from '../../manipulator/components/StyledComponents/StyledComponents';
import JointsState from './JointState/JointState';

const DogStates = () => {
    return (
        <Grid item sm={4} md={5} lg={12}>
            <Item
                sx={{
                    flex: '1',
                    minWidth: '25vh',
                }}
            >
                <JointsState />
            </Item>
        </Grid>
    );
};

export default DogStates;

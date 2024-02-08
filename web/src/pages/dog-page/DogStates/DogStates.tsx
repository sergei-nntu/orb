import { Grid } from '@mui/material';
import React from 'react';

import { Item } from '../../manipulator/components/StyledComponents/StyledComponents';
import JointsState from './JointState/JointState';

const DogStates = () => {
    return (
        <Grid item xs={6} sm={5} md={6} lg={4}>
            <Item
                sx={{
                    mt: 1,
                    minWidth: '178px',
                }}
                display={'flex'}
            >
                <JointsState />
            </Item>
        </Grid>
    );
};

export default DogStates;

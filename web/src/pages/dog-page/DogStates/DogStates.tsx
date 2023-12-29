import React from 'react';

import { Item } from '../../manipulator/components/StyledComponents/StyledComponents';
import JointsState from './JointState/JointState';

const DogStates = () => {
    return (
        <Item
            sx={{
                minHeight: '90vh',
                display: 'flex',
                mt: 1,
            }}
        >
            <JointsState />
        </Item>
    );
};

export default DogStates;

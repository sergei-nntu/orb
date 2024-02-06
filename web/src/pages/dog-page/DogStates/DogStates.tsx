import React from 'react';

import { Item } from '../../manipulator/components/StyledComponents/StyledComponents';
import JointsState from './JointState/JointState';

const DogStates = () => {
    return (
        <Item
            sx={{
                mt: 1,
            }}
            display={'flex'}
        >
            <JointsState />
        </Item>
    );
};

export default DogStates;

import React from 'react';

export type PoseProps = {
    buttonName: string | undefined;
    eventClick: void;
};

// TODO:This button must have new name and form
export default function ButtonOnOffSteppers() {
    // const { buttonName } = props;
    return <button style={{ background: 'red' }}>HALT</button>;
}

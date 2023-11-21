import React from 'react';
import { useControls } from 'leva';
import Dog from './Dog';
export default function Manipulator() {
    const control = useControls('leg 1', {
        leg: {
            value: 0,
            min: -100,
            max: 100,
            step: 1,
        },
    });

    return <Dog {...control} />;
}

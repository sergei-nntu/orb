import React from 'react';
import { useControls } from 'leva';
import Dog from './Dog';
export default function Manipulator() {
    const control = useControls('endEffectorCtl', {
        shoulder: {
            value: 0,
            min: 0,
            max: 360,
            step: 1,
        },
        upperArm: {
            value: 0,
            min: -100,
            max: 100,
            step: 1,
        },
        forearm: {
            value: 0,
            min: 0,
            max: 360,
            step: 1,
        },
        wrist1: {
            value: 0,
            min: 0,
            max: 360,
            step: 1,
        },
        wrist2: {
            value: 0,
            min: 0,
            max: 360,
            step: 1,
        },
        endEffectorLink: {
            value: 0,
            min: 0,
            max: 360,
            step: 1,
        },
    });

    return <Dog {...control} />;
}

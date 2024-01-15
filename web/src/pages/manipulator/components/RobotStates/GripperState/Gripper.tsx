import Slider from '@mui/material/Slider';
import React, { useState } from 'react';

import { API_ROUTES } from '../../../../../constants';
import useHttp from '../../../../../hooks/Http/Http';
import { StyledBox } from '../../StyledComponents/StyledComponents';

const marks = [
    {
        value: 0,
        label: '0°',
    },
    {
        value: 160,
        label: '160°',
    },
];

function valuetext(value: number) {
    return `${value}°`;
}

type GripperProps = {
    blocklyEnabled: React.MutableRefObject<boolean>;
};

export default function Gripper({ blocklyEnabled }: GripperProps) {
    const { request } = useHttp();
    const [gripperState, setGripperState] = useState<number>(80);

    const handleChangeValue = (_event: Event, newValue: number | number[]) => {
        setGripperState(newValue as number);
        const gripperStateInRadians = +(((newValue as number) * Math.PI) / 180).toFixed(2);
        request(API_ROUTES.SET_GRIPPER_STATE, {
            method: 'POST',
            body: JSON.stringify({
                gripper: gripperStateInRadians,
            }),
        }).then();
    };

    return (
        <StyledBox
            sx={{
                width: '100%',
                mt: { md: 1 },
                ml: { xs: 1, md: 0 },
                minHeight: '150px',
            }}
        >
            Gripper State
            <Slider
                disabled={blocklyEnabled.current}
                id="slider-gripper-state"
                value={gripperState}
                onChange={handleChangeValue}
                aria-label="Gripper state"
                getAriaValueText={valuetext}
                sx={{ mt: 3, width: '90%' }}
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={0}
                max={160}
            />
        </StyledBox>
    );
}

import React from 'react';
import {StyledBox} from "../../StyledComponents/StyledComponents";
import Slider from "@mui/material/Slider";

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

export default function GripperState() {
    return (
        <StyledBox sx={{ width: '100%', mt: 1 }}>
            Gripper State
            <Slider
                aria-label="Gripper state"
                defaultValue={80}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={0}
                max={160}
                sx={{mt: 1, width: '90%'}}
            />
        </StyledBox>
    );
}
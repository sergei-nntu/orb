import React from 'react';
import {StyledBox} from "../../StyledComponents/StyledComponents";
import Slider from "@mui/material/Slider";
import useHttp from "../../../../../hooks/Http/Http";
import {API_ROUTES} from "../../../../../constants";

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
    const {request} = useHttp();

    const handleChangeValue = async (event: Event, value: number | number[]) => {
        const gripper_state = +((value as number) * Math.PI / 180).toFixed(2);
        await request(API_ROUTES.SET_GRIPPER_STATE, { method: "POST", body: JSON.stringify({"gripper": gripper_state})});
    };

    return (
        <StyledBox sx={{ width: '100%', mt: 1 }}>
            Gripper State
            <Slider
                defaultValue={80}
                onChange={handleChangeValue}
                aria-label="Gripper state"
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={0}
                max={160}
                sx={{ mt: 1, width: '90%' }}
            />
        </StyledBox>
    );
}
import React, {useContext, useState} from 'react';
import {StyledBox} from "../../StyledComponents/StyledComponents";
import Slider from "@mui/material/Slider";
import {PoseContext} from "../../../../../contexts/PoseContext/PoseContext";
import {PoseChange} from "../../../../../types/appTypes";

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
    const { dispatch } = useContext(PoseContext);
    const [sliderValue, setSliderValue] = useState<number>(80);

    const handleChangeValue = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
        dispatch({ type: PoseChange.SET_GRIPPER_STATE, value: newValue as number });
    };

    return (
        <StyledBox sx={{ width: '100%', mt: 1 }}>
            Gripper State
            <Slider
                value={sliderValue}
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
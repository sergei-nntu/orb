import Slider from '@mui/material/Slider';
import React, { useEffect, useState } from 'react';

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
    remoteControlEnabled: React.MutableRefObject<boolean>;
    degreesJointValues: React.MutableRefObject<number[]>;
    gripperValueInRadians: React.MutableRefObject<undefined | number>;
    blocklyEnabled: React.MutableRefObject<boolean>;
};

export default function Gripper(props: GripperProps) {
    const { blocklyEnabled, gripperValueInRadians } = props;

    const { request } = useHttp();
    const [isDragging, setIsDragging] = useState(false);
    const [gripperState, setGripperState] = useState<number>(
        +((180 * (gripperValueInRadians.current || 0)) / Math.PI).toFixed(0),
    );

    useEffect(() => {
        const handleGlobalMouseUp = (event: MouseEvent) => {
            if (event.button === 0 && isDragging) {
                sendGripperStateToServer(gripperState);
                setIsDragging(false);
            }
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging, gripperState]);

    useEffect(() => {
        if (!blocklyEnabled.current) return;
        getGripperState();
    });

    useEffect(() => {
        getGripperState();
    }, [gripperValueInRadians.current]);

    const getGripperState = () => {
        if (gripperValueInRadians.current === undefined) return;
        const gripperValueInDegrees = +((180 * gripperValueInRadians.current) / Math.PI).toFixed(0);
        setGripperState(gripperValueInDegrees);
    };

    const sendGripperStateToServer = (value: number) => {
        const gripperStateInRadians = +(((value as number) * Math.PI) / 180).toFixed(2);
        request(API_ROUTES.SET_GRIPPER_STATE, {
            method: 'POST',
            body: JSON.stringify({
                gripper: gripperStateInRadians,
            }),
        }).then();
    };

    const handleChangeValue = (_event: Event, newValue: number | number[]) => {
        setIsDragging(true);
        setGripperState(newValue as number);
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

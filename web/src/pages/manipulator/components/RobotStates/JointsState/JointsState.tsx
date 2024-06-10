import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

import { API_ROUTES } from '../../../../../constants';
import { JointsStateContext } from '../../../../../contexts/JointsStateContext/JointsStateContext';
import useHttp from '../../../../../hooks/Http/Http';
import { IJointsState } from '../../../../../types/appTypes';
import { StyledBox } from '../../StyledComponents/StyledComponents';

const Input = styled(MuiInput)`
    width: 42px;
`;

type SliderValue = number;

type HandleChangeFunction = (index: number, newValue: SliderValue) => void;

type HandleInputChangeFunction = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: React.Dispatch<React.SetStateAction<SliderValue>>,
) => void;

type HandleBlurFunction = (value: SliderValue, setValue: React.Dispatch<React.SetStateAction<SliderValue>>) => void;

export type JointsStateProps = {
    remoteControlEnabled: React.MutableRefObject<boolean>;
    degreesJointValues: React.MutableRefObject<number[]>;
    disabledControlInterface: boolean;
};

export default function JointsState(props: JointsStateProps) {
    const { request } = useHttp();
    const { setJointsState } = useContext(JointsStateContext);
    const { remoteControlEnabled, degreesJointValues, disabledControlInterface } = props;

    const initialJointValues = Array(6).fill(0);
    const [jointValues, setJointValues] = useState<SliderValue[]>(initialJointValues);

    const indexInp = useRef<number>();
    const valueInp = useRef<number[]>();

    useEffect(() => {
        setJointValues(degreesJointValues.current);
    }, [degreesJointValues.current]);

    const handleJointChange: HandleChangeFunction = (index, newValue) => {
        const newValues = [...jointValues];
        newValues[index] = newValue;

        // FIXME: move to reducer maybe
        switch (index) {
            case 0:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, shoulder: +((Math.PI * newValue) / 180) };
                });
                break;
            case 1:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, upperArm: +((Math.PI * newValue) / 180) };
                });
                break;
            case 2:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, forearm: +((Math.PI * newValue) / 180) };
                });
                break;
            case 3:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, wrist1: +((Math.PI * newValue) / 180) };
                });
                break;
            case 4:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, wrist2: +((Math.PI * newValue) / 180) };
                });
                break;
            case 5:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, endEffectorLink: +((Math.PI * newValue) / 180) };
                });
                break;
        }

        setJointValues(newValues);
        remoteControlEnabled.current = false;
    };

    const handleInputChange: HandleInputChangeFunction = (event, setValue) => {
        let newValue = event.target.value === '' ? 0 : Number(event.target.value);

        if (newValue > 130) {
            newValue = 130;
        } else if (newValue < -130) {
            newValue = -130;
        }

        setValue(newValue);

        switch (indexInp.current) {
            case 0:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, shoulder: +((Math.PI * newValue) / 180) };
                });
                break;
            case 1:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, upperArm: +((Math.PI * newValue) / 180) };
                });
                break;
            case 2:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, forearm: +((Math.PI * newValue) / 180) };
                });
                break;
            case 3:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, wrist1: +((Math.PI * newValue) / 180) };
                });
                break;
            case 4:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, wrist2: +((Math.PI * newValue) / 180) };
                });
                break;
            case 5:
                setJointsState((prev: IJointsState) => {
                    return { ...prev, endEffectorLink: +((Math.PI * newValue) / 180) };
                });
                break;
        }

        remoteControlEnabled.current = false;
    };

    const handleBlur: HandleBlurFunction = (value, setValue) => {
        if (value < -130) {
            setValue(-130);
        } else if (value > 130) {
            setValue(130);
        }
    };

    useEffect(() => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                joint0: +((Math.PI * jointValues[0]) / 180),
                joint1: +((Math.PI * jointValues[1]) / 180),
                joint2: +((Math.PI * jointValues[2]) / 180),
                joint3: +((Math.PI * jointValues[3]) / 180),
                joint4: +((Math.PI * jointValues[4]) / 180),
                joint5: +((Math.PI * jointValues[5]) / 180),
            }),
        };
        request(API_ROUTES.POST_JOINTS_STATE, options).then();
    }, [jointValues]);

    return (
        <StyledBox sx={{ width: '100%', ml: { xs: 1, md: 0 }, mt: { xs: 0, md: 1 }, minHeight: '280px' }}>
            Joints Position
            <Box component="div" sx={{ width: '100%', mt: 1 }}>
                {jointValues.map((value, index) => (
                    <Grid container spacing={2} alignItems="center" key={`joint-${index}`}>
                        <Grid item>
                            <Typography id={`input-slider-${index}`}>Joint{index}</Typography>
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={value}
                                onChange={(_, newValue) => handleJointChange(index, newValue as SliderValue)}
                                aria-labelledby={`input-slider-${index}`}
                                disabled={disabledControlInterface}
                                id={`slider-joint-${index}`}
                                min={-130}
                                max={130}
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                id={`input-joint-${index}`}
                                sx={{ minWidth: '50px' }}
                                value={value}
                                size="small"
                                disabled={disabledControlInterface}
                                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleInputChange(e, (newValue) => {
                                        const newValues = [...jointValues];
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        newValues[index] = newValue;
                                        setJointValues(newValues);
                                        indexInp.current = index;
                                        valueInp.current = newValues;
                                    })
                                }
                                onBlur={() =>
                                    handleBlur(value, (newValue) => {
                                        const newValues = [...jointValues];
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        newValues[index] = newValue;
                                        setJointValues(newValues);
                                    })
                                }
                                inputProps={{
                                    step: 1,
                                    min: -130,
                                    max: 130,
                                    type: 'number',
                                    'aria-labelledby': `input-slider-${index}`,
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </StyledBox>
    );
}

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { StyledBox } from '../../StyledComponents/StyledComponents';

const Input = styled(MuiInput)`
    width: 42px;
`;

type SliderValue = number | number[];

type HandleChangeFunction = (index: number, newValue: SliderValue) => void;

type HandleInputChangeFunction = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: React.Dispatch<React.SetStateAction<SliderValue>>,
) => void;

type HandleBlurFunction = (value: SliderValue, setValue: React.Dispatch<React.SetStateAction<SliderValue>>) => void;

export default function JointsState() {
    const initialJointValues = Array(6).fill(0);
    const [jointValues, setJointValues] = useState<SliderValue[]>(initialJointValues);

    const handleJointChange: HandleChangeFunction = (index, newValue) => {
        const newValues = [...jointValues];
        newValues[index] = newValue;
        setJointValues(newValues);
    };

    const handleInputChange: HandleInputChangeFunction = (event, setValue) => {
        const newValue = event.target.value === '' ? 0 : Number(event.target.value);
        setValue(newValue);
    };

    const handleBlur: HandleBlurFunction = (value, setValue) => {
        if (value < -130) {
            setValue(-130);
        } else if (value > 130) {
            setValue(130);
        }
    };

    useEffect(() => {
        console.log(JointsState);
    }, []);

    return (
        <StyledBox sx={{ width: '100%' }}>
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
                                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleInputChange(e, (newValue) => {
                                        const newValues = [...jointValues];
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        newValues[index] = newValue;
                                        setJointValues(newValues);
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

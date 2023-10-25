import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useState } from 'react';

import { StyledBox } from '../../StyledComponents/StyledComponents';

const Input = styled(MuiInput)`
    width: 42px;
`;

type SliderValue = number | number[];

type HandleChangeFunction = (event: Event | ChangeEvent<object>, newValue: SliderValue) => void;

type HandleInputChangeFunction = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: React.Dispatch<React.SetStateAction<SliderValue>>,
) => void;

type HandleBlurFunction = (value: SliderValue, setValue: React.Dispatch<React.SetStateAction<SliderValue>>) => void;

export default function JointsState() {
    const [joint0Value, setJoint0Value] = useState<SliderValue>(0);
    const [joint1Value, setJoint1Value] = useState<SliderValue>(0);
    const [joint2Value, setJoint2Value] = useState<SliderValue>(0);
    const [joint3Value, setJoint3Value] = useState<SliderValue>(0);
    const [joint4Value, setJoint4Value] = useState<SliderValue>(0);
    const [joint5Value, setJoint5Value] = useState<SliderValue>(0);

    const handleJoint0Change: HandleChangeFunction = (event, newValue) => {
        setJoint0Value(newValue);
    };

    const handleJoint1Change: HandleChangeFunction = (event, newValue) => {
        setJoint1Value(newValue);
    };

    const handleJoint2Change: HandleChangeFunction = (event, newValue) => {
        setJoint2Value(newValue);
    };

    const handleJoint3Change: HandleChangeFunction = (event, newValue) => {
        setJoint3Value(newValue);
    };

    const handleJoint4Change: HandleChangeFunction = (event, newValue) => {
        setJoint4Value(newValue);
    };

    const handleJoint5Change: HandleChangeFunction = (event, newValue) => {
        setJoint5Value(newValue);
    };

    const handleInputChange: HandleInputChangeFunction = (event, setValue) => {
        const newValue = event.target.value === '' ? 0 : Number(event.target.value);
        setValue(newValue);
    };

    const handleBlur: HandleBlurFunction = (value, setValue) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (value < -130) {
            setValue(-130);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
        } else if (value > 130) {
            setValue(130);
        }
    };

    return (
        <StyledBox sx={{ width: '100%' }}>
            Joints Position
            <Box component="div" sx={{ width: '100%', mt: 1 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider">Joint0</Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={joint0Value}
                            onChange={handleJoint0Change}
                            aria-labelledby="input-slider"
                            min={-130}
                            max={130}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            sx={{ minWidth: '50px' }}
                            value={joint0Value}
                            size="small"
                            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                handleInputChange(e, setJoint0Value)
                            }
                            onBlur={() => handleBlur(joint0Value, setJoint0Value)}
                            inputProps={{
                                step: 1,
                                min: -130,
                                max: 130,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider">Joint1</Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={joint1Value}
                            onChange={handleJoint1Change}
                            aria-labelledby="input-slider"
                            min={-90}
                            max={90}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            sx={{ minWidth: '50px' }}
                            value={joint1Value}
                            size="small"
                            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                handleInputChange(e, setJoint1Value)
                            }
                            onBlur={() => handleBlur(joint1Value, setJoint1Value)}
                            inputProps={{
                                step: 1,
                                min: -90,
                                max: 90,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider">Joint2</Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={joint2Value}
                            onChange={handleJoint2Change}
                            aria-labelledby="input-slider"
                            min={-130}
                            max={130}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            sx={{ minWidth: '50px' }}
                            value={joint2Value}
                            size="small"
                            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                handleInputChange(e, setJoint2Value)
                            }
                            onBlur={() => handleBlur(joint2Value, setJoint2Value)}
                            inputProps={{
                                step: 1,
                                min: -130,
                                max: 130,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider">Joint3</Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={joint3Value}
                            onChange={handleJoint3Change}
                            aria-labelledby="input-slider"
                            min={-130}
                            max={130}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            sx={{ minWidth: '50px' }}
                            value={joint3Value}
                            size="small"
                            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                handleInputChange(e, setJoint3Value)
                            }
                            onBlur={() => handleBlur(joint3Value, setJoint3Value)}
                            inputProps={{
                                step: 1,
                                min: -130,
                                max: 130,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider">Joint4</Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={joint4Value}
                            onChange={handleJoint4Change}
                            aria-labelledby="input-slider"
                            min={-130}
                            max={130}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            sx={{ minWidth: '50px' }}
                            value={joint4Value}
                            size="small"
                            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                handleInputChange(e, setJoint4Value)
                            }
                            onBlur={() => handleBlur(joint4Value, setJoint4Value)}
                            inputProps={{
                                step: 1,
                                min: -130,
                                max: 130,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider">Joint5</Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={joint5Value}
                            onChange={handleJoint5Change}
                            aria-labelledby="input-slider"
                            min={-130}
                            max={130}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            sx={{ minWidth: '50px' }}
                            value={joint5Value}
                            size="small"
                            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                handleInputChange(e, setJoint5Value)
                            }
                            onBlur={() => handleBlur(joint5Value, setJoint5Value)}
                            inputProps={{
                                step: 1,
                                min: -130,
                                max: 130,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </StyledBox>
    );
}

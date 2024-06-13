import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import { IJointsStateOqp } from '../../../../types/appTypes';
import { Item, StyledBox } from '../../../manipulator/components/StyledComponents/StyledComponents';

const Input = styled(MuiInput)`
    width: 42px;
`;
type JointStateProps = {
    setJointValue: Dispatch<SetStateAction<IJointsStateOqp>>;
    modelLoaded: boolean;
};
type SliderValue = number;
type HandleChangeFunction = (index: number, newValue: SliderValue) => void;
type HandleInputChangeFunction = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: React.Dispatch<React.SetStateAction<SliderValue>>,
) => void;
type HandleBlurFunction = (value: SliderValue, setValue: React.Dispatch<React.SetStateAction<SliderValue>>) => void;

export default function JointsState(props: JointStateProps) {
    const { setJointValue, modelLoaded } = props;

    const nameSlider = useRef<string | string[]>([
        'Front Left Shoulder',
        'Front Left Reductor',
        'Front Left Knee',
        'Front Right Shoulder',
        'Front Right Reductor',
        'Front Right Knee',
        'Rear Left Shoulder',
        'Rear Left Reductor',
        'Rear Left Knee',
        'Rear Right Shoulder',
        'Rear Right Reductor',
        'Rear Right Knee',
    ]);
    const indexInp = useRef<number>();
    const valueInp = useRef<number[]>();

    const initialJointValues = Array(12).fill(0);
    const [valuesSlider, setValuesSlider] = useState<SliderValue[]>(initialJointValues); //

    const handleJointChange: HandleChangeFunction = (index, newValue) => {
        const newValues = [...valuesSlider];
        newValues[index] = newValue;
        switcher(index, newValue);
        setValuesSlider(newValues);
    };

    const handleInputChange: HandleInputChangeFunction = (event, setValue) => {
        let newValue = event.target.value === '' ? 0 : Number(event.target.value);

        if (newValue > 90) {
            newValue = 90;
        } else if (newValue < -90) {
            newValue = -90;
        }

        setValue(newValue);
        switcher(indexInp.current, newValue);
    };

    const handleBlur: HandleBlurFunction = (value, setValue) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (value < -90) {
            setValue(-90);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
        } else if (value > 90) {
            setValue(90);
        }
    };

    function switcher(index: number | undefined, newValue: number) {
        switch (index) {
            case 0:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Front_Left_Shoulder: newValue };
                });
                break;
            case 1:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Front_Left_Reductor: newValue };
                });
                break;
            case 2:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Front_Left_Knee: newValue };
                });
                break;
            case 3:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Front_Right_Shoulder: newValue };
                });
                break;
            case 4:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Front_Right_Reductor: newValue };
                });
                break;
            case 5:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Front_Right_Knee: newValue };
                });
                break;
            case 6:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Rear_Left_Shoulder: newValue };
                });
                break;
            case 7:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Rear_Left_Reductor: newValue };
                });
                break;
            case 8:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Rear_Left_Knee: newValue };
                });
                break;
            case 9:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Rear_Right_Shoulder: newValue };
                });
                break;
            case 10:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Rear_Right_Reductor: newValue };
                });
                break;
            case 11:
                setJointValue((prev: IJointsStateOqp) => {
                    return { ...prev, Rear_Right_Knee: newValue };
                });
                break;
        }
    }

    return (
        <Item
            sx={{
                minHeight: '750px',
                minWidth: '200px',
                display: 'flex',
                mt: 1,
            }}
        >
            <StyledBox sx={{ width: '100%' }}>
                <Grid item sx={{ width: '100%' }}>
                    <Grid sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>JOINTS STATE</Grid>
                    {valuesSlider.map((value, index) => (
                        <Grid
                            sx={{ display: 'flex', marginTop: '2px' }}
                            container
                            spacing={2}
                            alignItems="center"
                            key={''}
                        >
                            <Grid item key={value}>
                                {nameSlider.current[index] === 'Front Left Shoulder' && (
                                    <Typography id="input-slider">{nameSlider.current[index]}</Typography>
                                )}
                                {nameSlider.current[index] === 'Front Left Reductor' && (
                                    <Typography id="input-slider">{nameSlider.current[index]}</Typography>
                                )}
                                {nameSlider.current[index] === 'Front Left Knee' && (
                                    <Typography id="input-slider" sx={{ marginRight: '27px' }}>
                                        {nameSlider.current[index]}
                                    </Typography>
                                )}
                                {nameSlider.current[index] === 'Front Right Shoulder' && (
                                    <Typography id="input-slider" sx={{ marginRight: '-12px' }}>
                                        {nameSlider.current[index]}
                                    </Typography>
                                )}
                                {nameSlider.current[index] === 'Front Right Reductor' && (
                                    <Typography id="input-slider" sx={{ marginRight: '-12px' }}>
                                        {nameSlider.current[index]}
                                    </Typography>
                                )}
                                {nameSlider.current[index] === 'Front Right Knee' && (
                                    <Typography id="input-slider" sx={{ marginRight: '15px' }}>
                                        {nameSlider.current[index]}
                                    </Typography>
                                )}
                                {nameSlider.current[index] === 'Rear Left Shoulder' && (
                                    <Typography id="input-slider">{nameSlider.current[index]}</Typography>
                                )}
                                {nameSlider.current[index] === 'Rear Left Reductor' && (
                                    <Typography id="input-slider">{nameSlider.current[index]}</Typography>
                                )}
                                {nameSlider.current[index] === 'Rear Left Knee' && (
                                    <Typography id="input-slider" sx={{ marginRight: '30px' }}>
                                        {nameSlider.current[index]}
                                    </Typography>
                                )}
                                {nameSlider.current[index] === 'Rear Right Shoulder' && (
                                    <Typography id="input-slider" sx={{ marginRight: '-10px' }}>
                                        {nameSlider.current[index]}
                                    </Typography>
                                )}
                                {nameSlider.current[index] === 'Rear Right Reductor' && (
                                    <Typography id="input-slider" sx={{ marginRight: '-10px' }}>
                                        {nameSlider.current[index]}
                                    </Typography>
                                )}
                                {nameSlider.current[index] === 'Rear Right Knee' && (
                                    <Typography id="input-slider" sx={{ marginRight: '17px' }}>
                                        {nameSlider.current[index]}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs>
                                <Slider
                                    value={value}
                                    onChange={(_, newValue) => handleJointChange(index, newValue as SliderValue)}
                                    aria-labelledby={`input-slider-${index}`}
                                    disabled={!modelLoaded}
                                    id={`slider-joint-${index}`}
                                    min={-90}
                                    max={90}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    sx={{ minWidth: '50px' }}
                                    value={value}
                                    size="small"
                                    disabled={!modelLoaded}
                                    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                        handleInputChange(e, (newValue) => {
                                            const newValues = [...valuesSlider];
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error
                                            newValues[index] = newValue;
                                            setValuesSlider(newValues);
                                            indexInp.current = index;
                                            valueInp.current = newValues;
                                        })
                                    }
                                    onBlur={() =>
                                        handleBlur(value, (newValue) => {
                                            const newValues = [...valuesSlider];
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error
                                            newValues[index] = newValue;
                                            setValuesSlider(newValues);
                                        })
                                    }
                                    inputProps={{
                                        step: 1,
                                        min: -90,
                                        max: 90,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider-${index}',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </StyledBox>
        </Item>
    );
}

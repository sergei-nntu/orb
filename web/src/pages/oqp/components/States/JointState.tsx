import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { IJointsStateOqp } from '../../../../types/appTypes';
import { Item, StyledBox } from '../../../manipulator/components/StyledComponents/StyledComponents';

const Input = styled(MuiInput)`
    width: 42px;
`;
type JointStateProps = {
    setJointValue: Dispatch<SetStateAction<IJointsStateOqp>>;
    jointValue: IJointsStateOqp;
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
    const { setJointValue, jointValue, modelLoaded } = props;

    const indexInp = useRef<number>();
    const valueInp = useRef<number[]>();

    const initialJointValues = Array(12).fill(0);
    const [valuesSlider, setValuesSlider] = useState<SliderValue[]>(initialJointValues);

    const nameSlider: string[] = [
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
    ];

    useEffect(() => {
        const obj = Object.values(jointValue);
        setValuesSlider(obj);
    }, [jointValue]);

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
            <Grid container style={{ width: '570px', textAlign: 'left', flex: '0 0 auto' }} id="wrapp-slider">
                <StyledBox sx={{ width: '100%', display: 'flex' }}>
                    <Grid item sx={{ width: '100%' }}>
                        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>JOINTS STATE</Grid>
                        {valuesSlider.map((value, index) => (
                            <Grid
                                container
                                sx={{ display: 'flex', marginTop: '5px' }}
                                spacing={2}
                                key={index}
                                id="sliders"
                            >
                                <Grid item xs sx={{ display: 'flex' }}>
                                    <Typography id="input-slider">{nameSlider[index]}</Typography>
                                </Grid>
                                <Grid item xs={7}>
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
                                        sx={{ minWidth: '20px' }}
                                        value={value}
                                        size="small"
                                        disabled={!modelLoaded}
                                        id={`input-joint-${index}`}
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
            </Grid>
        </Item>
    );
}

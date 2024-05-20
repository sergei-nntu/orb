import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useContext } from 'react';

import { JointStateContext } from '../../../../contexts/OQPJointStateContext/JointStateContext';
import { StyledBox } from '../../../manipulator/components/StyledComponents/StyledComponents';

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
    const {
        joint0Value,
        setJoint0Value,
        joint1Value,
        setJoint1Value,
        joint2Value,
        setJoint2Value,
        joint3Value,
        setJoint3Value,
        joint4Value,
        setJoint4Value,
        joint5Value,
        setJoint5Value,
        joint6Value,
        setJoint6Value,
        joint7Value,
        setJoint7Value,
        joint8Value,
        setJoint8Value,
        joint9Value,
        setJoint9Value,
        joint10Value,
        setJoint10Value,
        joint11Value,
        setJoint11Value,
        isModelsLoaded,
    } = useContext(JointStateContext);

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
    const handleJoint6Change: HandleChangeFunction = (event, newValue) => {
        setJoint6Value(newValue);
    };

    const handleJoint7Change: HandleChangeFunction = (event, newValue) => {
        setJoint7Value(newValue);
    };

    const handleJoint8Change: HandleChangeFunction = (event, newValue) => {
        setJoint8Value(newValue);
    };

    const handleJoint9Change: HandleChangeFunction = (event, newValue) => {
        setJoint9Value(newValue);
    };

    const handleJoint10Change: HandleChangeFunction = (event, newValue) => {
        setJoint10Value(newValue);
    };

    const handleJoint11Change: HandleChangeFunction = (event, newValue) => {
        setJoint11Value(newValue);
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
            <Box
                component="div"
                sx={{
                    width: '100%',
                }}
            >
                <div>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item sx={{ width: '100%' }}>
                            FRONT LEFT
                        </Grid>
                        <Grid item>
                            <Typography id="input-slider">Shoulder</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint0Value}
                                    onChange={handleJoint0Change}
                                    aria-labelledby="input-slider"
                                    min={-90}
                                    max={90}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
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
                                        min: -90,
                                        max: 90,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography id="input-slider">Reductor</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint1Value}
                                    onChange={handleJoint1Change}
                                    aria-labelledby="input-slider"
                                    min={-90}
                                    max={90}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
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
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography id="input-slider">Knee</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint2Value}
                                    onChange={handleJoint2Change}
                                    aria-labelledby="input-slider"
                                    min={0}
                                    max={150}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
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
                                        min: 0,
                                        max: 150,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item sx={{ width: '100%' }}>
                            FRONT RIGHT
                        </Grid>
                        <Grid item>
                            <Typography id="input-slider">Shoulder</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint3Value}
                                    onChange={handleJoint3Change}
                                    aria-labelledby="input-slider"
                                    min={-90}
                                    max={90}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
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
                                        min: -90,
                                        max: 90,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography id="input-slider">Reductor</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint4Value}
                                    onChange={handleJoint4Change}
                                    aria-labelledby="input-slider"
                                    min={-90}
                                    max={90}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
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
                                        min: -90,
                                        max: 90,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography id="input-slider">Knee</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint5Value}
                                    onChange={handleJoint5Change}
                                    aria-labelledby="input-slider"
                                    min={0}
                                    max={150}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
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
                                        min: 0,
                                        max: 150,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item sx={{ width: '100%' }}>
                            REAR LEFT
                        </Grid>
                        <Grid item>
                            <Typography id="input-slider">Shoulder</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint6Value}
                                    onChange={handleJoint6Change}
                                    aria-labelledby="input-slider"
                                    min={-90}
                                    max={90}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
                                <Input
                                    sx={{ minWidth: '50px' }}
                                    value={joint6Value}
                                    size="small"
                                    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                        handleInputChange(e, setJoint6Value)
                                    }
                                    onBlur={() => handleBlur(joint6Value, setJoint6Value)}
                                    inputProps={{
                                        step: 1,
                                        min: -90,
                                        max: 90,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography id="input-slider">Reductor</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint7Value}
                                    onChange={handleJoint7Change}
                                    aria-labelledby="input-slider"
                                    min={-90}
                                    max={90}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
                                <Input
                                    sx={{ minWidth: '50px' }}
                                    value={joint7Value}
                                    size="small"
                                    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                        handleInputChange(e, setJoint7Value)
                                    }
                                    onBlur={() => handleBlur(joint7Value, setJoint7Value)}
                                    inputProps={{
                                        step: 1,
                                        min: -90,
                                        max: 90,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography id="input-slider">Knee</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint8Value}
                                    onChange={handleJoint8Change}
                                    aria-labelledby="input-slider"
                                    min={0}
                                    max={150}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
                                <Input
                                    sx={{ minWidth: '50px' }}
                                    value={joint8Value}
                                    size="small"
                                    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                        handleInputChange(e, setJoint8Value)
                                    }
                                    onBlur={() => handleBlur(joint8Value, setJoint8Value)}
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 150,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item sx={{ width: '100%' }}>
                            REAR RIGHT
                        </Grid>
                        <Grid item>
                            <Typography id="input-slider">Shoulder</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint9Value}
                                    onChange={handleJoint9Change}
                                    aria-labelledby="input-slider"
                                    min={-90}
                                    max={90}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
                                <Input
                                    sx={{ minWidth: '50px' }}
                                    value={joint9Value}
                                    size="small"
                                    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                        handleInputChange(e, setJoint9Value)
                                    }
                                    onBlur={() => handleBlur(joint9Value, setJoint9Value)}
                                    inputProps={{
                                        step: 1,
                                        min: -90,
                                        max: 90,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography id="input-slider">Reductor</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint10Value}
                                    onChange={handleJoint10Change}
                                    aria-labelledby="input-slider"
                                    min={-90}
                                    max={90}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
                                <Input
                                    sx={{ minWidth: '50px' }}
                                    value={joint10Value}
                                    size="small"
                                    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                        handleInputChange(e, setJoint10Value)
                                    }
                                    onBlur={() => handleBlur(joint10Value, setJoint10Value)}
                                    inputProps={{
                                        step: 1,
                                        min: -90,
                                        max: 90,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography id="input-slider">Knee</Typography>
                        </Grid>
                        <Grid item xs>
                            {isModelsLoaded ? (
                                <Slider
                                    value={joint11Value}
                                    onChange={handleJoint11Change}
                                    aria-labelledby="input-slider"
                                    min={0}
                                    max={150}
                                />
                            ) : (
                                <Skeleton variant="rectangular" height={10} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                        <Grid item>
                            {isModelsLoaded ? (
                                <Input
                                    sx={{ minWidth: '50px' }}
                                    value={joint11Value}
                                    size="small"
                                    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                        handleInputChange(e, setJoint11Value)
                                    }
                                    onBlur={() => handleBlur(joint11Value, setJoint11Value)}
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 150,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" width={50} height={30} style={{ marginBottom: 8 }} />
                            )}
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </StyledBox>
    );
}

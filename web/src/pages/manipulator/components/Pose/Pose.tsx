import React, { useContext, useEffect, useRef } from 'react';
import {Item} from "../StyledComponents/StyledComponents";
import {Grid} from "@mui/material";
import Position from "./Position/Position";
import Orientation from "./Orientation/Orientation";
import EndEffectorState from "../RobotStates/EndEffectorState/EndEffectorState";
import { IPose, POSE } from '../../../../types/appTypes';
import { NotificationContext } from '../../../../contexts/NotificationContext/NotificationContext';
import { PoseContext } from '../../../../contexts/PoseContext/PoseContext';

export default function Pose() {
    const {notificationState} = useContext(NotificationContext);
    const {state, dispatch} = useContext(PoseContext);
    const prevStateRef = useRef<IPose | null>(null);

    // TODO: there's infinite render using state as dependence
    useEffect(() => {
        if (notificationState.severity === "warning") {
            dispatch({type: POSE.SET_PREV_STATE, prevState: prevStateRef.current});
        } else {
            prevStateRef.current = {...state};
        }
    }, [state]);
    
    return (
        <Grid item xs={3}>
            <Item
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    ml: 1
                }}
            >
                <Position />
                <Orientation />
                <EndEffectorState />
            </Item>
        </Grid>
    );
}
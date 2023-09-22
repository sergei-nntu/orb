import React, {useContext, useEffect, useRef} from 'react';
import {Item} from "../StyledComponents/StyledComponents";
import {Grid} from "@mui/material";
import Position from "./Position/Position";
import Orientation from "./Orientation/Orientation";
import EndEffectorState from "../RobotStates/EndEffectorState/EndEffectorState";
import {PoseContext} from "../../../../contexts/PoseContext/PoseContext";
import {IPose, PoseChange} from "../../../../types/appTypes";
import {NOTIFICATION} from "../../../../constants";
import useHttp from "../../../../hooks/Http/Http";
import {NotificationContext} from "../../../../contexts/NotificationContext/NotificationContext";

export default function Pose() {
    const {state, dispatch} = useContext(PoseContext);
    const prevStateRef= useRef<IPose>(state);
    const {dispatchNotification} = useContext(NotificationContext);
    const {request} = useHttp();

    useEffect(() => {
        sendPoseToServer(state).then(r => console.log(r));
    }, [state]);

    const sendPoseToServer = async (state: IPose) => {
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({
                    "x": state.position.x,
                    "y": state.position.y,
                    "z": state.position.z,
                    "pitch": state.orientation.pitch,
                    "roll": state.orientation.roll,
                    "yaw": state.orientation.yaw,
                    "gripper": state.gripper_state
                })
            };

            const {execute} = await request("/convert_pose", options);

            if (execute) {
                prevStateRef.current = {...state};
            }
            else {
                dispatchNotification({type: NOTIFICATION.NO_MOVE_TO_POSITION});
                dispatch({type: PoseChange.SET_PREV_STATE, prevState: prevStateRef.current });
            }

        } catch (error) {
            console.error("Error: ", error);
        }
    };

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
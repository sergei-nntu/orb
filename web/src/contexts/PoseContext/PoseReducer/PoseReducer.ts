import { DEFAULT_OFFSET } from "../../../constants";
import {IPose, PoseActionType, POSE} from "../../../types/appTypes";

function reducer(state: IPose, action: PoseActionType) {
    switch (action.type) {
        case POSE.POSITION_X_UP:
            return {
                ...state,
                position: {
                    ...state.position,
                    x: +(state.position.x + DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.POSITION_X_DOWN:
            return {
                ...state,
                position: {
                    ...state.position,
                    x: +(state.position.x - DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.POSITION_Y_UP:
            return {
                ...state,
                position: {
                    ...state.position,
                    y: +(state.position.y + DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.POSITION_Y_DOWN:
            return {
                ...state,
                position: {
                    ...state.position,
                    y: +(state.position.y - DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.POSITION_Z_UP:
            return {
                ...state,
                position: {
                    ...state.position,
                    z: +(state.position.z + DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.POSITION_Z_DOWN:
            return {
                ...state,
                position: {
                    ...state.position,
                    z: +(state.position.z - DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.ORIENTATION_PITCH_UP:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    pitch: +(state.orientation.pitch + DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.ORIENTATION_PITCH_DOWN:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    pitch: +(state.orientation.pitch - DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.ORIENTATION_ROLL_UP:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    roll: +(state.orientation.roll + DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.ORIENTATION_ROLL_DOWN:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    roll: +(state.orientation.roll - DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.ORIENTATION_YAW_UP:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    yaw: +(state.orientation.yaw + DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.ORIENTATION_YAW_DOWN:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    yaw: +(state.orientation.yaw - DEFAULT_OFFSET).toFixed(2)
                }
            };
        case POSE.SET_GRIPPER_STATE:
            return {
                ...state,
                gripper_state: +(action.value * Math.PI / 180).toFixed(2)
            };
        case POSE.SET_PREV_STATE:
            return {
                ...action.prevState
            };
        default:
            return {};
    }
}

export default reducer;
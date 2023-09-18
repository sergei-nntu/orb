import {IPose, PoseActionType, PoseChange} from "../../../types/appTypes";

function reducer(state: IPose, action: PoseActionType) {
    switch (action.type) {
        case PoseChange.POSITION_X_UP:
            return {
                ...state,
                position: {
                    ...state.position,
                    x: +(state.position.x + 0.1).toFixed(2)
                }
            };
        case PoseChange.POSITION_X_DOWN:
            return {
                ...state,
                position: {
                    ...state.position,
                    x: +(state.position.x - 0.1).toFixed(2)
                }
            };
        case PoseChange.POSITION_Y_UP:
            return {
                ...state,
                position: {
                    ...state.position,
                    y: +(state.position.y + 0.1).toFixed(2)
                }
            };
        case PoseChange.POSITION_Y_DOWN:
            return {
                ...state,
                position: {
                    ...state.position,
                    y: +(state.position.y - 0.1).toFixed(2)
                }
            };
        case PoseChange.POSITION_Z_UP:
            return {
                ...state,
                position: {
                    ...state.position,
                    z: +(state.position.z + 0.1).toFixed(2)
                }
            };
        case PoseChange.POSITION_Z_DOWN:
            return {
                ...state,
                position: {
                    ...state.position,
                    z: +(state.position.z - 0.1).toFixed(2)
                }
            };
        case PoseChange.ORIENTATION_PITCH_UP:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    pitch: +(state.orientation.pitch + 0.1).toFixed(2)
                }
            };
        case PoseChange.ORIENTATION_PITCH_DOWN:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    pitch: +(state.orientation.pitch - 0.1).toFixed(2)
                }
            };
        case PoseChange.ORIENTATION_ROLL_UP:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    roll: +(state.orientation.roll + 0.1).toFixed(2)
                }
            };
        case PoseChange.ORIENTATION_ROLL_DOWN:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    roll: +(state.orientation.roll - 0.1).toFixed(2)
                }
            };
        case PoseChange.ORIENTATION_YAW_UP:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    yaw: +(state.orientation.yaw + 0.1).toFixed(2)
                }
            };
        case PoseChange.ORIENTATION_YAW_DOWN:
            return {
                ...state,
                orientation: {
                    ...state.orientation,
                    yaw: +(state.orientation.yaw - 0.1).toFixed(2)
                }
            };
        case PoseChange.SET_GRIPPER_STATE:
            return {
                ...state,
                gripper_state: 100
            };
        default:
            return {};
    }
}

export default reducer;
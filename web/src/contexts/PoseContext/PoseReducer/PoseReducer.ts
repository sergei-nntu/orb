import {IPose, PoseActionType} from "../../../types/appTypes";
// eslint-disable-next-line
function reducer(state: IPose, action: PoseActionType) {
    switch (action.type) {
        case "TEST":
            return {
                position: {
                    x: 1.0,
                    y: 0.0,
                    z: 0.0
                },
                orientation: {
                    pitch: 0.0,
                    roll: 0.0,
                    yaw: 0.0
                },
                gripper_state: 0.0
            };
        default:
            return {};
    }
}

export default reducer;
import {NOTIFICATION} from "../constants";

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;

export interface IPose {
    position: {
        x: number,
        y: number,
        z: number
    },
    orientation: {
        pitch: number,
        roll: number,
        yaw: number
    },
    gripper_state: number
}

export enum PoseChange {
    POSITION_X_UP = 'POSITION_X_UP',
    POSITION_X_DOWN = 'POSITION_X_DOWN',
    POSITION_Y_UP = 'POSITION_Y_UP',
    POSITION_Y_DOWN = 'POSITION_Y_DOWN',
    POSITION_Z_UP = 'POSITION_Z_UP',
    POSITION_Z_DOWN = 'POSITION_Z_DOWN',
    ORIENTATION_PITCH_UP = 'ORIENTATION_PITCH_UP',
    ORIENTATION_PITCH_DOWN = 'ORIENTATION_PITCH_DOWN',
    ORIENTATION_ROLL_UP = 'ORIENTATION_ROLL_UP',
    ORIENTATION_ROLL_DOWN = 'ORIENTATION_ROLL_DOWN',
    ORIENTATION_YAW_UP = 'ORIENTATION_YAW_UP',
    ORIENTATION_YAW_DOWN = 'ORIENTATION_YAW_DOWN',
    SET_GRIPPER_STATE = 'SET_GRIPPER_STATE',
    SET_PREV_STATE = 'SET_PREV_STATE',
}

export type PoseActionType =
    | Action<PoseChange.POSITION_X_UP>
    | Action<PoseChange.POSITION_X_DOWN>
    | Action<PoseChange.POSITION_Y_UP>
    | Action<PoseChange.POSITION_Y_DOWN>
    | Action<PoseChange.POSITION_Z_UP>
    | Action<PoseChange.POSITION_Z_DOWN>
    | Action<PoseChange.ORIENTATION_PITCH_UP>
    | Action<PoseChange.ORIENTATION_PITCH_DOWN>
    | Action<PoseChange.ORIENTATION_ROLL_UP>
    | Action<PoseChange.ORIENTATION_ROLL_DOWN>
    | Action<PoseChange.ORIENTATION_YAW_UP>
    | Action<PoseChange.ORIENTATION_YAW_DOWN>
    | Action<PoseChange.SET_GRIPPER_STATE, { value: number }>
    | Action<PoseChange.SET_PREV_STATE, { prevState: IPose }>;

export interface INotification {
    severity: "success" | "info" | "warning" | "error",
    message: string,
    open: boolean
}

export type NotificationActionType =
    | Action<NOTIFICATION.NO_MOVE_TO_POSITION>
    | Action<NOTIFICATION.HIDE>;
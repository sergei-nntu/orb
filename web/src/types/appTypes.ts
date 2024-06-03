type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;

export interface IPose {
    position: {
        x: number;
        y: number;
        z: number;
    };
    orientation: {
        pitch: number;
        roll: number;
        yaw: number;
    };
}

export enum POSE {
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
    SET_PREV_STATE = 'SET_PREV_STATE',
}

export type PoseActionType =
    | Action<POSE.POSITION_X_UP>
    | Action<POSE.POSITION_X_DOWN>
    | Action<POSE.POSITION_Y_UP>
    | Action<POSE.POSITION_Y_DOWN>
    | Action<POSE.POSITION_Z_UP>
    | Action<POSE.POSITION_Z_DOWN>
    | Action<POSE.ORIENTATION_PITCH_UP>
    | Action<POSE.ORIENTATION_PITCH_DOWN>
    | Action<POSE.ORIENTATION_ROLL_UP>
    | Action<POSE.ORIENTATION_ROLL_DOWN>
    | Action<POSE.ORIENTATION_YAW_UP>
    | Action<POSE.ORIENTATION_YAW_DOWN>
    | Action<POSE.SET_PREV_STATE, { prevState: IPose }>;

export enum CONSOLE_MESSAGE {
    INITIALIZED = 'Initialized',
    NO_MOVE_TO_POSITION = 'There is no move to this position. Please try again',
    SUCCESS_PLANNING = 'Changed goal state',
    NO_CONNECTION_WITH_SERVER = 'Error with connection to the server',
}

export interface INotification {
    severity: 'success' | 'info' | 'warning' | 'error';
    message: string;
    open: boolean;
}

export enum NOTIFICATION {
    HIDE = 'HIDE',
    NO_MOVE_TO_POSITION = 'NO_MOVE_TO_POSITION',
    SUCCESS_PLANNING = 'SUCCESS_PLANNING',
    NO_BLOCKLY_PROGRAM = 'NO_BLOCKLY_PROGRAM',
    SAVE_BLOCKLY = 'SAVE_BLOCKLY',
    STOP_BLOCKLY = 'STOP_BLOCKLY',
    RUN_BLOCKLY = 'RUN_BLOCKLY',
    BLOCKLY_WITHOUT_SERVER = 'BLOCKLY_WITHOUT_SERVER',
    BLOCKLY_IS_ALREADY_RUNNING = 'BLOCKLY_IS_ALREADY_RUNNING',
    BLOCKLY_IS_STOPPED = 'BLOCKLY_IS_STOPPED',
    GET_QR_CODE = 'GET_QR_CODE',
    USB_ENABLED = 'USB_ENABLED',
    USB_DISABLED = 'USB_DISABLED',
}

export type NotificationActionType =
    | Action<NOTIFICATION.NO_MOVE_TO_POSITION, { open: boolean }>
    | Action<NOTIFICATION.SUCCESS_PLANNING, { open: boolean }>
    | Action<NOTIFICATION.NO_BLOCKLY_PROGRAM, { open: boolean }>
    | Action<NOTIFICATION.SAVE_BLOCKLY, { open: boolean }>
    | Action<NOTIFICATION.STOP_BLOCKLY, { open: boolean }>
    | Action<NOTIFICATION.RUN_BLOCKLY, { open: boolean }>
    | Action<NOTIFICATION.BLOCKLY_IS_ALREADY_RUNNING, { open: boolean }>
    | Action<NOTIFICATION.BLOCKLY_WITHOUT_SERVER, { open: boolean }>
    | Action<NOTIFICATION.BLOCKLY_IS_STOPPED, { open: boolean }>
    | Action<NOTIFICATION.GET_QR_CODE, { open: boolean }>
    | Action<NOTIFICATION.USB_ENABLED, { open: boolean }>
    | Action<NOTIFICATION.USB_DISABLED, { open: boolean }>
    | Action<NOTIFICATION.HIDE>
    | Action<POSE.SET_PREV_STATE, { prevState: IPose }>;

export interface IJointsStateOqp {
    Front_Left_Shoulder: number;
    Front_Left_Reductor: number;
    Front_Left_Knee: number;
    Front_Right_Shoulder: number;
    Front_Right_Reductor: number;
    Front_Right_Knee: number;
    Rear_Left_Shoulder: number;
    Rear_Left_Reductor: number;
    Rear_Left_Knee: number;
    Rear_Right_Shoulder: number;
    Rear_Right_Reductor: number;
    Rear_Right_Knee: number;
}

export interface IJointsState {
    shoulder: number;
    upperArm: number;
    forearm: number;
    wrist1: number;
    wrist2: number;
    endEffectorLink: number;
    claws: number;
}

export type UserConsoleMessage = {
    index: number;
    text: string;
    time: string;
};

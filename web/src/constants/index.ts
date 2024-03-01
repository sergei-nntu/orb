export const drawerWidth = 240;

export const DEFAULT_OFFSET = 0.05;

export const GRIPPER_SCALE_COEFFICIENT = 0.1;

export enum API_ROUTES {
    CONVERT_POSE = '/convert_pose',
    GET_CURRENT_IP = '/current_ip',
    SET_GRIPPER_STATE = '/set_gripper_state',
    SET_ACTIVE_PROGRAM = '/set_active_program',
    START_PROGRAM = '/start_program',
    STOP_PROGRAM = '/stop_program',
    GET_PROGRAM_STATE = '/get_program_state',
    GET_ACTIVE_PROGRAM = '/get_active_program',
    GET_OQP_JOINT_STATE = '/get_oqp_joint_state',
    POST_OQP_JOINT_STATE = '/post_oqp_joint_state',
    GET_JOINTS_STATE = '/get_joints_state',
    GET_POSE_STATE = '/get_pose_state',
    CHECK_SERVER_STATUS = '/check_server_status',
    POST_JOINTS_STATE = '/post_joints_state',
    GET_BLOCKLY_STATE = '/get_blockly_state',
    GET_JOINT_TRAJECTORY = '/get_joint_trajectory',
    GET_USB_CONNECTION_STATUS = '/get_usb_connection_status',
}

export enum KEY {
    BLOCKLY_CODE = 'BLOCKLY_CODE',
    BLOCKLY_STRUCTURE = 'BLOCKLY_STRUCTURE',
}

export enum TAB {
    NAVIGATION = 'Navigation',
    MANIPULATOR = 'Manipulator',
    PLANNING = 'Planning',
    QR = 'QR',
    OQP = 'OQP',
}

export const DISABLED_TABS = [TAB.MANIPULATOR, TAB.OQP];
export const DISABLED_PATHS = ['/manipulator', '/oqp'];

export const INITIAL_POSE_STATE = {
    position: {
        x: 0.0,
        y: 0.1,
        z: 0.4,
    },
    orientation: {
        pitch: 0.0,
        roll: 0.0,
        yaw: 0.0,
    },
};

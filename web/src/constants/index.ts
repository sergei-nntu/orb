export const drawerWidth = 240;

export const DEFAULT_OFFSET = 0.05;

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
}

export enum KEY {
    BLOCKLY_CODE = 'BLOCKLY_CODE',
    BLOCKLY_STRUCTURE = 'BLOCKLY_STRUCTURE',
}

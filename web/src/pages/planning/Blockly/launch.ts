import {KEY} from "../../../constants";

// There is no option to call those functions other way
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function orm_blockly_delay(value: number) {
    alert(`orm_blockly_delay: ${value}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function orm_blockly_set_gripper_state(value: number) {
    alert(`orm_blockly_set_gripper_state: ${value}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function orm_blockly_set_position(x: number, y: number, z: number, pitch: number, roll: number, yaw: number) {
    alert(`orm_blockly_set_position(${x}, ${y}, ${z}, ${pitch}, ${roll}, ${yaw})`);
}

export const ExecuteBlockly = () => {
    try {
        eval(localStorage.getItem(KEY.BLOCKLY_CODE) || "");
    } catch (e) {
        alert(e);
    }
};

export const StopBlockly = () => {};
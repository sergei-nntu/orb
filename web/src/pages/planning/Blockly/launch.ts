import {KEY} from "../../../constants";

// There is no option to call those functions other way
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function delay(value: number) {
    alert(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setGripperState(value: number) {
    alert(`setGripperState:${value}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setPosition(x: number, y: number, z: number, pitch: number, roll: number, yaw: number) {
    alert(`setPosition(${x}, ${y}, ${z}, ${pitch}, ${roll}, ${yaw})`);
}

export const ExecuteBlockly = () => {
    try {
        eval(localStorage.getItem(KEY.BLOCKLY_CODE) || "");
    } catch (e) {
        alert(e);
    }
};

export const StopBlockly = () => {};
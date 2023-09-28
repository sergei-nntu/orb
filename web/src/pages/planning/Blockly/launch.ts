import useHttp from "../../../hooks/Http/Http";
import {API_ROUTES, KEY} from "../../../constants";

const {request} = useHttp();

function sleep(ms: number) {
    const date = Date.now();
    let currentDate = null;
    do {
    currentDate = Date.now();
    } while (currentDate - date < ms);
}

// There is no option to call those functions other way
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function orm_blockly_delay(value: number) {
    sleep(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function orm_blockly_set_gripper_state(value: number) {
    alert(`orm_blockly_set_gripper_state: ${value}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function orm_blockly_set_position(x: number, y: number, z: number, pitch: number, roll: number, yaw: number) {
    const options = {
        method: "POST",
        body: JSON.stringify({
            "x": x,
            "y": y,
            "z": z,
            "pitch": pitch,
            "roll": roll,
            "yaw": yaw,
            "gripper": 0.1
        })
    };
    const {execute} = await request(API_ROUTES.CONVERT_POSE, options);
    console.log(execute);
}

export const ExecuteBlockly = () => {
    try {
        eval(localStorage.getItem(KEY.BLOCKLY_CODE) || "");
    } catch (e) {
        alert(e);
    }
};

export const StopBlockly = () => {};
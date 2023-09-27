import {KEY} from "../../../constants";

// There is no option to call those functions other way
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function delay() {
    alert("it works");
}

export const ExecuteBlockly = () => {
    try {
        eval(localStorage.getItem(KEY.BLOCKLY_CODE) || "");
    } catch (e) {
        alert(e);
    }
};

export const StopBlockly = () => {};
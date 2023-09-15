import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

const setGripperStateJson = {
    "message0": "SetGripperState %1°",
    "args0": [
        {"type": "field_number", "name": "STATE", "value": 0, "min": 0}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 300
};

Blockly.Blocks['set_gripper_state'] = {
    init: function() {
        this.jsonInit(setGripperStateJson);
        this.setTooltip("Set the gripper state");
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
javascriptGenerator.forBlock['set_gripper_state'] = function(block) {
    return `setGripperState(${block.getFieldValue("STATE")});\n`;
};